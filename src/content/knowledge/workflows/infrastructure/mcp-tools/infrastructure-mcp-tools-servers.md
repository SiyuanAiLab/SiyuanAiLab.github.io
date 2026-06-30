---
title: "MCP 工具参考：servers"
description: "MCP 官方/参考 server 集合，用 Everything、Fetch、Filesystem、Git、Memory、Sequential Thinking、Time 等示例展示协议能力和 SDK 用法。"
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
source: "https://github.com/modelcontextprotocol/servers"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Model Context Protocol Servers

> MCP 官方/参考 server 集合，用 Everything、Fetch、Filesystem、Git、Memory、Sequential Thinking、Time 等示例展示协议能力和 SDK 用法。

## 这个能力解决什么问题

开发者学习 MCP 时，最缺的不是“一个能跑的 server”，而是不同能力该怎么建模：工具、资源、提示词、transport、roots、订阅、采样、elicitation、文件权限等分别怎么写。`modelcontextprotocol/servers` 解决的是提供少量 reference implementations，让开发者参考官方维护的 server 结构，而不是把社区 server 列表当生产组件照搬。

## 核心逻辑

输入取决于具体 server：Fetch 接收 URL 并转换网页内容，Filesystem 接收允许目录和文件操作请求，Git 接收仓库路径和 git 查询/操作，Memory 接收实体/关系，Sequential Thinking 接收思考步骤，Time 接收时区请求。处理层由各语言 MCP SDK 注册 tools/resources/prompts，通过 stdio 或其他 transport 与 client 通信。输出是网页文本、文件结果、git 信息、知识图谱、时间转换、动态思考状态等。

## 技术结构

- **Reference Servers**：Everything、Fetch、Filesystem、Git、Memory、Sequential Thinking、Time 是当前 README 列出的主服务器。
- **多语言 SDK**：README 指向 C#、Go、Java、Kotlin、PHP、Python、Ruby、Rust、Swift、TypeScript SDK，说明 MCP 是协议生态，不是单语言库。
- **Everything server**：包含 prompts、resources、tools、transports、docs 和 tests，用来展示 resource links、structured content、elicitation、sampling、logging、roots 等协议特性。
- **Filesystem server**：安全文件操作和 configurable access controls，是本地文件 MCP 的官方参考。
- **Archived 迁移**：GitHub、Slack、Postgres、Puppeteer 等老 server 已归档或迁出，README 明确当前仓库不是生产 server 列表，而是 reference implementations。

## 为什么值得参考

它最重要的提醒是：参考实现不等于生产方案。官方 README 明确警告这些 server 主要用于教育和 SDK 展示，需要开发者按自己的 threat model 实现安全措施。对内部 Skill 设计来说，它可以作为“协议形态词典”：什么时候用 tools，什么时候用 resources，怎么组织 server 目录和测试。

## 为什么不建议直接套用

README 已明确这些 server 不是 production-ready。Filesystem、Git、Fetch 等能力一旦接到真实本地环境，会涉及文件泄露、网络抓取、仓库写操作和权限边界；Everything server 更是为了展示协议特性，不应该直接给业务 Agent 使用。社区 server 列表也已迁到 MCP Registry，不能把本仓库当完整生态目录。

## 如何改造成自己的版本

内部可把它拆成学习样板：用 Everything 学协议能力和测试结构；用 Filesystem 学 roots/access control；用 Git 学仓库工具边界；用 Fetch 学网页内容转换。真正上线时，每个 server 都要删掉不需要的工具，只保留业务动作，加上 allowlist、最大响应大小、审计日志和只读默认。参考 server 的 README 可以作为工程 checklist，而不是依赖本身。

## 适用场景

- 学习 MCP server 结构、SDK 用法和协议特性。
- 为内部工具设计 tools/resources/prompts 的边界。
- 快速验证 MCP client 与 reference server 的连接。

## 不适用场景

- 直接作为企业生产工具 server。
- 需要完整 MCP server 生态目录，应看 MCP Registry。
- 未定义文件、网络、git 操作安全策略。

## 参考信息

- 原项目：[servers](https://github.com/modelcontextprotocol/servers)
- 作者：modelcontextprotocol
- 相关概念：[[MCP Reference Server]]、[[MCP Resource]]、[[工具安全边界]]
- 相关卡片：保守留空
