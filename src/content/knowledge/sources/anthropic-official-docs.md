---
title: "Anthropic 官方文档"
description: "Anthropic 公司维护的 Claude 系列产品官方文档，是 Claude 能力、API 行为和安全指南的一手来源。"
pubDate: 2026-07-07
updatedDate: 2026-07-07
category: sources
subcategory: "官方文档与产品更新"
level: 入门
tags: ["Anthropic", "Claude", "官方文档", "信源", "AI学习"]
related_cards: ["ai-source-principle", "ai-official-docs-directory"]
scenario: "需要判断「Anthropic 官方文档」是否适合作为 AI 学习、研究或行业观察信源时。"
audience: "非技术背景的 AI 学习者、产品经理、内容创作者和企业 AI 服务从业者。"
action: "把 Anthropic 官方文档 加入或排除出自己的 AI 信源清单，并在关键判断前交叉验证。"
confidence: 高
verifiedDate: 2026-07-07
source: "Anthropic 官方文档 / 独立站产品化框架讨论"
sourcePath: "06-Knowledge/02-AI与智能系统/02-实践与经验/Anthropic官方文档.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
---
# Anthropic 官方文档

> Anthropic 公司维护的 Claude 系列产品官方文档，是 Claude 能力、API 行为和安全指南的一手来源。

---

## 一、是什么

Anthropic 官方文档（docs.anthropic.com）覆盖 Claude 的核心产品：

- Claude AI（网页端与移动应用）
- Claude API（Messages API、Vision、Tool use、Computer use 等）
- Claude Code（Agentic coding 工具）
- Claude Cookbook（官方示例代码）
- Release Notes（模型与功能更新）

它属于第 1 级信源，适合作为 Claude 相关事实的权威依据。

## 二、为什么存在

Claude 的能力、模型列表、价格、安全护栏和 API 行为会定期更新。官方文档是这些信息最集中、最及时、最准确的入口。相比第三方教程，它能避免版本错位和猜测。

## 三、核心机制

### 3.1 主要板块

| 板块 | 用途 | 典型入口 |
|---|---|---|
| Prompt Engineering | 学习如何给 Claude 写提示词 | https://docs.anthropic.com/en/prompt-engineering |
| API Reference | 查参数、请求格式、错误码 | https://docs.anthropic.com/en/api-reference |
| Tool Use | 学习函数调用与工具使用 | https://docs.anthropic.com/en/docs/tool-use |
| Computer Use | Claude 操作计算机的官方说明 | https://docs.anthropic.com/en/docs/computer-use |
| Release Notes | 追踪模型更新与功能变更 | https://docs.anthropic.com/en/release-notes |
| Cookbook | 可运行的官方代码示例 | https://github.com/anthropics/anthropic-cookbook |

### 3.2 关键使用路径

- **想知道 Claude 某个参数怎么设** → API Reference
- **想学习怎么写好提示词** → Prompt Engineering 指南
- **想看 Claude 最近更新了什么** → Release Notes
- **想找官方推荐的代码示例** → Cookbook GitHub 仓库

## 四、常见误解

| 误解 | 真相 |
|---|---|
| Anthropic 文档只有 API 内容 | 文档包含大量非工程内容，如 Prompt Engineering、Safety、Computer Use 指南 |
| 文档不会过时 | 文档持续更新，但个别页面可能滞后；关键判断应同时查看 Release Notes |
| 官方文档一定很枯燥 | Prompt Engineering 和 Cookbook 部分包含大量实例，适合动手学习 |
| 只有付费用户才需要看 | 免费用户也能查看大部分文档，了解 Claude 的能力和限制 |

## 五、怎么用

### Level 0：收藏入口

把 https://docs.anthropic.com/ 和 https://docs.anthropic.com/en/release-notes 加入书签。

### Level 1：查事实

遇到 Claude 能力相关争议，直接搜索文档。例如：

- “Claude 支持多长的上下文？” → 查 API Reference 中的 `max_tokens` 和模型限制。
- “Claude 能不能看图？” → 查 Vision 文档。

### Level 2：跟更新

每月浏览一次 Release Notes，标记与自己的工作流相关的变更。

### Level 3：做验证

在写教程、做产品判断或回答客户问题时，把 Anthropic 文档作为引用依据，避免依赖记忆或二手信息。

## 六、延伸阅读

- 目录卡：[AI官方文档与产品更新](/knowledge/sources/ai-official-docs-directory/)
- 原则卡：[AI学习信源-如何分级与使用](/knowledge/sources/ai-source-principle/)
- 关联概念：`[[Claude-Code-原生能力与最新版本]]` / `[[提示词工程]]` / `[[工具调用]]`
