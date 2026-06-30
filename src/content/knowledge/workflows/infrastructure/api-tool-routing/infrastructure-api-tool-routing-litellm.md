---
title: "API 网关与工具路由参考：litellm"
description: "一个把上百个模型供应商统一成 OpenAI 风格接口的 Python SDK 与代理网关。"
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
source: "https://github.com/BerriAI/litellm"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# LiteLLM

> 一个把上百个模型供应商统一成 OpenAI 风格接口的 Python SDK 与代理网关。

## 这个能力解决什么问题

模型供应商越多，应用代码越容易被 provider 差异撕裂：请求参数不同、错误类型不同、流式协议不同、embedding 和 image/audio 支持不一致，成本统计也各算各的。LiteLLM 解决的是在 Python SDK 和 Proxy Server 两种形态下，把这些供应商收敛到统一调用接口，并在网关层加上认证、预算、缓存、日志、路由和管理 UI。

## 核心逻辑

输入可以是 Python 代码里的一次 completion/embedding 调用，也可以是发到 LiteLLM Proxy 的 OpenAI 兼容 HTTP 请求。LiteLLM 根据模型名前缀或配置，把请求映射到对应 provider adapter；Router 可以在多个 deployment 之间做重试、fallback 和负载分配；Proxy Server 还能用 virtual keys 做多租户访问、项目预算、回调日志和 guardrail/caching。输出对调用方保持 OpenAI 风格响应和异常，使上层应用少感知 provider 细节。

## 技术结构

- **Python SDK**：直接嵌入应用代码，统一 completion、embedding、rerank、image/audio 等多 provider 调用。
- **LiteLLM Proxy / AI Gateway**：中心化服务，提供 OpenAI 兼容 endpoint、认证授权、多租户成本追踪、项目级配置、缓存、日志和 dashboard。
- **Router**：处理多 deployment 重试、fallback、负载均衡，适合 Azure/OpenAI 多区域或多 key 场景。
- **Provider Adapter 列表**：README 中大量 provider 表说明它的核心资产是供应商适配覆盖面。
- **生产部署**：文档提到 stable Docker tag、Terraform 模块、Postgres/Redis/object store 等组件化部署。

## 为什么值得参考

LiteLLM 给出的关键启发是“模型选择应该是配置问题，而不是业务逻辑问题”。它同时提供 SDK 和 Proxy 两种层级：早期可用 SDK 快速统一错误和返回格式，规模变大后再把调用集中到 Proxy，用 virtual key、预算和 dashboard 处理组织治理。

## 为什么不建议直接套用

它覆盖 provider 很广，也带来版本和参数兼容风险：某些 provider 的新特性、工具调用细节或多模态参数可能需要等 adapter 更新。Proxy 生产部署需要数据库、缓存、密钥管理和权限模型，不能当成普通 pip 包随手开。

## 如何改造成自己的版本

先不要追求支持所有 provider。内部可以设计一个 LiteLLM 风格的 `ModelRouter`：只支持 2-3 个实际会用的模型，统一错误码、超时、重试和成本字段；每次调用记录 provider、model、latency、tokens、task_type。后续需要更多供应商时，再用 LiteLLM Proxy 替换内部 router。

## 适用场景

- Python/服务端应用需要多模型统一调用。
- 需要 OpenAI 兼容代理、virtual keys、预算和成本追踪。
- 多区域、多 deployment 需要 fallback 和负载均衡。

## 不适用场景

- 只调用一个 provider 且无治理需求。
- 对 provider 原生新特性依赖很深，统一接口会遮蔽细节。
- 没有能力维护 Proxy 所需数据库、缓存和密钥管理。

## 参考信息

- 原项目：[litellm](https://github.com/BerriAI/litellm)
- 作者：BerriAI
- 相关概念：[[模型路由]]、[[OpenAI Compatible API]]、[[成本治理]]
- 相关卡片：保守留空
