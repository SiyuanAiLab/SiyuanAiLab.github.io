---
title: "模型偏见（Model Bias）"
description: "模型因训练数据、目标函数或使用方式，对某些群体、观点或场景产生系统性不公平或失真。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["模型偏见", "公平性", "治理"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "NIST AI Risk Management Framework / Google Machine Learning Crash Course"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/51-模型偏见-Model-Bias.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 模型偏见（Model Bias）

> 模型因训练数据、目标函数或使用方式，对某些群体、观点或场景产生系统性不公平或失真。

---

## 一、是什么

- 模型因训练数据、目标函数或使用方式，对某些群体、观点或场景产生系统性不公平或失真。
- 类比：像员工只见过一类客户，就把这类经验误当成所有人的规律。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是单次回答出错 | 在一类输入上反复出现的倾向性问题 |

## 二、为什么重要

- 偏见会影响招聘、信贷、教育、医疗和内容分发等真实决策。
- 不懂它会怎样：模型偏见会被自动化放大，看起来客观但实际不公平。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：模型偏见就是 AI 学歪了某些固定倾向。
- 常见场景：对不同群体给出不同质量建议，或默认某些职业性别。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 机器判断天然客观 | 机器会继承数据和设计中的偏差。 |

## 五、延伸阅读

- 本知识库相关：训练数据、对齐
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
