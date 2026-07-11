import { getCollection } from 'astro:content';
import knowledgeData from './knowledge-cards.json';
import workflowData from './workflow-cards.json';

export type KnowledgeSectionStatus = 'open' | 'pending';

export interface KnowledgeDirectoryItem {
  id: string;
  title: string;
  description: string;
  url: string;
  status: KnowledgeSectionStatus;
  statusLabel: '已开放' | '待开发';
}

export interface GlobalSearchItem {
  id: string;
  title: string;
  title_en: string;
  summary: string;
  tags: string[];
  url: string;
  columnTitle: string;
  scenario: string;
}

export const knowledgePillars: KnowledgeDirectoryItem[] = [
  {
    id: 'ai-core',
    title: 'AI 核心概念',
    description: '先建立 AI、模型、Agent、工程与治理的共同语言。',
    url: '/knowledge/ai-core/',
    status: 'open',
    statusLabel: '已开放',
  },
  {
    id: 'workflows',
    title: '工作流',
    description: '按能力栈查找可以复用的 Skill、工具链与 Agent 方法。',
    url: '/knowledge/workflows/',
    status: 'open',
    statusLabel: '已开放',
  },
  {
    id: 'toolkits',
    title: '工具配置与选型',
    description: '从真实用途出发，判断软件、模型与硬件该怎么选。',
    url: '/knowledge/toolkits/',
    status: 'open',
    statusLabel: '已开放',
  },
  {
    id: 'sources',
    title: '信源与标准',
    description: '识别可信来源，并用稳定标准筛选值得进入外脑的信息。',
    url: '/knowledge/sources/',
    status: 'open',
    statusLabel: '已开放',
  },
  {
    id: 'scenarios',
    title: '场景案例',
    description: '展示 AI·外脑在真实工作场景中的组合用法。',
    url: '/knowledge/scenarios/',
    status: 'pending',
    statusLabel: '待开发',
  },
  {
    id: 'career',
    title: '职业与能力',
    description: '理解 AI 时代的能力变化，并建立更有韧性的职业组合。',
    url: '/knowledge/career/',
    status: 'open',
    statusLabel: '已开放',
  },
];

export const knowledgeTopics: KnowledgeDirectoryItem[] = [
  {
    id: 'start',
    title: '从这里开始',
    description: '先理解一套给人和 Agent 共同使用的第二大脑如何搭起来。',
    url: '/knowledge/start/',
    status: 'open',
    statusLabel: '已开放',
  },
  {
    id: 'install',
    title: '获取与安装',
    description: '查看规划中的获取方式、当前状态和后续进度入口。',
    url: '/knowledge/install/',
    status: 'open',
    statusLabel: '已开放',
  },
  {
    id: 'ops',
    title: '建设日志',
    description: '查看公开栏目数量、最近更新与反馈入口。',
    url: '/knowledge/ops/',
    status: 'open',
    statusLabel: '已开放',
  },
];

const contentCategoryLabels: Record<string, string> = {
  toolkits: '工具配置与选型',
  sources: '信源与标准',
  career: '职业与能力',
};

function getContentSlug(id: string): string {
  return id.replace(/.*\//, '').replace(/\.mdx?$/, '');
}

export async function buildGlobalSearchItems(): Promise<GlobalSearchItem[]> {
  const aiCoreItems: GlobalSearchItem[] = knowledgeData.cards.map((card) => {
    const column = knowledgeData.columns.find((item) => item.id === card.column);
    return {
      id: card.id,
      title: card.title,
      title_en: card.title_en,
      summary: card.summary,
      tags: card.tags,
      url: `/knowledge/ai-core/${card.column}/${card.slug}/`,
      columnTitle: column?.title ?? 'AI 核心概念',
      scenario: '',
    };
  });

  const contentCards = (await getCollection('knowledge'))
    .filter((entry) => {
      const category = entry.data.category;
      return (
        ['toolkits', 'sources', 'career'].includes(category) &&
        entry.data.public &&
        !entry.data.draft &&
        getContentSlug(entry.id) !== 'index' &&
        (category !== 'toolkits' || Boolean(entry.data.subcategory))
      );
    })
    .sort((a, b) => a.data.title.localeCompare(b.data.title, 'zh-CN'))
    .map<GlobalSearchItem>((entry) => ({
      id: entry.id,
      title: entry.data.title,
      title_en: '',
      summary: entry.data.description,
      tags: entry.data.tags,
      url: `/knowledge/${entry.data.category}/${getContentSlug(entry.id)}/`,
      columnTitle: contentCategoryLabels[entry.data.category] ?? 'AI·外脑',
      scenario: entry.data.scenario ?? '',
    }));

  const workflowItems: GlobalSearchItem[] = workflowData.cards.map((card) => {
    const category = workflowData.categories.find((item) => item.id === card.category);
    const subcategory = category?.subcategories.find((item) => item.id === card.subcategory);
    return {
      id: card.id,
      title: card.title,
      title_en: card.title_en,
      summary: card.summary,
      tags: card.tags,
      url: `/knowledge/workflows/${card.category}/${card.subcategory}/${card.slug}/`,
      columnTitle: subcategory ? `工作流 · ${subcategory.title}` : '工作流',
      scenario: card.scenario,
    };
  });

  return [...aiCoreItems, ...contentCards, ...workflowItems];
}
