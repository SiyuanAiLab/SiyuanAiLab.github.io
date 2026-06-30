---
title: "Harness 与评估参考：claude code hooks multi agent observability"
description: "一个 Claude Code hooks 可观测系统，把 12 类生命周期事件通过 Python hook 发到 Bun/SQLite/Vue 实时仪表盘。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["Harness", "trace", "observability", "Agent评估"]
prerequisites: []
related_cards: []
scenario: "Agent Building / Harness 与评估"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的Harness 与评估流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/disler/claude-code-hooks-multi-agent-observability"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# claude code hooks multi agent observability

> 一个 Claude Code hooks 可观测系统，把 12 类生命周期事件通过 Python hook 发到 Bun/SQLite/Vue 实时仪表盘。

## 这个能力解决什么问题

这个项目解决的是 Claude Code 多 Agent 并行工作时不可见的问题。Claude Code 可以启动专门 Agent、调用工具、请求权限、压缩上下文、结束会话，但如果没有 hook 事件流，操作者很难知道每个 Agent 在何时调用了什么、失败在哪里、子 Agent 何时启动/结束、会话为什么停止。项目用 hooks 捕获生命周期事件并实时展示。

## 核心逻辑

输入是 Claude Code 的 hook event。用户把 `.claude` 目录复制进目标项目，并在 settings 中为 PreToolUse、PostToolUse、UserPromptSubmit、Stop、SubagentStart/Stop、PreCompact、SessionStart/End、PermissionRequest、PostToolUseFailure 等事件绑定 Python hook。hook 脚本抽取字段、可做验证/阻断/摘要，再调用 `send_event.py` POST 到 Bun server；server 写 SQLite 并通过 WebSocket 推给 Vue client。输出是实时事件时间线、过滤器、chat transcript、活动图和本地数据库记录。

## 技术结构

- 关键模块：`.claude/hooks` 负责事件捕获、校验、摘要和发送；`apps/server` 是 Bun/TypeScript + SQLite + WebSocket；`apps/client` 是 Vue 事件仪表盘；`.claude/agents/team` 包含 builder/validator；settings.json 把 hook 和 statusLine 串进 Claude Code。
- 调用链路：Claude Code 触发生命周期事件 → 对应 hook 脚本运行 → send_event 转 HTTP → server 校验并入库 → WebSocket 广播 → Vue timeline/filter/chart 展示。
- 输入输出：输入是 hook payload、tool name、agent id、transcript path、permission request 等；输出是 SQLite events、WebSocket event、UI timeline、可选聊天记录。
- 核心依赖：Claude Code hooks、uv/Python hook scripts、Bun server、SQLite、Vue 3 client。

## 为什么值得参考

它的参考价值在于“从宿主事件接入”，不是改 Agent 代码。只要 Claude Code 提供 hooks，就能在外部建立可观测层。对多 Agent 工作流来说，SubagentStart/Stop、PreToolUse、PostToolUseFailure、PermissionRequest 这些事件比最终答案更能说明系统是否可靠。

## 为什么不建议直接套用

它绑定 Claude Code hooks 和本地 `.claude` 配置，复制到项目根会改变 Claude Code 行为。hook 可能记录工具输入、聊天记录和文件路径，隐私审查必须先做。示例中包含 TTS、Firecrawl、OpenAI/Anthropic 等可选功能，若全部启用会增加密钥和数据外发面。

## 如何改造成自己的版本

1. 先只接 5 类必要事件：SessionStart、UserPromptSubmit、PreToolUse、PostToolUse、Stop。
2. 默认不上传完整 chat transcript，只保存摘要、hash 和必要字段。
3. 对 PreToolUse 做真正的 policy check，例如阻断危险命令或越界路径。
4. 给 SubagentStart/Stop 建 parent-child id，形成树状执行视图。
5. SQLite 本地保留即可，等字段稳定后再接远端 observability。

## 适用场景

- Claude Code 多 Agent 开发、团队实验、教学演示和本地可观测。
- 需要实时看工具调用、权限请求、子 Agent 生命周期。
- 想学习 hooks 如何变成 Agent observability pipeline。

## 不适用场景

- 非 Claude Code 环境。
- 不能记录工具输入、文件路径或聊天内容的敏感项目。
- 需要跨框架标准化 trace，而不仅是 Claude Code hook 事件。

## Agent Building 判断

- 多步工作流：Claude event → hook extraction/validation → HTTP ingest → SQLite → WebSocket → UI review。
- 工作标准：12 类 hook 事件各自有字段提取、发送和展示逻辑。
- Loop 标准：PreToolUse 可阻断/校验，PostToolUseFailure/Stop/SessionEnd 支撑失败复盘和下一轮修正。
- Harness 标准：本地 server、DB、client、test event、health check、hook validators 构成可观测 harness。
- 工具调用链路或 Agent 间通信：直接捕获工具调用和 SubagentStart/Stop 生命周期。
- 为什么不是 persona / profile / system prompt only：它是事件采集与实时观测系统，不是 Agent 角色定义。

## 参考信息

- 原项目：[claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability)
- 作者：disler
- 相关概念：[[Agent Harness]]、[[可观测性]]
- 相关卡片：[workflow-read-092](workflow-read-092.md)
