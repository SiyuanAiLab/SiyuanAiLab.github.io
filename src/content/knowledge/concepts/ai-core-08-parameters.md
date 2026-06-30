---
title: "参数（Parameters）"
description: "模型在训练中学到的内部数值，决定它如何把输入映射成输出。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["参数", "模型规模", "模型机制"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "Wikipedia / Google Machine Learning Crash Course"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/08-参数-Parameters.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 参数（Parameters）

> 模型在训练中学到的内部数值，决定它如何把输入映射成输出。

---

## 一、是什么

- 模型在训练中学到的内部数值，决定它如何把输入映射成输出。
- 类比：像厨师长期练习后形成的手感，不是每次现查的菜谱。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是用户输入的设置项 | 训练后固化在模型里的权重和偏置等数值 |

## 二、为什么重要

- 参数规模常被用来粗略描述模型容量。
- 不懂它会怎样：只看参数量会忽略数据、架构、推理成本和真实效果。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：参数就是模型训练后留下来的“经验刻度”。
- 常见场景：“70B 模型”通常表示约 700 亿参数规模。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 参数越多一定越好 | 更多参数可能带来更强能力，也可能带来更高成本和部署难度。 |

## 五、延伸阅读

- 本知识库相关：训练数据、预训练
- [Wikipedia: Large language model](https://en.wikipedia.org/wiki/Large_language_model)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
