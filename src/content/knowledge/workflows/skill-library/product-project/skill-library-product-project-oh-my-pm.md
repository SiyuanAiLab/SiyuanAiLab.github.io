---
title: "产品与项目参考：oh my pm"
description: "一个 Claude/Codex PM 工作流系统，用 5 层架构、20 个 skills、8 个 subagents 覆盖从需求感知到上线验证的产品生命周期。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["产品管理", "PRD", "需求分析", "项目管理"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 产品与项目"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的产品与项目流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/kelegele/oh-my-pm"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# oh my pm

> 一个 Claude/Codex PM 工作流系统，用 5 层架构、20 个 skills、8 个 subagents 覆盖从需求感知到上线验证的产品生命周期。

## 这个能力解决什么问题

它解决的是产品经理在市场研究、竞品分析、PRD、原型、评审、发布、反馈和迭代之间反复切换的问题。输入可以是一句产品任务、斜杠命令或完整工作流命令；输出是 PRD、竞品分析、HTML 原型、发布计划、影响分析等产品交付物。

## 核心逻辑

项目按 5 层组织：Perception、Strategy、Design、Delivery、Validation。简单任务由自然语言触发对应 skill；复杂任务用 `/quick-prd`、`/full-pm-cycle`、`/feature-launch` 等 workflow command 编排多个技能。v0.8 还加入 subagents：市场研究、竞品、用户访谈、数据监控、影响分析、反馈收集等可以在隔离上下文中执行，并有独立 memory 目录。

## 技术结构

- 关键模块：`skills/` 20 个专业 skill；`commands/` 4 个 workflow command；`agents/` 8 个 subagent；`.claude/agent-memory/` 跨会话记忆约定；`context/` 示例上下文。
- 调用链路：自然语言/command -> scenario detection -> skill/subagent/workflow -> 产品交付物。
- 输入输出：输入是产品想法、需求或竞品；输出是 PRD、原型、路线图、复盘、评审材料。
- 核心依赖：Claude Code/Codex skills、subagent 机制、npx skills installer。

## 为什么值得参考

它不是一个单点 PRD prompt，而是把 PM 工作拆成生命周期层级和可组合技能。`quick-prd = 场景识别 + 可选竞品 + PRD` 这种小编排很适合内部复用，比“大而全产品经理人格”更可控。

## 为什么不建议直接套用

范围很大，20 个 skills 和 8 个 subagents 很容易在真实项目里互相重叠。README 宣称自动 benchmark、HTML prototype、autopilot 等能力，但实际质量取决于每个 skill 的具体实现。若让 subagent 访问竞品网页、数据监控或 GitHub，需要单独配置权限和来源边界。

## 如何改造成自己的版本

不要全量搬。先抽 3 条高频链路：`quick-prd`、`requirement-review`、`impact-analysis`。把 5 层架构保留为目录，不急着做 20 个技能。每个 workflow 必须规定输入资料、交付物模板、是否需要人工确认，以及哪些外部数据只能手动提供。

## 适用场景

- 产品团队建立 Agent 辅助工作流库。
- 需要从需求到复盘的标准化交付物。
- 想研究 skill + subagent 组合模式。

## 不适用场景

- 业务上下文不足却想自动产出完整产品策略。
- 需要强事实依据的竞品/市场研究但未接可信数据源。
- 小团队还没跑通一个 PM 流程就全量引入。

## 参考信息

- 原项目：[oh-my-pm](https://github.com/kelegele/oh-my-pm)
- 作者：kelegele
- 相关概念：[[产品生命周期]]、[[Subagent 编排]]
- 相关卡片：保守留空
