---
title: "沟通与协作参考：ai meeting assistant"
description: "一个 FastAPI 会议智能后端，把 transcript 分析成摘要、决策、行动项、情绪、主题、风险、speaker、follow-up email，并支持搜索和导出。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["会议纪要", "行动项", "协作", "沟通"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 沟通与协作"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的沟通与协作流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/kanizmadix/ai-meeting-assistant"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# ai meeting assistant

> 一个 FastAPI 会议智能后端，把 transcript 分析成摘要、决策、行动项、情绪、主题、风险、speaker、follow-up email，并支持搜索和导出。

## 这个能力解决什么问题

它解决的是会议转写文本进入组织后无法结构化管理的问题。输入主要是粘贴或上传的 transcript，也可选本地 Whisper 音频转写；输出是结构化会议对象、行动项、风险、主题、speaker 信息、follow-up email，以及 Markdown/PDF/JSON/ICS 导出。

## 核心逻辑

主流程是 Parse -> Summarize -> Extract。FastAPI 接收 transcript 后，按会议类型模板选择 prompt，用 Claude Sonnet 4.6 生成结构化 Pydantic 输出；额外模块再做 sentiment、topics、risks、speakers、followups。结果写入 SQLite，并用 sentence-transformers + FAISS 建语义索引，后续可搜索历史会议和导出行动项日历。

## 技术结构

- 关键模块：`pipeline.py`、`models.py`、`prompts.py`、`storage.py`、`sentiment.py`、`topics.py`、`risks.py`、`speakers.py`、`followups.py`、`embeddings_local.py`、`search.py`、`exporter.py`、`audio.py`。
- 调用链路：transcript/audio -> Claude structured analysis -> extras -> SQLite + FAISS -> export/search/API。
- 输入输出：输入是 transcript、meeting type、title 或音频；输出是结构化 JSON、会议报告、ICS todo 和 follow-up email。
- 核心依赖：FastAPI、Anthropic Claude、Pydantic v2、SQLite、sentence-transformers、FAISS、reportlab、Whisper 可选、Docker、pytest/ruff。

## 为什么值得参考

它把会议摘要做成了完整产品后端，而不是单次 summarize：有模板、结构化输出、存储、历史搜索、行动项、导出和 rate limit。特别适合参考“会议资料如何成为可查询资产”。

## 为什么不建议直接套用

它默认处理大量会议文本和可选音频，必须建立数据权限、保留周期和删除机制。`CORS_ORIGINS=*` 作为默认值不适合生产环境。Claude prompt caching、FAISS 本地索引和 SQLite 都需要根据团队规模重新评估。follow-up email 只能是草稿，不应自动发送。

## 如何改造成自己的版本

先只接 transcript，不接实时录音。把 meeting templates 改成自己的会议类型，例如销售复盘、项目周会、客户访谈。输出 schema 固定为 decisions、action_items、risks、open_questions、followup_draft，并给每条行动项加 owner_confidence 和 human_confirmed。

## 适用场景

- 团队需要结构化管理会议纪要和行动项。
- 已有授权 transcript，需要后处理和搜索。
- 想做会议智能后端原型。

## 不适用场景

- 对会议数据合规要求很高但无权限系统。
- 直接把 follow-up email 自动发给参会者。

## 公开版边界

- 录音和转写须获得参会者知情同意。

## 参考信息

- 原项目：[ai-meeting-assistant](https://github.com/kanizmadix/ai-meeting-assistant)
- 作者：kanizmadix
- 相关概念：[[会议知识库]]、[[行动项提取]]
- 相关卡片：保守留空
