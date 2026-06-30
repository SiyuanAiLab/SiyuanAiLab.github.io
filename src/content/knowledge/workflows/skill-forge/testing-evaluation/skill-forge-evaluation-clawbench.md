---
title: "测试评估参考：clawbench"
description: "一个从执行 trace、可靠性、噪声和失败动力学诊断 Agent 的 benchmark，重点不是只看最终输出是否通过。"
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
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/openclaw/clawbench"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# clawbench

> 一个从执行 trace、可靠性、噪声和失败动力学诊断 Agent 的 benchmark，重点不是只看最终输出是否通过。

## 这个能力解决什么问题

openclaw/clawbench 解决的是传统 benchmark 只检查最终答案，无法解释 Agent 是怎么失败的。它记录每次运行的工具调用、文件读写、测试执行、重试和错误，把 completion、trajectory、behavior 和 judge sidecar 分开评分，并用多次运行、信噪比、失败模式和 dynamical-systems diagnostics 解释可靠性。

## 核心逻辑

真实输入是 OpenClaw/Agent 的执行 trace、Core v1 任务、插件配置指纹、模型配置和 per-run JSON。处理逻辑是：每个任务运行 3 次；确定性 verifier 检查完成度；trace 分析 read-before-write、自验证、错误恢复、危险命令；失败被归入 hallucinated_completion、tool_misuse、verification_skipped、limit-cycle 等模式；脚本对 cached runs 做 posterior dynamics、variance decomposition、SNR-weighted ranking。输出是 per-run score、task score、SNR、failure modes、dynamics report、ranking 和配置诊断。

## 技术结构

- 关键模块：`tasks-public/` 存 Core v1 19 个任务；`clawbench/` 包含 CLI、client、dynamics 等核心代码；`scripts/` 做 sweep、rejudge、posterior analysis、ranking；`profiles/` 有 example research stack；`docs/` 说明 long-term/semantic spatiotemporal dynamics、task distribution reweighting；Docker/Kubernetes 文件支持可复现运行。
- 调用链路：构建镜像 -> 列出 Core v1 manifest -> 按模型/配置运行任务 -> 生成 per-run JSON 和 trace -> analysis 脚本输出 dynamics/ranking/report。
- 输入输出：输入是任务、模型、插件配置、执行 trace 和 cached JSON；输出是完成度、trajectory/behavior 指标、13 类失败模式、SNR、constraint index 和可复现报告。
- 核心依赖：Python 3.11+、Docker、OpenClaw、numpy 分析脚本、可选 Kubernetes/MLflow、OpenRouter/Ollama 等模型接入。

## 为什么值得参考

它的核心启发是：Skill 评估不能只问结果对不对，还要看过程是否可信。一个 Skill 即使产物正确，如果没读源文件、没跑验证、循环重试、跳过证据，也不应该高分。

## 为什么不建议直接套用

它与 OpenClaw 插件架构强绑定，很多指标依赖 trace schema 和 typed plugin manifests。README 也详细列出 OpenRouter 路由漂移、平台版本漂移、共享状态污染、judge gateway failure 等复现风险；如果没有严格运行环境，这套数字会给人虚假的精确感。

## 如何改造成自己的版本

先记录最小 trace：读了哪些材料、改了哪些文件、运行了什么验证、失败后是否重试。为每个 Skill 加三条过程规则：先读后写、产物后验证、失败后改变策略。等有足够运行日志，再做失败模式分类，不急着上 SNR 和动力学分析。

## 适用场景

- 需要评估 Agent 的过程质量和稳定性。
- 需要分析「为什么失败」，不只要 pass/fail。
- 需要比较模型、插件配置和 harness 版本影响。

## 不适用场景

- 没有可记录的工具调用 trace。
- 任务只需要人工主观判断。
- 无法固定运行环境和版本，排名会漂移。

## 公开版边界

- 项目较新，成熟度待验证。

## 参考信息

- 原项目：[clawbench](https://github.com/openclaw/clawbench)
- 作者：openclaw
- 相关概念：[[执行 Trace]]、[[失败模式]]、[[可靠性评估]]
- 相关卡片：[workflow-read-038](skill-forge-evaluation-claw-bench.md)
