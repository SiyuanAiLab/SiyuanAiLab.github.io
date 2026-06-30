---
title: "角色提示（Role Prompting）"
description: "通过指定模型扮演的专业角色、视角或职责，影响其回答方式。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["Role Prompting", "Prompt", "交互"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "OpenAI Prompt engineering guide / Lilian Weng"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/46-角色提示-Role-Prompting.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 角色提示（Role Prompting）

> 通过指定模型扮演的专业角色、视角或职责，影响其回答方式。

---

## 一、是什么

- 通过指定模型扮演的专业角色、视角或职责，影响其回答方式。
- 类比：像让同一个人分别以律师、老师或产品经理视角看问题。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是让模型真的获得该职业资质 | 一种调整回答框架和语言风格的提示技巧 |

## 二、为什么重要

- 角色能帮助模型选择合适的标准、语气和关注点。
- 不懂它会怎样：角色设定可能带来虚假权威感。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：角色提示就是先告诉 AI 它该站在哪个岗位说话。
- 常见场景：“你是代码审查员，请只指出风险”。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 设成专家就等于专家 | 角色能改善表达，但不能替代真实专业验证。 |

## 五、延伸阅读

- 本知识库相关：系统提示词、用户提示词
- [OpenAI Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Lilian Weng: Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
