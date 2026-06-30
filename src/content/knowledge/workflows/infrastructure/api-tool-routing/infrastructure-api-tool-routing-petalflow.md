---
title: "API 网关与工具路由参考：petalflow"
description: "一个用 Go 构建的轻量 Agent 工作流图运行时，把 LLM 步骤、工具、路由、webhook、调度和事件流编排成显式图。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["API网关", "工具路由", "function calling", "权限边界"]
prerequisites: []
related_cards: []
scenario: "基础设施层 / API 网关与工具路由"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的API 网关与工具路由流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/petal-labs/petalflow"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# PetalFlow

> 一个用 Go 构建的轻量 Agent 工作流图运行时，把 LLM 步骤、工具、路由、webhook、调度和事件流编排成显式图。

## 这个能力解决什么问题

很多 Agent 工作流停留在“提示词加几个工具”的层面，难以验证执行顺序、失败节点和人工审批点。PetalFlow 解决的是把 AI 工作流写成可验证的 Agent/Task YAML 或 Graph IR，让同一套流程可以从 Go SDK、CLI 或 HTTP daemon 运行，并把运行事件保存下来用于调试。

## 核心逻辑

输入可以是高层 Agent/Task YAML、低层 Graph IR JSON，或 daemon API 收到的运行请求。处理层先 validate，再把 Agent/Task compile 成 Graph IR；运行时按节点和边执行 LLM 节点、工具节点、transform、route、human gate、webhook trigger/call 等；每个节点产生事件并可流式输出。输出是最终工作流结果、Graph IR 文件、SQLite 中的 workflows/schedules/tools/events 记录，以及 OpenTelemetry trace/metrics。

## 技术结构

- **Authoring 层**：Agent/Task YAML 用 agent、task、execution 描述角色、任务和顺序；Graph IR 是更低层运行格式。
- **CLI 层**：`validate` 检查工作流，`compile` 转 Graph IR，`run` 执行 YAML 或 JSON，daemon 提供 API。
- **Runtime 层**：显式图节点处理 LLM、tool call、router、human gate、webhook、schedule。
- **持久化与观测**：SQLite 保存 workflows、schedules、tools、events；事件包括 run、node、tool、route，并可导出 OpenTelemetry。
- **外部工具**：README 提到 tool registry 和 MCP integration，可把 MCP 工具挂入 workflow。

## 为什么值得参考

PetalFlow 虽然星标很低，但结构判断价值高：它把 Agent 工作拆成作者格式、编译格式、运行时事件和 daemon API。对内部工作流系统来说，“YAML 高层意图 → Graph IR → 事件流”的链路比直接堆提示词更容易测试和复盘。

## 为什么不建议直接套用

项目星标和生态都很小，成熟度、社区反馈和生产案例不足；Go runtime 也未必符合你的主要工程栈。它覆盖 LLM、工具、MCP、webhook、cron、SQLite、OTel，直接采用会引入一整套运行时选择。作为参考可以，作为核心生产依赖需要 CC 复核和实际跑样例。

## 如何改造成自己的版本

借它的文件格式思路：为内部 Skill 定义 agent/task/execution 三段，先只支持顺序执行、条件路由和人工审批三类节点；每次运行写事件日志，至少包含 node.started、node.finished、node.failed、tool.call。等流程稳定后，再考虑 compile 成更低层 IR。

## 适用场景

- 需要把 Agent 流程显式化、可校验、可回放。
- 工作流包含 LLM、工具、路由、人工审批和定时触发。
- 团队愿意维护 Go/CLI/daemon 形态的运行时。

## 不适用场景

- 只需要单次模型调用或简单脚本。
- 项目必须依赖成熟生态和大量社区案例。
- 不希望引入额外 Graph IR、SQLite 和 daemon API。

## 公开版边界

- 项目较新，成熟度待验证。

## 参考信息

- 原项目：[petalflow](https://github.com/petal-labs/petalflow)
- 作者：petal-labs
- 相关概念：[[工作流编排]]、[[Graph IR]]、[[OpenTelemetry]]
- 相关卡片：保守留空
