---
title: "Sub-agent 模式参考：claude rlm"
description: "一个 Claude Code Skill，把超长输入当作外部对象切片处理，并通过 tmux 子 Claude 递归分析后再聚合。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["Sub-agent", "任务委派", "专家Agent", "Agent通信"]
prerequisites: []
related_cards: ["ai-core-30-delegation", "ai-core-25-multi-agent-system"]
scenario: "Agent Building / Sub-agent 模式"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的Sub-agent 模式流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/Tenobrus/claude-rlm"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# claude rlm

> 一个 Claude Code Skill，把超长输入当作外部对象切片处理，并通过 tmux 子 Claude 递归分析后再聚合。

## 这个能力解决什么问题

claude-rlm 解决的是长上下文不等于全文阅读的问题。普通 Agent 读超长材料时，容易只处理前几段、依赖训练记忆猜测剩余内容，或用摘要压缩丢掉细节。RLM 的思路是把长输入存成外部文件/变量，只把元信息和切片操作交给模型，让模型用程序化方式拆分、并行调用子模型、聚合结果，从而覆盖全量材料。

## 核心逻辑

输入是一份超长文本或材料对象。主 Claude Code 不把全文塞进上下文，而是用 bash 查看长度和预览，按 chunk 写 prompt 文件，然后调用 `rlm-batch` 并行启动多个 `rlm-query`。每个子 Agent 在 tmux 会话中运行 `claude -p`，可继续递归切分自己的输入。结果写成文件，主 Agent 再用代码聚合。输出是覆盖所有 chunk 的分析结果、聚合文件和最终回答。

## 技术结构

- 关键模块：`SKILL.md` 只负责触发并指向主说明；`rlm-agent.md` 是递归分析指令源；`rlm-query` 创建 tmux 子 Claude、控制深度、超时和并发槽；`rlm-batch` 批量并行处理 prompt 文件。
- 调用链路：主会话接收长任务 → 文件系统保存输入 → bash split/sed 切片 → rlm-batch fan-out → rlm-query 子 Agent 分析 → 子结果落盘 → 主会话聚合。
- 输入输出：输入是长文本文件、chunk prompt、环境变量配置；输出是每个 chunk 的 `.out`、聚合变量/文件和最终总结。
- 核心依赖：Claude Code CLI、tmux、bash 文件系统、Unix 并发锁；配置通过 `RLM_DEPTH`、`RLM_MAX_DEPTH`、`RLM_MAX_PARALLEL` 等环境变量传递。

## 为什么值得参考

它的参考价值很尖锐：Sub-agent 不只是“找专家”，也可以是“把同一认知任务递归分发到材料切片”。它还把并发、深度、超时、观测放在脚本层，而不是让模型自己口头承诺会读完。

## 为什么不建议直接套用

README 本身明确建议 clean-room reimplement，而不是直接安装随机 GitHub skill，因为 skill/prompt 会影响 Claude Code 行为。它依赖 tmux 和 Claude CLI，本地会同时启动大量子进程，成本、速率限制和安全边界都要管。对需要保密材料的场景，递归写文件和多子会话也会扩大数据暴露面。

## 如何改造成自己的版本

1. 只复制架构思想：外部对象、切片、递归子任务、聚合，不复制 prompt 或脚本。
2. 先限制最大深度和最大并发，例如 2 层、3 到 5 个并发，避免成本失控。
3. 每个子任务输出固定 schema：范围、发现、证据位置、不确定项。
4. 聚合阶段必须检查 chunk 覆盖率，不能只读成功子任务。
5. 对敏感文本加临时目录、自动清理和权限隔离。

## 适用场景

- 长书、长日志、长代码库、海量文档的全覆盖阅读。
- 需要并行分析并保留 chunk 级证据的任务。
- 想研究递归子 Agent 和外部记忆对象的模式。

## 不适用场景

- 材料不长，普通上下文可完整处理。
- 运行环境没有 tmux/Claude CLI，或不允许子进程 fan-out。
- 敏感材料不能落盘或不能进入多个子会话。

## Agent Building 判断

- 多步工作流：长输入外部化 → 切片 → rlm-batch fan-out → 子 Agent 递归分析 → 文件聚合 → 最终回答。
- 工作标准：每个 chunk 独立 prompt/out 文件，深度、超时、并发通过环境变量控制。
- Loop 标准：子 Agent 可再次调用 rlm-query/rlm-batch，形成深度 N 递归循环。
- Harness 标准：tmux 会话可观察，slot pool 限并发，timeout 和 depth tracking 控制运行。
- 工具调用链路或 Agent 间通信：主/子 Agent 通过文件系统和 tmux/CLI 通信，结果以文件聚合。
- 为什么不是 persona / profile / system prompt only：它有实际脚本、并发控制、递归调用和文件协议。

## 参考信息

- 原项目：[claude-rlm](https://github.com/Tenobrus/claude-rlm)
- 作者：Tenobrus
- 相关概念：[[Sub-agent模式]]、[[长上下文处理]]
- 相关卡片：[workflow-read-086](workflow-read-086.md)
