---
title: "商业与营销参考：Market Research Agent"
description: "一个 Streamlit + CrewAI 市场研究应用，用多个 agent 搜集公开信息并生成公司金融与市场分析报告。"
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
source: "https://github.com/psrane8/Market-Research-Agent"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Market Research Agent

> 一个 Streamlit + CrewAI 市场研究应用，用多个 agent 搜集公开信息并生成公司金融与市场分析报告。

## 这个能力解决什么问题

它解决的是用户想快速获得某家公司市场和财务分析初稿的问题。输入是公司名称和 Google/Serper API key；输出是由多个 CrewAI agent 协作生成的综合报告，覆盖公开信息、市场、竞争和决策参考。

## 核心逻辑

Streamlit UI 收集公司名后，后端用 CrewAI 定义的 agents、tasks 和 tools 协同工作。Serper API 负责互联网搜索，LangChain/Gemini Flash 1.5 负责理解、分析和报告编写。每个 agent 聚焦不同研究面，最后把结果合成一份可读报告。

## 技术结构

- 关键模块：`app.py` 是 Streamlit 入口；`agents.py` 定义研究角色；`tasks.py` 定义任务；`tools.py` 封装搜索/工具。
- 调用链路：company name -> search public web -> specialized agents analyze -> report synthesis -> Streamlit display。
- 输入输出：输入是公司名和 API keys；输出是市场/金融分析报告。
- 核心依赖：CrewAI、LangChain、Gemini Flash 1.5、SerperAPI、Streamlit、python-dotenv。

## 为什么值得参考

它是 CrewAI 市场研究的简洁样板，文件分工清楚，适合看“agent/task/tool”如何组织市场研究流程。对于业务调研类 Skill，最可借鉴的是把搜索工具和分析任务拆开，而不是一个 prompt 包办。

## 为什么不建议直接套用

README 信息较少，没有列出数据来源引用规范、事实核查或金融免责声明。公开网页搜索不等于可靠财务数据，模型可能把过时或营销页面当事实。用于投资、并购或商业决策前必须人工核验来源。

## 如何改造成自己的版本

把输出改成带引用的结构化报告：来源、摘录、判断、置信度、待核查项。限制搜索来源为公司官网、财报、可信数据库和新闻。把“结论”拆成“事实”和“推断”，并加入“不可作为投资建议”的边界。

## 适用场景

- 快速生成公司研究初稿。
- CrewAI 多 agent 市场研究 demo。
- 商业调研流程原型。

## 不适用场景

- 投资建议、尽调或高风险财务决策。
- 需要精确数据和引用链的正式报告。
- 不允许联网搜索的企业环境。

## 参考信息

- 原项目：[Market-Research-Agent](https://github.com/psrane8/Market-Research-Agent)
- 作者：psrane8
- 相关概念：[[市场研究]]、[[多 Agent 调研]]
- 相关卡片：保守留空
