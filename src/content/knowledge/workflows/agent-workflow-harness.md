---
title: "Agent Workflow Harness"
description: "为多 Agent 工作流设定输入、步骤、trace、回放和验收标准，用来判断它是不是可运行的真 Agent。"
pubDate: 2026-06-30
category: workflows
level: 深度
tags: ["Agent Building", "Harness", "评估", "Loop"]
prerequisites: []
related_cards: ["AI Agent", "上下文窗口"]
scenario: "Harness 与评估：eval harness、trace、回放、benchmark、guardrails 和验收机制。"
audience: "准备从单 Agent 升级到多 Agent 协作的项目负责人"
action: "先为一个多步骤任务写出输入、角色边界、循环条件、失败回退和验收样例。"
source: "框架验证示例内容"
sourcePath: ""
confidence: 中
verifiedDate: 2026-06-30
curated_by: 思远 AI Lab
public: true
draft: false
---
# Agent Workflow Harness

> 一句话定义：给 Agent 工作流搭一个可运行、可记录、可回放、可验收的测试环境。

## 这个能力解决什么问题

很多项目自称 Agent，其实只有角色设定或 system prompt。Agent Workflow Harness 的价值，是判断这个 Agent 是否真的能按流程执行、检查、重试并留下证据。

## 核心逻辑

输入是任务样例、角色边界、工具清单和验收标准。处理过程是运行工作流、记录 trace、检查输出、触发回退或重试。输出是执行记录和验收结论。

## 技术结构

核心结构包括任务夹具、执行编排、trace 记录、回放机制、评估样例、安全护栏和人工复核入口。它关注的不是角色名，而是工作流能不能闭环。

## Agent Building 判断

- 多步工作流：任务进入、角色分工、工具调用、产物检查、失败回退。
- 工作标准：每个 Agent 的输入、输出、边界和交付物必须明确。
- Loop 标准：计划、执行、检查、反馈、重试或终止条件必须存在。
- Harness 标准：需要有样例输入、trace、回放、验收规则和安全护栏。
- 工具调用链路或 Agent 间通信：必须能说明谁调用什么工具、谁把结果交给谁。
- 为什么不是 persona / profile / system prompt only：因为它不靠角色口吻成立，而靠可执行流程和验收证据成立。

## 为什么值得参考

它给 Agent Building 设了一道门槛：没有工作流、Loop、Harness 和工具链，就不要急着叫 Agent。

## 为什么不建议直接套用

不同业务的失败成本不同。销售线索、内容审核、代码修改、客户交付的验收样例不能混用。

## 如何改造成自己的版本

- 先选一个真实多步骤任务。
- 写清楚每一步由哪个 Agent 或工具负责。
- 准备 3 个成功样例和 3 个失败样例。
- 把日志、截图、产物和人工判断都纳入验收记录。

## 适用场景

适合多 Agent 框架评估、复杂工作流验收、子线程协作和高风险自动化上线前检查。

## 不适用场景

不适合包装纯 persona 仓库、角色提示词合集或没有执行链路的资料库。
