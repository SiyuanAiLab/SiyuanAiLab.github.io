---
title: "工作流编排参考：multiagent business automation"
description: "一个面向业务自动化的多 Agent 平台，用 LangGraph、共享记忆、HITL 审批和仪表盘串起战略、财务、市场、法务、销售等角色。"
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
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/agruai/multiagent-business-automation"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# multiagent business automation

> 一个面向业务自动化的多 Agent 平台，用 LangGraph、共享记忆、HITL 审批和仪表盘串起战略、财务、市场、法务、销售等角色。

## 这个能力解决什么问题

这个项目解决的是业务决策工作流里多个职能 Agent 如何协同的问题。企业任务往往不是单次回答，而是从愿景采集、计划、财务/市场/法务分析、人工审批、报告输出到 CRM/Slack/Instagram 等集成的一整条链。项目把这些职能做成角色化 Agent，并用 LangGraph 和共享记忆管理它们的顺序、并行和审批。

## 核心逻辑

输入是用户项目愿景、会话状态和可选外部集成配置。Cofounder agent 先捕捉愿景，Manager agent 生成路线图并分派任务，Finance/Marketing/Legal/Money/Sales 等领域 Agent 按编排并行或顺序执行；置信度和 HITL 节点决定是否暂停等待人工批准。结果写入 Neo4j/Qdrant/Redis 等共享层，在 React dashboard 中展示，并导出 JSON/PDF/HTML 报告。

## 技术结构

- 关键模块：React/Vite 前端提供聊天、状态、PRD、监控视图；FastAPI 后端提供 REST/WebSocket；LangGraph workflows 和 HITL orchestrator 负责编排；agents/personality 定义角色；memory 层包含 Neo4j、Qdrant、Redis/Upstash 和本地缓存；outputs 生成报告。
- 调用链路：前端发起项目/会话 → FastAPI 路由进入 workflow → Cofounder/Manager/领域 Agent 执行 → 共享记忆和队列记录上下文 → HITL 审批可能中断 → dashboard 实时更新 → 报告导出。
- 输入输出：输入是项目愿景、聊天、API key、CRM/Slack/Instagram 配置；输出是 agent logs、共享上下文、审批任务、图谱/向量记忆、报告和 dashboard 状态。
- 核心依赖：Python/FastAPI/Pydantic、LangGraph/LangChain/CrewAI、OpenRouter/OpenAI/Google、Neo4j、Qdrant、Redis、React/Vite。

## 为什么值得参考

它最值得看的是业务自动化的全栈形态：不仅有 Agent，还包含前端状态、审批、记忆、报告、集成和 demo mode。它说明 Agent Building 到业务场景时，角色本身不够，必须配套“谁看进度、谁批准、结果存哪里、如何导出、服务降级怎么办”。

## 为什么不建议直接套用

## 如何改造成自己的版本

1. 把业务角色缩到最小：战略/运营/财务/审核四类即可，不必复制所有 CXO/职能 Agent。
2. 先用本地 Markdown/SQLite 替代 Neo4j/Qdrant/Redis，等流程稳定再升级记忆层。
3. HITL 节点必须前置到外部沟通、CRM 写入、社媒内容和资金相关判断前。
5. dashboard 可先用日志和状态表实现，避免一开始搭复杂前端。

## 适用场景

- 企业内部业务决策辅助、项目启动、跨职能分析和报告生成。
- 需要展示 Agent 状态、审批和共享记忆的 demo 或原型。
- 想学习多 Agent 业务平台的全栈模块分工。

## 不适用场景

- 只需要离线生成一份报告，不需要实时 dashboard 或外部集成。
- 无法维护多个数据库/队列/认证服务的个人项目。
- 涉及自动营销发布、CRM 写入或客户触达但没有合规审批的流程。

## Agent Building 判断

- 多步工作流：愿景采集 → Manager 规划 → 领域 Agent 执行 → 置信度/HITL → 共享记忆 → dashboard/report。
- 工作标准：角色、personality、工具、confidence threshold、报告类型和审批状态都有明确边界。
- Loop 标准：LangGraph checkpoint、自我修正、HITL interrupt、队列和 fallback 支撑循环。
- Harness 标准：WebSocket logs、agent status、PRD compliance、integration tests、demo mode 和 dashboard 形成运行验证面。
- 工具调用链路或 Agent 间通信：共享记忆、task queue、LangGraph state 和 API routes 承接 Agent 间上下文。
- 为什么不是 persona / profile / system prompt only：它有后端、前端、记忆、审批、报告和外部集成，不只是角色设定。

## 公开版边界

- 外部系统集成需保留人工确认，本卡只保留方法论参考。

## 参考信息

- 原项目：[multiagent-business-automation](https://github.com/agruai/multiagent-business-automation)
- 作者：agruai
- 相关概念：[[Agent编排]]、[[业务自动化]]
- 相关卡片：[workflow-read-082](workflow-read-082.md)
