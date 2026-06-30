---
title: "写作与内容参考：AI Social Media Manager"
description: "它解决的是社媒团队从品牌资料到内容草稿、质量审核、审批流和排期预览之间的断层。输入包括品牌 profile、平台上下文、主题、竞品/趋势/分析数据；输出是结构化 content package、视觉 brief、hashtag、calend"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["写作", "内容改写", "多平台内容", "品牌声音"]
prerequisites: []
related_cards: ["ai-core-43-system-prompt", "ai-core-17-prompt-engineering"]
scenario: "Skill 参考库 / 写作与内容"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的写作与内容流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/qurbaneliii/AI-Social-Media-Manager"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# AI Social Media Manager

## 这个能力解决什么问题

它解决的是社媒团队从品牌资料到内容草稿、质量审核、审批流和排期预览之间的断层。输入包括品牌 profile、平台上下文、主题、竞品/趋势/分析数据；输出是结构化 content package、视觉 brief、hashtag、calendar 草稿、community reply 草稿、report insight，以及审批队列里的 草稿 记录。

## 核心逻辑

## 技术结构

- 关键模块：`llm`、`prompts`、`schemas`、`memory`、`agents`、`workflows`、`evaluation`、`approval`、`persistence`。
- 调用链路：API 请求 -> orchestrator -> specialist agent -> LLMClient/OpenAI 或 mock -> Pydantic validation -> Postgres 草稿/review/audit -> approval queue DTO。
- 输入输出：输入是品牌、平台、主题和已提供的数据；输出是待审内容包、质量分、审批状态、审计记录。
- 核心依赖：FastAPI、Pydantic、OpenAI chat completions、Postgres/asyncpg、pgvector 栈、React frontend、审批队列 API。

## 为什么值得参考

它把高风险的社媒 AI 能力做成“草稿和审批系统”，而不是“生成即发布”。尤其值得借鉴的是 schema-first、mock mode、approval state transition、queue DTO 和审计 metadata，这些都是把 AI 内容生成接进真实业务系统时必须补的层。

## 为什么不建议直接套用

## 如何改造成自己的版本

## 适用场景

- 企业内容团队需要 AI 草稿、质检和审批留痕。
- 多平台内容生成但必须人工确认。
- 研究社媒 AI 系统的安全架构。

## 不适用场景

- 小团队只需要轻量内容生成，不想维护数据库和审批系统。

## 公开版边界

- 涉及外部平台内容流转时，需人工确认后执行。

## 参考信息

- 原项目：[AI-Social-Media-Manager](https://github.com/qurbaneliii/AI-Social-Media-Manager)
- 作者：qurbaneliii
- 相关概念：[[审批流]]、[[品牌记忆]]
- 相关卡片：保守留空
