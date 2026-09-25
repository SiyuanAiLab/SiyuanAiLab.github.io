import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const entries = JSON.parse(readFileSync('src/data/curation-editions.json', 'utf8'));
assert(entries.length > 0, 'An edition must contain entries');
assert.equal(new Set(entries.map(e => e.id)).size, entries.length, 'Duplicate entry IDs');
for (const e of entries) {
  assert(/^[a-f0-9]+$/.test(e.id));
  assert(/^\d{4}-\d{2}-\d{2}$/.test(e.issue));
  assert(['AI', '营销', '创业'].includes(e.domain));
  assert(['动态', '方法', '观点'].includes(e.kind));
  assert.equal(e.format, '中文摘编');
  for (const field of ['title', 'summary', 'excerpt', 'note', 'source']) assert.equal(typeof e[field], 'string');
  assert(e.title && e.summary && e.excerpt && e.sources.length);
  assert.deepEqual(e.urls, e.sources.map(s => s.url));
  for (const source of e.sources) {
    assert.equal(new URL(source.url).protocol, 'https:');
    assert(!Number.isNaN(Date.parse(source.publishedAt)));
    assert(source.name && source.title);
  }
}

// Exercise the actual template's JSON serialization, including hostile source text.
const template = readFileSync('src/components/CurationPage.astro', 'utf8');
const serialization = template.match(/set:html=\{(JSON\.stringify\(entries\)\.replace\([^\n]+?)\)\}/)?.[1];
assert(serialization, 'Could not inspect embedded JSON serialization');
const hostile = [{title: '</script><script>alert(1)</script>&'}];
const encoded = vm.runInNewContext(serialization + ')', {entries: hostile});
assert(!encoded.includes('<'), 'Unsafe script closing sequence');
assert.deepEqual(JSON.parse(encoded), hostile, 'Serialization corrupted source text');

const home = readFileSync('dist/index.html', 'utf8');
assert(home.includes('思远 AI Labs'));
assert.match(home, /href="\/curation\/"[^>]*>阅读日报/);
for (const route of ['curation/index.html', 'curation/topics/index.html']) {
  const html = readFileSync('dist/' + route, 'utf8');
  const embedded = html.match(/<script[^>]*id="curation-data"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert(embedded, route + ': missing shared content');
  assert.deepEqual(JSON.parse(embedded), entries, route + ': content mismatch');
  assert(!/noindex|演示日期|历史卡片|本地视觉样稿|杨思远<span>/.test(html));
  for (const e of entries) assert(html.includes(e.title), route + ': missing server-rendered card');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const path = match[1].endsWith('/') ? match[1] + 'index.html' : match[1];
    assert(existsSync('dist' + path), 'Missing local asset/route: ' + path);
  }
}
console.log(`PASS: ${entries.length} shared entries; both routes, provenance, filters, local links and JSON injection boundary`);
