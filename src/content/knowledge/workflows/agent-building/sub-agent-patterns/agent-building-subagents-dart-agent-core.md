---
title: "Sub-agent 模式参考：dart agent core"
description: "一个移动优先、本地优先的 Dart Agent 库，把工具调用、状态、Skill、Sub-agent、计划、压缩和 eval harness 带进 Flutter/Dart 应用。"
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
source: "https://github.com/memex-lab/dart_agent_core"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# dart agent core

> 一个移动优先、本地优先的 Dart Agent 库，把工具调用、状态、Skill、Sub-agent、计划、压缩和 eval harness 带进 Flutter/Dart 应用。

## 这个能力解决什么问题

dart_agent_core 解决的是 Flutter/Dart 应用想做 stateful tool-using Agent 时，不想再依赖 Python/Node 后端的问题。移动端和本地优先场景需要跨 Android/iOS/Web/桌面的一致 API，需要持久会话、工具调用、流式 UI、技能系统、上下文压缩、Sub-agent delegation 和 evals。这些都放在 Dart 层，能直接嵌进客户端或本地应用。

## 核心逻辑

输入是 UserMessage、多模态内容、StatefulAgent 配置、LLMClient、Tool、Skill 和 AgentState。Agent run 时，模型返回工具调用 JSON，库把参数映射到 Dart 函数，执行工具，把结果回填，循环直到模型完成或工具返回 stopFlag。可选 PlanMode 注入 todo 工具，Skill 可动态激活，Sub-agent 可用命名 worker 或 clone 隔离上下文，Controller 发送 run/model/tool/plan/retry/error 事件。输出是 ModelMessage、StreamingEvent、AgentState、工具结果、eval transcript/outcome。

## 技术结构

- 关键模块：LLMClient 统一 OpenAI/Gemini/Claude/Bedrock/OpenAI-compatible；StatefulAgent 管 run loop；Tool 封装 Dart 函数和 JSON Schema；AgentState 保存历史、token、plan、metadata；Skill 支持 Pure Dart 和文件系统 SKILL.md；Sub-agent delegation 隔离上下文；EvalRunner/AgentHarness/Grader/Transcript/Outcome 负责评估。
- 调用链路：用户消息 → StatefulAgent → LLMClient → tool call → Dart function → AgentToolResult 回填 → loop/stop → state storage/controller events → 可选 eval harness 记录 outcome。
- 输入输出：输入是消息、工具、技能、状态、任务 suite；输出是流式事件、模型消息、状态文件、eval report、pass@k/pass^k 指标。
- 核心依赖：Dart/Flutter，支持六个平台；Web 端需用 localStorage/in-memory storage，原生端可用 FileStateStorage。

## 为什么值得参考

它的亮点是把 Agent runtime 放进客户端语言，而不是默认“Agent 必须跑在 Python 服务端”。对于移动端 AI 产品，工具、状态、流式 UI、Skill 和 eval 都在 Dart 里，能减少后端胶水。它的 eval guide 也很成熟，强调 grading 要看 Outcome 里的世界状态，而不是看模型说自己完成了什么。

## 为什么不建议直接套用

它适合 Dart/Flutter 生态，非移动端团队直接套用意义有限。客户端保存 API key、执行工具、持久化状态都需要额外安全设计。文件系统 Skill 和 JavaScript runtime 跨平台差异大，Web 端没有真实 `dart:io`。此外，Agent eval harness 需要你自己写环境、任务和 grader，不是装上就有质量保证。

## 如何改造成自己的版本

1. 如果不是 Dart 栈，借鉴模块边界：AgentState、Tool、Skill、SubAgent、Controller、EvalHarness。
2. 移动端先只开放低风险本地工具，例如读写 app sandbox 内文件、查询本地知识卡。
3. 使用 Controller 事件驱动 UI，不让 UI 从模型文本里猜状态。
4. Eval 时按 guide 把 Outcome 设计成事实表：文件是否创建、字段是否更新、动作是否发生。
5. 对 Sub-agent 设隔离上下文，不共享完整用户会话。

## 适用场景

- Flutter/Dart 本地或移动 Agent 应用。
- 需要离线/本地优先状态、流式 UI 和客户端工具调用。
- 想把 eval harness 直接集成到 Dart Agent 代码。

## 不适用场景

- 非 Dart 技术栈，或 Agent 必须集中在后端运行。
- 需要复杂服务器权限、团队审计和集中密钥管理的企业系统。
- 客户端不能安全存储或使用 LLM API key 的产品。

## Agent Building 判断

- 多步工作流：UserMessage → StatefulAgent → model/tool loop → state persistence → Skill/Sub-agent/Plan → output/eval。
- 工作标准：Tool schema、AgentState、Skill、AgentToolResult、EvalTask/Grader/Outcome 都有明确契约。
- Loop 标准：工具调用回填直到完成，stopFlag、PlanMode、LoopDetector 和 context compression 控制循环。
- Harness 标准：内置 eval subsystem，包含 EvalSuite、Trial、Transcript、Outcome、record/replay、reports。
- 工具调用链路或 Agent 间通信：Tool dispatch、Sub-agent delegation、Controller events 和 Skill bridge 构成链路。
- 为什么不是 persona / profile / system prompt only：它是完整 Dart runtime 和 eval framework，不是提示词集合。

## 参考信息

- 原项目：[dart_agent_core](https://github.com/memex-lab/dart_agent_core)
- 作者：memex-lab
- 相关概念：[[Sub-agent模式]]、[[Agent Harness]]
- 相关卡片：[workflow-read-092](workflow-read-092.md)
