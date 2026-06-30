---
title: "数据与分析参考：DbRheo CLI"
description: "一个数据库/数据分析 CLI Agent，用自然语言探索 schema、生成安全 SQL、执行查询，并可运行 Python 分析和导出数据。"
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
source: "https://github.com/Din829/DbRheo-CLI"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# DbRheo CLI

> 一个数据库/数据分析 CLI Agent，用自然语言探索 schema、生成安全 SQL、执行查询，并可运行 Python 分析和导出数据。

## 这个能力解决什么问题

它解决的是非数据库专家需要用自然语言查询 PostgreSQL、MySQL 或 SQLite，并进一步做数据分析的问题。输入是用户的自然语言数据库问题、数据库连接配置和可选数据文件；输出是 SQL、查询结果、风险提示、Python 分析结果、图表文件或 CSV/JSON/Excel 导出。

## 核心逻辑

DbRheo 先通过 adapter 自动连接数据库并探索 schema，再根据用户问题生成 SQL。执行前有风险评估，识别危险操作并提示；查询后可以把结果交给 Python 代码执行模块做统计、可视化或自动化脚本。CLI 支持异步处理、多行粘贴、流式输出和操作日志。

## 技术结构

- 关键模块：`packages/core` 提供数据库适配、SQL 生成、风险评估和执行；`packages/cli/cli.py` 提供交互入口；`packages/web` 是可选 Web UI；`testdata/` 提供 Adult Census 数据集。
- 调用链路：自然语言 -> schema discovery -> SQL generation -> risk assessment -> database execution -> optional Python analysis/export。
- 输入输出：输入是 DB 连接、问题、样本数据；输出是 SQL、表格结果、图表或导出文件。
- 核心依赖：FastAPI、SQLAlchemy async、asyncpg、aiomysql、aiosqlite、Google Generative AI/OpenAI、Pydantic、Rich、OpenTelemetry。

## 为什么值得参考

它把 Text-to-SQL 扩展成“数据库操作台”：schema 探索、风险评估、查询、Python 分析和导出都在一个 CLI loop 里。对数据分析 Skill 来说，风险评估和多数据库 adapter 是比单纯生成 SQL 更值得借鉴的部分。

## 为什么不建议直接套用

自然语言 SQL 直接连真实数据库风险很高。即使有 risk assessment，也不能保证不会生成高成本查询、读取敏感字段或误操作。README 提到 Claude 模型因 prompt caching 未应用暂不推荐，说明模型适配还在变化。企业环境需要只读账号、查询白名单、审计日志和限流。

## 如何改造成自己的版本

先做只读 SQL Agent，只开放 `SELECT` 和 schema introspection。把风险评估结果变成强制确认，不允许 LLM 自动执行写操作。Python 分析模块单独沙箱运行，并限制文件写入位置。给每条查询记录保存自然语言问题、生成 SQL、执行耗时、行数和人工确认状态。

## 适用场景

- 内部数据探索和临时报表。
- 多数据库 schema 快速理解。
- 数据分析 CLI 原型。

## 不适用场景

- 生产库写操作或无审计查询。
- 涉及敏感字段、客户隐私或财务数据的裸连。
- 用户不懂 SQL 且没有人工复核机制。

## 参考信息

- 原项目：[DbRheo-CLI](https://github.com/Din829/DbRheo-CLI)
- 作者：Din829
- 相关概念：[[Text-to-SQL]]、[[数据库权限边界]]
- 相关卡片：保守留空
