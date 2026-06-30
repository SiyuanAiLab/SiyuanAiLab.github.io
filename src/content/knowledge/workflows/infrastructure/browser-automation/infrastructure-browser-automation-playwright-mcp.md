---
title: "浏览器自动化参考：playwright mcp"
description: "一个把 Playwright MCP 部署到 Cloudflare Workers 和 Browser Rendering 上的远程浏览器自动化 server。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["浏览器自动化", "Playwright", "网页QA", "Agent工具"]
prerequisites: []
related_cards: ["ai-core-27-tool-use-function-calling", "ai-core-32-agentic-workflow"]
scenario: "基础设施层 / 浏览器自动化"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的浏览器自动化流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/cloudflare/playwright-mcp"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Cloudflare Playwright MCP

> 一个把 Playwright MCP 部署到 Cloudflare Workers 和 Browser Rendering 上的远程浏览器自动化 server。

## 这个能力解决什么问题

本地 Playwright MCP 适合个人开发，但团队或云端 Agent 需要一个远程可连接的浏览器执行层。Cloudflare 的 fork 解决的是把 Playwright MCP 工具通过 Cloudflare Workers、Browser Rendering 和 SSE 暴露出来，让 AI Playground、VS Code、Claude Desktop（经 mcp-remote）等客户端连接远程 browser automation。

## 核心逻辑

输入是 MCP 客户端发到 Workers endpoint 的工具调用，例如导航、snapshot、点击、输入、截图、PDF、网络请求。处理层由 Cloudflare Worker 中的 MCP agent 接收 SSE/HTTP 连接，再调用 Cloudflare Browser Rendering 提供的浏览器能力；默认 snapshot mode 使用 accessibility snapshot，vision mode 使用截图坐标。输出是页面 snapshot、动作执行结果、截图文件、PDF、console/network 信息等。

## 技术结构

- **Cloudflare 部署层**：`cloudflare/example` 包含 Worker 示例、`wrangler.toml` 和入口代码，README 支持一键部署。
- **Browser Rendering 集成**：通过 Cloudflare 的浏览器渲染能力运行 Playwright，而不是依赖用户本机浏览器。
- **MCP 远程连接**：Cloudflare AI Playground 可直接填 Workers SSE URL；Claude Desktop 需要 `mcp-remote` 把远程 server 代理成本地。
- **工具模式**：Snapshot Mode 默认，用 accessibility snapshot 做结构化交互；Vision Mode 用截图和坐标。
- **工具目录**：`src/tools` 下有 navigate、snapshot、screenshot、pdf、network、console、files、tabs、vision、testing 等工具模块。

## 为什么值得参考

它说明浏览器自动化可以从“每台机器装 Playwright”升级为“远程 MCP 浏览器服务”。对团队来说，远程化带来一致环境、可集中部署、可接云端模型和 Playground 的好处；同时保留 Playwright MCP 的 snapshot/工具语义，避免完全退回截图点击。

## 为什么不建议直接套用

Cloudflare Browser Rendering、Workers、SSE、mcp-remote 都是额外依赖，调试链路比本地 MCP 长。远程浏览器不天然拥有用户本地登录态；如果要访问内网或客户系统，还要处理网络、认证和数据边界。README 也提示简单单动作指令效果更好，复杂多步任务仍需要更强的状态管理和任务拆分。

## 如何改造成自己的版本

可以把它当作“远程浏览器执行池”的参考：内部先限定公开测试站点和 staging 域名，暴露最小工具集（navigate、snapshot、click、type、screenshot），并为每个 session 记录请求人、目标域、截图和日志。若只给 Claude Desktop 用，可以先用本地 Playwright MCP；只有当团队需要共享远程浏览器时，再引入 Workers/Browser Rendering。

## 适用场景

- 云端 Agent 或多人团队需要共享浏览器自动化环境。
- 目标是公开网站、staging 页面或可控测试环境。
- 需要截图、snapshot、网络/console 结果作为 QA 证据。

## 不适用场景

- 必须复用个人本地登录态或内网浏览器状态。
- 多步复杂任务没有 session 管理和审计。
- 团队不熟悉 Cloudflare Workers 与 Browser Rendering。

## 参考信息

- 原项目：[playwright-mcp](https://github.com/cloudflare/playwright-mcp)
- 作者：cloudflare
- 相关概念：[[远程 MCP]]、[[浏览器自动化]]、[[Cloudflare Workers]]
- 相关卡片：保守留空
