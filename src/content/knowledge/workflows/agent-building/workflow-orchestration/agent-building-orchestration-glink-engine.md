---
title: "工作流编排参考：glink engine"
description: "一个用 YAML workflow、JSONL blackboard 和轻量 Python daemon 编排多个本地 Agent 的小型流水线引擎。"
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
source: "https://github.com/garyqlin/glink-engine"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# glink engine

> 一个用 YAML workflow、JSONL blackboard 和轻量 Python daemon 编排多个本地 Agent 的小型流水线引擎。

## 这个能力解决什么问题

Glink 解决的是多个 Agent 协作时缺少共享时间线和可恢复执行的问题。它不引入数据库、队列或大型框架，而是把 workflow 写成 YAML，把所有 Agent 事件写进 append-only JSONL Main Bus。每个步骤指定 executor、输入文件、输出文件、依赖和 fallback，daemon 负责按依赖调度、调用 Agent、写 checkpoint 和对外提供状态 API。

## 核心逻辑

输入是一份 workflow YAML 和一组可访问的 Agent endpoint。daemon 读取步骤列表，先执行无依赖节点；每个节点把任务派给指定 Agent，Agent 读 input_file 或 global_context，写 output_file，并把 `task.started`、`task.completed`、`task.failed` 等事件写入 Main Bus。失败时按 fallback_agents 重试；进程崩溃后根据 checkpoint 恢复。输出是每步文件产物、JSONL 事件、API 状态和最终项目文件。

## 技术结构

- 关键模块：workflow YAML 定义 steps、depends_on、input_file/output_file、fallback_agents；Glink daemon/API 调度执行；Main Bus 是项目级 JSONL blackboard；Agent roster 把 agent 名称映射到本地 HTTP endpoint；health/status/restart API 支撑监控和恢复。
- 调用链路：读取 workflow → 计算依赖就绪步骤 → POST 给 executor endpoint → 记录 bus 事件 → 成功写 checkpoint → 失败触发 fallback/retry → API/SSE 暴露进度。
- 输入输出：输入是 global_context、step task、前序 output_file、Agent endpoint；输出是项目文件、测试报告、最终 HTML/文档、JSONL 时间线和 status API。
- 核心依赖：README 强调 zero deps，核心是一份 Python daemon 加 JSONL 文件；可选 HTTP API/SSE dashboard。

## 为什么值得参考

它的亮点是极简：不用上 LangGraph、Redis 或数据库，也能获得依赖图、fallback、checkpoint、共享记忆和可回放事件流。对个人 AI 工作台来说，JSONL blackboard 是很好的 Agent 间通信样板：足够透明，任何 Agent 都能读，任何故障都能追。

## 为什么不建议直接套用

Glink 的简洁也意味着很多能力要自己补：权限、并发冲突、文件锁、事件 schema 版本、Agent endpoint 鉴权、输出质量评估都不完整。示例 workflow 甚至会写 `/tmp` 文件，迁移到正式工作区时必须重设路径和权限。它更像轻量实验引擎，不是企业级编排平台。

## 如何改造成自己的版本

1. 保留 YAML step 与 JSONL bus，先不要引入数据库。
2. 给 bus 事件固定 schema：task id、agent、input hash、output path、status、error、review flag。
3. 把 output_file 限制到项目工作区内，禁止绝对路径和越界写入。
4. 为每个 step 加验收字段，例如 expected_artifact、validator、manual_review_required。
5. fallback 不只换 Agent，还要记录为什么失败，避免同一错误被不同 Agent 重复。

## 适用场景

- 个人或小团队本地多 Agent 流水线，需要简单可追踪和可恢复。
- 多步骤文件生成，如 HTML 游戏、报告、代码审查、测试链。
- 想学习 blackboard pattern 和 JSONL 事件通信。

## 不适用场景

- 高并发、跨团队、强权限隔离或审计合规的生产系统。
- 需要复杂状态查询、队列调度、分布式锁和角色权限的企业流程。
- Agent endpoint 不稳定或没有统一输入输出契约的环境。

## Agent Building 判断

- 多步工作流：YAML steps、depends_on、parallel test、fallback 和 retry 组成执行图。
- 工作标准：每步定义 executor、title/task、input_file、output_file、依赖和 fallback。
- Loop 标准：daemon 调度步骤、记录 checkpoint、失败重试、崩溃恢复。
- Harness 标准：JSONL Main Bus、status API、SSE、healthcheck 和示例 workflow 支撑验证。
- 工具调用链路或 Agent 间通信：Agent 通过 HTTP endpoint 接收任务，通过文件和 JSONL bus 共享上下文。
- 为什么不是 persona / profile / system prompt only：它有实际 daemon、workflow、bus、API 和 checkpoint。

## 参考信息

- 原项目：[glink-engine](https://github.com/garyqlin/glink-engine)
- 作者：garyqlin
- 相关概念：[[Agent编排]]、[[黑板架构]]
- 相关卡片：[workflow-read-083](workflow-read-083.md)
