---
title: "多 Agent 框架参考：agent framework"
description: "Microsoft 面向生产环境的 Python/.NET Agent 框架，强调图式工作流、持久化、OpenTelemetry、Foundry 托管和跨语言一致接口。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["多Agent", "Agent框架", "协作", "工具调用"]
prerequisites: []
related_cards: []
scenario: "Agent Building / 多 Agent 框架"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的多 Agent 框架流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/microsoft/agent-framework"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# agent framework

> Microsoft 面向生产环境的 Python/.NET Agent 框架，强调图式工作流、持久化、OpenTelemetry、Foundry 托管和跨语言一致接口。

## 这个能力解决什么问题

Microsoft Agent Framework 解决的是从原型 Agent 走向生产系统时的工程缺口：单 prompt 或无状态 chat loop 没法处理并发分支、handoff、恢复、监控、人工介入和云端托管。它把 Agent、workflow、provider、middleware、observability、declarative YAML 和 hosting pattern 放在同一套框架中，目标是让 Python 与 .NET 团队都能用一致方式构建多 Agent 工作流。

## 核心逻辑

输入是用户任务、Agent 定义、provider 配置和 workflow 图；框架把任务放入图式编排中执行，可使用 sequential、concurrent、handoff、group collaboration 等模式。运行中通过 middleware 处理请求/响应、异常和自定义逻辑，通过 checkpointing、streaming、human-in-the-loop、time-travel 支撑长流程恢复和调试；输出是 Agent 响应、工作流结果、trace、托管运行状态或部署后的服务。

## 技术结构

- 关键模块：Python packages 与 .NET source 提供双语言实现；agent provider samples 覆盖不同 LLM 后端；workflow samples 展示顺序、并发、handoff、group collaboration；middleware 处理运行管线；OpenTelemetry 接入分布式追踪；declarative agents 支持 YAML 定义。
- 调用链路：业务代码创建 Agent/Workflow，绑定 provider 与工具，中间件包裹执行流程，workflow runtime 调度节点和多 Agent 交互，OpenTelemetry 导出运行过程，Foundry 或本地 hosting 承载服务。
- 输入输出：输入是任务文本、YAML/代码 Agent 定义、模型部署、workflow 状态和用户审批；输出是 Agent run 结果、流式事件、检查点、trace、托管 Agent 服务。
- 核心依赖：Python 生态包 `agent-framework`，.NET 包 `Microsoft.Agents.AI`，Azure Identity/Foundry 相关包；也支持 OpenAI、Azure OpenAI、GitHub Copilot SDK 等生态。

## 为什么值得参考

它值得参考的是“生产化清单”非常完整：不是只讲怎么叫模型，而是把持久执行、可恢复、可观测、治理、人审、托管和 provider 迁移都放进框架边界。对工作流专栏来说，它可以作为判断 Agent 框架成熟度的标尺：一个框架是否只会 demo，还是已经考虑到运维和合规。

## 为什么不建议直接套用

MAF 强烈连接 Microsoft Foundry、Azure 身份体系和 .NET/Python 双生态，对个人或小团队来说成本偏重。README 也明确提醒第三方系统、非 Azure 模型、数据流向、责任 AI mitigation 都需要使用者自己审查。若只是做内容流或小型内部 Skill，直接引入 MAF 可能比自建轻量 workflow 更复杂。

## 如何改造成自己的版本

1. 借鉴它的 production checklist：workflow、checkpoint、HITL、trace、hosting、provider 抽象，而不是直接复制框架。
2. 小团队可以先只实现 3 个能力：可恢复状态、可追踪事件、人工审批点。
3. 把 provider 抽象压到最小，只支持当前会用的 1 到 2 个模型，避免过早做跨云适配。
4. 对每个 workflow 定义 YAML 或 Markdown 版“运行契约”：输入、节点、失败回退、可观察字段。
5. 等内部任务稳定后，再评估是否接入 OpenTelemetry 或云端托管。

## 适用场景

- 企业级或准生产 Agent，需要持久化、治理、追踪、人工介入和部署。
- Python 与 .NET 团队并存，希望统一 Agent 工作流抽象。
- 已使用 Azure/Foundry 或需要从 Semantic Kernel/AutoGen 迁移。

## 不适用场景

- 只做单机 Markdown 自动化或简单工具调用。
- 没有 Azure/Foundry 使用计划，却想快速做轻量原型。
- 无法承担 trace、权限、第三方系统数据责任审查的流程。

## Agent Building 判断

- 多步工作流：图式 workflow 调度 sequential/concurrent/handoff/group collaboration，可加 checkpoint 和 time-travel。
- 工作标准：Agent、provider、middleware、workflow、declarative YAML、hosting 都有明确接口。
- Loop 标准：工作流运行支持恢复、流式执行、人工中断、错误处理和状态回放。
- Harness 标准：OpenTelemetry、DevUI、样例、end-to-end/evaluation demos 与托管模式构成运行 harness。
- 工具调用链路或 Agent 间通信：多 provider Agent、middleware、workflow 节点和 handoff/group collaboration 负责通信与调用。
- 为什么不是 persona / profile / system prompt only：它是跨语言运行框架和生产托管体系，persona 只是 Agent 定义的一小部分。

## 参考信息

- 原项目：[agent-framework](https://github.com/microsoft/agent-framework)
- 作者：microsoft
- 相关概念：[[多Agent协作]]、[[Agent编排]]
- 相关卡片：[workflow-read-077](workflow-read-077.md)
