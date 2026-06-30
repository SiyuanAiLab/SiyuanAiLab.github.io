---
title: "测试评估参考：claw bench"
description: "一个让真实 AI Agent 直接完成任务、再用 pytest verifier 和加权检查点评分的公开 benchmark。"
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
source: "https://github.com/claw-bench/claw-bench"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# claw bench

> 一个让真实 AI Agent 直接完成任务、再用 pytest verifier 和加权检查点评分的公开 benchmark。

## 这个能力解决什么问题

claw-bench 解决的是「Agent 看起来会做事，但缺少标准化回归任务」的问题。它把评估对象从模型输出文本换成真实 Agent 产品：Agent 读 `skill.md`，完成文件、数据、工作流、系统、安全、代码、沟通、邮件、日历、网页等任务，最后由 verifier 评分并提交 leaderboard。对 Skill 评估阶段的价值是，它展示了如何把抽象能力拆成具体任务库和可执行检查点。

## 核心逻辑

真实输入是任务文件、Agent 读到的 benchmark skill 指令、可选 OpenClaw/CMDOP 或 OpenAI-compatible endpoint，以及 Agent 产出的结果目录。处理逻辑是：Agent 自己执行任务；每个任务配套 pytest verifier；检查点按权重分为核心、标准、bonus；系统把每个任务分数聚合成 efficiency/security/skills/ux 等维度和 overall 分数；quick test 选 20 个代表任务用于冒烟。输出是 task score、dimension score、overall score、results 目录和可提交 leaderboard 的记录。

## 技术结构

- 关键模块：`src/claw_bench/core` 管 runner、verifier、scorer；`src/claw_bench/cli` 提供 submit/validate/doctor/run；`tasks/` 存 313 个任务定义；`skills/` 存给 Agent 读取的 skill.md；`config/` 管任务选择和模型配置；`leaderboard/` 是 Next.js 前端；`docker/` 管容器镜像。
- 调用链路：安装包 -> Agent 读取 benchmark skill -> 执行指定 tasks -> pytest verifier 检查输出 -> CLI 汇总并提交结果。
- 输入输出：输入是任务说明、任务资产、Agent 运行环境和结果目录；输出是 verifier 通过率、加权分数、维度分、leaderboard submission。
- 核心依赖：Python、pytest、FastAPI server、Next.js leaderboard、Docker、OpenClaw/CMDOP 或 OpenAI-compatible agent endpoint。

## 为什么值得参考

它最适合借鉴的是 weighted checkpoint：核心正确性、标准质量和 bonus 严格度分开。评估自己的 Skill 时，不要只写「通过/失败」，而要把关键产物、格式、命名、无占位符、无重复等条件分权重。

## 为什么不建议直接套用

它是通用 Agent benchmark，任务数量大且领域广，不等于某个内部 Skill 的验收标准。README 中任务数量处有 313/314、32/33 的口径差异，正式引用前需要复核当前版本。Leaderboard 和服务器端重算也不是内部工作流一开始必须拥有的能力。

## 如何改造成自己的版本

为每个 Skill 建 5-10 个小任务，先写 pytest 或脚本 verifier。每个任务固定三类检查：core（必须产物）、standard（格式/字段/路径）、bonus（质量或边界）。先做 quick smoke set，再做全量 regression；不要先做 leaderboard。

## 适用场景

- 需要评估 Agent 是否真正完成任务，而不是生成好看的回答。
- 需要把任务库按领域和难度分层。
- 需要给 Skill 建 weighted regression suite。

## 不适用场景

- 任务无法用文件/状态/verifier 检查。
- 只有少量主观内容质量评审。
- 不需要公开排名或跨 Agent 比较。

## 公开版边界

- 项目较新，成熟度待验证。

## 参考信息

- 原项目：[claw-bench](https://github.com/claw-bench/claw-bench)
- 作者：claw-bench
- 相关概念：[[评估基准]]、[[回归测试]]、[[加权检查点]]
- 相关卡片：[workflow-read-040](skill-forge-evaluation-clawbench.md)
