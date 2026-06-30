---
title: "研究与知识参考：arxiv sanity bot"
description: "一个定时抓取 AI/ML 热门论文、排序、总结、提取首图并发布到 X 的 GitHub Actions bot。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["研究", "知识库", "摘要", "RAG"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 研究与知识"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的研究与知识流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/giacomov/arxiv-sanity-bot"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# arxiv sanity bot

> 一个定时抓取 AI/ML 热门论文、排序、总结、提取首图并发布到 X 的 GitHub Actions bot。

## 这个能力解决什么问题

它解决的是“每天新论文太多，想自动挑出值得看的 AI/ML 论文并推送”的问题。输入来自 alphaXiv 和 HuggingFace Papers 的近期论文列表；输出是带摘要、首图和 arXiv 链接的 X/Twitter 帖，同时用 Firebase 记录已发内容避免重复。

## 核心逻辑

GitHub Action 周期触发 CLI。系统从多个来源抓论文，若同一论文同时出现在 alphaXiv 和 HuggingFace 则加权更高，再按平均排名排序。Top papers 送 OpenAI 摘要；PDF 解析模块提取第一张有效图片；Twitter 模块通过 Tweepy 发帖；store 模块保存已总结/已发布状态，避免同一论文重复出现。

## 技术结构

- 关键模块：`ranking/ranked_papers.py` 管来源合并和排序；`arxiv/extract_image.py`、`image_validation.py` 处理论文图；`models/openai.py` 摘要；`twitter/send_tweet.py` 发布；`store/store.py` 接 Firebase。
- 调用链路：scheduled action -> fetch ranked papers -> summarize -> extract image -> send tweet -> write store。
- 输入输出：输入是公开论文 feed；输出是社媒帖、图片附件和 Firebase 状态记录。
- 核心依赖：OpenAI、Tweepy、arxiv、PyMuPDF/pypdf、Firebase Admin、httpx、tenacity、pydantic。

## 为什么值得参考

它把信息筛选做成了完整闭环：多源信号融合、去重、摘要、图像抽取、发布和状态记忆。对“研究雷达”类工作流来说，最值得借鉴的是 ranking + dedup store，而不是发 Twitter 这一步。

## 为什么不建议直接套用

## 如何改造成自己的版本

把“发布”改成“进入每日参考队列”。保留多源 ranking、去重和摘要，但输出到 Markdown digest、Slack 草稿或 review table。加入人工确认字段：是否推荐、为什么、是否已读。若要推送，只推内部通知，不自动公开发帖。

## 适用场景

- AI/ML 论文监控和日报参考池。
- 研究团队需要去重和初筛。
- 公开来源的趋势信号融合实验。

## 不适用场景

- 自动公开发帖或代表团队观点发布。
- 需要严肃学术评价的论文筛选。
- 未配置好 token 安全和人工审核的环境。

## 公开版边界

- 涉及外部平台内容流转时，需人工确认后执行。

## 参考信息

- 原项目：[arxiv-sanity-bot](https://github.com/giacomov/arxiv-sanity-bot)
- 作者：giacomov
- 相关卡片：保守留空
