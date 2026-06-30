---
title: "API 网关与工具路由参考：ai"
description: "一个面向 TypeScript 应用和 Agent 的统一模型调用层，把模型、工具调用、结构化输出和 UI 流式响应放在同一套接口里。"
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
source: "https://github.com/vercel/ai"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Vercel AI SDK

> 一个面向 TypeScript 应用和 Agent 的统一模型调用层，把模型、工具调用、结构化输出和 UI 流式响应放在同一套接口里。

## 这个能力解决什么问题

AI 应用接入多个模型供应商后，接口差异会迅速扩散到业务代码里：模型名、流式输出、工具调用、结构化 JSON、前端消息协议、错误处理都各不相同。Vercel AI SDK 解决的是把这些差异压成同一层 TypeScript API，让应用面向 `generateText`、`generateObject`、Agent 和 UI hook，而不是绑定某一家模型 SDK。

对工具路由来说，它的价值在于把“选择模型、调用工具、回填工具结果、把中间状态推给 UI”放进一个可组合的运行时，而不是散落在 route handler、前端组件和供应商 SDK 之间。

## 核心逻辑

输入侧是应用传入的 prompt、messages、model 字符串或 provider 实例，以及可选 tools、schema、UI message 类型。处理层通过统一 provider 把模型请求转成供应商协议；需要工具时，由 `ToolLoopAgent` 维护“模型提出工具调用 → 应用执行工具 → 工具结果回填 → 模型继续生成”的循环；需要结构化结果时，用 schema 约束输出；需要 UI 时，把 agent stream 转成前端可消费的 message stream。输出可以是文本、对象、流式 token、带工具状态的 UI 消息，或 agent 的最终回复。

## 技术结构

- **统一 Provider Architecture**：同一套调用形态可以走 Vercel AI Gateway，也可以安装 OpenAI、Anthropic、Google 等 provider 包直连。
- **AI SDK Core**：文本生成、结构化对象、tools、MCP tools、provider management、testing、telemetry 等能力在文档中分层维护。
- **Agent 层**：`ToolLoopAgent` 把工具循环做成显式对象，适合 shell、图片生成、浏览器等有副作用工具。
- **UI Integration**：route handler、typed UI message、`createAgentUIStreamResponse` 和前端 hook 让工具调用状态进入组件，而不只是返回最终文本。
- **运行依赖**：README 要求 Node.js 22+，主生态是 TypeScript/前端应用。

## 为什么值得参考

它不是单纯的模型 SDK，而是把模型调用、工具循环、结构化输出和 UI 状态放在一条工程链路里。对企业 AI 服务来说，这种结构能减少“每个功能都重新拼 provider SDK、工具回填和前端流式协议”的重复劳动。

## 为什么不建议直接套用

它强绑定 TypeScript、Node 和前端框架生态。如果工作流主要跑在 Python、本地 CLI 或无前端后台任务中，直接引入会增加运行时复杂度。默认走 Vercel AI Gateway 时，模型访问、计费、组织权限和审计路径也要单独评估。

## 如何改造成自己的版本

借它的三层边界：第一层定义内部统一模型接口，只暴露 text/object/stream/tool_loop；第二层把供应商 provider 做成可替换适配器；第三层把工具调用状态标准化成 UI 和日志都能读取的事件。内部 Skill 可以只借 `ToolLoopAgent` 思想：每个工具声明输入 schema、执行器、风险等级和可展示结果，模型只能通过工具表行动。

## 适用场景

- TypeScript/Next.js 应用需要同时接多个模型和工具。
- Agent 结果要实时展示在前端，并显示工具调用过程。
- 需要结构化输出、工具调用、模型切换共用一套接口。

## 不适用场景

- 纯 Python 数据管线或离线批处理。
- 对 Vercel 生态、Node.js 版本和前端流式协议没有维护能力。
- 高敏工具还没有审批、审计、回滚机制。

## 参考信息

- 原项目：[ai](https://github.com/vercel/ai)
- 作者：vercel
- 相关概念：[[工具调用]]、[[模型网关]]、[[结构化输出]]
- 相关卡片：保守留空
