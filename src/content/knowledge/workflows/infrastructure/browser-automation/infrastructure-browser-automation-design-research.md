---
title: "浏览器自动化参考：design research"
description: "一个 Claude Code 浏览器自动化研究 Skill，用 10 个专门 agent 分三轮审计网站设计，并合成结构化设计参考文档。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["浏览器自动化", "Playwright", "网页QA", "Agent工具"]
prerequisites: []
related_cards: ["ai-core-27-tool-use-function-calling", "ai-core-32-agentic-workflow"]
scenario: "基础设施层 / 浏览器自动化"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的浏览器自动化流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/hamelsmu/design-research"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# design-research

> 一个 Claude Code 浏览器自动化研究 Skill，用 10 个专门 agent 分三轮审计网站设计，并合成结构化设计参考文档。

## 这个能力解决什么问题

复刻或分析一个网站设计时，人工要反复截图、量尺寸、抄颜色、看字体、拆组件、检查响应式。`design-research` 解决的是把这套设计调研拆给一组浏览器 agent：它们在真实 Chrome 会话里访问目标 URL，分别抽取导航结构、色彩字体、组件、布局、技术实现、可访问性和移动端行为，最后汇总成可用于重建设计的 markdown 参考。

## 核心逻辑

输入是目标 URL，最好是有多个页面类型的网站。处理层在 Claude Code agent teams 中启动 10 个浏览器自动化 agent：第一轮 5 个无依赖任务并行，摸清站点结构、设计系统、视觉性格、技术实现和可访问性；第二轮 4 个 agent 依赖站点结构结果，继续分析页面布局、交互组件、内容模板和 UX pattern；第三轮 1 个 agent 在布局结果之后检查移动和响应式。每个 agent 用 Chrome 扩展驱动真实浏览器，读取 DOM、截图、computed styles 并互动。输出是一份合成后的 markdown 设计研究报告。

## 技术结构

- **Claude Code agent teams**：依赖实验性 agent team 能力和 tmux，让多个 agent 在分屏中并发执行。
- **Claude in Chrome extension**：使用用户已登录的 Chrome session，因此能访问登录后页面，但也带来权限边界问题。
- **三阶段任务图**：站点结构等基础审计先跑，组件/页面模板等依赖信息后跑，移动端审计最后跑。
- **浏览器采集动作**：导航、截图、DOM 读取、computed styles、页面互动。
- **输出字段**：颜色 hex/RGB/Tailwind、字体栈、组件清单、CSS 尺寸、内容流、断点、技术架构、可访问性建议。

## 为什么值得参考

它把“设计研究”拆成多个互补视角，而不是让一个 agent 从头看到尾。尤其值得借鉴的是依赖顺序：先建站点地图，再做页面和组件深挖，最后看响应式；这符合真实设计审计的认知顺序。它也说明浏览器自动化不只用于测试，还能用于审美、结构和前端实现的知识抽取。

## 为什么不建议直接套用

它需要 Claude Code 2.0.73+、Chrome extension、tmux、实验性 agent teams，还建议跳过权限确认以避免 10 个 agent 反复询问。这个权限模型不适合默认给客户或团队成员使用。它使用真实登录态浏览器，也意味着访问边界、隐私页面和客户数据必须提前限制。README 估计一次完整审计 token 消耗接近单 agent 的 10 倍，成本不可忽略。

## 如何改造成自己的版本

内部版本可以保留“三轮审计”和“角色分工”，但降低风险：先做 4 个 agent 版本（结构、视觉系统、组件、响应式），只允许访问白名单域名和公开页面；每个 agent 输出固定 JSON/markdown 片段，主 agent 只负责合成。不要默认跳过权限，改成每轮开始前确认目标域和访问范围。对需要登录的网站，先准备只含测试数据的账号。

## 适用场景

- 竞品设计拆解、站点改版前审计、前端复刻参考。
- 需要真实浏览器读取 DOM、样式和响应式行为。
- 目标站点页面类型丰富，值得并行审计。

## 不适用场景

- 涉及敏感登录态、客户后台或私密数据页面。
- 只需要单页截图点评，不值得启动 agent team。
- 预算无法承担多 agent 长时间浏览器任务。

## 参考信息

- 原项目：[design-research](https://github.com/hamelsmu/design-research)
- 作者：hamelsmu
- 相关概念：[[浏览器自动化]]、[[设计审计]]、[[Sub-agent]]
- 相关卡片：保守留空
