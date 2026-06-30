---
title: "少样本学习（Few-shot Learning）"
description: "模型通过少量示例理解任务格式和规律，然后完成新样本。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["Few-shot", "少样本学习", "Prompt"]
prerequisites: []
related_cards: ["少样本提示", "提示词工程"]
scenario: "给三条合格标题，让模型按同样标准再写十条。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述“少样本学习”的作用，再判断你的场景是否真的需要它。"
source: "Language Models are Few-Shot Learners / Lilian Weng"
sourcePath: "legacy-ai-core-candidate-source-map"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: true
---

# 少样本学习（Few-shot Learning）

> 模型通过少量示例理解任务格式和规律，然后完成新样本。

---

## 一、是什么

- 模型通过少量示例理解任务格式和规律，然后完成新样本。
- 类比：像看两三个范例就知道这类表格该怎么填。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是重新训练模型 | 利用上下文示例引导模型行为 |

## 二、为什么重要

- 它让用户不用训练模型，也能快速定制输出风格。
- 不懂它会怎样：示例选得不好，模型会学到错误格式或偏差。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：少样本就是先给 AI 看几个样板。
- 常见场景：给三条合格标题，让模型按同样标准再写十条。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 示例越多越好 | 示例要少而准，过多会占用上下文并引入噪音。 |

## 五、延伸阅读

- 本知识库相关：少样本提示、提示词工程
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [Lilian Weng: Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
