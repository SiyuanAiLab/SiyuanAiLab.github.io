---
title: "Harness 与评估参考：www project agent observability standard"
description: "OWASP 的 Agent Observability Standard，围绕 inspectable、traceable、instrumentable 定义 AOS、AgBOM、OpenTelemetry/OCSF、MCP/A2A hoo"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["Harness", "trace", "observability", "Agent评估"]
prerequisites: []
related_cards: []
scenario: "Agent Building / Harness 与评估"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的Harness 与评估流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/OWASP/www-project-agent-observability-standard"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# www project agent observability standard

> OWASP 的 Agent Observability Standard，围绕 inspectable、traceable、instrumentable 定义 AOS、AgBOM、OpenTelemetry/OCSF、MCP/A2A hook 和 Guardian Agent。

## 这个能力解决什么问题

AOS 解决的是企业不能信任黑盒 Agent 的问题。Agent 会调用工具、访问记忆、检索知识、委派其他 Agent，传统日志很难说明“它里面有什么、做了什么、为什么做、能不能拦”。AOS 用标准化方式要求 Agent 可检查、可追踪、可插桩，并让 Guardian Agent 能在关键步骤允许、拒绝或修改行为。

## 核心逻辑

输入是 Observed Agent 的触发、工具调用、用户消息、记忆/知识检索、Agent 响应、A2A/MCP 交互等事件。Observed Agent 在执行步骤前后向 Guardian Agent 发送 AOS 请求；Guardian 返回 allow/deny/modify，并把事件映射到 OpenTelemetry 或 OCSF trace；同时动态维护 Agent Bill of Materials，记录模型、工具、能力、知识、记忆、MCP server 和外部服务。输出是策略决策、trace、AgBOM 以及可审计的 Agent 行为链。

## 技术结构

- 关键模块：Instrument 规范定义 Guardian 介入点；Trace 规范扩展 OpenTelemetry/OCSF；Inspect 规范定义 AgBOM 并扩展 CycloneDX/SPDX/SWID；MCP/A2A 扩展定义跨协议 hook。
- 调用链路：Agent step 触发 → AOS hook 组装 context/reasoning/request → Guardian 决策 allow/deny/modify → 行为继续或被改写 → trace 写入 OTel/OCSF → AgBOM 更新组件清单。
- 输入输出：输入是 agent context、tool call request/result、memory/knowledge events、delegation events；输出是 AOS response、trace event、BOM artifact、policy enforcement result。
- 核心依赖：这是标准/spec 项目，不是完整 SDK；实现层需要接入 OpenTelemetry、OCSF、CycloneDX/SPDX/SWID、MCP/A2A。

## 为什么值得参考

它的价值是提供一套企业级 Agent 可观测词汇表。很多项目只记录 LLM call 和工具结果，AOS 进一步要求知道 Agent 由哪些模型/工具/记忆/知识组成，以及在每个关键点是否可被 Guardian 拦截。它适合作为内部 Agent 安全与可观测规范的骨架。

## 为什么不建议直接套用

AOS 仍处于 public preview/working 草稿 色彩，README 的 roadmap 也显示大量实现还在后续版本。它不是拿来安装就能用的工具；如果没有自己的 Agent runtime 和 OTel/OCSF/BOM 管道，只会得到一份标准文档。部分文档存在拼写和占位代码，正式采用前需要 CC/安全负责人复核。

## 如何改造成自己的版本

1. 先把内部 Agent 事件对齐到 AOS 的三类目标：inspect、trace、instrument。
2. 从最少 hook 做起：trigger、toolCallRequest、toolCallResult、agentResponse、A2A send。
3. 做一个内部 AgBOM Markdown/JSON：模型、工具、记忆、知识库、外部服务、权限。
4. 对高风险工具调用引入 Guardian 决策：allow/deny/modify，并记录 reason。
5. 等字段稳定后再映射到 OpenTelemetry 或现有日志平台。

## 适用场景

- 企业 Agent 治理、合规、审计、安全可观测标准设计。
- 多 Agent、MCP、A2A、外部工具较多，需要统一事件词汇。
- 想定义内部 Agent BOM 和 Guardian Agent 模式。

## 不适用场景

- 需要立即可运行 dashboard 或 eval harness 的团队。
- 单机个人自动化，不需要标准化审计。
- 没有能力实现 hook、trace、BOM 映射的项目。

## Agent Building 判断

- 多步工作流：Observed Agent event → AOS request → Guardian decision → trace emission → AgBOM update → original action continue/deny/modify。
- 工作标准：inspectable、traceable、instrumentable 三目标和 hook/response schema 构成标准。
- Loop 标准：每个关键 step 都可被 Guardian 检查并返回 allow/deny/modify，形成治理循环。
- Harness 标准：标准定义 OTel/OCSF trace 和 AgBOM，但实现需另建，因此它是规范型 harness 参考。
- 工具调用链路或 Agent 间通信：覆盖工具调用、MCP outbound/inbound、A2A delegation 等通信点。
- 为什么不是 persona / profile / system prompt only：它是可观测和治理标准，不包含角色提示词。

## 公开版边界

- 本卡按标准和治理参考解读，不作为可直接采用的完整工具方案。

## 参考信息

- 原项目：[www-project-agent-observability-standard](https://github.com/OWASP/www-project-agent-observability-standard)
- 作者：OWASP
- 相关概念：[[Agent Harness]]、[[可观测性]]
- 相关卡片：[workflow-read-091](workflow-read-091.md)
