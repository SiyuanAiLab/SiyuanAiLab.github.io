---
title: "用户提示词（User Prompt）"
description: "用户在一次交互中输入的具体请求、问题或任务说明。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["User Prompt", "用户提示词", "交互"]
prerequisites: []
related_cards: ["系统提示词", "提示词工程"]
scenario: "“把这段会议记录整理成行动项”。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述“用户提示词”的作用，再判断你的场景是否真的需要它。"
source: "OpenAI Prompt engineering guide / Lilian Weng"
sourcePath: "legacy-ai-core-candidate-source-map"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: true
---

# 用户提示词（User Prompt）

> 用户在一次交互中输入的具体请求、问题或任务说明。

---

## 一、是什么

- 用户在一次交互中输入的具体请求、问题或任务说明。
- 类比：像你临时交给助理的一张任务单。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是应用底层规则 | 当前回合希望模型完成的任务 |

## 二、为什么重要

- 用户提示决定模型本次工作的目标、素材和输出要求。
- 不懂它会怎样：请求含糊，模型就会猜；目标冲突，模型就会摇摆。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：用户提示词就是你这次让 AI 做什么。
- 常见场景：“把这段会议记录整理成行动项”。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 模型应该自动懂我的真实意思 | 清楚表达目标和验收标准，结果会稳定很多。 |

## 五、延伸阅读

- 本知识库相关：系统提示词、提示词工程
- [OpenAI Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Lilian Weng: Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
