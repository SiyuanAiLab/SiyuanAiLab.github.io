---
title: "工作流编排参考：claude orchestration"
description: "一个 Claude Code 插件，用 `.flow` 语法把多个 Agent、并行分支、条件、人工 checkpoint、临时 Agent 和状态恢复编排成工作流。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["工作流编排", "状态机", "handoff", "任务路由"]
prerequisites: []
related_cards: []
scenario: "Agent Building / 工作流编排"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的工作流编排流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/mbruhler/claude-orchestration"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# claude orchestration

> 一个 Claude Code 插件，用 `.flow` 语法把多个 Agent、并行分支、条件、人工 checkpoint、临时 Agent 和状态恢复编排成工作流。

## 这个能力解决什么问题

claude-orchestration 解决的是 Claude Code 里大型任务缺少显式流程图的问题。用户可以用自然语言让插件生成 workflow，也可以直接写 declarative syntax，把探索、审查、实现、测试、人工确认、重试和提交等步骤串起来。它把 Claude Code 从单次交互变成接近 N8N 的 Agent 工作流执行器。

## 核心逻辑

输入是自然语言需求或 `.flow` 语法。解析器把 `->`、`||`、`~>`、`@checkpoint`、变量捕获、临时 Agent 定义解析成图；executor 找出依赖满足的节点，启动对应 Claude Code Agent，收集输出变量，按条件边继续执行。执行状态写入 `.orchestration/state.json`，崩溃或 rate limit 后可从已完成节点恢复。输出是每个节点的结果、变量、可视化进度、最终交付物或人工 checkpoint 的决策。

## 技术结构

- 关键模块：parser 解析 flow syntax；executor 管理节点状态、并行、条件和错误；visualizer 展示进度；agents registry 管理内置/自定义 Agent；temp-agents 支持临时专家；state snapshot 支撑恢复；`.flow.test` 支持 dry-run 单元测试。
- 调用链路：用户输入 workflow → 解析为 graph → executor 计算 ready nodes → 调用 Explore/general-purpose/自定义 Agent → 保存输出变量 → 条件判断/人工 checkpoint → 更新状态快照 → 继续或恢复。
- 输入输出：输入是 `.flow`、自然语言、Agent registry、模板和 mock 变量；输出是节点结果、变量、状态文件、可视化执行路径和最终产物。
- 核心依赖：Claude Code 插件机制、Claude Code Agent 工具、可选 desktop scheduling/loop；自动脚本能力可生成 Python/Node.js 临时脚本处理网页/API/数据。

## 为什么值得参考

它的价值在于把 Agent 编排语法做得很直观：顺序、并行、条件、人工点、变量捕获、临时 Agent 都有短语法。更重要的是，它没有只停留在 DSL，executor 文档明确了状态结构、ready node 查找、条件评估、checkpoint 和错误恢复，这才是 Agent workflow 能跑起来的核心。

## 为什么不建议直接套用

它绑定 Claude Code 插件生态，语法和 Agent 调用都依赖 Claude Code 能力。自动创建脚本、调 API、网页抓取等功能如果没有权限和审查边界，风险很高。README 还出现 autonomous scheduling、headless mode 这类能力，内部使用时必须禁用或严格审批发布、部署、外部写入等动作。

## 如何改造成自己的版本

1. 先借鉴 `.flow` 最小语法：顺序、并行、条件、checkpoint、变量，不引入自动调度。
2. 把每个节点输出规范化为 Markdown/JSON 摘要，禁止节点只返回长自然语言。
3. 对高风险节点强制 `@review`，例如写文件、外部 API、提交、客户消息。
4. 临时 Agent 完成后要做“是否可复用”评估，避免技能库膨胀。
5. 用 `.flow.test` 思路给工作流做 dry-run：mock 输入、看路径，不实际调用外部工具。

## 适用场景

- Claude Code 内部多文件开发、审查、测试、调研等需要显式流程的任务。
- 想快速实验 Agent DSL、并行分支和人工 checkpoint。
- 需要把成功的临时专家沉淀为可复用 Agent。

## 不适用场景

- 非 Claude Code 环境或无法安装插件的团队。
- 需要严格生产权限治理但尚未设计审批边界的流程。
- 简单单步任务，写 flow 反而增加负担。

## Agent Building 判断

- 多步工作流：flow graph 支持顺序、并行、条件、retry loop、checkpoint、schedule。
- 工作标准：节点有 agent、instruction、output var、status；workflow state 保存 completed/failed/skipped/outputs。
- Loop 标准：executor 主循环查找 ready nodes、执行、更新可视化、处理 checkpoint 和错误恢复。
- Harness 标准：state snapshot、resume、dry-run `.flow.test`、visual progress 构成运行 harness。
- 工具调用链路或 Agent 间通信：Agent 通过变量捕获和插值传递上下文，temp agents 可在流程内定义并调用。
- 为什么不是 persona / profile / system prompt only：核心是插件、DSL、executor 和状态恢复，不是角色提示词。

## 参考信息

- 原项目：[claude-orchestration](https://github.com/mbruhler/claude-orchestration)
- 作者：mbruhler
- 相关概念：[[Agent编排]]、[[状态机工作流]]
- 相关卡片：[workflow-read-084](workflow-read-084.md)
