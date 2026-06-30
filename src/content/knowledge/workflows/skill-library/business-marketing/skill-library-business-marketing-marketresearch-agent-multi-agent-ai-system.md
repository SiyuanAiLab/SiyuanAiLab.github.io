---
title: "商业与营销参考：MarketResearch Agent Multi Agent AI System"
description: "一个 CrewAI 市场情报系统原型，用 5 个 agent 和 Selenium/HTML 抓取生成市场规模、竞品和 GTM 报告。"
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
source: "https://github.com/moteprem4-web/MarketResearch-Agent-Multi-Agent-AI-System-"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# MarketResearch Agent Multi Agent AI System

> 一个 CrewAI 市场情报系统原型，用 5 个 agent 和 Selenium/HTML 抓取生成市场规模、竞品和 GTM 报告。

## 这个能力解决什么问题

它解决的是创业者需要快速判断一个业务想法是否值得做的问题。输入是产品/市场主题和公开网页来源；输出是 market overview、TAM/SAM/SOM、竞品分析、GTM 策略和 startup viability assessment。

## 核心逻辑

系统定义 5 个角色：Market Research Specialist 看趋势和需求，Competitive Intelligence Analyst 抓竞品定位和价格，Market Sizing Analyst 估算 TAM/SAM/SOM，Strategy Analyst 生成差异化和 GTM，Report Synthesizer 汇总。任务可并行执行，抓取层同时支持 Selenium 动态页面和 HTML 解析。

## 技术结构

- 关键模块：`AI-Powered MarketResearcher/agents.yaml` 定义角色；`tasks.yaml` 定义任务；`crew.py` 编排 CrewAI；`main.py` 运行；`report.md` 是样例输出。
- 调用链路：market idea -> scraping/search -> 5 agents -> report synthesis -> Markdown report。
- 输入输出：输入是研究主题和网页数据；输出是市场情报报告。
- 核心依赖：CrewAI、Python、Selenium、HTML parsing、LLM。

## 为什么值得参考

它把市场研究拆成角色和任务，比单模型报告更容易替换和审查。样例报告虽粗糙，但能看到研究工作流最终需要哪些板块：定价、收入模型、GTM、资源、风险和投资判断。

## 为什么不建议直接套用

它使用静态和动态网页抓取，容易碰到网站条款、反爬和数据版权边界。样例报告里的市场规模和收入预测没有来源链，不能直接用于决策。TAM/SAM/SOM 由模型估算时尤其容易幻觉，必须要求数据来源和计算过程。

## 如何改造成自己的版本

保留 5 角色框架，但每个 agent 输出必须带 source table：URL、抓取时间、证据摘录、推断。Selenium 只用于授权或公开允许抓取的网站。市场规模计算单独拆成 spreadsheet 或明确公式，不让模型直接给数字。

## 适用场景

- 创业 idea 初筛和市场研究草稿。
- 多 agent 商业分析流程学习。
- 内部研究模板构建。

## 不适用场景

- 无授权动态抓取竞品网站。
- 投资建议或商业计划书最终版。
- 需要可审计数据来源的正式市场报告。

## 参考信息

- 原项目：[MarketResearch-Agent-Multi-Agent-AI-System-](https://github.com/moteprem4-web/MarketResearch-Agent-Multi-Agent-AI-System-)
- 作者：moteprem4-web
- 相关概念：[[市场情报]]、[[网页抓取边界]]
- 相关卡片：保守留空
