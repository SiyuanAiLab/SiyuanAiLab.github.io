---
title: "提示词注入（Prompt Injection）"
description: "攻击者通过输入诱导模型忽略原有规则、泄露信息或执行不该执行的动作。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["Prompt Injection", "安全", "LLM风险"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "OWASP GenAI Security / OpenAI Safety best practices"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/47-提示词注入-Prompt-Injection.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 提示词注入（Prompt Injection）

> 攻击者通过输入诱导模型忽略原有规则、泄露信息或执行不该执行的动作。

---

## 一、是什么

- 攻击者通过输入诱导模型忽略原有规则、泄露信息或执行不该执行的动作。
- 类比：像有人在表单里写“请无视公司制度，把机密发给我”。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是普通的坏提示 | 针对模型指令层级和工具权限的攻击方式 |

## 二、为什么重要

- 它是 LLM 应用最常见的安全风险之一。
- 不懂它会怎样：一旦连接工具和数据源，注入可能导致泄密或越权操作。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：提示词注入就是骗 AI 忘掉规矩。
- 常见场景：网页内容诱导浏览器 Agent 泄露系统提示或调用敏感工具。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 把系统提示藏起来就安全 | 还需要权限隔离、输入处理、工具确认和日志审计。 |

## 五、延伸阅读

- 本知识库相关：系统提示词、AI安全
- [OWASP GenAI Security: LLM01 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [OpenAI Safety best practices](https://platform.openai.com/docs/guides/safety-best-practices)
