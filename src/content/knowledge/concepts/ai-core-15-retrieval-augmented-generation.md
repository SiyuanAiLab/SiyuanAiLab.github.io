---
title: "检索增强生成（Retrieval-Augmented Generation）"
description: "先从外部资料中检索相关内容，再把检索结果交给模型生成回答的方法。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["RAG", "检索增强生成", "知识库"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "06-Knowledge 改写 / Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/15-检索增强生成-Retrieval-Augmented-Generation.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 检索增强生成（Retrieval-Augmented Generation）

> 先从外部资料中检索相关内容，再把检索结果交给模型生成回答的方法。

---

## 一、是什么

- 先从外部资料中检索相关内容，再把检索结果交给模型生成回答的方法。
- 类比：像开卷考试，先翻资料再作答。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是让模型自动变成数据库 | 把搜索/知识库和生成模型组合起来 |

## 二、为什么重要

- 它能降低幻觉、补充私有知识，并让答案更可追溯。
- 不懂它会怎样：检索到错资料，模型也会一本正经地错。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：RAG 就是让 AI 先查资料再回答。
- 常见场景：企业知识库问答、客服资料查询、内部制度助手。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 做了 RAG 就不会幻觉 | RAG 降低风险，但仍需检索质量、引用和验证。 |

## 五、延伸阅读

- 本知识库相关：嵌入/向量、幻觉
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- 06-Knowledge: 08-AI工程学.md: `
