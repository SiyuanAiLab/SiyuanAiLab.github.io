---
title: "思维链（Chain-of-Thought）"
description: "通过引导模型分步骤推理，提升复杂问题求解表现的方法。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["CoT", "思维链", "推理"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models / Lilian Weng"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/19-思维链-Chain-of-Thought.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 思维链（Chain-of-Thought）

> 通过引导模型分步骤推理，提升复杂问题求解表现的方法。

---

## 一、是什么

- 通过引导模型分步骤推理，提升复杂问题求解表现的方法。
- 类比：像考试时把草稿步骤写出来，而不是只报答案。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是保证答案正确的证明 | 一种让模型显式组织中间推理的提示方法 |

## 二、为什么重要

- 它常用于数学、逻辑、规划和多步分析任务。
- 不懂它会怎样：模型可能生成看似合理但错误的推理过程。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：CoT 是让 AI 先写解题步骤再给结论。
- 常见场景：让模型逐步分析商业问题、拆解代码错误或做数学题。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 推理过程写得长就更可靠 | 长推理可能更清楚，也可能只是更会编解释。 |

## 五、延伸阅读

- 本知识库相关：推理、验证工具
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)
- [Lilian Weng: Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
