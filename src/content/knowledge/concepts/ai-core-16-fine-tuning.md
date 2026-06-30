---
title: "微调（Fine-tuning）"
description: "在已有模型基础上，用特定数据继续训练，让模型更适合某类任务或风格。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["微调", "模型训练", "LLM"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "OpenAI Fine-tuning guide / Wikipedia"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/16-微调-Fine-tuning.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 微调（Fine-tuning）

> 在已有模型基础上，用特定数据继续训练，让模型更适合某类任务或风格。

---

## 一、是什么

- 在已有模型基础上，用特定数据继续训练，让模型更适合某类任务或风格。
- 类比：像通识毕业后再做岗位培训。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是给模型临时塞资料 | 改变模型参数的再训练过程 |

## 二、为什么重要

- 它可以稳定某些格式、语气、领域行为或分类能力。
- 不懂它会怎样：微调成本和风险高，很多问题用提示、RAG 或工作流更合适。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：微调是给模型做专项训练。
- 常见场景：客服语气统一、特定分类任务、结构化输出习惯。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 业务知识都应该微调进模型 | 经常更新的知识更适合 RAG 或上下文注入。 |

## 五、延伸阅读

- 本知识库相关：预训练、RAG
- [OpenAI Fine-tuning guide](https://platform.openai.com/docs/guides/fine-tuning)
- [Wikipedia: Large language model](https://en.wikipedia.org/wiki/Large_language_model)
