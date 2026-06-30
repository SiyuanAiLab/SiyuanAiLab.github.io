---
title: "Sub-agent 模式参考：sagents"
description: "一个 Elixir/Phoenix 取向的交互式 Agent 编排库，用 GenServer、middleware、HITL、SubAgent、PubSub 和可组合执行模式管理长会话 Agent。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["Sub-agent", "任务委派", "专家Agent", "Agent通信"]
prerequisites: []
related_cards: ["ai-core-30-delegation", "ai-core-25-multi-agent-system"]
scenario: "Agent Building / Sub-agent 模式"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的Sub-agent 模式流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/sagents-ai/sagents"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# sagents

> 一个 Elixir/Phoenix 取向的交互式 Agent 编排库，用 GenServer、middleware、HITL、SubAgent、PubSub 和可组合执行模式管理长会话 Agent。

## 这个能力解决什么问题

Sagents 解决的是交互式 AI 应用里 Agent 生命周期、并发会话、人工批准和实时 UI 更新的问题。许多 Agent 库适合 CLI 或 batch job，但放进 Phoenix LiveView 这类实时应用后，需要进程监督、状态持久化、用户在线状态、工具审批、子 Agent 和事件流。Sagents 把每个 Agent 作为受监督的 GenServer 运行，围绕 Elixir OTP 生态构建 Agent runtime。

## 核心逻辑

输入是 Agent 配置、初始 State、LLM model、middleware stack 和用户消息。AgentServer 启动一个受监督进程，执行模式 pipeline 先调用 LLM，再检查 max runs/pause/HITL，执行工具，传播工具状态，检查 interrupt 或 `until_tool`，决定继续循环或结束。SubAgent middleware 可以把复杂任务交给 child agent；如果子 Agent 触发受保护工具，interrupt 会冒泡给 parent 等待人工审批。输出是实时 PubSub 事件、状态变化、工具结果、结构化 completion 或持久化会话。

## 技术结构

- 关键模块：Agent/AgentServer/State 是核心；Middleware 提供 TodoList、FileSystem、HumanInTheLoop、SubAgent、Summarization、DebugLog、ProcessContext；GenServer/OTP 负责生命周期；Phoenix.PubSub/Presence 负责实时事件与空闲关闭；Horde 可选支持集群迁移。
- 调用链路：创建 Agent + middleware → Start AgentServer → 订阅事件 → execute → pipeline call_llm/execute_tools/HITL/propagate_state → PubSub 推 UI → interrupt/resume 或完成。
- 输入输出：输入是消息、middleware、工具权限、模型配置、持久化回调；输出是状态事件、LLM deltas、tool execution events、approval interrupts、ToolResult。
- 核心依赖：Elixir、LangChain for Elixir、Phoenix PubSub/LiveView 可选，Horde 可选分布式支持。

## 为什么值得参考

Sagents 的亮点是把 Agent 当作“长期在线进程”而不是一次函数调用。它的 SubAgent、HITL 和 `until_tool` 都嵌在同一个执行循环里，这比外层 prompt 要稳。对于做产品化 AI 助手的人，它展示了 Agent 与实时 UI、进程监督和权限审批如何结合。

## 为什么不建议直接套用

它非常依赖 Elixir/Phoenix/OTP 思维。非 Elixir 团队直接套用成本高。它适合交互式应用和长期会话，如果只是离线生成卡片或跑批任务，GenServer、Presence、PubSub 会显得过重。另外，FileSystem middleware、HITL 权限和持久化回调需要业务方认真配置，否则工具仍可能越界。

## 如何改造成自己的版本

1. 借鉴“每个 Agent 是可管理生命周期单元”，在你的栈里映射成 worker/session/thread。
2. 把 middleware 拆成 Todo、Filesystem、HITL、SubAgent、Summarization 五类，不要把能力塞进一个大 prompt。
3. 所有敏感工具先走 interrupt/resume，而不是只在 prompt 里说“先问用户”。
4. 对结构化输出使用 `until_tool` 思路：必须调用交付工具才算完成。
5. 给 UI 或日志订阅统一事件流，至少记录 status、tool call、interrupt、completion。

## 适用场景

- Phoenix/Elixir 实时 AI 应用、客服/助手、多人并发会话。
- 需要 SubAgent、HITL、虚拟文件系统和状态持久化的交互式产品。
- 想学习 OTP 监督树如何承载 Agent runtime。

## 不适用场景

- 非 Elixir 团队的小型脚本或离线流水线。
- 不需要实时 UI、会话生命周期和进程监督的任务。
- 工具权限无法清晰配置的高风险场景。

## Agent Building 判断

- 多步工作流：AgentServer execute → LLM → HITL/tool checks → tool execution → state propagation → continue/done。
- 工作标准：middleware、State、ToolResult、until_tool、interrupt decision 构成明确运行契约。
- Loop 标准：pipeline 的 continue/done/interruption tuple 明确控制循环和停止条件。
- Harness 标准：DebugLog、PubSub events、LiveView helpers、state persistence 和 supervised process 支撑观测和恢复。
- 工具调用链路或 Agent 间通信：SubAgent middleware、PubSub、ProcessContext、ToolResult state delta 负责通信。
- 为什么不是 persona / profile / system prompt only：它是 OTP runtime + middleware + HITL + SubAgent 执行循环。

## 参考信息

- 原项目：[sagents](https://github.com/sagents-ai/sagents)
- 作者：sagents-ai
- 相关概念：[[Sub-agent模式]]、[[Agent生命周期]]
- 相关卡片：[workflow-read-089](workflow-read-089.md)
