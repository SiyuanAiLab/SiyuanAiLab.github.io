---
title: "数据与分析参考：text to sql agent"
description: "一个 LangChain Text-to-SQL 教程仓库，用 Claude Sonnet、SQLDatabase 和 LangSmith trace 演示自然语言查询 Chinook SQLite。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["数据分析", "Text-to-SQL", "报表", "可视化"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 数据与分析"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的数据与分析流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/langchain-ai/text-to-sql-agent"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# text to sql agent

> 一个 LangChain Text-to-SQL 教程仓库，用 Claude Sonnet、SQLDatabase 和 LangSmith trace 演示自然语言查询 Chinook SQLite。

## 这个能力解决什么问题

它解决的是学习 Text-to-SQL Agent 基本链路的问题：用户用自然语言问 Chinook 数字媒体商店数据库，例如 top artists、员工收入、加拿大客户数；系统输出 SQL、执行结果和可读答案。

## 核心逻辑

Agent 使用 LangChain `create_agent` 和 SQLDatabase tools。工作流是 Discover 列表、Inspect schema 和 sample rows、Generate SQL、Validate syntax/safety、Execute、遇错 Retry、最后 Format 答案。配置 LangSmith 后，所有 tool calls、SQL、错误和重试都会进 trace。

## 技术结构

- 关键模块：`agent.py` 是核心实现；`tutorial.ipynb` 展示分步构建；`pyproject.toml` 管依赖；`chinook.db` 由用户下载且 gitignored。
- 调用链路：自然语言问题 -> list tables -> get schema -> Claude SQL generation -> validation -> SQLite execution -> formatted answer。
- 输入输出：输入是问题和 SQLite 数据库；输出是 SQL、结果和自然语言说明。
- 核心依赖：LangChain、langchain-anthropic、langchain-community、LangGraph、SQLAlchemy、python-dotenv、Rich、LangSmith 可选。

## 为什么值得参考

它适合作为 Text-to-SQL 入门样板，因为链路清楚、有 tutorial、有 LangSmith trace。对于构建数据分析 Skill，trace 是关键：你能看到模型为什么查了哪些表、生成了什么 SQL、哪里重试。

## 为什么不建议直接套用

它只针对 Chinook SQLite demo，不能直接处理企业 schema、权限和敏感数据。README 说 validate safety，但真实生产需要数据库账号、SQL parser、执行成本、行数限制和敏感列策略共同控制。默认模型和提示只适合教学。

## 如何改造成自己的版本

把它作为最小原型：先接一个只读 SQLite 样本库，加入 SQL 白名单和 `LIMIT` 强制。再引入 schema 摘要缓存和 LangSmith/本地 trace。上线前把“执行 SQL”拆成两步：生成并解释 SQL -> 用户确认 -> 执行。

## 适用场景

- 学习 LangChain Text-to-SQL 基本模式。
- 内部 demo 或教学 notebook。
- 小型只读数据库问答原型。

## 不适用场景

- 生产数据库自助查询。
- 大 schema、多方言或敏感数据场景。
- 需要复杂权限审计的数据平台。

## 参考信息

- 原项目：[text-to-sql-agent](https://github.com/langchain-ai/text-to-sql-agent)
- 作者：langchain-ai
- 相关概念：[[Text-to-SQL]]、[[Agent Trace]]
- 相关卡片：保守留空
