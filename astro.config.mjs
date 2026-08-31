// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { readFileSync } from 'node:fs';

const workflowData = JSON.parse(
  readFileSync(new URL('./src/data/workflow-cards.json', import.meta.url), 'utf8')
);

const workflowCardsById = new Map(
  workflowData.cards.map((card) => [card.id, card])
);
const workflowCardsBySlug = new Map(
  workflowData.cards.map((card) => [card.slug, card])
);

function workflowCardFromMarkdownHref(href) {
  if (typeof href !== 'string' || !href.endsWith('.md') || /^[a-z][a-z0-9+.-]*:/i.test(href)) {
    return null;
  }

  const filename = href.slice(href.lastIndexOf('/') + 1, -3);
  const legacyId = filename.match(/^workflow-read-(\d{3})$/i);

  if (legacyId) {
    return workflowCardsById.get(`WF-${legacyId[1]}`) ?? null;
  }

  return workflowCardsBySlug.get(filename) ?? null;
}

function rehypeWorkflowLinks() {
  return (tree) => {
    const nodes = [tree];

    while (nodes.length > 0) {
      const node = nodes.pop();

      if (node?.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        const card = workflowCardFromMarkdownHref(href);

        if (card) {
          node.properties.href = `/knowledge/workflows/${card.category}/${card.subcategory}/${card.slug}/`;
        }
      }

      if (Array.isArray(node?.children)) {
        nodes.push(...node.children);
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://siyuanailab.com',
  output: 'static',
  markdown: {
    processor: unified({ rehypePlugins: [rehypeWorkflowLinks] }),
  },
  build: {
    format: 'directory'
  }
});
