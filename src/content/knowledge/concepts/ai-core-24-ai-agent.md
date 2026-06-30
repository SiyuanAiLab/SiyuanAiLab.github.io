---
title: "智能体（AI Agent）"
description: "以模型为核心，能接收目标、规划步骤、调用工具并根据反馈持续行动的软件实体。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["AI Agent", "智能体", "工具调用"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "06-Knowledge 改写 / Anthropic / Lilian Weng"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/24-智能体-AI-Agent.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 智能体（AI Agent）

> 以模型为核心，能接收目标、规划步骤、调用工具并根据反馈持续行动的软件实体。

---

## 一、是什么

- 以模型为核心，能接收目标、规划步骤、调用工具并根据反馈持续行动的软件实体。
- 类比：像一个不只会回答，还会拿工具办事的助理。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是普通聊天机器人 | 模型、工具、记忆、规划和执行循环的组合 |

## 二、为什么重要

- 它把“会说”的 AI 推向“能做事”的 AI。
- 不懂它会怎样：过度自治会带来权限、错误执行和治理风险。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：Agent 是会带着目标动手干活的 AI。
- 常见场景：自动写代码、查资料、整理文件、调用业务系统。
- **自主智能体（Autonomous Agent）**：能在较少人工干预下，根据目标持续规划、执行和调整的智能体。类比：像拿到目标后能自己推进一段工作的项目助理。关键澄清：自主智能体不是完全不受控制的 AI，而是在限定权限和环境中具备连续行动能力的系统。自主越高，越需要权限、日志、回滚和人类监督。常见场景：长期研究任务、自动化运维、代码修复、营销素材批处理。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| Agent 越自主越好 | 真实业务里，可控和可验证比盲目自主更重要。 |
| 自主意味着不需要人 | 越自主越需要清晰目标、边界和验收。 |

## 五、延伸阅读

- 本知识库相关：工具调用、规划能力、记忆系统
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Lilian Weng: LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)
