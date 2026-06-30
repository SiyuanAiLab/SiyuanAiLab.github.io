---
title: "系统提示词（System Prompt）"
description: "由应用或开发者设置的高优先级指令，用来规定模型角色、边界和行为规则。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["System Prompt", "系统提示词", "Prompt"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "OpenAI Prompt engineering guide / Lilian Weng"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/43-系统提示词-System-Prompt.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 系统提示词（System Prompt）

> 由应用或开发者设置的高优先级指令，用来规定模型角色、边界和行为规则。

---

## 一、是什么

- 由应用或开发者设置的高优先级指令，用来规定模型角色、边界和行为规则。
- 类比：像员工入职手册和岗位职责。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是用户每次随便输入的请求 | 模型交互中的上层规则和长期约束 |

## 二、为什么重要

- 它决定 AI 产品的基本行为风格和安全边界。
- 不懂它会怎样：系统提示写得混乱，会让模型行为不稳定或泄露规则。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：系统提示词是 AI 的岗位说明书。
- 常见场景：客服机器人设定语气、拒答边界、输出格式。
- **用户提示词（User Prompt）**：用户在一次交互中输入的具体请求、问题或任务说明。类比：像你临时交给助理的一张任务单。关键澄清：用户提示词不是应用底层规则，而是当前回合希望模型完成的任务。用户提示决定模型本次工作的目标、素材和输出要求；请求含糊，模型就会猜；目标冲突，模型就会摇摆。常见场景："把这段会议记录整理成行动项"。清楚表达目标和验收标准，结果会稳定很多。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 系统提示越长越安全 | 清晰、可执行、可测试比堆很多规则更重要。 |

## 五、延伸阅读

- 本知识库相关：用户提示词、提示词注入
- [OpenAI Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Lilian Weng: Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
