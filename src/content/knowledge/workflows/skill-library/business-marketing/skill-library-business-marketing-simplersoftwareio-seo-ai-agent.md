---
title: "商业与营销参考：seo ai agent"
description: "一个生产化 SEO Agent，把 GPT-4o、GSC、GA4、DataForSEO、Firecrawl、SQLite、Streamlit 和 MCP 连接成 weekly SEO loop。"
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
source: "https://github.com/SimplerSoftwareIO/seo-ai-agent"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# seo ai agent

> 一个生产化 SEO Agent，把 GPT-4o、GSC、GA4、DataForSEO、Firecrawl、SQLite、Streamlit 和 MCP 连接成 weekly SEO loop。

## 这个能力解决什么问题

它解决的是 SEO 工作分散在 GSC、GA4、关键词工具、爬虫、内容写作和报告中的问题。输入是站点、关键词、页面、GSC/GA4/DataForSEO/Firecrawl/OpenAI 凭据；输出是 quick wins、rank delta、SERP/反链分析、AI overview 追踪、内容 brief、Astro Markdown 博文、周报和 MCP 工具响应。

## 核心逻辑

`agent.py` 运行 GPT-4o function-calling loop，根据用户问题调用 `tools/` 中的 GSC、GA4、DataForSEO、crawler、copywriter、content_brief、internal_links、appstore 等函数；`memory.py` 用 SQLite 保存关键词位置、推荐、搜索量、竞品快照和 API cache；`scheduler.py` 每周生成报告；`mcp_server.py` 把 39 个工具暴露给 VS Code/Cursor。

## 技术结构

- 关键模块：CLI agent、Streamlit dashboard、FastMCP server、weekly scheduler、SQLite memory、8 类 SEO tools。
- 调用链路：user prompt/schedule/MCP -> tool dispatch -> API data fusion -> GPT synthesis -> reports/blog/memory。
- 输入输出：输入是 SEO 数据源和问题；输出是报告、建议、Markdown 内容、MCP JSON。
- 核心依赖：OpenAI、Google APIs、DataForSEO、Firecrawl、mcp、schedule、Streamlit、Plotly、pandas、python-dotenv。

## 为什么值得参考

它把 SEO Agent 做成了有记忆、有 dashboard、有 MCP、有 scheduler 的系统，而不只是关键词生成器。最值得学的是多源数据融合和 SQLite memory：SEO 需要看 week-over-week，不是一次回答完就结束。

## 为什么不建议直接套用

README 明确支持“write & publish to your blog”和 repo commit，这属于高风险写操作，必须关掉或改成人工审核。它需要大量第三方凭据和站点权限，配置错误会泄露 SEO/分析数据。AI Overview、SERP、品牌可见性等指标随平台变化，不能当稳定真相源。

## 如何改造成自己的版本

先只开 read-only 工具：GSC quick wins、GA4 trends、DataForSEO SERP。把 copywriter 产物写到 drafts，不自动 commit 或发布。SQLite memory 可保留，但每条 recommendation 要带数据来源和生成时间。MCP 工具按权限分组，不给默认写博客权限。

## 适用场景

- 有自有站点数据权限的 SEO 周报和机会发现。
- 需要在编辑器里通过 MCP 查询 SEO 数据。
- SEO Agent 系统架构参考。

## 不适用场景

- 没有 GSC/GA4/SEO API 权限的数据分析。
- 高风险品牌监控结论未人工复核。

## 公开版边界

- 涉及外部平台内容流转时，需人工确认后执行。

## 参考信息

- 原项目：[seo-ai-agent](https://github.com/SimplerSoftwareIO/seo-ai-agent)
- 作者：SimplerSoftwareIO
- 相关概念：[[SEO Agent]]、[[MCP 工具]]
- 相关卡片：保守留空
