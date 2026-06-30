---
title: "产品与项目参考：product management ai agents"
description: "一个 Cursor 产品管理工作区模板，用 `.cursor/rules`、context、frameworks 和 guides 组织 PM、GTM、Jira、Google Docs、PostHog 工作流。"
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
confidence: "低"
verifiedDate: "2026-06-30"
source: "https://github.com/AdamGold/product-management-ai-agents"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# product management ai agents

> 一个 Cursor 产品管理工作区模板，用 `.cursor/rules`、context、frameworks 和 guides 组织 PM、GTM、Jira、Google Docs、PostHog 工作流。

## 这个能力解决什么问题

它解决的是产品经理在 Cursor 里缺少稳定上下文和任务专用 agent 的问题。输入是公司产品资料、客户信息、个人写作样本、产品任务或 GTM 任务；输出是 feature plan、LinkedIn post、one-pager、sales script、battle card、Jira tickets、PostHog analysis 等。

## 核心逻辑

项目把“怎么做”和“知道什么”分开：`.cursor/rules/*.mdc` 定义 agent 行为，`context/company` 和 `context/personal` 提供产品、客户、技术能力和写作背景，`frameworks/` 放 Continuous Discovery 和 Evidence-Guided 方法论，`guides/` 放 feature plan 和 GTM 模板。用户在 Cursor 中用 `@feature-plan-writer`、`@ticket-writer` 等 agent 显式调用。

## 技术结构

- 关键模块：`.cursor/rules` 6 个 agent；`context/` 公司/个人知识；`frameworks/` PM 方法论；`guides/product` 和 `guides/gtm` 文档模板。
- 调用链路：用户 @agent -> agent 读取 context/framework/guide -> 产出 Google Docs/Jira/PostHog 相关材料。
- 输入输出：输入是产品任务和上下文文件；输出是产品文档、GTM 材料、工单和分析建议。
- 核心依赖：Cursor agent rules，可选 Google Docs/Drive、Jira、PostHog MCP integrations。

## 为什么值得参考

它的设计重点不是 prompt，而是“上下文资产化”：产品信息、客户、愿景、技术能力和个人声音都落成文件，多个 agent 共用。这对 PM 工作流很关键，因为产品输出质量高度依赖背景材料，而不是模型临场发挥。

## 为什么不建议直接套用

它是模板工作区，不是可运行产品；Google Docs、Jira、PostHog 集成都需要你自己的 MCP 和权限。默认框架、agent 和 guide 偏作者的 SaaS PM 流程，直接套用会把你的产品策略写成别人的流程。市场研究 agent 可能会联网，需要来源和引用规则。

## 如何改造成自己的版本

先建 `context/company` 四件套：产品概述、愿景、客户、技术能力。再只启用两个 agent：feature-plan-writer 和 ticket-writer。把 guide 改成你的 PRD、客户访谈和复盘模板；所有 Jira/Docs 写操作先设为“生成草稿”，不要直接创建或更新正式资产。

## 适用场景

- Cursor 用户构建产品管理工作区。
- 需要把 PM 方法论、模板和上下文文件化。
- 已有 Google Docs/Jira/PostHog 工具链。

## 不适用场景

- 不使用 Cursor 或 agent rules。
- 没有可维护的产品上下文文件。
- 希望开箱即用地接入企业工具权限。

## 参考信息

- 原项目：[product-management-ai-agents](https://github.com/AdamGold/product-management-ai-agents)
- 作者：AdamGold
- 相关概念：[[产品上下文]]、[[Agent 工作区]]
- 相关卡片：保守留空
