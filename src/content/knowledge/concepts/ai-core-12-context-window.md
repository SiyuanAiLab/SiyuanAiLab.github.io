---
title: "上下文窗口（Context Window）"
description: "模型一次对话或调用中能看到的输入与历史内容总容量。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["上下文窗口", "Context", "LLM"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "06-Knowledge 改写 / OpenAI Prompt engineering guide"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/12-上下文窗口-Context-Window.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 上下文窗口（Context Window）

> 模型一次对话或调用中能看到的输入与历史内容总容量。

---

## 一、是什么

- 模型一次对话或调用中能看到的输入与历史内容总容量。
- 类比：像一个人的工作台，桌面能摊开的资料有限。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是模型永久记忆 | 当前这次推理可用的信息空间 |

## 二、为什么重要

- 它决定模型能同时参考多少资料、历史和指令。
- 不懂它会怎样：上下文塞太满会增加成本，也可能降低重点信息的可见度。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：上下文窗口就是 AI 这次能看见多少东西。
- 常见场景：让模型读一本书、处理多文件项目、追踪长对话时都会碰到。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 窗口越长效果一定越好 | 长窗口只是容量，关键还要做好信息选择和组织。 |

## 五、延伸阅读

- 本知识库相关：上下文工程、Token
- 06-Knowledge: 02-上下文窗口.md: `
- [OpenAI Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
