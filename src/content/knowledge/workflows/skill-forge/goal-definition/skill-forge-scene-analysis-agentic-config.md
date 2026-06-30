---
title: "目标明确参考：agentic config"
description: "一个用 pi packages 和 Claude Code plugins 分发 Agent 工作流配置的仓库，重点是把团队级自动化拆成可组合、可固定版本的配置包。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["目标明确", "可行性判断", "Skill生产线"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 目标明确"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的目标明确流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/WaterplanAI/agentic-config"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# agentic config

> 一个用 pi packages 和 Claude Code plugins 分发 Agent 工作流配置的仓库，重点是把团队级自动化拆成可组合、可固定版本的配置包。

## 这个能力解决什么问题

agentic-config 处理的是「同一套 Agent 工作流怎么在不同项目中稳定复用」。它不是让用户临时写一段 prompt，而是通过 pi package、Claude plugin 和技能包目录，把 git、QA、工具、安全、审计、workflow mux 等能力模块化。对目标明确阶段的价值在于：它要求先判断一个自动化属于哪种插件边界，是否需要后台 worker、是否需要 spec owner、是否需要安全/audit 包兜底。

## 核心逻辑

真实输入是项目对 Agent 自动化的需求、选择安装的插件包、`.pi/settings.json` 中固定的 git ref、以及 Claude Code 的 plugin 安装列表。处理逻辑是：用 `pi install` 或 Claude plugin marketplace 把包安装到项目或用户环境；`ac-workflow` 负责 spec workflow 和 pimux/mux 编排；`ac-git`、`ac-qa`、`ac-tools`、`ac-meta`、`ac-safety`、`ac-audit` 提供具体技能；mux 系列把 scout、planner、worker 或 roadmap/phase/stage 拆成可调度拓扑。输出是项目内可调用的一组技能、命令和配置，而不是某一次任务结果。

## 技术结构

- 关键模块：`canonical/` 和 `packages/` 存放可分发包；插件分为 `ac-workflow`、`ac-git`、`ac-qa`、`ac-tools`、`ac-meta`、`ac-safety`、`ac-audit`；文档包括 plugin catalog、distribution、pimux workflow topologies。
- 调用链路：团队在项目中固定 release tag -> 安装 pi/Claude plugin -> Agent 根据任务调用某个技能 -> 技能可再组合调用其他技能或启动 pimux/mux 后台流程 -> 产出 PR、QA 结果、audit log 或 workflow 进度。
- 输入输出：输入是 git ref、插件选择、项目上下文、工具权限和具体任务；输出是可复用技能表面、后台 agent 编排、JSONL 审计日志、git/QA/安全工作产物。
- 核心依赖：Pi runtime、Claude Code plugin 系统、tmux/pimux、Task 后台 agent、GitHub/git 工具，以及完整工具权限配置。

## 为什么值得参考

它把「目标是否明确」上升到分发和权限层：如果一个能力无法说明自己归属哪个 package、需要哪些工具权限、是否要后台代理、版本如何固定，就还没到可复用阶段。它也提醒 Skill Forge 不只是写 `SKILL.md`，还要考虑安装面、版本固定、组合关系和审计链。

## 为什么不建议直接套用

它强依赖 pi 与 Claude Code plugin 生态，README 明确提示 mux 工作流在 Claude Code 中需要预授权工具，甚至建议用跳过权限的运行方式；这对个人或客户项目都不是默认可接受的安全姿态。当前 README 也说明 npm per-package 发布仍是 future work，Codex/Cursor/Gemini/Antigravity 扩展属于后续计划，不能把它当成全平台成熟方案。

## 如何改造成自己的版本

把它改成「能力分包登记表」：先把自己的 Skill 分成 workflow、git、qa、tools、meta、safety、audit 七类；每类写清触发场景、允许工具、产物、审计方式和版本号。需要后台执行的流程，先用单线程 checklist 模拟 mux，等流程稳定后再引入 tmux/后台 worker。对外分发时固定 release tag，不用 floating main。

## 适用场景

- 团队已有多个 Agent 工作流，需要统一安装、升级和权限策略。
- 需要把 Scout/Planner/Worker 等多角色流程做成项目级配置。
- 需要为 git、QA、安全、审计类技能建立可组合包边界。

## 不适用场景

- 只想写一个独立 Skill，没有包管理和插件分发需求。
- 无法接受宽工具权限或后台 agent 自动执行。
- 团队没有使用 pi、Claude Code plugin 或 tmux 类工作流的基础设施。

## 参考信息

- 原项目：[agentic-config](https://github.com/WaterplanAI/agentic-config)
- 作者：WaterplanAI
- 相关概念：[[任务边界]]、[[可行性判断]]、[[能力分包]]
- 相关卡片：[workflow-read-034](../skill-forge-implementation/skill-forge-implementation-cross-agent-skills-template.md)
