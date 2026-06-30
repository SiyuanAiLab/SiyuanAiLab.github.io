---
title: "少样本提示（Few-shot Prompting）"
description: "在提示中提供几个输入输出示例，让模型模仿格式、风格或判断标准。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["Few-shot Prompting", "Prompt", "示例"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "OpenAI Prompt engineering guide / Lilian Weng"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/45-少样本提示-Few-shot-Prompting.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 少样本提示（Few-shot Prompting）

> 在提示中提供几个输入输出示例，让模型模仿格式、风格或判断标准。

---

## 一、是什么

- 在提示中提供几个输入输出示例，让模型模仿格式、风格或判断标准。
- 类比：像先给助理看合格样稿，再让他照着做。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是训练新模型 | 用上下文示例临时塑造模型行为 |

## 二、为什么重要

- 它适合快速稳定输出格式和风格。
- 不懂它会怎样：样例质量差会让模型照着犯错。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：少样本提示就是给 AI 看样板。
- 常见场景：提供三条标准客服回复，再让模型处理新问题。
- **少样本学习（Few-shot Learning）视角**：少样本提示也体现了模型的少样本学习能力——即通过少量示例理解任务格式和规律，然后完成新样本。关键澄清：少样本提示不是重新训练模型，而是利用上下文示例引导模型行为。示例要少而准，过多会占用上下文并引入噪音。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 样例越多越专业 | 示例要有代表性，并覆盖关键边界。 |
| 示例越多越好 | 少样本提示不是训练新模型，示例要少而准，过多会占用上下文并引入噪音。 |

## 五、延伸阅读

- 本知识库相关：提示词工程
- [OpenAI Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Lilian Weng: Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
