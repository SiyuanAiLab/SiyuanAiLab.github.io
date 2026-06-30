---
title: "工具调用（Tool Use / Function Calling）"
description: "模型通过标准接口调用搜索、计算、数据库、代码执行或业务 API 等外部工具。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["工具调用", "Function Calling", "Agent"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "06-Knowledge 改写 / OpenAI Function calling guide / Anthropic"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/27-工具调用-Tool-Use-Function-Calling.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 工具调用（Tool Use / Function Calling）

> 模型通过标准接口调用搜索、计算、数据库、代码执行或业务 API 等外部工具。

---

## 一、是什么

- 模型通过标准接口调用搜索、计算、数据库、代码执行或业务 API 等外部工具。
- 类比：像助理不会只凭记忆回答，而是会去查表、算账、发请求。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是模型自己天然拥有外部能力 | 把模型输出连接到真实工具的接口机制 |

## 二、为什么重要

- 工具调用让 AI 能获取新信息、执行动作和完成可验证任务。
- 不懂它会怎样：工具权限过大或参数错误，会把模型错误变成现实操作。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：工具调用就是让 AI 会用外部工具。
- 常见场景：查库存、调用日历、执行代码、检索网页、更新工单。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 工具接得越多越强 | 工具要按任务需要配置，并做好权限和验证。 |

## 五、延伸阅读

- 本知识库相关：智能体、验证工具
- [OpenAI Function calling guide](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- 06-Knowledge: 工具调用抑制与约束代价.md: `
