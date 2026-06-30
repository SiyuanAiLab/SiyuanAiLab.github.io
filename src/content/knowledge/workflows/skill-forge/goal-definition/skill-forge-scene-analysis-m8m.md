---
title: "目标明确参考：m8m"
description: "一个用 Next.js、tRPC、Prisma 和 Kafka 做的 AI 工作流自动化平台，适合参考「流程目标如何被建模成节点、边和执行记录」。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["目标明确", "可行性判断", "Skill生产线"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 目标明确"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的目标明确流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/rohitdevsol/m8m"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# m8m

> 一个用 Next.js、tRPC、Prisma 和 Kafka 做的 AI 工作流自动化平台，适合参考「流程目标如何被建模成节点、边和执行记录」。

## 这个能力解决什么问题

m8m 解决的是把 AI 自动化从聊天框移到可运行的流程图。它要求先说明工作流由哪些节点组成、节点之间如何传状态、凭证如何引用、执行如何触发、日志和错误如何保存。对「目标明确」阶段有价值：它把一个模糊任务拆成 DAG、Execution 和 Event Bus 三个层次，目标是否明确可以直接看节点输入输出是否足够执行。

## 核心逻辑

真实输入是用户在 web canvas 上创建的 workflow、节点配置、边关系、webhook/schedule/manual trigger、凭证 ID，以及 AI provider 或外部服务的参数。处理逻辑是：前端 Builder 通过 tRPC 写入 PostgreSQL；执行请求发布到 Kafka；producer/worker 消费 job，按 DAG 执行节点；每个节点把输出作为 payload 传给下一节点，并把状态、日志、错误写回数据库。输出是一次 Execution，包括每个 node 的状态、输入、输出、错误和最终外部动作结果。

## 技术结构

- 关键模块：`apps/web` 包含 Next.js 界面、React Flow 节点、credentials/executions/workflows 页面和 tRPC API；`apps/producer` 是执行消费端；Prisma 管理数据库模型；Docker Compose 启动 PostgreSQL、Kafka/Zookeeper。
- 调用链路：Visual Builder -> tRPC server -> Prisma/PostgreSQL 保存 workflow -> trigger 创建 execution -> Kafka 发布 job -> producer 执行节点 -> 更新 execution log 和状态。
- 输入输出：输入是 DAG、节点参数、credentials vault 引用、trigger payload；输出是执行日志、节点产物、错误状态、外部消息或 API 调用副作用。
- 核心依赖：Next.js 14、React、Jotai、TailwindCSS、tRPC、Prisma、BetterAuth、PostgreSQL、Kafka、Docker、OpenAI/Gemini/Anthropic/Slack/Discord/Webhook 等集成。

## 为什么值得参考

它把目标明确拆成了可运行的数据结构：Nodes、Edges、Workflows、Executions、Event Bus、Credentials Vault。写 Skill 时可以借这个模型检查边界：如果不能说清输入从哪里来、哪个步骤消费、输出写到哪里、错误怎么记录，这个 Skill 还没有准备好实现。

## 为什么不建议直接套用

m8m 是平台雏形，需要前端、队列、数据库、鉴权、凭证加密和 worker 运维。对于个人工作流，Kafka 和 full-stack app 可能过重；README 也要求配置环境变量、数据库迁移和 Docker 基础设施。它的节点执行会真实调用外部服务，必须额外设计权限和 dry-run。

## 如何改造成自己的版本

借它的 DAG 概念，但先用 Markdown/YAML 表示：`nodes` 写任务、`edges` 写依赖、`credentials` 只写需要哪类权限、不写密钥，`execution_log` 记录人工或 Agent 每次运行结果。等某条流程重复稳定后，再把高频节点封成脚本或 MCP；低频节点保留人工执行。

## 适用场景

- 需要把 AI 工作流拆成节点、边、触发器和执行日志。
- 需要可靠异步执行，而不是同步聊天式处理。
- 需要让凭证和 workflow payload 分离。

## 不适用场景

- 单次内容生成或轻量资料整理。
- 没有数据库、队列和后台 worker 运维能力。
- 外部动作风险高，但还没有审批、回滚和审计设计。

## 参考信息

- 原项目：[m8m](https://github.com/rohitdevsol/m8m)
- 作者：rohitdevsol
- 相关概念：[[任务边界]]、[[DAG 工作流]]、[[执行记录]]
- 相关卡片：[workflow-read-024](skill-forge-scene-analysis-activepieces.md)
