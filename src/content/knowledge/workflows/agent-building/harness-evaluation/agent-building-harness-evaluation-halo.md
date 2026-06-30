---
title: "Harness 与评估参考：HALO"
description: "Hierarchical Agent Loop Optimizer，用 RLM 分析大量执行 trace，找出 harness 级失败模式，再让编码 Agent 修改 harness 并循环验证。"
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
source: "https://github.com/context-labs/HALO"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# HALO

> Hierarchical Agent Loop Optimizer，用 RLM 分析大量执行 trace，找出 harness 级失败模式，再让编码 Agent 修改 harness 并循环验证。

## 这个能力解决什么问题

HALO 解决的是 Agent harness 上线后失败模式难以从海量 trace 中归纳的问题。普通编码 Agent 读少量 trace 容易过拟合某个个案，或者因为 trace 太长丢失系统性模式。HALO 用 RLM 专门处理长 trace，识别跨执行的共同失败，再把诊断报告交给 Cursor/Claude Code 等编码 Agent 修改 harness。

## 核心逻辑

输入是 agent harness 的 OpenTelemetry-compatible trace JSONL 和一个诊断 prompt。HALO engine 递归分解 trace，分析工具调用、拒答、冗余参数、语义错误等失败模式，生成 findings report。报告进入编码 Agent，编码 Agent 修改 harness/prompt/tool contract；新 harness 再部署，继续采集 trace，重复循环。输出是诊断报告、建议修改、HALO 自身 telemetry、可选 benchmark 改善记录。

## 技术结构

- 关键模块：HALO Desktop App 提供本地运行界面；`halo-engine` Python package/CLI 读取 trace；HALO-RLM engine 做递归 trace 分析；OpenTelemetry/OpenInference 负责 trace 输入与自身 telemetry；demo 展示 OpenAI Agents SDK 集成；benchmark 示例覆盖 AppWorld。
- 调用链路：agent harness 运行并产出 trace → `halo TRACE_PATH -p ...` → engine 用 root/subagent 递归分析 → synthesis/compaction 模型归纳失败 → report → coding agent 修改 harness → 再跑任务收集新 trace。
- 输入输出：输入是 JSONL trace、prompt、model/provider/base_url/header 配置；输出是 AgentOutputItem 流、诊断报告、telemetry JSONL 或 OTLP span、benchmark 对比。
- 核心依赖：Python `halo-engine`，OpenAI-compatible provider，支持 max-depth、max-parallel、synthesis/compaction model 配置。

## 为什么值得参考

HALO 的参考价值在于把评估闭环的对象从“模型回答”提升到“harness 本身”。它关注的是工具定义、prompt、拒答循环、参数冗余、语义正确性这些可被工程修改的 failure mode。对 Agent Building 来说，这是一种很关键的思路：不是只调模型，而是让 trace 反向驱动 harness 迭代。

## 为什么不建议直接套用

HALO 适合有大量真实 trace 的高流量 Agent 部署。小样本或一次性任务没有足够方差，RLM 可能归纳不出稳定模式。README 中 AppWorld 改善数据来自特定 benchmark 和模型组合，不能直接迁移成性能承诺。它还需要 trace 质量足够高，否则 engine 分析的是残缺证据。

## 如何改造成自己的版本

1. 先把每次 Agent run 记录成统一 trace，至少包含工具调用、错误、最终 outcome。
2. 每周抽取失败 trace 做人工分类，等样本量够再引入自动 RLM 分析。
3. HALO 报告只能生成 patch 建议，必须经过人审和回归 eval。
4. 把 failure mode 映射到可修改对象：prompt、tool schema、approval、retrieval、grader。
5. 用 dev/test 分离验证，防止只针对某批 trace 过拟合。

## 适用场景

- 已有生产或准生产 Agent，有大量 trace 和明确 harness。
- 需要自动发现系统性失败模式，并迭代工具/prompt/harness。
- Benchmark 或业务 eval 可以验证修改是否泛化。

## 不适用场景

- 没有 trace、没有 eval、只有少量手工样例的早期项目。
- Trace 含敏感数据但没有脱敏和权限控制。
- 想用它直接提升模型能力，而不是改 harness 的场景。

## Agent Building 判断

- 多步工作流：collect traces → RLM trace analysis → findings report → coding agent modifies harness → redeploy → collect more traces。
- 工作标准：trace_path、prompt、model、max-depth、max-parallel、telemetry、benchmark 都是运行契约。
- Loop 标准：核心就是 harness optimization loop，依赖多轮采集和验证。
- Harness 标准：OpenTelemetry trace、HALO engine、telemetry、demo、AppWorld benchmark 构成评估/优化 harness。
- 工具调用链路或 Agent 间通信：RLM root/subagents 递归分析 trace，编码 Agent 接收报告修改 harness。
- 为什么不是 persona / profile / system prompt only：它以 trace 和 harness 修改为对象，不是角色提示词。

## 参考信息

- 原项目：[HALO](https://github.com/context-labs/HALO)
- 作者：context-labs
- 相关概念：[[Agent Harness]]、[[可观测性]]
- 相关卡片：[workflow-read-087](workflow-read-087.md)
