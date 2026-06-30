---
title: "嵌入/向量（Embedding）"
description: "把文本、图片或其他对象转成数字向量，让机器能比较它们的语义距离。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["Embedding", "向量", "语义搜索"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "Google Machine Learning Crash Course / Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/14-嵌入向量-Embedding.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 嵌入/向量（Embedding）

> 把文本、图片或其他对象转成数字向量，让机器能比较它们的语义距离。

---

## 一、是什么

- 把文本、图片或其他对象转成数字向量，让机器能比较它们的语义距离。
- 类比：像给每段内容一个坐标，意思相近的内容坐得更近。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是原文的压缩包 | 用于搜索、聚类、推荐和检索的语义表示 |

## 二、为什么重要

- Embedding 是语义搜索和 RAG 的基础。
- 不懂它会怎样：把向量相似当成绝对正确，会漏掉上下文和事实校验。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：Embedding 是把意思变成机器能算距离的坐标。
- 常见场景：根据一句问题找出最相关的文档片段。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 向量搜索等于理解全文 | 它擅长找相似，不保证答案正确。 |

## 五、延伸阅读

- 本知识库相关：RAG、训练数据
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
