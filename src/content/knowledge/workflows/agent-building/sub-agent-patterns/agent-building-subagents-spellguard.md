---
title: "Sub-agent 模式参考：spellguard"
description: "一个面向 Agent-to-Agent 通信的安全与审计框架，用 Verifier、加密消息、策略执行和审计日志约束 Agent 间交互。"
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
source: "https://github.com/Spellguard/spellguard"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# spellguard

> 一个面向 Agent-to-Agent 通信的安全与审计框架，用 Verifier、加密消息、策略执行和审计日志约束 Agent 间交互。

## 这个能力解决什么问题

Spellguard 解决的是 Agent 之间互相通信时缺少可审计、安全和策略控制的问题。多 Agent 系统一旦可以互发消息、转交任务或调用 MCP，就会出现 MITM、被攻陷 Agent、敏感信息泄漏和事后无法追责的问题。Spellguard 把通信通过 Verifier 中转，记录交互，做策略判断，并支持加密存档与透明日志。

## 核心逻辑

输入是 Agent 发出的消息、目标 Agent、policy bindings 和通信配置。Client middleware 负责 discovery、attestation、A2A routing；消息经过 cTLS/AMP 等协议加密与承诺记录后进入 Verifier。Verifier 根据 bindings 调用本地或外部 policy engine，例如 prompt-injection flag、regex/keyword block、toxicity BERT sidecar；决策可以 flag、block、redact 等。输出是路由后的 Agent 消息、审计事件、透明日志承诺、S3/加密存档或 policy 决策。

## 技术结构

- 关键模块：`@spellguard/client` 提供客户端中间件；`@spellguard/verifier` 是代理和策略执行核心；`ctls` 做双向证明与临时密钥；`amp` 做加密消息和承诺日志；LangChain/OpenAI/CrewAI/MCP guard 提供集成；policy-sdk/catalog 支持外部策略。
- 调用链路：Agent SDK 被 Spellguard 包裹 → outbound/inbound 消息进入 Verifier → policy evaluator 读取 bindings → 外部 policy server 可参与判断 → 审计事件写 ring/log/archive → 消息允许、阻断或改写。
- 输入输出：输入是 Agent 消息、policy config、agent identity、OpenRouter/API 配置；输出是加密存档、audit events、policy verdict、Agent 响应。
- 核心依赖：TypeScript monorepo、Python 3.13 包、pnpm、Verifier 服务；demo Agent 需要 OpenRouter key。

## 为什么值得参考

Spellguard 的参考价值在于它把 Agent 间通信当成安全协议，而不是“两个 Agent 互相发 prompt”。Verifier 是一个很好的中间层模式：所有消息都经过同一处做策略、审计、加密和追责。对企业 Agent 来说，A2A 安全很可能比单 Agent 智能更重要。

## 为什么不建议直接套用

它是安全基础设施，不是普通多 Agent 编排器。直接跑 demo 需要 Verifier、多个 agent `.env`、OpenRouter key、TS/Python 工作区和可能的外部 policy sidecar。默认示例 policy 只是演示，不能替代企业规则。加密、审计和策略一旦接入生产，还会涉及密钥管理、日志留存、事故响应和合规。

## 如何改造成自己的版本

1. 先实现一个轻量 Verifier：所有子 Agent 消息必须经过中间层记录。
2. 审计事件至少包含 sender、receiver、message hash、policy verdict、reason、timestamp。
3. 从三类 policy 开始：敏感信息、越权工具、外部发送。
4. 对低风险内部消息只 log，对高风险消息 block/redact/require approval。
5. 等协议稳定后，再考虑加密存档、透明日志和 A2A/MCP 标准集成。

## 适用场景

- 企业多 Agent、跨服务 Agent、A2A/MCP 通信需要审计和策略控制。
- 需要调查 post-mortem：谁给谁发了什么、为什么被允许。
- 想学习 Agent 安全中间层和 policy-as-service。

## 不适用场景

- 单机个人 Agent 或没有 Agent-to-Agent 通信的流程。
- 没有密钥/日志/合规治理能力的小项目。
- 只想做角色协作，不关心安全审计的 demo。

## Agent Building 判断

- 多步工作流：Agent outbound → client middleware → Verifier → policy evaluation → audit/archive → route/block/redact。
- 工作标准：message routing、policyType/effect/config、audit events、attestation 和 encrypted archive 都有明确角色。
- Loop 标准：每次通信都进入策略循环，policy 可 flag/block/redact，并写入可复核记录。
- Harness 标准：unit/integration tests、policy examples、audit endpoint 和 demo agents 构成验证面。
- 工具调用链路或 Agent 间通信：核心就是 A2A 通信中间层，并扩展到 LangChain/OpenAI/CrewAI/MCP。
- 为什么不是 persona / profile / system prompt only：它处理真实消息路由、安全协议、策略和审计，不是角色模板。

## 参考信息

- 原项目：[spellguard](https://github.com/Spellguard/spellguard)
- 作者：Spellguard
- 相关概念：[[Sub-agent模式]]、[[Agent安全]]
- 相关卡片：[workflow-read-093](workflow-read-093.md)
