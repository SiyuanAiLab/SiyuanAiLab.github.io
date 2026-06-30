---
title: "工作流编排参考：crewAI"
description: "用 Crews 表达自治 Agent 团队，用 Flows 表达事件驱动控制流的 Python 多 Agent 自动化框架。"
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
source: "https://github.com/crewAIInc/crewAI"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# crewAI

> 用 Crews 表达自治 Agent 团队，用 Flows 表达事件驱动控制流的 Python 多 Agent 自动化框架。

## 这个能力解决什么问题

CrewAI 解决的是“纯自治 Agent 太不可控，纯工作流又不够灵活”的问题。它把系统拆成两层：Crews 负责角色协作和任务分工，Flows 负责状态、分支、路由和生产逻辑。这样既能让研究员、分析员等 Agent 自主完成任务，也能用明确的流程控制它们在何时启动、如何交接、何时需要确定性 Python 代码处理。

## 核心逻辑

输入通常是项目 scaffold、`agents.yaml`、`tasks.yaml`、Python crew/flow 代码和运行时 inputs。Crew 定义 Agent 的 role、goal、backstory、tools 和 Task 的 description、expected_output、agent、output_file；运行时 `kickoff` 把 inputs 注入任务，按 sequential 或 hierarchical process 执行。Flows 则提供 event-driven 状态流，可把 Crew 嵌入到更受控的生产流程中。输出是控制台结果、报告文件、结构化任务结果或工作流状态。

## 技术结构

- 关键模块：Agent/Crew/Task/Process 构成 Crew 层；Flow 提供事件驱动控制、状态、分支和路由；CLI scaffold 生成 `crew.py`、`main.py`、`agents.yaml`、`tasks.yaml`；tools、memory、knowledge、MCP/A2A、checkpointing 支撑更复杂能力。
- 调用链路：CLI 创建项目 → YAML 定义角色和任务 → `crew.py` 绑定工具和 process → `main.py` 传入 inputs → Crew 按任务顺序或 manager 协调执行 → 输出报告或状态。
- 输入输出：输入是 topic/业务参数、Agent/Task 配置、工具 key；输出是 report.md、任务结果、流式事件、Flow 状态或集成动作。
- 核心依赖：Python >=3.10 <3.14，uv 安装；可选 `crewai[tools]`，示例里常接 Serper、OpenAI 或其他 LLM API。

## 为什么值得参考

CrewAI 的设计亮点是把“自治”和“控制”分层表达：Crew 适合团队协作，Flow 适合生产流程。这个区分对内部工作流很有启发：不是所有东西都要做成 Agent，也不是所有流程都该用 if/else 写死。它还把 YAML 配置和 Python 代码结合，适合非纯程序员先读懂结构，再让工程层补工具。

## 为什么不建议直接套用

CrewAI 示例很容易诱导人把 role/goal/backstory 写得很漂亮，但真正质量取决于 expected_output、工具、评估和流程控制。安装工具包可能引入额外依赖，例如 tiktoken/Rust 编译问题。默认 YAML 项目也会生成 `.env` 使用方式，企业或团队内部需要改成更严格的密钥与权限管理。

## 如何改造成自己的版本

1. 用 Crew 表达需要判断和综合的部分，用 Flow 表达必须可靠执行的节点。
2. 每个 Task 必须写 expected_output、验收标准和输出文件，而不只写角色背景。
3. 把工具接入放在 `crew.py` 层，YAML 只写任务语义，避免配置里藏执行副作用。
4. 对 sequential/hierarchical 两种 process 各跑一个样例，比较 manager 是否真的提升质量。
5. 为每个 Crew 增加最终 reviewer task，不让生成结果直接进入交付。

## 适用场景

- 研究报告、市场分析、旅行规划、岗位描述、销售资料等多角色内容/业务自动化。
- 需要把 Agent 自主协作嵌入明确生产流程。
- 希望用 YAML 管理角色和任务，用 Python 管工具和流程。

## 不适用场景

- 对输出正确性有硬约束但没有 eval/测试的流程。
- 不需要多角色，只是单次模型调用或简单工具调用。
- 无法维护 API key、第三方搜索工具和 Python 依赖的环境。

## Agent Building 判断

- 多步工作流：inputs → Agent/Task YAML → Crew sequential/hierarchical process → Flow 控制分支和状态 → 输出文件/结果。
- 工作标准：Agent role/goal/backstory、Task description/expected_output/output_file、Process 明确交付契约。
- Loop 标准：hierarchical manager 可规划、委派和验证；Flows 提供状态分支、checkpoint 和 deterministic steps。
- Harness 标准：CLI scaffold、examples、verbose logs、checkpointing、human input 和集成生态支撑运行验证。
- 工具调用链路或 Agent 间通信：Agent 绑定 tools，Crew 按 Task 传递上下文，Flows 连接 Crew 与 Python 业务逻辑。
- 为什么不是 persona / profile / system prompt only：CrewAI 有运行时、任务配置、流程控制和工具集成，角色设定只是其中一层。

## 参考信息

- 原项目：[crewAI](https://github.com/crewAIInc/crewAI)
- 作者：crewAIInc
- 相关概念：[[Agent编排]]、[[多Agent协作]]
- 相关卡片：[workflow-read-081](workflow-read-081.md)
