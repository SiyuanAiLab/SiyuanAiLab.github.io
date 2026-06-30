---
title: "多 Agent 框架参考：openai agents python"
description: "一个以 Agent、Runner、工具、handoff、guardrail 和 tracing 为核心的轻量 Python 多 Agent SDK。"
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
source: "https://github.com/openai/openai-agents-python"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# openai agents python

> 一个以 Agent、Runner、工具、handoff、guardrail 和 tracing 为核心的轻量 Python 多 Agent SDK。

## 这个能力解决什么问题

OpenAI Agents SDK 解决的是“我已经有模型和工具，但缺一个可维护的运行循环”的问题。很多 Agent 原型把工具调用、上下文、转交、输入输出检查和日志追踪写在业务代码里，越做越散。这个 SDK 把这些共性环节收进 `Agent` 与 `Runner`：Agent 声明模型、指令、工具、guardrail、handoff；Runner 负责多轮运行、工具执行、转交历史、session 和 trace。

## 核心逻辑

输入是用户消息、可选上下文对象、Agent 配置和运行配置；Runner 启动一次 agent run，模型可以调用函数工具、MCP/Hosted tools、Computer/Shell 等工具，也可以通过 handoff 把对话控制权交给专门 Agent。Guardrail 在首个输入、最终输出或函数工具调用前后执行检查；tracing 默认记录 LLM generation、tool call、handoff、guardrail 等 span。输出是最终 response、结构化输出、工具结果、session 历史与 trace。

## 技术结构

- 关键模块：`Agent` 定义指令、工具、handoffs、guardrails 和 output type；`Runner` 执行同步/异步/streamed run；`function_tool` 和 MCP/hosted tools 提供工具面；`handoff()` 定义转交目标、schema、callback 和 input filter；`RunConfig` 控制 sandbox、trace、tool execution 等运行行为。
- 调用链路：用户请求进入 Runner，Runner 调用当前 Agent，模型选择工具或 handoff，SDK 执行工具并把结果回填，直到输出或转交链结束；trace processor 同步记录 span。
- 输入输出：输入是消息、context/deps、Agent 配置、Sandbox manifest 或 session；输出是 final_output、run items、tool outputs、guardrail exceptions、trace 数据。
- 核心依赖：Python 3.10+，默认支持 OpenAI Responses/Chat Completions，也可经 `any-llm`/LiteLLM 接 100+ 模型；依赖 Pydantic、MCP Python SDK、pytest 等生态。

## 为什么值得参考

它把多 Agent 协作拆成两个清晰模式：manager 把其他 Agent 当工具调用，或 handoff 让专门 Agent 接管对话。这个区分很适合做内部工作流设计：前者适合主 Agent 保持控制，后者适合客服、审核、工单等“换处理人”的流程。它还把 guardrail 和 trace 放在一等位置，说明 production Agent 不是只要会调用工具，还要能被检查和复盘。

## 为什么不建议直接套用

SDK 与 OpenAI 平台和 trace dashboard 结合紧密，虽然 provider-agnostic，但许多高级体验会受模型、API key、trace 数据敏感性和工具后端影响。Sandbox Agent 会涉及真实文件、命令和补丁能力，若没有明确权限边界，很容易把“能做事”变成“越权做事”。此外，handoff 默认会传递对话历史，企业场景必须额外设计 input filter 和敏感信息裁剪。

## 如何改造成自己的版本

1. 先决定每个子 Agent 是“工具型”还是“接管型”，不要把所有专家都做成 handoff。
2. 给每个工具加输入/输出 guardrail，尤其是写文件、发请求、查私密数据这类动作。
3. 把 trace 字段设计成能回答“谁在何时因为什么调用了什么工具”，再决定是否接 OpenAI trace 或自建日志。
4. 对长任务使用 Sandbox Agent 时，用 manifest 定义可见文件和能力，不把本机工作区整块暴露给 Agent。
5. 用 3 个真实任务跑通：正常路径、工具失败路径、handoff 误判路径，再沉淀成内部 Skill。

## 适用场景

- Python 项目里需要轻量多 Agent、工具调用、handoff 和 trace。
- 想把函数工具、MCP、hosted tools、sandbox workspace 接入同一个 Agent run。
- 需要可观察的多 Agent 原型，而不是手写 while-loop。

## 不适用场景

- 完全不使用 Python，或不能依赖外部 LLM SDK 的项目。
- 对数据留存、trace 上传、工具权限没有治理方案的企业流程。
- 只需要一次模型调用或简单函数调用的轻任务。

## Agent Building 判断

- 多步工作流：Runner 执行 Agent → 模型选择工具/转交 → SDK 执行并回填 → guardrail/tracing 记录 → 输出或继续循环。
- 工作标准：Agent 配置明确 instructions、tools、handoffs、guardrails、output type 和 context 边界。
- Loop 标准：Runner 管理多轮工具调用、handoff 和 session；tool choice、stop behavior、guardrail tripwire 可控制停止条件。
- Harness 标准：内置 tracing、session、sandbox、hooks，并可把 trace processor 替换为自定义后端。
- 工具调用链路或 Agent 间通信：函数工具、MCP、hosted tools、Agent-as-tool 与 handoff 两套 Agent 间通信机制。
- 为什么不是 persona / profile / system prompt only：核心是 SDK 运行时、工具执行、转交与追踪，不是角色提示词集合。

## 参考信息

- 原项目：[openai-agents-python](https://github.com/openai/openai-agents-python)
- 作者：openai
- 相关概念：[[多Agent协作]]、[[Agent编排]]
- 相关卡片：[workflow-read-081](workflow-read-081.md)
