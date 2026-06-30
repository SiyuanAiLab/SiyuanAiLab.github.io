---
title: "文件系统与本地执行参考：openmoon ai"
description: "一个本地优先的 macOS 系统 Agent，用 Tauri、MCP host、审批卡和审计日志执行多步桌面/文件/系统任务。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["文件系统", "本地执行", "文档处理", "CLI"]
prerequisites: []
related_cards: []
scenario: "基础设施层 / 文件系统与本地执行"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的文件系统与本地执行流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/niceappspl/openmoon-ai"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# openMOON AI

> 一个本地优先的 macOS 系统 Agent，用 Tauri、MCP host、审批卡和审计日志执行多步桌面/文件/系统任务。

## 这个能力解决什么问题

桌面 Agent 最大的问题是权限太宽：它既要能操作文件、应用、浏览器、媒体和系统设置，又不能让模型静默执行高风险动作。openMOON AI 解决的是在 macOS 上做一个本地浮窗 Agent：模型可以多步调用 MCP tools，但每个工具按风险进入 auto/ask/deny 策略，写文件、通信和系统控制默认需要用户审批，并写入 SQLite 审计日志。

## 核心逻辑

输入是用户在浮窗里的自然语言目标、当前会话上下文和可用 MCP server 列表。处理层由前端把任务送到 Tauri/Rust 后端；LLM 选择工具，`McpManager` 根据缓存把 tool 路由到 stdio 或 HTTP/SSE MCP server；安全层根据工具风险决定自动执行、弹 approval card 或拒绝；工具结果流回 UI，模型继续下一步直到完成或达到 step limit。输出是任务结果、每步状态流、可保存 workflow、触发器执行记录和 SQLite 审计日志。

## 技术结构

- **Tauri 2 + React/TypeScript UI**：浮窗、ApprovalCard、Settings、WorkflowRunner、SaveWorkflowButton 等组件负责交互。
- **Rust 后端**：`main.rs` 管系统入口，`llm.rs`/`ollama.rs` 管模型，`mcp_multi.rs` 是 MCP host 和 tool→server cache，`security.rs`/`permissions.rs` 管风险策略，`triggers.rs` 管 cron/file watch。
- **Bundled MCP servers**：filesystem、automation、productivity、browser、media 等 5 类服务器，README 称约 77 个工具。
- **本地/云模型**：可用 Ollama 离线，也可配置 OpenAI API key。
- **审计与自动化**：SQLite 记录审批决策；成功任务可保存成 workflow，cron 或文件变化可触发，但 ask 工具会自动拒绝避免无人值守卡住。

## 为什么值得参考

它把桌面 Agent 的三个关键问题放在同一架构里：本地执行、MCP 工具路由、逐动作审批。尤其是 `auto/ask/deny` 风险策略和“无人值守触发时 ask 工具自动拒绝”，非常适合作为企业桌面自动化的安全样板。

## 为什么不建议直接套用

项目星标很低且主要面向 macOS，依赖 Tauri、Rust、Node、Bun、Ollama/OpenAI、Apple 系统 API，运行栈较重。它的工具面很宽，文件、邮件、日历、系统、电源、屏幕录制都可能触及敏感权限；即使有审批，也需要逐项审计默认策略。作为基础设施卡可以参考架构，不宜直接给客户环境部署。

## 如何改造成自己的版本

内部版本建议先做“窄桌面 Agent”：只启用 filesystem 只读、browser open/search、notes 草稿写入三类工具；审批策略写在配置中并展示风险解释；所有工具调用写入审计表。MCP host 可以保留 openMOON 的 tool→server 路由思想，但不要一开始接 77 个工具。触发器先只支持手动运行，等审计稳定后再加 cron/file watch。

## 适用场景

- macOS 本地工作流、文件整理、应用辅助和个人自动化。
- 需要 MCP host 汇聚多个本地 server。
- 高风险工具必须有审批和审计。

## 不适用场景

- Windows/Linux 或无桌面 UI 的服务器场景。
- 客户环境不允许本地 Agent 控制系统应用。
- 未完成工具风险分级和审计审查。

## 公开版边界

- 项目较新，成熟度待验证。

## 参考信息

- 原项目：[openmoon-ai](https://github.com/niceappspl/openmoon-ai)
- 作者：niceappspl
- 相关概念：[[本地 Agent]]、[[MCP Host]]、[[审批机制]]
- 相关卡片：保守留空
