import work from './work.html?raw';
import diagnosis from './diagnosis.html?raw';
import methods from './methods.html?raw';
import report from './report.html?raw';

export const workUrl = '/skills/business-consult/';
export const reportUrl = `${workUrl}#full-report`;

// Frozen source text is retained verbatim. Only approved editorial markers and
// local hrefs change; presentation belongs to the shared page stylesheet.
const links: Record<string, string> = {
  '2026-09-28-证据页-问诊实录-skill经济调研-v0.1.html': `${workUrl}diagnosis/`,
  '2026-09-28-结构页-六本方法论-v0.1.html': `${workUrl}methods/`,
  '2026-09-28-skill作品卡-business-consult-线稿v0.4.html': workUrl,
  '2026-09-28-skill作品卡-business-consult-线稿v0.5.html': workUrl,
  '../01-基础设施/商业咨询Skill/实战记录/skill市场价值诊断-2026-09-28/report.html': reportUrl,
};

function prepare(source: string) {
  return source.match(/<body>([\s\S]*?)<\/body>/i)![1]
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<span class="module-tag">[^<]*<\/span>/g, '')
    .replaceAll(' ｜ 本页为打磨期线稿', '')
    .replace(/href="([^"]*)"/g, (attribute, href: string) => {
      const [path, hash] = href.split('#');
      return links[path] ? `href="${links[path]}${hash ? `#${hash}` : ''}"` : attribute;
    })
    .replace(/<main>/g, '<div class="report-body">').replace(/<\/main>/g, '</div>')
    .replace(/<table>/g, '<div class="table-scroll" tabindex="0" role="region" aria-label="报告表格"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

export const pages = {
  work: { title: 'Business Consult 作品卡', body: prepare(work) },
  diagnosis: { title: '一次真实问诊 · Business Consult 证据页', body: prepare(diagnosis) },
  methods: { title: '六本方法论 · Business Consult 结构页', body: prepare(methods) },
  report: { title: report.match(/<title>(.*?)<\/title>/)![1], body: prepare(report) },
};
