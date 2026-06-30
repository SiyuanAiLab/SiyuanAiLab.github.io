---
title: AI Agent
description: 以大模型为大脑，能感知环境、调用工具、自主决策并持续执行任务的智能体。
pubDate: 2026-06-14
category: concepts
level: 入门
tags: [AI Agent, 智能体, 自治, 工具调用, LLM]
source: 概念定义
confidence: 高
verifiedDate: 2026-06-14
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: true
---

# AI Agent

> 以大模型为大脑，能感知环境、调用工具、自主决策并持续执行任务的智能体。

---

## 一、是什么

AI Agent 是一种以大语言模型（LLM）为核心控制器的软件实体。它能接收目标或任务，自主规划步骤，调用外部工具，并根据环境反馈迭代执行，直到任务完成或需要人类介入。

## 二、为什么存在

纯 LLM 只能生成文本，无法直接作用于现实世界。Agent 通过把 LLM 与工具、记忆、规划能力结合，弥补了"能说"与"能做"之间的鸿沟。

## 三、核心机制

- **感知**：接收用户输入、环境状态、工具返回结果
- **规划**：将复杂目标拆解为可执行的子任务
- **工具调用**：调用搜索、代码执行、API 等外部能力
- **记忆**：维护短期上下文与长期知识
- **行动**：执行具体操作并观察结果

## 四、常见误解

| 误解 | 真相 |
|------|------|
| Agent 就是聊天机器人 | 聊天机器人通常单轮响应，Agent 强调多步自主执行 |
| Agent 越自治越好 | 自治与可控需要平衡，关键任务需保留人类监督 |
| Agent 必须从零构建 | 多数场景可用现有框架（Claude Code、Cursor 等） |

## 五、怎么用

- **Level 0**：使用 Claude Code、Cursor、Codex 等内置 Agent 能力
- **Level 1**：用 LangChain/LangGraph 编排工具链
- **Level 2**：设计领域特定的 Agent 工作流，引入记忆与规划层
- **Level 3**：构建多 Agent 协作系统，处理复杂业务流程

## 六、延伸阅读

- 相关卡片：Prompt Engineering、Agent Skill
