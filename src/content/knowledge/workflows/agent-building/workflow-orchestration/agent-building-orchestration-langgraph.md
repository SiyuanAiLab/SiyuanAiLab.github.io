---
title: "工作流编排参考：langgraph"
description: "LangChain 旗下低层状态图编排框架，用 durable execution、memory、interrupt 和 LangSmith trace 支撑长时、可恢复 Agent 工作流。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["工作流编排", "状态机", "handoff", "任务路由"]
prerequisites: []
related_cards: []
scenario: "Agent Building / 工作流编排"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的工作流编排流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/langchain-ai/langgraph"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# langgraph

> LangChain 旗下低层状态图编排框架，用 durable execution、memory、interrupt 和 LangSmith trace 支撑长时、可恢复 Agent 工作流。

## 这个能力解决什么问题

LangGraph 解决的是 Agent 工作流一旦变长就需要状态、分支、恢复和人工介入的问题。传统链式调用适合短流程，但遇到多轮工具使用、审批中断、失败重跑、长期记忆和多分支状态时，普通函数链会变成难维护的 spaghetti code。LangGraph 把 Agent 运行看成状态图：节点处理状态，边决定下一步，持久层让流程能从中断点继续。

## 核心逻辑

输入是一份图定义、初始 state、用户消息和可选持久化/记忆配置。运行时节点读取 state，调用模型、工具或子图，把结果写回 state；边根据条件把控制流送到下一节点。中途可以插入 human-in-the-loop interrupt，人工查看或修改 state 后继续。输出是最终 state、节点结果、持久化检查点、LangSmith trace 或部署后的长时 workflow。

## 技术结构

- 关键模块：state graph 是核心抽象；durable execution 负责失败后从上次状态恢复；interrupt 支撑人审；memory 分短期工作记忆和长期持久记忆；subgraph/branching 支撑复杂流程；LangSmith 提供路径可视化、trace、eval 和部署。
- 调用链路：应用构建图 → 初始输入进入节点 → 节点更新 state → 条件边选择后继 → 检查点保存状态 → interrupt/恢复/部署环境继续运行。
- 输入输出：输入是 state schema、节点函数、边条件、用户消息和配置；输出是更新后的 state、运行事件、检查点和 trace。
- 核心依赖：Python `langgraph`，可独立使用，也可与 LangChain、Deep Agents、LangSmith、LangGraph.js 配套。

## 为什么值得参考

LangGraph 的参考价值在“低层而不低质”：它不强迫你接受某种角色模型，而是提供状态图、检查点、人审和可观测性这些 Agent 工作流的骨架。对需要把复杂流程拆清楚的人来说，它比“多 Agent 框架”更适合作为内部工作流 DSL 的参照。

## 为什么不建议直接套用

LangGraph 是低层框架，很多业务约束要自己写：state schema、节点幂等、错误恢复、版本迁移、人工审批 UI、记忆策略都不是自动来的。若没有 LangSmith 或自建 observability，状态图也可能只是更复杂的调用链。对简单线性任务，LangGraph 的心智负担会超过收益。

## 如何改造成自己的版本

1. 先把内部流程画成 5 个以内节点的 state graph，不要一开始做大图。
2. 为 state 明确定义字段：原始输入、中间证据、当前决策、异常、最终输出。
3. 每个节点只做一种转换，并保证重复执行不会破坏结果。
4. 在高风险节点前加 interrupt：外部写入、发布、费用、客户承诺。
5. 用 trace 记录每次 state 变化，后续再考虑 LangSmith 或自建 dashboard。

## 适用场景

- 长时、多分支、有状态、有人工审批的 Agent workflow。
- 需要从失败点恢复，或需要保存/回放运行状态。
- 想把 Agent 流程做成图而不是线性链。

## 不适用场景

- 一次性短任务、简单 prompt chain、无状态问答。
- 没有能力维护 state schema 和可观测系统的团队。
- 希望框架自动提供完整业务角色和 UI 的场景。

## Agent Building 判断

- 多步工作流：state graph 节点/边驱动多步执行，支持 branching、subgraphs、interrupt。
- 工作标准：每个节点围绕 state schema 读写，边条件决定可解释的流转。
- Loop 标准：durable execution、checkpoint、resume 和 human-in-the-loop 构成可恢复循环。
- Harness 标准：LangSmith 可追踪路径、状态变化、eval 和部署；本地也可用检查点做回放。
- 工具调用链路或 Agent 间通信：节点内可调用模型/工具/子图，多 Agent 可作为图节点或 Deep Agents 上层封装。
- 为什么不是 persona / profile / system prompt only：核心是状态图运行时与持久执行机制，不依赖固定 persona。

## 参考信息

- 原项目：[langgraph](https://github.com/langchain-ai/langgraph)
- 作者：langchain-ai
- 相关概念：[[Agent编排]]、[[状态机工作流]]
- 相关卡片：[workflow-read-082](workflow-read-082.md)
