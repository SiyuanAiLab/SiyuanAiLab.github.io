---
title: "注意力机制（Attention Mechanism）"
description: "让模型在处理某个位置时，动态关注输入中更相关部分的机制。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["注意力机制", "Transformer", "模型机制"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "Attention Is All You Need"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/13-注意力机制-Attention-Mechanism.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 注意力机制（Attention Mechanism）

> 让模型在处理某个位置时，动态关注输入中更相关部分的机制。

---

## 一、是什么

- 让模型在处理某个位置时，动态关注输入中更相关部分的机制。
- 类比：像读文章时把目光放在和当前句子最有关的前文。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是人类意识里的注意力 | 一种计算不同 token 之间关联强度的方法 |

## 二、为什么重要

- 它是 Transformer 理解长距离关系的关键。
- 不懂它会怎样：不懂注意力，就容易把模型输出误解成逐字查表。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：注意力机制让模型知道当前该参考哪几段话。
- 常见场景：代词指代、代码变量关系、长句理解都依赖注意力。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 注意力图就是模型完整解释 | 注意力能提供线索，但不等于完整因果解释。 |

## 五、延伸阅读

- 本知识库相关：Transformer 架构、上下文窗口
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
