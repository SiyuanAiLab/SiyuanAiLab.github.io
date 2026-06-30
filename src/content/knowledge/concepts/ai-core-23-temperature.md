---
title: "温度/采样参数（Temperature）"
description: "控制模型生成随机性和多样性的参数，温度越高通常越发散。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["Temperature", "采样参数", "生成控制"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "OpenAI Prompt engineering guide / OpenAI Reasoning guide"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/23-温度采样参数-Temperature.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 温度/采样参数（Temperature）

> 控制模型生成随机性和多样性的参数，温度越高通常越发散。

---

## 一、是什么

- 控制模型生成随机性和多样性的参数，温度越高通常越发散。
- 类比：像调创意旋钮：低温更稳，高温更放飞。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是模型聪明程度 | 影响下一个 token 选择分布的生成设置 |

## 二、为什么重要

- 它决定输出更适合严谨任务还是创意任务。
- 不懂它会怎样：严肃任务温度过高，容易产生不稳定和幻觉。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：Temperature 是 AI 输出的“稳定到发散”旋钮。
- 常见场景：写代码常用低温，头脑风暴可适当提高温度。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 温度越高越有创造力就越好 | 创造力和可靠性需要按任务取舍。 |

## 五、延伸阅读

- 本知识库相关：Token、幻觉
- [OpenAI Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [OpenAI Reasoning guide](https://platform.openai.com/docs/guides/reasoning)
