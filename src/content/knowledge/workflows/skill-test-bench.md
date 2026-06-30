---
title: "Skill Test Bench"
description: "为 Skill 准备样例输入、失败条件和人工验收清单，避免只靠感觉判断效果。"
pubDate: 2026-06-29
category: workflows
level: 进阶
tags: ["测试评估", "验收标准", "样例集"]
prerequisites: ["Skill Forge"]
related_cards: ["评估", "AI Agent"]
scenario: "测试评估：验证 Skill 是否跑通，输出是否稳定。"
audience: "需要检查 Skill 是否真的可用的项目负责人和执行线程"
action: "准备 3 类样例输入：标准样例、边界样例、错误样例。"
source: "框架验证示例内容"
sourcePath: ""
confidence: 中
verifiedDate: 2026-06-29
curated_by: 思远 AI Lab
public: true
draft: false
---
# Skill Test Bench

> 一句话定义：用一组样例和验收标准检查 Skill 是否真的能稳定交付。

## 这个 Skill 解决什么问题

一个 Skill 看起来能跑，不等于它能交付。Skill Test Bench 关注的是：输入变一点、资料缺一点、目标复杂一点时，输出是否还可用。

## 核心逻辑

它把测试拆成三类：标准任务、边界任务、错误任务。每类都配对应的期望输出和人工检查标准。

## 为什么值得参考

它把“感觉不错”改成“按清单验收”。这对多人协作尤其重要，因为项目负责人可以用同一套标准检查不同执行线程的结果。

## 为什么不建议直接套用

测试样例必须来自真实业务。通用样例只能验证页面或流程通不通，不能证明这个 Skill 在你的场景里有价值。

## 如何改造成自己的版本

- 从过去真实任务里挑 3 个样例。
- 每个样例写出合格输出的最低标准。
- 加一个故意缺材料的输入，检查 Skill 是否会追问。
- 加一个超出边界的输入，检查 Skill 是否会拒绝或降级处理。

## 适用场景

适合 Skill 上线前、改版后、或交给别人使用前。

## 不适用场景

不适合完全没有固定产出的开放式创意任务。
