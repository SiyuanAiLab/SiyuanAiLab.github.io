---
title: "多 Agent 框架参考：camel"
description: "一个偏研究和大规模实验的多 Agent 社会框架，覆盖 ChatAgent、Agent Societies、数据生成、工具、记忆、存储、benchmark 与人类介入。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["多Agent", "Agent框架", "协作", "工具调用"]
prerequisites: []
related_cards: []
scenario: "Agent Building / 多 Agent 框架"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的多 Agent 框架流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/camel-ai/camel"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# camel

> 一个偏研究和大规模实验的多 Agent 社会框架，覆盖 ChatAgent、Agent Societies、数据生成、工具、记忆、存储、benchmark 与人类介入。

## 这个能力解决什么问题

CAMEL 解决的是多 Agent 研究和复杂 Agent 社会实验缺少统一组件的问题。普通应用框架通常只关心一个业务流程能否跑通，而 CAMEL 关注 agent society、角色扮演、任务自动化、世界模拟、合成数据、工具集成和 benchmark。它适合研究“很多 Agent 如何通信、保留状态、生成数据、连接环境并被评估”。

## 核心逻辑

输入可以是一个单 Agent 对话任务、一个 agent society 任务、数据生成任务或仿真实验配置。系统通过 ModelFactory 创建模型，ChatAgent 持有模型、工具和状态；更复杂时由 role-playing、workforce、society 等模块组织多个 Agent 通信。Agent 可以接工具、记忆、RAG、retriever、interpreter 或 benchmark；输出可能是对话结果、合成数据、研究实验结果、工具执行结果或多 Agent 协作产物。

## 技术结构

- 关键模块：Agents 提供核心 Agent 行为；Agent Societies 管理多 Agent 协作；Data Generation 支撑 CoT/self-instruct/source2synth 等合成数据；Models 抽象模型后端；Tools/Memory/Storage/Retrievers/Runtime/Interpreters 承接外部能力；Benchmarks 和 HITL 支撑实验验证。
- 调用链路：用户创建模型和 Agent，绑定工具或 society 配置，Agent 在 step/run 中读状态、调用模型、调用工具、写记忆，多个 Agent 通过 society/workforce 协作完成任务。
- 输入输出：输入是任务、模型配置、工具、数据源、Agent 社会配置；输出是消息、数据集、任务结果、仿真状态、benchmark 记录。
- 核心依赖：Python 包 `camel-ai`，不同工具能力按 extras 安装，如 web tools；可选开启模型请求/响应 JSON 日志。

## 为什么值得参考

CAMEL 的价值在于它把 Agent Building 扩展到“实验平台”层面：不仅能做工具调用，还能做数据生成、Agent 社会、世界模拟和 benchmark。它提醒我们，多 Agent 不只有业务自动化一条路，也可以成为研究复杂行为、生成训练数据和评估协作模式的基础设施。

## 为什么不建议直接套用

CAMEL 的模块面很广，研究味较重。对具体业务或内容工作流来说，直接引入会带来过多概念：agent society、datagen、runtime、benchmark、retriever、interpreter 等都需要理解。README 的 quickstart 也显示工具能力往往需要额外依赖和 API key；若只是想让 2 到 3 个内部 Agent 协作，使用 CAMEL 可能会淹没在研究组件里。

## 如何改造成自己的版本

1. 只借鉴它的分层：Agent、Society、Tool、Memory、Benchmark，不一次性搬所有模块。
2. 若做内容或研究工作流，把 Agent Society 简化为“资料员、分析员、审稿员”三角色，并明确消息格式。
3. 把 CAMEL 的日志思想保留下来：模型请求、工具响应、协作消息都写成可回放记录。
4. 若需要合成数据，先定义数据 schema 和验证器，再让 Agent 生成，不以自然语言列表作为最终数据集。
5. 用 benchmark 思路验证角色协作是否真的比单 Agent 好，而不是只看一次演示。

## 适用场景

- 多 Agent 研究、社会仿真、合成数据生成、复杂工具协作实验。
- 需要 benchmark 或可重复实验来比较 Agent 行为。
- 想学习如何把工具、记忆、存储、retriever 和 runtime 组成 Agent 平台。

## 不适用场景

- 轻量业务自动化或只需要稳定交付文档的流程。
- 团队没有精力维护大量 extras、模型配置和实验组件。
- 对输出确定性和工程简洁度要求高于研究扩展性的场景。

## Agent Building 判断

- 多步工作流：Agent step → 工具/记忆/模型交互 → society/workforce 多 Agent 通信 → 任务结果或实验数据输出。
- 工作标准：模块按 Agent、Society、Data Generation、Tools、Memory、Benchmarks 分层，适合定义实验边界。
- Loop 标准：ChatAgent 保留状态并多轮 step，society 模块支持多 Agent 连续交互，benchmark 提供重复评估入口。
- Harness 标准：包含 benchmarks、日志开关、cookbook、use cases 和真实应用示例。
- 工具调用链路或 Agent 间通信：工具集成、Agent Societies、role-playing/workforce 形成通信链路。
- 为什么不是 persona / profile / system prompt only：它包含运行组件、工具、记忆、数据生成和评估，不只是角色模板。

## 参考信息

- 原项目：[camel](https://github.com/camel-ai/camel)
- 作者：camel-ai
- 相关概念：[[多Agent协作]]、[[Agent编排]]
- 相关卡片：[workflow-read-076](workflow-read-076.md)
