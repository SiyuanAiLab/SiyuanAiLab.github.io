---
title: "多 Agent 框架参考：pydantic ai"
description: "Pydantic 团队做的类型安全 Agent 框架，用 deps、output schema、tool validation、capabilities、evals 和 Logfire 追踪把 Agent 写成可检查的 Python 应用。"
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
source: "https://github.com/pydantic/pydantic-ai"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# pydantic ai

> Pydantic 团队做的类型安全 Agent 框架，用 deps、output schema、tool validation、capabilities、evals 和 Logfire 追踪把 Agent 写成可检查的 Python 应用。

## 这个能力解决什么问题

Pydantic AI 解决的是 Agent 原型里“模型说了什么很难类型检查、工具参数靠猜、输出格式靠祈祷”的问题。它用 Pydantic 的 validation 和 Python type hints 把 Agent 输入依赖、工具参数、动态指令、结构化输出和 evals 变成开发期可检查、运行期可验证的对象。

## 核心逻辑

输入是用户消息、模型配置、deps 对象、工具函数、output type 和可选 capability。Agent run 时，动态 instructions 可读取 deps，工具函数通过 RunContext 获取依赖，模型生成的工具参数和最终输出都经过 Pydantic validation；如果验证失败，错误会反馈给模型重试。输出是强类型 result.output、trace/eval 数据、streamed structured output 或 durable execution 状态。

## 技术结构

- 关键模块：`Agent` 是核心运行单元；`RunContext` 承载 dependency injection；Pydantic model 定义结构化输出；tool decorator 注册函数工具；capabilities 封装工具、hooks、instructions 和 model settings；Logfire/OTel 提供观测；evals 和 Harness 提供测试评估。
- 调用链路：业务创建 deps 与 Agent，Agent 接收消息，动态 instructions 和工具读取 deps，模型请求工具或输出，Pydantic 校验参数/输出，失败时回给模型修正，成功后返回类型化结果。
- 输入输出：输入是消息、deps、工具 schema、output schema、capability/YAML agent spec；输出是类型化对象、流式结构化数据、trace、eval report。
- 核心依赖：Python、Pydantic、Pydantic Logfire/OTel；支持 OpenAI、Anthropic、Gemini、Bedrock、Ollama、OpenRouter 等多 provider。

## 为什么值得参考

它的设计亮点不是“又一个 Agent 框架”，而是把 Agent 当成普通后端工程来写：依赖注入、类型、校验、测试、观测这些传统工程手段都能进入 LLM loop。对内部 Skill 或企业工作流来说，Pydantic AI 很适合参考“如何把模型不确定性包在可验证边界里”。

## 为什么不建议直接套用

它的优势建立在 Python 类型系统和 Pydantic 生态上。如果你的工作流主要是无代码配置、前端插件或非 Python runtime，直接套用会牺牲原有栈。它也不能自动解决 Agent 业务判断，只能保证参数和输出结构更可靠；真正的 grader、reference solution、工具副作用控制仍要自己设计。

## 如何改造成自己的版本

1. 给每个内部工作流定义 output schema，例如“研究卡”“销售线索”“QA 结果”，先让输出可验证。
2. 把本地资料库、客户配置、权限上下文做成 deps，而不是写进 prompt。
3. 工具函数先用 Pydantic schema 校验输入，失败时返回可恢复错误，不让模型直接操作松散 JSON。
4. 把 capability 作为 Skill 的工程单位：一组工具、一段指令、一组 hooks、一套模型参数。
5. 用 evals 固化 5 到 10 个失败样例，观察修改 prompt/工具后是否真的变好。

## 适用场景

- Python 后端里的生产级 Agent、客服、风控、数据查询、结构化生成。
- 需要稳定 JSON/对象输出，并希望 IDE、type checker、evals 参与开发。
- 需要在 Agent 中注入数据库连接、用户上下文或业务服务。

## 不适用场景

- 非 Python 技术栈，或团队不熟 Pydantic/type hints。
- 输出主要是开放式创意文本，结构校验价值有限。
- 没有 eval 样例，只想靠 schema 解决质量问题的场景。

## Agent Building 判断

- 多步工作流：Agent run → dynamic instructions/deps → tool calls → validation/retry → typed output/eval trace。
- 工作标准：deps_type、output_type、tool schema、capabilities 和 eval suites 形成明确契约。
- Loop 标准：工具参数和输出验证失败会反馈给模型重试，durable execution 支持长流程恢复。
- Harness 标准：Pydantic AI Harness、evals、Logfire/OTel 让运行可测试可观测。
- 工具调用链路或 Agent 间通信：工具通过 RunContext 读取依赖，MCP/UI event stream/capabilities 扩展外部通信。
- 为什么不是 persona / profile / system prompt only：核心是类型、校验、deps、工具和 eval harness，而不是角色口吻。

## 参考信息

- 原项目：[pydantic-ai](https://github.com/pydantic/pydantic-ai)
- 作者：pydantic
- 相关概念：[[多Agent协作]]、[[Agent编排]]
- 相关卡片：[workflow-read-094](workflow-read-094.md)
