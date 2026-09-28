import work from './work.html?raw';
import evidence from './evidence.html?raw';

export const workUrl = '/skills/private-board/';
export const evidenceUrl = `${workUrl}evidence/`;
const links: Record<string, string> = {
  '2026-09-28-skill作品卡-稷下学宫-线稿v0.1.html': workUrl,
  '2026-09-28-证据页-互驳实录-稷下学宫-v0.1.html': evidenceUrl,
};

// Keep raw snapshots untouched. Only approved markers and internal hrefs change.
function prepare(source: string) {
  return source.match(/<body>([\s\S]*?)<\/body>/i)![1]
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<span class="module-tag">[^<]*<\/span>/g, '')
    .replace(/href="([^"]*)"/g, (attribute, href: string) => {
      const [path, hash] = href.split('#');
      return links[path] ? `href="${links[path]}${hash ? `#${hash}` : ''}"` : attribute;
    });
}

export const pages = {
  work: { title: '稷下学宫 作品卡', body: prepare(work) },
  evidence: { title: '一场真实互驳：四席先验摆上桌，然后开吵', body: prepare(evidence) },
};
