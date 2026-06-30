---
title: "输出压缩优先原则（Output Compression First）"
description: "在 AI 工作流中优先压缩中间输出，只保留决策、证据和可执行信息。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["输出压缩", "Token", "工作流"]
prerequisites: []
related_cards: ["上下文工程", "Token"]
scenario: "多 Agent 协作、长文分析、代码审查、研究摘要。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述“输出压缩优先原则”的作用，再判断你的场景是否真的需要它。"
source: "06-Knowledge 改写"
sourcePath: "legacy-ai-core-candidate-source-map"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: true
---

# 输出压缩优先原则（Output Compression First）

> 在 AI 工作流中优先压缩中间输出，只保留决策、证据和可执行信息。

---

## 一、是什么

- 在 AI 工作流中优先压缩中间输出，只保留决策、证据和可执行信息。
- 类比：像会议纪要只保留决定和行动项，不把所有闲聊都塞进项目档案。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是把内容写得越短越好 | 为后续上下文和协作保留高密度信息 |

## 二、为什么重要

- 它能减少 token 成本、降低噪音，让长流程更可控。
- 不懂它会怎样：压缩过度会丢失关键证据，压缩不足会淹没重点。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：先把 AI 输出压成可继续用的有效信息。
- 常见场景：多 Agent 协作、长文分析、代码审查、研究摘要。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 完整保留最安全 | 长期工作流里，噪音也会成为成本和风险。 |

## 五、延伸阅读

- 本知识库相关：上下文工程、Token
- 06-Knowledge: 输出压缩优先原则.md: `workspace/06-Knowledge/02-AI与智能系统/01-理论与原理/输出压缩优先原则.md`
- 06-Knowledge: 自适应轨迹压缩.md: `workspace/06-Knowledge/02-AI与智能系统/01-理论与原理/自适应轨迹压缩.md`
