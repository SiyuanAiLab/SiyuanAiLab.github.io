---
title: "Harness 与评估参考：agent lens"
description: "一个多会话 Agent 轨迹 harness，可运行 Claude Code/Codex、捕获 ATIF 轨迹、追踪文件 diff、重放/重采样并记录 subagent。"
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
source: "https://github.com/dreadnode/agent-lens"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# agent lens

> 一个多会话 Agent 轨迹 harness，可运行 Claude Code/Codex、捕获 ATIF 轨迹、追踪文件 diff、重放/重采样并记录 subagent。

## 这个能力解决什么问题

AgentLens 解决的是“Agent 做了什么无法复盘”的问题。编码 Agent 往往跨多轮、多会话、多文件甚至多个子 Agent 工作，单看最终 diff 不知道它为什么这么改、哪一步写了文件、子 Agent 做了什么、同一个 session 换一次采样会不会不同。AgentLens 把这些运行过程标准化成 ATIF 轨迹，并用 shadow git 记录文件状态变化。

## 核心逻辑

输入是一份 YAML 实验配置：engine、provider、model、work_dir、session_mode、allowed_tools、sessions、subagents 和可选 judge。Harness 按 session 顺序运行 Claude Code 或 Codex，工作目录中的文件变化由隐藏 shadow git 追踪，每个 Agent step、tool call、observation、thinking block 被写成 ATIF。可选择 isolated/chained/forked session，做 session resampling、turn-level replay，或让 auto-judge 按 rubric 每 N 轮检查并 early exit。输出是 run 目录、ATIF JSON、state_changelog、diff、judge verdict 和 web UI 可视化。

## 技术结构

- 关键模块：engine adapter 支持 Claude Code SDK 和 Codex CLI；config YAML 定义实验；shadow git 追踪文件；ATIF adapter 标准化轨迹；session modes 管理上下文继承；subagent capture 链接 parent/child trajectory；judge 模块做在线 rubric 检查；UI 展示 run/diff/memory。
- 调用链路：加载 YAML → 准备 work_dir/memory → 调 engine 执行 session → 捕获工具和消息 → shadow git 记录 step-level diff → 可选 judge/resample/replay → 输出 run artifacts。
- 输入输出：输入是项目目录、会话 prompt、工具白名单、engine/provider auth；输出是 ATIF、run_meta、session_diff、state_changelog、judge.jsonl、subagent trajectory。
- 核心依赖：Python 3.12+、uv、Claude Code 或 Codex CLI；UI 需要 Node/npm。

## 为什么值得参考

它把 Agent 评估从“看结果”推进到“看轨迹”。尤其是 shadow git 的设计很实用：不要求 Agent 主动报告自己改了什么，而是在外部追踪每步文件变化。对于研究 Agent 行为、调试子 Agent 和做工作流验收，它比普通日志更有证据力。

## 为什么不建议直接套用

AgentLens 是研究/实验 harness，不是业务执行框架。它会注入工作目录路径、创建 memory 文件、使用 shadow git、捕获 reasoning/工具轨迹，这些在隐私或企业环境中必须审查。Codex API capture 和 resampling 可能需要带计费 API key；turn-level replay 仍标注实验性，不能直接当生产审计保证。

## 如何改造成自己的版本

1. 先采用它的配置思想：每次评估都用 YAML 固定 engine、work_dir、工具、sessions 和预算。
2. 在内部工作流中实现 shadow diff 或最小文件变更记录，不依赖 Agent 自述。
3. 每个子 Agent 产出单独轨迹，并在父轨迹里只放引用，避免日志混乱。
4. 用 judge rubric 做早停只限低风险实验，不让 judge 自动批准生产动作。
5. 定期重采样同一任务，观察失败模式是否稳定，而不是只跑一次。

## 适用场景

- 编码 Agent、研究 Agent、子 Agent 行为分析、轨迹复盘。
- 需要比较 Claude Code 与 Codex 等不同 engine 的执行差异。
- 需要 session chaining/forking/resampling 的实验。

## 不适用场景

- 不允许捕获工具轨迹、文件 diff 或 reasoning 的敏感项目。
- 只需要简单线上监控，不需要重放/重采样的业务应用。
- 希望开箱即用评估业务质量但没有 rubric 和任务集的团队。

## Agent Building 判断

- 多步工作流：YAML sessions → engine run → trajectory capture → shadow diff → judge/resample/replay → inspect UI。
- 工作标准：config 明确 engine、tools、session mode、budget、memory、subagents、judge rubric。
- Loop 标准：session chaining/forking、resampling、turn-level replay 和 auto-judge early exit 支撑实验循环。
- Harness 标准：ATIF、shadow git、state_changelog、run_meta、web UI、judge 构成完整 harness。
- 工具调用链路或 Agent 间通信：捕获 Claude/Codex 工具调用和 subagent trajectory ref。
- 为什么不是 persona / profile / system prompt only：它是运行、捕获、重放和评估框架，不是提示词库。

## 参考信息

- 原项目：[agent-lens](https://github.com/dreadnode/agent-lens)
- 作者：dreadnode
- 相关概念：[[Agent Harness]]、[[可观测性]]
- 相关卡片：[workflow-read-095](workflow-read-095.md)
