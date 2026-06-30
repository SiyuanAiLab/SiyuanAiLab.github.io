---
title: "数据与分析参考：langgraph text to sql agent"
description: "一个 LangGraph + Ollama 的本地 Text-to-SQL demo，用顺序节点把自然语言问题转成 SQL、执行并解释结果。"
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
source: "https://github.com/IshaanLabs/langgraph-text-to-sql-agent"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# langgraph text to sql agent

> 一个 LangGraph + Ollama 的本地 Text-to-SQL demo，用顺序节点把自然语言问题转成 SQL、执行并解释结果。

## 这个能力解决什么问题

它解决的是在不依赖云端 function calling 的情况下，用本地模型查询数据库。输入是自然语言问题和 Chinook SQLite 数据库；输出是生成 SQL、原始结果和自然语言解释，可通过 Streamlit、FastAPI 或 Jupyter 使用。

## 核心逻辑

项目实现两条路径：Notebook 里用 LangChain 内置 SQL agent；主实现用自定义 LangGraph workflow。图固定为 `START -> list_tables -> get_schema -> generate_sql -> run_query -> generate_response -> END`，每步用 custom tool 或节点执行。LLM 是 Ollama 上的 CodeGemma 7B instruct，schema 注入到 prompt，SQL 执行前做只读校验和结果限制。

## 技术结构

- 关键模块：`configuration.py` 配模型和数据库；`langgraph_agent.py` 是核心 workflow；`FastAPI.py` 暴露接口；`streamlit_app.py` 提供界面；`text_to_SQL_Langchain_agent.ipynb` 是对照教程。
- 调用链路：用户问题 -> list tables -> get schema -> Ollama generate SQL -> validate/read-only run -> generate explanation。
- 输入输出：输入是问题和 SQLite DB；输出是 SQL、raw results、解释。
- 核心依赖：LangGraph、LangChain、Ollama、CodeGemma、SQLite、FastAPI、Streamlit、Pydantic。

## 为什么值得参考

它把 Text-to-SQL 写成确定性的图，而不是让 Agent 自由选择工具。这对安全和可解释性更好：每个问题都必须经过列出表、取 schema、生成、执行、解释这五步，适合做教学和受控 demo。

## 为什么不建议直接套用

本地 CodeGemma 能力和实际 SQL 准确率需要实测；README 的安全描述只适合 demo，不足以保护真实数据库。文件名大小写和文档里 `streamlit_app.py`/`streamlitapp.py` 曾有不一致风险，运行前要核对。它仍然会执行 SQL，必须只接样本库或只读副本。

## 如何改造成自己的版本

保留 LangGraph 顺序节点，但在 `generate_sql` 和 `run_query` 之间加入人工确认节点。把 `configuration.py` 改成环境变量和数据库 profile。为每次执行保存 graph state、SQL、执行结果、错误和用户确认，方便复盘。

## 适用场景

- 本地模型 Text-to-SQL 教学。
- 想研究 LangGraph 确定性工作流。
- 只读 SQLite 或样本库问答。

## 不适用场景

- 真实生产库自助查询。
- 没有本地 Ollama 资源的用户。
- 复杂企业 schema 和多 SQL 方言场景。

## 参考信息

- 原项目：[langgraph-text-to-sql-agent](https://github.com/IshaanLabs/langgraph-text-to-sql-agent)
- 作者：IshaanLabs
- 相关概念：[[LangGraph]]、[[SQL 安全]]
- 相关卡片：保守留空
