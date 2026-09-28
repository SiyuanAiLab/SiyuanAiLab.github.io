#!/usr/bin/env python3
"""Verify frozen Business Consult content from dist or serial curl responses."""

import argparse
from collections import Counter
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import sys
import time
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit


ROOT = Path(__file__).resolve().parents[1]
ROUTES = {
    "work": "/skills/business-consult/",
    "diagnosis": "/skills/business-consult/diagnosis/",
    "methods": "/skills/business-consult/methods/",
    "report": "/skills/business-consult/",
}
VOID = set("area base br col embed hr img input link meta param source track wbr".split())
DRAFT_SUFFIX = " ｜ 本页为打磨期线稿"


def sha256(data):
    return hashlib.sha256(data).hexdigest()


class Page(HTMLParser):
    def __init__(self, html, frozen=False):
        super().__init__(convert_charrefs=True)
        self.frozen = frozen
        self.stack = []
        self.text = []
        self.links = []
        self.ids = []
        self.regions = 0
        self.module_tags = 0
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get("class", "").split()
        self.regions += attrs.get("data-frozen-key") == self.frozen if self.frozen else "frozen-copy" in classes
        self.module_tags += "module-tag" in classes
        if tag == "a" and (not self.frozen or self.selected()):
            self.links.append(attrs.get("href", ""))
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag not in VOID:
            self.stack.append((tag, attrs))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                self.stack = self.stack[:index]
                break

    def handle_data(self, data):
        if any(tag in ("head", "style", "script") for tag, _ in self.stack):
            return
        if not self.frozen and any("module-tag" in attrs.get("class", "").split()
                                   for _, attrs in self.stack):
            return
        selected = self.selected() if self.frozen else any(tag == "body" for tag, _ in self.stack)
        if selected:
            self.text.append(data)

    def selected(self):
        return any(attrs.get("data-frozen-key") == self.frozen for _, attrs in self.stack)

    def normalized_text(self):
        text = "".join(self.text)
        if not self.frozen:
            text = text.replace(DRAFT_SUFFIX, "")
        return re.sub(r"\s+", "", text)

    def external_links(self):
        return Counter(href for href in self.links
                       if urlsplit(href).scheme in ("http", "https")
                       or href.startswith("//"))


class Reader:
    def __init__(self, base_url, delay):
        self.base = (base_url or "http://dist.invalid").rstrip("/") + "/"
        self.network = bool(base_url)
        self.delay = delay
        self.cache = {}
        self.requests = []

    def read(self, url):
        parts = urlsplit(url)
        url = urlunsplit(parts._replace(fragment=""))
        if url in self.cache:
            return self.cache[url]
        if self.network:
            if self.requests:
                time.sleep(self.delay)
            proc = subprocess.run(
                ["curl", "--silent", "--show-error", "--fail", "--max-time", "20",
                 "--write-out", "\n%{http_code}", url],
                capture_output=True, check=False)
            if proc.returncode:
                raise RuntimeError("curl failed for %s: %s" % (
                    url, proc.stderr.decode("utf-8", errors="replace").strip()))
            data, status = proc.stdout.rsplit(b"\n", 1)
            if status != b"200":
                raise RuntimeError("Expected HTTP 200 for %s, got %s" % (url, status.decode()))
            evidence = {"url": url, "status": 200}
        else:
            path = (ROOT / "dist" / unquote(parts.path).lstrip("/")).resolve()
            if not path.is_relative_to((ROOT / "dist").resolve()):
                raise RuntimeError("Path escapes dist: " + str(path))
            if path.is_dir():
                path /= "index.html"
            data = path.read_bytes()
            evidence = {"path": str(path)}
        evidence.update(bytes=len(data), sha256=sha256(data))
        self.requests.append(evidence)
        self.cache[url] = data
        return data


def verify(args):
    reader = Reader(args.base_url, args.delay)
    result = {"ok": True, "mode": "curl" if args.base_url else "dist",
              "normalization": "HTML text decoded; all Unicode whitespace removed; only source draft labels removed",
              "pages": [], "local_links": [], "errors": []}
    sources = json.loads((ROOT / "src/data/business-consult/sources.json").read_text())
    if Counter(item["key"] for item in sources) != Counter(ROUTES.keys()):
        raise RuntimeError("sources.json must contain each of the four expected keys exactly once")
    outputs = []
    for source in sources:
        key = source["key"]
        try:
            original = (ROOT / source["snapshot"]).read_bytes()
            url = urljoin(reader.base, ROUTES[key])
            data = reader.read(url)
            html = data.decode("utf-8")
            source_page = Page(original.decode("utf-8"))
            output = Page(html, frozen=key)
            expected, actual = source_page.normalized_text(), output.normalized_text()
            source_external, output_external = source_page.external_links(), output.external_links()
            required_ids = set(source_page.ids)
            if key == "methods":
                required_ids.update("m%d" % n for n in range(1, 7))
            if key == "report":
                required_ids.update("section-%d" % n for n in range(1, 25))
            checks = {
                "snapshot_sha_matches": sha256(original) == source["sha256"],
                "single_frozen_region": output.regions == 1,
                "text_matches": expected == actual,
                "external_links_match": source_external == output_external,
                "anchors_preserved": required_ids.issubset(output.ids),
                "draft_labels_absent": output.module_tags == 0 and all(
                    marker not in html for marker in ("本页为打磨期线稿", "线稿 v0.2")),
            }
            result["pages"].append({"key": key, "route": ROUTES[key], "checks": checks,
                "snapshot_sha256": sha256(original), "response_sha256": sha256(data),
                "source_text_sha256": sha256(expected.encode()), "output_text_sha256": sha256(actual.encode()),
                "source_chars": len(expected), "output_chars": len(actual),
                "external_count": sum(source_external.values()), "external_unique": len(source_external),
                "external_missing": dict(source_external - output_external),
                "external_extra": dict(output_external - source_external),
                "missing_ids": sorted(required_ids - set(output.ids))})
            for name, passed in checks.items():
                if not passed:
                    result["errors"].append(key + ": " + name)
            outputs.append((url, output))
        except (OSError, UnicodeError, ValueError, RuntimeError) as error:
            result["errors"].append(key + ": " + str(error))
    origin = urlsplit(reader.base)
    for page_url, output in outputs:
        for href in output.links:
            target = urlsplit(urljoin(page_url, href))
            if (target.scheme, target.netloc) != (origin.scheme, origin.netloc):
                continue
            evidence = {"from": page_url, "href": href, "ok": True}
            try:
                target_data = reader.read(target.geturl())
                if target.fragment and unquote(target.fragment) not in Page(target_data.decode("utf-8")).ids:
                    raise RuntimeError("Missing anchor: " + target.fragment)
            except (OSError, UnicodeError, ValueError, RuntimeError) as error:
                evidence.update(ok=False, error=str(error))
                result["errors"].append(page_url + " -> " + href + ": " + str(error))
            result["local_links"].append(evidence)
    result["reads"] = reader.requests
    result["ok"] = not result["errors"]
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", help="Read HTML using curl instead of dist")
    parser.add_argument("--delay", type=float, default=0.2, help="Seconds between serial curl requests (minimum 0.1)")
    args = parser.parse_args()
    args.delay = max(0.1, args.delay)
    try:
        if args.base_url and urlsplit(args.base_url).scheme not in ("http", "https"):
            raise ValueError("--base-url must use http or https")
        result = verify(args)
    except (OSError, ValueError, KeyError, RuntimeError) as error:
        result = {"ok": False, "errors": [str(error)]}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    sys.exit(main())
