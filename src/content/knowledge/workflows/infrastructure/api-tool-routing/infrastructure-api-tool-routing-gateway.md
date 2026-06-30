---
title: "API 网关与工具路由参考：gateway"
description: "一个 OpenAI 兼容的 LLM 网关，把模型路由、重试、fallback、负载均衡、guardrails、日志和 MCP 网关集中到一层。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "进阶"
tags: ["API网关", "工具路由", "function calling", "权限边界"]
prerequisites: []
related_cards: []
scenario: "基础设施层 / API 网关与工具路由"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的API 网关与工具路由流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/Portkey-AI/gateway"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Portkey AI Gateway

> 一个 OpenAI 兼容的 LLM 网关，把模型路由、重试、fallback、负载均衡、guardrails、日志和 MCP 网关集中到一层。

## 这个能力解决什么问题

当应用同时调用 OpenAI、Anthropic、Bedrock、Groq 等模型时，最难维护的是稳定性和治理：某个模型失败时切哪里、不同团队怎么分配 key、成本和延迟如何看、哪些输出要拦截。Portkey Gateway 解决的是把这些策略放到模型调用前面的网关层，应用继续用 OpenAI 兼容 API 发请求，网关负责路由和控制。

## 核心逻辑

输入是一条兼容 OpenAI 格式的模型请求，以及 Portkey config、provider key、可选 guardrail 和路由策略。Gateway 接收请求后，根据 config 选择 provider/model/key，执行超时、重试、fallback、负载均衡或条件路由；返回前可以经过 guardrail 检查，并把请求、响应、延迟、错误写入本地 console 或托管观测系统。输出仍是模型响应，但附带了更可靠的路由与治理过程。

## 技术结构

- **OpenAI-compatible Gateway**：本地可启动在 `/v1` 兼容接口，应用侧只需要把 base URL 指向网关。
- **Config 策略层**：README 的 routing 与 guardrails 示例说明配置可以挂重试、fallback、输出拦截、负载均衡和条件路由。
- **部署形态**：支持 Node.js、Docker、Cloudflare Workers、EC2 等方式，适合放在应用和模型供应商之间。
- **MCP Gateway**：集中管理 MCP servers，提供认证、访问控制、观测和 identity forwarding。
- **企业边界**：开源版覆盖基础路由，企业版强调 org management、governance、安全和私有部署。

## 为什么值得参考

Portkey 的参考价值在于把“模型可用性”和“工具访问治理”都前置成网关问题。网关模式让模型切换、fallback、成本追踪、团队权限和 guardrail 成为统一策略，对企业 AI 服务更接近真实运维方式。

## 为什么不建议直接套用

它是基础设施组件，不是轻量库。引入后，请求路径多了一跳，网关自身的部署、监控、升级和权限配置都要有人维护。README 中强调的企业治理能力有一部分可能在托管/企业版本里，开源版与商业版边界需要逐项确认。

## 如何改造成自己的版本

内部改造可以只取三件事：统一模型请求入口，所有调用带 `project/user/task_type` 元数据；把路由规则写成独立配置，例如低风险摘要走便宜模型、失败后 fallback；把 guardrail 结果和 provider 错误都记录到同一张调用日志。调用量和团队数上来后，再考虑接 Portkey 或自建完整网关。

## 适用场景

- 多 provider、多模型、多团队共享模型调用入口。
- 需要 fallback、重试、负载均衡、成本和延迟观测。
- MCP server 或模型工具需要统一认证和访问控制。

## 不适用场景

- 单模型、低调用量的早期原型。
- 团队没有能力维护网关可用性。
- 需要完全离线运行且不引入额外网络层。

## 参考信息

- 原项目：[gateway](https://github.com/Portkey-AI/gateway)
- 作者：Portkey-AI
- 相关概念：[[模型网关]]、[[Guardrails]]、[[MCP 网关]]
- 相关卡片：保守留空
