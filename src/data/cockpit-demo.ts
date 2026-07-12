export type DemoMetric = {
  label: string;
  value: string;
  note: string;
  tone?: 'accent' | 'green' | 'yellow' | 'muted';
};

export type DemoRow = {
  name: string;
  meta: string;
  value: string;
  state: string;
  tone?: 'green' | 'yellow' | 'accent' | 'muted';
};

export type DemoModule = {
  id: string;
  label: string;
  title: string;
  kicker: string;
  metrics: DemoMetric[];
  rows: DemoRow[];
};

export const demoDate = '2026-06-18';

export const cockpitModules: DemoModule[] = [
  {
    id: 'cockpit',
    label: '驾驶舱',
    title: '个人操作系统驾驶舱',
    kicker: '先看状态，再把需要判断的事情交还给人。',
    metrics: [
      { label: '今日待办', value: '8', note: '3 项正在推进', tone: 'yellow' },
      { label: '待判断', value: '5', note: '等待人工拍板', tone: 'yellow' },
      { label: '运行中管线', value: '6', note: '状态稳定', tone: 'green' },
      { label: '近 7 天发布', value: '3', note: '按节奏完成', tone: 'green' },
      { label: '近 7 天入库', value: '42', note: '已进入知识层', tone: 'green' },
      { label: '系统健康', value: '88', note: '满分 100', tone: 'accent' }
    ],
    rows: [
      { name: '商业经营', meta: '5 个项目', value: '2 项推进', state: '关注判断', tone: 'yellow' },
      { name: '个人 IP', meta: '内容管线', value: '2 篇待发布', state: '运行中', tone: 'green' },
      { name: '知识管理', meta: '认知资产', value: '42 张入库', state: '运行中', tone: 'green' },
      { name: '人脉', meta: '承诺与跟进', value: '4 项待跟进', state: '需处理', tone: 'yellow' },
      { name: '健康', meta: '周期状态', value: '78% 完成', state: '稳定', tone: 'green' },
      { name: '财务', meta: '预算与现金流', value: '2 项核对', state: '需处理', tone: 'yellow' },
      { name: '系统构建', meta: '6 条管线', value: '88 健康度', state: '运行中', tone: 'green' },
      { name: 'Tokens', meta: '演示口径', value: '3 个工具', state: '稳定', tone: 'green' }
    ]
  },
  {
    id: 'business',
    label: '商业经营',
    title: '商业经营',
    kicker: '项目、判断和下一动作在同一张经营视图里。',
    metrics: [
      { label: '商业项目', value: '5', note: '统一项目口径', tone: 'green' },
      { label: '当前焦点', value: '1', note: '资源优先保障', tone: 'accent' },
      { label: '待判断', value: '5', note: '与总览一致', tone: 'yellow' },
      { label: '待推进', value: '3', note: '已有明确动作', tone: 'green' }
    ],
    rows: [
      { name: '内容工作台', meta: '核心项目', value: '验证期', state: '正常', tone: 'green' },
      { name: '知识助手', meta: '能力项目', value: '建设期', state: '待判断', tone: 'yellow' },
      { name: '客户反馈系统', meta: '基础设施', value: '运行期', state: '推进中', tone: 'green' }
    ]
  },
  {
    id: 'ip',
    label: '个人 IP',
    title: '个人 IP',
    kicker: '把内容生产从灵感驱动，变成可以接力的工程管线。',
    metrics: [
      { label: '近 7 天发布', value: '3', note: '跨平台统计', tone: 'green' },
      { label: '内容待发布', value: '2', note: '已通过审阅', tone: 'yellow' },
      { label: '运行栏目', value: '3', note: '各自承担不同任务', tone: 'green' },
      { label: '管线阶段', value: '4', note: '输入到分发', tone: 'accent' }
    ],
    rows: [
      { name: '实践记录', meta: '展示怎么做', value: '本周 1 篇', state: '运行中', tone: 'green' },
      { name: '判断笔记', meta: '解释为什么', value: '本周 1 篇', state: '运行中', tone: 'green' },
      { name: '同行手册', meta: '提供可复用方法', value: '本周 1 篇', state: '待发布', tone: 'yellow' }
    ]
  },
  {
    id: 'knowledge',
    label: '知识管理',
    title: '知识管理',
    kicker: '让外部信息经过筛选、审阅和结构化，再进入长期记忆。',
    metrics: [
      { label: '知识卡片', value: '860+', note: '统一知识口径', tone: 'accent' },
      { label: '近 7 天入库', value: '42', note: '与总览一致', tone: 'green' },
      { label: '今日待审', value: '6', note: '需要人工确认', tone: 'yellow' },
      { label: '处理管线', value: '3', note: '稳定运行', tone: 'green' }
    ],
    rows: [
      { name: '判断候选', meta: '对决策有长期价值', value: '2 张', state: '待审阅', tone: 'yellow' },
      { name: '方法候选', meta: '可复用的做事方式', value: '3 张', state: '待审阅', tone: 'yellow' },
      { name: '素材候选', meta: '可进入内容生产', value: '1 张', state: '待审阅', tone: 'yellow' }
    ]
  },
  {
    id: 'network',
    label: '人脉',
    title: '人脉',
    kicker: '把关系中的承诺和下一次联系，从记忆里移到系统里。',
    metrics: [
      { label: '待跟进', value: '4', note: '与总览一致', tone: 'yellow' },
      { label: '本周完成', value: '3', note: '已写回关系记录', tone: 'green' },
      { label: '等待判断', value: '1', note: '是否继续推进', tone: 'yellow' },
      { label: '场景聚合', value: '3', note: '按关系目的分组', tone: 'accent' }
    ],
    rows: [
      { name: '联系人 A', meta: '合作沟通', value: '2 项承诺', state: '本周跟进', tone: 'yellow' },
      { name: '联系人 B', meta: '用户反馈', value: '1 项承诺', state: '等待回复', tone: 'muted' },
      { name: '联系人 C', meta: '同行交流', value: '1 项承诺', state: '已安排', tone: 'green' }
    ]
  },
  {
    id: 'health',
    label: '健康',
    title: '健康',
    kicker: '用周期完成、训练趋势和恢复状态安排下一步。',
    metrics: [
      { label: '周期完成率', value: '78%', note: '按计划进度', tone: 'green' },
      { label: '训练趋势', value: '上升', note: '连续两个周期', tone: 'green' },
      { label: '恢复状态', value: '稳定', note: '无需调整计划', tone: 'green' },
      { label: '数据完整度', value: '92%', note: '记录基本完整', tone: 'accent' }
    ],
    rows: [
      { name: '力量周期', meta: '按周汇总', value: '计划内', state: '完成', tone: 'green' },
      { name: '有氧周期', meta: '按周汇总', value: '计划内', state: '完成', tone: 'green' },
      { name: '恢复记录', meta: '只看趋势', value: '状态平稳', state: '正常', tone: 'green' }
    ]
  },
  {
    id: 'finance',
    label: '财务',
    title: '财务',
    kicker: '用预算状态、现金流趋势和核对队列把握财务节奏。',
    metrics: [
      { label: '预算状态', value: '正常', note: '处于计划范围', tone: 'green' },
      { label: '现金流趋势', value: '稳定', note: '按周期观察', tone: 'green' },
      { label: '待核对项', value: '2', note: '需要补充凭据', tone: 'yellow' },
      { label: '知识沉淀', value: '12', note: '财务知识卡片', tone: 'accent' }
    ],
    rows: [
      { name: '经营预算', meta: '周期预算', value: '计划内', state: '正常', tone: 'green' },
      { name: '工具支出', meta: '订阅与服务', value: '待复核', state: '需处理', tone: 'yellow' },
      { name: '凭据归档', meta: '周期核对', value: '1 项缺口', state: '需处理', tone: 'yellow' }
    ]
  },
  {
    id: 'system',
    label: '系统构建',
    title: '系统构建',
    kicker: '看运行主链、管线健康和需要处理的系统问题。',
    metrics: [
      { label: '运行中管线', value: '6', note: '与总览一致', tone: 'green' },
      { label: '系统健康', value: '88', note: '满分 100', tone: 'accent' },
      { label: '待处理检查', value: '3', note: '进入检查队列', tone: 'yellow' },
      { label: '状态回流', value: '正常', note: '同步链路完整', tone: 'green' }
    ],
    rows: [
      { name: '内容生产管线', meta: '输入到发布', value: '运行中', state: '健康', tone: 'green' },
      { name: '知识处理管线', meta: '候选到记忆', value: '运行中', state: '健康', tone: 'green' },
      { name: '每日推进管线', meta: '启动到收尾', value: '运行中', state: '需检查', tone: 'yellow' }
    ]
  },
  {
    id: 'tokens',
    label: 'Tokens',
    title: 'Tokens',
    kicker: '用双口径观察 AI 的计费量与实际处理吞吐。',
    metrics: [
      { label: '今日 normalized', value: '1.8M', note: '计费口径', tone: 'accent' },
      { label: '今日 raw', value: '24.6M', note: '实际处理量', tone: 'yellow' },
      { label: '今日工具数', value: '3', note: '统一演示口径', tone: 'green' },
      { label: '缓存利用', value: '84%', note: '重复上下文复用', tone: 'green' }
    ],
    rows: [
      { name: '推理工具 A', meta: '复杂判断', value: '12.8M raw', state: '52%', tone: 'accent' },
      { name: '编程工具 B', meta: '实现与验证', value: '8.6M raw', state: '35%', tone: 'green' },
      { name: '检索工具 C', meta: '资料整理', value: '3.2M raw', state: '13%', tone: 'muted' }
    ]
  },
  {
    id: 'admin',
    label: '系统管控台',
    title: '系统管控台',
    kicker: '谁能判断、谁能执行、谁只记录，边界在这里显性化。',
    metrics: [
      { label: '状态同步', value: '正常', note: '关键状态已汇总', tone: 'green' },
      { label: '授权执行', value: '3', note: '当前执行队列', tone: 'green' },
      { label: '等待判断', value: '5', note: '不自动越权', tone: 'yellow' },
      { label: '系统检查', value: '通过', note: '演示环境', tone: 'accent' }
    ],
    rows: [
      { name: '统筹 Agent', meta: '拆解和调度', value: '可提出方案', state: '不可替人拍板', tone: 'yellow' },
      { name: '执行 Agent', meta: '实现和验证', value: '执行已授权动作', state: '运行中', tone: 'green' },
      { name: '记录 Agent', meta: '收集和回流', value: '只记录状态', state: '只读边界', tone: 'muted' }
    ]
  }
];

export const pipelineStages = ['输入', '加工', '输出', '分发'];
export const knowledgeStages = ['收集候选', '结构化', '人工审阅', '进入记忆'];
export const systemStages = ['状态进入', '判断入口', '授权执行', '结果回流'];
export const tokenTrend = [34, 52, 46, 68, 57, 76, 63];
