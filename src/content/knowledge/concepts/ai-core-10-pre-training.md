---
title: "预训练（Pre-training）"
description: "在大规模通用数据上先训练模型，让它获得基础语言和世界模式。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["预训练", "模型训练", "LLM"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "Wikipedia / Language Models are Few-Shot Learners"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/10-预训练-Pre-training.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 预训练（Pre-training）

> 在大规模通用数据上先训练模型，让它获得基础语言和世界模式。

---

## 一、是什么

- 在大规模通用数据上先训练模型，让它获得基础语言和世界模式。
- 类比：像正式上岗前先读大量通识教材。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是针对某个具体公司任务的最后调校 | 模型获得通用能力的初始训练阶段 |

## 二、为什么重要

- 预训练让模型具备迁移到多种任务的底层能力。
- 不懂它会怎样：不区分预训练和微调，会误判模型能否适配具体业务。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：预训练是模型的通识教育。
- 常见场景：LLM 先预训练，再通过微调、对齐或提示适配具体任务。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 预训练结束后模型就完全可用 | 很多生产场景还需要对齐、评估和应用层约束。 |

## 五、延伸阅读

- 本知识库相关：微调、对齐
- [Wikipedia: Large language model](https://en.wikipedia.org/wiki/Large_language_model)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
