---
title: "商业与营销参考：signal forge"
description: "一个浏览器里的自主市场/金融研究 Agent，用 LangGraph 规划、Tavily 搜新闻、yfinance 拉行情，并生成投资 memo。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["商业洞察", "竞品分析", "SEO", "营销"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 商业与营销"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的商业与营销流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/CaSh007s/signal-forge"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# signal forge

> 一个浏览器里的自主市场/金融研究 Agent，用 LangGraph 规划、Tavily 搜新闻、yfinance 拉行情，并生成投资 memo。

## 这个能力解决什么问题

它解决的是用户想快速研究股票或市场标的，却需要同时看新闻、行情、技术指标、货币和历史报告的问题。输入是研究标的、用户自带 Gemini key、货币/时间范围等；输出是实时日志、价格图表、市场数据、新闻综合、bullish/bearish verdict 和带历史存档的 memo。

## 核心逻辑

前端 Next.js 提供登录、dashboard、settings 和报告界面；后端 FastAPI 运行 LangGraph/LangChain 工作流。Agent 先规划研究步骤，再调用 Tavily 搜索金融新闻、`yfinance` 获取价格和技术数据，Gemini 2.5 Flash 负责分析和写 memo。Supabase Auth/Postgres 存用户和报告，Redis 做缓存、rate limit 和状态管理。

## 技术结构

- 关键模块：Next.js 14 + Tailwind/Framer Motion 前端；FastAPI 后端；LangGraph workflow；Supabase Auth/Postgres；Redis cache；Tavily、yfinance、Gemini。
- 调用链路：authenticated user -> research request -> LangGraph plan/search/data/analyze -> report persisted -> dashboard/export/purge。
- 输入输出：输入是市场研究请求和 API key；输出是 memo、图表、verdict、历史报告。
- 核心依赖：Next.js、FastAPI、LangGraph、Google GenAI、Tavily、yfinance、Supabase、Redis。

## 为什么值得参考

它把“市场研究 Agent”做成了产品体验：有 BYOK、登录、报告历史、实时 reasoning log、导出和 purge，而不只是命令行研究脚本。LangGraph 用来承载多步研究，适合参考如何把 agent 状态展示给用户。

## 为什么不建议直接套用

它输出投资倾向判断，属于高风险金融场景，不能作为投资建议。Tavily 新闻和 yfinance 数据可能延迟、缺失或不适合专业交易。BYOK、OAuth、2FA、报告历史和 purge 都涉及安全实现细节，必须审计。memo 中的结论需要免责声明和人工判断。

## 如何改造成自己的版本

把“投资 verdict”改成“研究备忘录和风险因素”，弱化买卖方向。保留数据采集、图表和来源摘要，但每个结论都绑定新闻 URL、行情时间戳和数据来源。默认只做个人研究草稿，不提供交易建议；对外分享前加人工审核和免责声明。

## 适用场景

- 个人市场研究和投资备忘录草稿。
- 展示 LangGraph agent 的产品化 UI。
- 多源金融信息聚合学习。

## 不适用场景

- 投资建议、交易信号或资产管理。
- 对实时行情准确性要求高的系统。
- 未审计的 BYOK/认证/数据删除实现。

## 公开版边界

- 仅供方法论参考，非投资建议。

## 参考信息

- 原项目：[signal-forge](https://github.com/CaSh007s/signal-forge)
- 作者：CaSh007s
- 相关概念：[[市场研究 Agent]]、[[金融风险边界]]
- 相关卡片：保守留空
