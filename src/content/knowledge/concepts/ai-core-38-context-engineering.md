---
title: "上下文工程（Context Engineering）"
description: "系统性选择、组织、压缩和注入模型所需上下文的工程方法。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["上下文工程", "Context", "AI工程"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "06-Knowledge 改写 / Andrej Karpathy"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/38-上下文工程-Context-Engineering.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 上下文工程（Context Engineering）

> 系统性选择、组织、压缩和注入模型所需上下文的工程方法。

---

## 一、是什么

- 系统性选择、组织、压缩和注入模型所需上下文的工程方法。
- 类比：像给员工准备任务包：目标、背景、资料、边界和验收标准都要齐。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是把资料全部塞进窗口 | 围绕模型输入空间做信息架构 |

## 二、为什么重要

- 上下文质量常常比模型选择更直接影响输出质量。
- 不懂它会怎样：上下文混乱会让强模型也做出低质量判断。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：上下文工程就是给 AI 准备正确材料。
- 常见场景：RAG、Agent 记忆、项目规则、代码仓库问答。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 长上下文能替代上下文工程 | 容量变大后，筛选和组织更重要。 |

## 五、延伸阅读

- 本知识库相关：上下文窗口、RAG
- 06-Knowledge: 上下文工程.md: `
- 06-Knowledge: 02-上下文窗口.md: `
- [Andrej Karpathy: Software Is Changing (Again)](https://karpathy.bearblog.dev/software-is-changing-again/)
