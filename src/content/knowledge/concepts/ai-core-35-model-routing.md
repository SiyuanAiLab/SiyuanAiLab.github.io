---
title: "模型路由（Model Routing）"
description: "根据任务、成本、速度、质量或故障状态，动态选择最合适模型的机制。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["模型路由", "LLM网关", "成本控制"]
prerequisites: []
related_cards: ["LLM 网关", "评估方法"]
scenario: "摘要走便宜模型，复杂推理走强模型，故障时切备用模型。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述“模型路由”的作用，再判断你的场景是否真的需要它。"
source: "06-Knowledge 改写"
sourcePath: "legacy-ai-core-candidate-source-map"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: true
---

# 模型路由（Model Routing）

> 根据任务、成本、速度、质量或故障状态，动态选择最合适模型的机制。

---

## 一、是什么

- 根据任务、成本、速度、质量或故障状态，动态选择最合适模型的机制。
- 类比：像派单系统：简单单给便宜快的，疑难单给专家。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是普通负载均衡 | 按任务特征选择模型或供应商的策略 |

## 二、为什么重要

- 它能在质量、成本和稳定性之间做动态平衡。
- 不懂它会怎样：路由规则不清会造成质量波动和排查困难。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：模型路由就是给不同活派不同模型。
- 常见场景：摘要走便宜模型，复杂推理走强模型，故障时切备用模型。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 永远用最强模型最省事 | 最强模型常常更贵更慢，未必适合所有任务。 |

## 五、延伸阅读

- 本知识库相关：LLM 网关、评估方法
- 06-Knowledge: 模型路由.md: `workspace/06-Knowledge/02-AI与智能系统/01-理论与原理/模型路由.md`
- 06-Knowledge: llm-gateway.md: `workspace/06-Knowledge/02-AI与智能系统/01-理论与原理/llm-gateway.md`
