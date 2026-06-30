---
title: "商业与营销参考：seo ai agent"
description: "一个为 Asendia AI 设计的低成本 SEO Agent，用关键词聚类、竞品审计、内容大纲和机会追踪替代昂贵 SEO 工具。"
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
confidence: "低"
verifiedDate: "2026-06-30"
source: "https://github.com/badis1996/seo-ai-agent"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# seo ai agent

> 一个为 Asendia AI 设计的低成本 SEO Agent，用关键词聚类、竞品审计、内容大纲和机会追踪替代昂贵 SEO 工具。

## 这个能力解决什么问题

它解决的是早期公司想做入站流量，但没有预算购买 SEMrush/Ahrefs 或请 SEO agency 的问题。输入是 seed keywords、目标域名、竞品域名和可选 API key；输出是关键词聚类、竞品内容分析、SEO 文章大纲、机会追踪报告、HTML report 和数据文件。

## 核心逻辑

CLI `main.py` 按模块运行：`keyword_clustering.py` 用 intent、user profile 和语义相似度聚类关键词；`competitor_audit.py` 抓取并分析竞品内容缺口；`content_generator.py` 生成 blog outline；`opportunity_tracker.py` 每周追踪趋势和机会。`utils/api_clients.py` 优先使用 Google Trends、Keyword Planner、GSC 和直接网页分析，API 不可用时有 mock fallback。

## 技术结构

- 关键模块：`modules/keyword_clustering.py`、`competitor_audit.py`、`content_generator.py`、`opportunity_tracker.py`；`utils/api_clients.py`、`data_processing.py`、`reporting.py`；`schedule_weekly.py` 和 Docker compose。
- 调用链路：CLI args/env -> selected module -> free APIs/scraping/LLM/template fallback -> data/reports/logs。
- 输入输出：输入是关键词、竞品、域名；输出是 CSV/JSON、HTML 报告、内容大纲。
- 核心依赖：pandas、scikit-learn、spaCy、NLTK、sentence-transformers、pytrends、BeautifulSoup、OpenAI、schedule、Docker。

## 为什么值得参考

它的设计目标很现实：优先免费数据源和 fallback，而不是默认依赖昂贵 SEO API。模块划分也贴近 SEO 实际工作：关键词、竞品、内容、机会追踪，适合早期公司做轻量增长系统。

## 为什么不建议直接套用

项目强绑定 Asendia AI 的 domain、用户画像和招聘自动化语境。直接网页抓取竞品需要遵守 robots、ToS 和频率限制。Google Trends 和免费工具数据粒度有限，不能替代专业 SEO 数据。Docker compose 里还保留 SEMRUSH/AHREFS env，说明免费/付费路径边界需要清理。

## 如何改造成自己的版本

先把 `DOMAIN`、`COMPETITORS`、user profiles、industry verticals 改成你的业务。抓取模块加 robots/频率控制和来源记录。内容生成只产 outline，不直接写正文；每周机会报告先进入人工选题会，不自动排产。

## 适用场景

- 早期 B2B 公司做低成本 SEO 机会发现。
- 关键词聚类和内容大纲原型。
- 免费 SEO 数据源组合实验。

## 不适用场景

- 高精度排名追踪和商业 SEO 决策。
- 大规模抓取竞品页面。
- 不做人工审核就发布 SEO 内容。

## 公开版边界

- 涉及外部平台内容流转时，需人工确认后执行。

## 参考信息

- 原项目：[seo-ai-agent](https://github.com/badis1996/seo-ai-agent)
- 作者：badis1996
- 相关概念：[[SEO 工作流]]、[[竞品内容审计]]
- 相关卡片：保守留空
