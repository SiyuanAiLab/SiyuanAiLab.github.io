---
title: "MCP 工具参考：fastmcp"
description: "一个 Pythonic 的 MCP server/client/app 框架，用函数声明生成工具、资源、提示词和协议生命周期。"
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
source: "https://github.com/PrefectHQ/fastmcp"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# FastMCP

> 一个 Pythonic 的 MCP server/client/app 框架，用函数声明生成工具、资源、提示词和协议生命周期。

## 这个能力解决什么问题

手写 MCP server 容易在协议细节上消耗大量时间：工具 schema、参数校验、transport、认证、client 生命周期、文档和测试都要自己补。FastMCP 解决的是让开发者把重点放在业务函数上，用 Python 装饰器声明 tool/resource/prompt，由框架生成 MCP 兼容接口，并提供 client 和 app 能力连接远程或本地 server。

## 核心逻辑

输入是 Python 函数、类型注解、docstring、资源路径或 prompt 定义。FastMCP 读取函数签名生成 schema 和验证规则，把它注册到 MCP server；客户端连接时，框架处理 transport 协商、认证、协议 lifecycle 和工具调用；如果用 Apps，还可以在会话中渲染交互式 UI。输出是可被 MCP host 调用的 tools/resources/prompts，或 programmatic client 的调用结果。

## 技术结构

- **Servers**：把 Python 函数封装成 MCP tools、resources、prompts，是最核心的生产入口。
- **Clients**：连接任意 MCP server，处理本地/远程 transport、认证、日志、notifications、progress、sampling 等协议特性。
- **Apps**：为工具提供会话内 UI，docs 中有 form、approval、choice、file-upload、dashboard 等 provider。
- **CLI 与部署**：文档包含 running server、inspecting、install MCP、HTTP deployment、server configuration 等。
- **Horizon 延伸**：README 把企业级 registry、RBAC、audit logs、observability、governance 放到 Prefect Horizon，说明开源框架与企业网关分层。

## 为什么值得参考

FastMCP 的参考价值是“让工具定义保持 Python 原生”。对于内部 Skill/工具，函数签名、类型注解、docstring 就是最小可信来源，框架负责协议化。它也提醒我们 MCP 不是只有 server，还包含 client、transport、认证、UI app 和部署治理。

## 为什么不建议直接套用

FastMCP 很强，但会把你带入 Python MCP 框架生态；如果工具主要在 Node/Rust/Go 或已经有官方 SDK，未必需要它。README 中企业治理能力更多指向 Horizon，开源 FastMCP 本身不等于自动拥有 RBAC、审计和私有 registry。生产 server 仍需要自己定义工具风险、鉴权、速率限制和数据脱敏。

## 如何改造成自己的版本

内部可以建立 FastMCP 风格规范：每个工具就是一个强类型函数，函数名是工具名，docstring 说明风险和输出，参数必须类型注解可校验。先用 FastMCP 快速交付 Python 工具；跨语言工具则统一到 MCP contract，而不是强迫所有实现都迁到 Python。上线前增加工具 registry，记录 owner、risk、allowed_roots、审计字段。

## 适用场景

- Python 团队要快速构建 MCP tools/resources/prompts。
- 需要同时写 server 和 client 测试工具调用。
- 工具逻辑比协议细节更重要。

## 不适用场景

- 核心工具已在非 Python 服务中，迁移成本高。
- 需要开箱即用企业治理但不准备接额外平台。
- 工具安全边界尚未定义，只想快速暴露内部能力。

## 参考信息

- 原项目：[fastmcp](https://github.com/PrefectHQ/fastmcp)
- 作者：PrefectHQ
- 相关概念：[[MCP Server]]、[[工具 Schema]]、[[MCP Client]]
- 相关卡片：保守留空
