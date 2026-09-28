import work from './work.html?raw';
import evidence from './evidence.html?raw';

export const workUrl = '/skills/ai-coach/';
export const evidenceUrl = `${workUrl}evidence/`;
const links: Record<string, string> = {
  '2026-09-28-skill作品卡-ai-coach-线稿v0.1.html': workUrl,
  '2026-09-28-证据页-判定卡与KB实录-ai-coach出卡-v0.1.html': evidenceUrl,
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
  work: { title: 'AI Coach 作品卡', body: prepare(work) },
  evidence: { title: '一张真实判定卡，和一次真实「先查再动手」', body: prepare(evidence) },
};
