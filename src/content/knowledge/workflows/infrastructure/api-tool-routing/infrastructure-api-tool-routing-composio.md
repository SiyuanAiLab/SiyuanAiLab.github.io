---
title: "API 网关与工具路由参考：composio"
description: "一个把第三方 SaaS 动作、认证和不同 Agent 框架适配封装起来的工具连接层。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "进阶"
tags: ["API网关", "工具路由", "function calling", "权限边界"]
prerequisites: []
related_cards: []
scenario: "基础设施层 / API 网关与工具路由"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的API 网关与工具路由流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/ComposioHQ/composio"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Composio

> 一个把第三方 SaaS 动作、认证和不同 Agent 框架适配封装起来的工具连接层。

## 这个能力解决什么问题

Agent 落地时经常不是缺模型，而是缺“能安全操作外部系统”的工具层：Gmail、Slack、GitHub、Notion、HubSpot 等服务各有 OAuth、权限、参数和 API 限流。Composio 解决的是让开发者用统一 SDK 为 Agent 获取工具、处理用户认证，并把工具适配到 OpenAI Agents、LangChain、LangGraph、LlamaIndex、Vercel AI SDK、Gemini、Mastra 等不同框架。

## 核心逻辑

输入是用户身份 `userId`、要启用的 toolkit 名称，以及当前 Agent 框架 provider。Composio 根据 toolkit 拉取对应工具定义和执行入口，把它们转换成目标框架能理解的 tool schema；Agent 在运行中选择工具后，Composio 负责把调用转到对应 SaaS/API，并把结果返回给 Agent。输出不是一份报告，而是一组已经适配框架的工具对象和实际工具调用结果。

## 技术结构

- **Core SDK**：`@composio/core` 和 Python `composio` 负责工具发现、认证上下文、toolkit 管理和 API 交互。
- **Provider packages**：OpenAI、Anthropic、LangChain、LangGraph、LlamaIndex、Gemini、Vercel、Mastra 等适配包，把同一工具目录输出成不同框架格式。
- **OpenAPI 生成链路**：README 提到从 Composio 后端拉取 OpenAPI spec，用于更新本地 API 文档和 SDK 类型。
- **Rube MCP**：Rube 是基于 Composio 的 MCP server，把 500+ app integrations 暴露给 Cursor、Claude Desktop、VS Code、Claude Code 等客户端。
- **数据流**：`userId + toolkits` → `composio.tools.get(...)` → 框架工具列表 → Agent 调用工具 → SaaS/API 结果回到 Agent。

## 为什么值得参考

它把“工具路由”和“用户授权”绑在一起。同一个 Slack 或 GitHub 动作必须知道是谁授权、能操作哪个 workspace、出错时如何重新认证。Composio 的多 provider 包也给了一个清晰样板：工具定义和框架适配要拆开。

## 为什么不建议直接套用

Composio 的价值依赖它的平台工具库和认证服务，直接使用会把关键外部动作托管给第三方平台；企业客户可能会关心数据经过哪里、OAuth token 如何保存、审计日志是否可导出。它覆盖工具多，但默认工具语义未必符合你的业务边界，写操作尤其需要审批与白名单。

## 如何改造成自己的版本

借鉴它的分层：先做 `toolkit` 概念，把一组业务动作、认证方式、风险等级放在一起；再做 provider adapter，把同一个内部工具转换成 OpenAI、MCP 或 Vercel AI SDK 格式；最后把 `userId` 作为工具调用必传上下文，禁止使用无归属的全局 token。内部版本可以从 2 个高频 SaaS 开始，先开放读操作或草稿生成。

## 适用场景

- Agent 需要连接大量第三方 SaaS。
- 多个 Agent 框架共用同一套工具能力。
- 工具调用必须按用户授权执行，而不是系统全局授权。

## 不适用场景

- 客户不允许第三方托管 OAuth 或工具执行。
- 只需少量内部 API，平台化接入成本高于收益。
- 写操作缺少审批、撤销和审计要求。

## 参考信息

- 原项目：[composio](https://github.com/ComposioHQ/composio)
- 作者：ComposioHQ
- 相关概念：[[工具调用]]、[[OAuth 授权]]、[[MCP]]
- 相关卡片：保守留空
