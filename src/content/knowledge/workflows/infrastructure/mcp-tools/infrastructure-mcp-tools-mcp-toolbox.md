---
title: "MCP 工具参考：mcp toolbox"
description: "Google 开源的数据库 MCP server 和自定义工具框架，把数据库访问、预置工具、结构化查询和观测集中管理。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "进阶"
tags: ["MCP", "工具接口", "Agent工具", "协议生态"]
prerequisites: []
related_cards: ["ai-core-31-model-context-protocol", "ai-core-27-tool-use-function-calling"]
scenario: "基础设施层 / MCP 工具"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的MCP 工具流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/googleapis/mcp-toolbox"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# MCP Toolbox for Databases

> Google 开源的数据库 MCP server 和自定义工具框架，把数据库访问、预置工具、结构化查询和观测集中管理。

## 这个能力解决什么问题

Agent 连接数据库最危险的点是把“随便执行 SQL”暴露给模型。MCP Toolbox for Databases 解决的是两层问题：一层是预置数据库工具，让 IDE/CLI 快速探索 schema、查询数据；另一层是自定义工具框架，让生产 Agent 只通过受限的结构化查询、语义搜索或 NL2SQL 工具访问数据库，并带连接池、认证和 OpenTelemetry。

## 核心逻辑

输入可以是 MCP 客户端的自然语言数据库请求，也可以是应用通过 SDK 调用某个工具。Toolbox server 根据 `--prebuilt=<database>` 或 `tools.yaml` 加载数据源、工具、toolsets 和 prompts；运行时根据工具定义连接 PostgreSQL、BigQuery、Cloud SQL、Spanner、MongoDB、Redis、Snowflake 等数据源，执行预定义 SQL/查询/语义搜索，并把结果返回给 MCP client 或应用 SDK。输出是表结构、查询结果、工具调用结果、trace/metrics。

## 技术结构

- **Prebuilt Tools**：通过 `@toolbox-sdk/server --prebuilt=postgres` 等方式快速得到 `list_tables`、`execute_sql` 等数据库探索工具。
- **tools.yaml 配置**：`sources` 定义数据源，`tools` 定义动作和参数，`toolsets` 分组工具，`prompts` 提供可复用提示。
- **多数据库支持**：Google Cloud 数据库和 PostgreSQL/MySQL/Oracle/MongoDB/Redis/Elasticsearch/ClickHouse/Neo4j/Snowflake 等都有集成方向。
- **SDK 与 MCP 双入口**：既能接 Gemini CLI、Claude Code、Codex 等 MCP client，也有 Python/JS/Go/Java SDK 嵌入应用。
- **生产能力**：连接池、IAM/认证、OpenTelemetry metrics/tracing 是 README 明确强调的基础设施能力。

## 为什么值得参考

它把数据库工具从“模型写 SQL”改成“工程师定义可调用工具”。`sources/tools/toolsets/prompts` 四段配置给了一个很好的安全模型：数据源和动作分离，工具可分组，提示可绑定业务语义。对企业 AI 服务来说，这比直接开放数据库连接字符串给 Agent 更可控。

## 为什么不建议直接套用

预置工具虽然方便，但 `execute_sql` 这类通用能力在生产环境风险很高；需要数据库权限、只读账号、行列级权限和查询限额配合。多数据库支持也意味着配置复杂，某些高级能力和认证方式要逐个验证。若只是读一张小表，完整 Toolbox 可能比一个受限内部 API 重。

## 如何改造成自己的版本

先用它的 `tools.yaml` 思路设计内部“数据工具契约”：每个工具只做一个白名单查询，参数必须强类型，默认只读，输出限制行数并脱敏。把通用 SQL 工具限制在开发/分析环境，生产 Agent 只拿 toolsets 中的业务工具。所有调用记录 user、tool、source、参数 hash、row count 和 latency，便于审计。

## 适用场景

- Agent/IDE 需要安全探索或查询数据库。
- 多数据库、多团队需要统一工具配置和观测。
- 生产 Agent 需要受限结构化数据工具。

## 不适用场景

- 想让模型自由写 SQL 操作生产库。
- 数据权限、脱敏、查询预算还没定义。
- 只有极简单数据读取，用内部 API 更轻。

## 参考信息

- 原项目：[mcp-toolbox](https://github.com/googleapis/mcp-toolbox)
- 作者：googleapis
- 相关概念：[[数据库工具]]、[[MCP]]、[[结构化查询]]
- 相关卡片：保守留空
