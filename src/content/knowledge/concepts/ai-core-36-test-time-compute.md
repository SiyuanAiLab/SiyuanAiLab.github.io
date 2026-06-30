---
title: "测试时计算（Test-time Compute）"
description: "在模型回答阶段投入更多计算，如多步推理、多次采样、搜索或自检，以换取更好结果。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["Test-time Compute", "推理", "成本"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "06-Knowledge 改写 / OpenAI Reasoning guide"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/36-测试时计算-Test-time-Compute.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 测试时计算（Test-time Compute）

> 在模型回答阶段投入更多计算，如多步推理、多次采样、搜索或自检，以换取更好结果。

---

## 一、是什么

- 在模型回答阶段投入更多计算，如多步推理、多次采样、搜索或自检，以换取更好结果。
- 类比：像考试时多花时间打草稿和复查。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是重新训练模型 | 推理阶段增加算力和步骤的策略 |

## 二、为什么重要

- 它让模型在复杂任务上用更多“思考预算”提升表现。
- 不懂它会怎样：计算越多成本越高，也不保证一定正确。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：测试时计算就是让 AI 答题时多想一会儿。
- 常见场景：复杂数学题、多候选方案、自我检查、代码修复。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 多想一定更对 | 需要配合验证标准，否则只是更长的错误。 |

## 五、延伸阅读

- 本知识库相关：推理、验证工具
- 06-Knowledge: 测试时计算与动态工作流.md: `
- [OpenAI Reasoning guide](https://platform.openai.com/docs/guides/reasoning)
