---
title: "幻觉（Hallucination）"
description: "模型生成了看起来可信、但事实不准确或没有依据的内容。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["幻觉", "可靠性", "LLM风险"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "Lilian Weng / Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/21-幻觉-Hallucination.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 幻觉（Hallucination）

> 模型生成了看起来可信、但事实不准确或没有依据的内容。

---

## 一、是什么

- 模型生成了看起来可信、但事实不准确或没有依据的内容。
- 类比：像一个口才很好的人，在不知道时也编得很顺。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是模型故意撒谎 | 生成模型在不确定时仍继续生成的失败模式 |

## 二、为什么重要

- 它是 AI 应用可信度的核心风险。
- 不懂它会怎样：如果不验证，幻觉会进入报告、合同、代码和决策。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：幻觉就是 AI 一本正经地胡说。
- 常见场景：编造论文、虚构链接、错引法律条文、生成不存在的 API。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 更大的模型不会幻觉 | 强模型也会幻觉，只是频率和形态不同。 |

## 五、延伸阅读

- 本知识库相关：RAG、验证工具
- [Lilian Weng: Extrinsic Hallucinations in LLMs](https://lilianweng.github.io/posts/2024-07-07-hallucination/)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
