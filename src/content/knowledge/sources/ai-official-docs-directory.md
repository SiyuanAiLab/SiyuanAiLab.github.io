---
title: "AI 官方文档与产品更新"
description: "AI 产品的说明书和更新日志，是查参数、追功能、排故障的第一手来源。"
pubDate: 2026-07-07
updatedDate: 2026-07-07
category: sources
subcategory: "官方文档与产品更新"
level: 进阶
tags: ["信源", "官方文档", "产品更新", "AI学习", "独立站"]
related_cards: ["ai-source-principle", "anthropic-official-docs", "openai-official-docs", "google-ai-official-updates", "mcp-official-docs", "midjourney-official-docs"]
scenario: "需要建立 AI 官方文档与产品更新 的信源目录和选择顺序时。"
audience: "非技术背景的 AI 学习者、产品经理、内容创作者和企业 AI 服务从业者。"
action: "按卡片中的分级与链接挑选 2-3 个来源，放入自己的固定阅读清单。"
confidence: 高
verifiedDate: 2026-07-07
source: "独立站产品化框架讨论 / 思远口述"
sourcePath: "06-Knowledge/06-个人成长与认知/02-实践与经验/AI官方文档与产品更新.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
---
# AI 官方文档与产品更新

> AI 产品的说明书和更新日志，是查参数、追功能、排故障的第一手来源。

---

## 一、是什么

这张卡整理了主流 AI 产品的官方文档和产品更新入口。官方文档属于第 1 级信源，是判断功能、参数、价格、限制条件的最可靠依据。

## 二、为什么存在

非技术背景学习者常遇到两个问题：

1. **信息分散**：Claude、OpenAI、Google、Midjourney 等各家文档站点独立，找不到统一入口。
2. **版本更新快**：模型能力、API 行为、价格每几周就可能变化，第三方解读容易滞后。

直接收藏官方入口，能跳过大量二手信息。

## 三、核心机制

| 来源 | 层级 | 形态 | 适合谁 | 一句话定位 | 代表作品/入口 | 细节卡 |
|---|---|---|---|---|---|---|
| Anthropic Docs | 1 | 官方文档 | 产品、工程、入门者 | Claude 全系列产品的官方说明 | https://docs.anthropic.com/ | [Anthropic官方文档](/knowledge/sources/anthropic-official-docs/) |
| OpenAI Docs | 1 | 官方文档 | 工程、产品 | GPT、Embeddings、Fine-tuning 的官方参考 | https://platform.openai.com/docs | [OpenAI官方文档](/knowledge/sources/openai-official-docs/) |
| Google AI Blog | 1 | 官方博客 | 产品、研究者 | Google Gemini、DeepMind 产品与研究动态 | https://ai.googleblog.com/ | [Google-AI官方动态](/knowledge/sources/google-ai-official-updates/) |
| MCP Documentation | 1 | 官方文档 | 工程、Agent 开发者 | 模型上下文协议规范与官方示例 | https://modelcontextprotocol.io/docs | [MCP官方文档](/knowledge/sources/mcp-official-docs/) |
| Midjourney Docs | 1 | 官方文档 | 设计师、创作者 | Midjourney 参数、指令和更新说明 | https://docs.midjourney.com/ | [Midjourney官方文档](/knowledge/sources/midjourney-official-docs/) |

### 3.1 产品更新入口

除了文档，还要关注 Release Notes 和官方新闻室：

- Anthropic Release Notes：https://docs.anthropic.com/en/release-notes
- OpenAI Newsroom：https://openai.com/newsroom
- Google AI Blog 即为主要更新渠道

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 官方文档只有工程师能看 | 多数文档包含 Prompt Engineering、Safety、产品指南等非工程内容 |
| 看第三方测评就够了 | 第三方测评可能基于旧版本或存在利益关联 |
| Release Notes 不重要 | 功能变更、价格调整、弃用警告通常只在 Release Notes 中明确说明 |
| 官方文档不会过时 | 文档会更新，但页面缓存或旧链接可能指向过期版本 |

## 五、怎么用

### 查参数

- 上下文窗口、输出 Token 限制、模型列表 → 直接查文档 API reference。

### 追功能

- 新模型上线、API 新增字段 → 看 Release Notes 或官方新闻室。

### 排故障

- 遇到“这个功能到底有没有”的争议 → 以官方文档当前页面为准。

## 六、延伸阅读

- 原则卡：[AI学习信源-如何分级与使用](/knowledge/sources/ai-source-principle/)
- 细节卡：[Anthropic官方文档](/knowledge/sources/anthropic-official-docs/) / [OpenAI官方文档](/knowledge/sources/openai-official-docs/) / [Google-AI官方动态](/knowledge/sources/google-ai-official-updates/) / [MCP官方文档](/knowledge/sources/mcp-official-docs/) / [Midjourney官方文档](/knowledge/sources/midjourney-official-docs/)
- 关联概念：`[[模型上下文协议]]` / `[[提示词工程]]`
