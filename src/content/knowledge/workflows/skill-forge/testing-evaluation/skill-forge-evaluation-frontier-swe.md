---
title: "测试评估参考：frontier swe"
description: "一个面向超长程高难软件工程任务的 benchmark，覆盖性能工程、计算科学和机器学习研究类真实问题。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["测试评估", "eval", "benchmark", "回归检查"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 测试评估"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的测试评估流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/Proximal-Labs/frontier-swe"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# frontier swe

> 一个面向超长程高难软件工程任务的 benchmark，覆盖性能工程、计算科学和机器学习研究类真实问题。

## 这个能力解决什么问题

FrontierSWE 解决的是普通代码 benchmark 过短、过窄，无法测出前沿 coding agent 在长周期技术挑战中的能力。它收集来自性能工程、科学计算、ML research 等领域的真实问题，并把每个任务做成包含环境、说明、测试、reward 计算和 solution 的独立目录。对 Skill 评估阶段的价值在于：它展示了如何把「难题」包装成可复现环境和可计算 reward。

## 核心逻辑

真实输入是某个 `tasks/<task>/` 目录、agent CLI 适配器、Docker 环境、task instruction、oracle/reward/test 脚本。处理逻辑是：benchmark 在隔离环境中启动任务；agent 读取 instruction 并修改 workspace；测试脚本或 reward 计算检查性能、正确性或目标指标；`harbor_ext/` 中的 Claude Code、Codex、Cursor、Gemini、OpenCode、Qwen 等适配器用于接入不同 agent；最终输出 reward/score 和 leaderboard 分析。

## 技术结构

- 关键模块：`tasks/` 包含 cranelift-codegen-opt、dart-style-haskell、ffmpeg-swscale-rewrite、git-to-zig、postgres-sqlite-wire-adapter、pyright-type-checking-optimization 等任务；每个任务含 `environment/Dockerfile`、`instruction.md`、`job.yaml`、`oracle.yaml`、`task.toml`、`tests/compute_reward.py`、`tests/test.sh`；`harbor_ext/` 放各 agent CLI 适配、安全、网络 allowlist、timeout 和 modal 执行；`docker/first_party_cli/` 预装一方 CLI。
- 调用链路：选择任务 -> 构建/启动 Docker 环境 -> agent adapter 执行长程修改 -> tests/reward 脚本评估 -> `scripts/score_from_reward.py` 汇总得分。
- 输入输出：输入是任务说明、代码库 workspace、agent CLI、运行预算；输出是修改后的代码、测试结果、性能 reward 和 benchmark 分数。
- 核心依赖：Docker、uv/Python、Rust/Cargo、Haskell/Dart/Zig/C/C++ 等任务语言栈、Modal/Prime Intellect 环境、各类 agent CLI。

## 为什么值得参考

它最值得参考的是任务目录契约：instruction、environment、oracle、tests、reward 分离。评估复杂 Skill 时，也应该把「给 Agent 看什么」「环境怎么建」「真值怎么定义」「分数怎么算」分开，而不是把所有规则塞进一段说明。

## 为什么不建议直接套用

README 很短，很多理解必须读目录结构；任务高度专业，依赖多语言编译环境、性能基准和重型 Docker。它测的是 frontier coding agent 的极限，不适合作为普通 Skill 回归的默认标准。成本、运行时间和硬件要求都可能远超日常工作流。

## 如何改造成自己的版本

把每个内部高难任务也做成 `task/` 目录：`instruction.md` 给 Agent，`environment.md` 或 Dockerfile 写依赖，`oracle.md` 写人工判据，`tests/` 放自动检查，`score.py` 只计算分数。先用 3 个真实任务验证目录契约，再考虑接多 Agent CLI。

## 适用场景

- 长周期代码任务、性能优化、编译器/系统/ML research 类挑战。
- 需要评估 Agent 在真实工程环境里的坚持和调试能力。
- 需要支持多个 coding agent CLI 适配。

## 不适用场景

- 短脚本、普通 CRUD 或文档生成。
- 没有 Docker/多语言工具链/性能测试环境。
- 任务无法定义 reward 或 oracle。

## 公开版边界

- 基于公开 README 解读。

## 参考信息

- 原项目：[frontier-swe](https://github.com/Proximal-Labs/frontier-swe)
- 作者：Proximal-Labs
- 相关概念：[[长程软件工程评估]]、[[Reward 计算]]、[[任务环境契约]]
- 相关卡片：[workflow-read-037](skill-forge-evaluation-crab.md)
