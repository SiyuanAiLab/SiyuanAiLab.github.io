---
title: "Token（Token）"
description: "模型处理文本时的基本片段，可能是一个字、词、词根、标点或代码片段。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["Token", "上下文", "成本"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "06-Knowledge 改写 / OpenAI Tokenizer"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/11-Token-Token.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# Token（Token）

> 模型处理文本时的基本片段，可能是一个字、词、词根、标点或代码片段。

---

## 一、是什么

- 模型处理文本时的基本片段，可能是一个字、词、词根、标点或代码片段。
- 类比：像模型眼里的“文字积木”。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不一定等于一个汉字或一个英文单词 | 模型计费、上下文和生成的基本单位 |

## 二、为什么重要

- Token 决定成本、速度和上下文容量。
- 不懂它会怎样：不懂 token，就很难估算长文处理和 API 成本。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：Token 是 AI 读写文字时使用的最小积木。
- 常见场景：长文章会占用更多 token，导致成本上升或超出上下文窗口。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 一个 token 就是一个字 | 不同语言和分词器下，token 与字符不是一一对应。 |

## 五、延伸阅读

- 本知识库相关：上下文窗口、温度/采样参数
- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)
- 06-Knowledge: waste-tokens-save-time-用-token-换时间.md: `
