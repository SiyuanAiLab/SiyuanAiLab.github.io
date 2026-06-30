---
title: "产品与项目参考：everyone"
description: "一个面向产品经理的 AI Agent plugin/skill marketplace，聚合 PRD、ASCII 原型和 LLM Wiki 等 PM 工具。"
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
source: "https://github.com/nixihz/everyone"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# everyone

> 一个面向产品经理的 AI Agent plugin/skill marketplace，聚合 PRD、ASCII 原型和 LLM Wiki 等 PM 工具。

## 这个能力解决什么问题

它解决的是产品经理想在 Claude Code、Codex 或其他 Agent 中快速安装 PM 相关技能的问题。输入是 plugin marketplace 安装命令或直接安装 skill；输出是可调用的产品工具包，例如 `prototype-ascii`、`prd`、`llm-wiki`，以及可选的 OpenAI product-design plugin marketplace 条目。

## 核心逻辑

Everyone 不是单一技能，而是 marketplace 仓库。它用 `.codex-plugin`、`.claude-plugin`、`.agents/plugins/marketplace.json` 声明插件与版本；每个 skill 自带 `SKILL.md`，无构建步骤；支持插件协议的 Agent 通过 marketplace add/install 获取，不支持插件的 Agent 可以直接复制或 `npx skills add` 安装单个 skill。

## 技术结构

- 关键模块：`plugins/everyone/skills/` 下的 PM skills；Codex/Claude plugin manifest；marketplace registry；`package.json` 仅用于 standard-version 发布。
- 调用链路：agent marketplace add -> plugin install -> skill auto trigger 或用户自然语言触发。
- 输入输出：输入是安装命令和产品任务；输出是线框图、PRD、知识库维护结果等。
- 核心依赖：Agent plugin/skill 协议，基本无运行时依赖。

## 为什么值得参考

它值得看的是“技能分发形态”：同一套 PM 能力以 marketplace、plugin、direct skill 三种方式分发，降低不同 Agent 生态之间的迁移成本。对内部 Skill Library 来说，这比单个 prompt 更接近可复用资产包。

## 为什么不建议直接套用

仓库更像 marketplace scaffold，实际 PM 方法论深度取决于每个 skill。它还打包了上游 product-design plugin，版本和权限要单独核对。作为业务生产工具前，需要逐个审查 skill 的输入输出、是否会写文件、是否引用外部插件。

## 如何改造成自己的版本

可以借鉴 marketplace 结构，做成“思远 AI Lab PM skills”目录：每个 skill 独立 `SKILL.md`，manifest 只做安装声明。先放 PRD、需求评审、复盘、路线图四类，别混入无关插件。给每个 skill 增加适用场景、输出路径和不自动改生产系统的边界。

## 适用场景

- 管理一组产品经理常用 Agent skills。
- 想同时支持 Claude Code、Codex 和直装 skill。
- 内部工具包分发和版本管理。

## 不适用场景

- 需要一个完整 PM SaaS。
- 未审计第三方 plugin 权限。
- 希望安装后自动覆盖项目流程的场景。

## 参考信息

- 原项目：[everyone](https://github.com/nixihz/everyone)
- 作者：nixihz
- 相关概念：[[Skill Marketplace]]、[[产品工作流]]
- 相关卡片：保守留空
