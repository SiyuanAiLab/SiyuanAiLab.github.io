---
title: "Skill 设计参考：skill forge"
description: "一个面向 Claude Code 的 Skill 生产系统，把规划、搭建、评审、演进、发布、转换、评估和 benchmark 做成一组分工明确的技能与脚本。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["Skill设计", "模板化", "指令结构", "能力封装"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / Skill 设计"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的Skill 设计流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/AgriciDaniel/skill-forge"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# skill forge

> 一个面向 Claude Code 的 Skill 生产系统，把规划、搭建、评审、演进、发布、转换、评估和 benchmark 做成一组分工明确的技能与脚本。

## 这个能力解决什么问题

AgriciDaniel/skill-forge 解决的是「如何把一个 Skill 从想法做成可发布工程」。它不只生成 `SKILL.md`，而是先按复杂度分层，再决定是单文件、带脚本 workflow、多子技能系统，还是企业级 ecosystem。对 Skill 设计阶段的价值在于：它把目录结构、角色分工、质量检查和多平台转换前置到设计里，而不是写完后再补。

## 核心逻辑

真实输入是用户的 skill 主题、已有 skill 路径、目标平台或评审请求。处理逻辑是：`plan` 分析用例并选择 Tier 1-4；`build` 根据 tier scaffold 出 `SKILL.md`、references、scripts、assets/templates 或 sub-skills；`review` 用六类质量维度打分；`evolve` 根据反馈修触发、说明和架构；`publish` 打包 `.skill` 和安装脚本；`convert` 输出 Codex、Gemini、Antigravity、Cursor 版本；`eval/benchmark` 生成断言、评分和多轮对比。输出是完整 skill 文件树、质量报告、平台转换件或 benchmark 结果。

## 技术结构

- 关键模块：`skill-forge/SKILL.md` 是主编排入口；`skill-forge/references/` 放 anatomy、frontmatter、hooks、patterns、platforms、testing 等设计知识；`skill-forge/scripts/` 包括 `init_skill.py`、`validate_skill.py`、`package_skill.py`、`convert_skill.py`、`generate_eval_set.py`、`aggregate_benchmark.py` 等；`skills/skill-forge-*` 拆出 plan/build/review/evolve/eval/benchmark/publish/convert 子技能；`agents/` 放 architect、writer、validator、converter、executor、grader、analyzer、comparator。
- 调用链路：命令或自然语言触发主 Skill -> 选择 plan/build/review 等子路径 -> 脚本生成或校验文件树 -> 专门 agent 负责设计、写作、验证或评分 -> 输出可发布包。
- 输入输出：输入是 skill 名称、领域、目标 tier、已有路径或目标平台；输出是 skill 目录、评分、改进建议、`.skill` 包、安装脚本、多平台版本和 eval 数据。
- 核心依赖：Python 3.10+、Claude Code、Agent Skills 标准；脚本层号称只用 Python 标准库。

## 为什么值得参考

它的项目特定亮点是 Tier 设计：不是所有 Skill 都该做成复杂系统。最小 Skill 只要单个 `SKILL.md`，需要确定性校验才加 scripts，复杂域才拆 sub-skills，企业级才上 agents。这能帮助自己的 Skill Forge 避免一上来就过度工程。

## 为什么不建议直接套用

它围绕 Claude Code slash command 和 Claude skill 目录设计，跨平台转换虽然存在，但原生行为仍以 Claude Code 为中心。仓库包含大量角色 agent 和子技能，若团队没有明确工厂流程，直接搬会变成「生产线比产品复杂」。另外它的质量分数和 benchmark 方法需要结合自己真实任务校准，不能当作通用合格线。

## 如何改造成自己的版本

先借 Tier 表：把你的 Skill 参考分成 Minimal、Workflow、Multi-Skill、Ecosystem 四类。只为 Workflow 以上引入脚本；只为 Multi-Skill 以上引入子技能；只有跨项目复用、多人维护时才考虑 agents。评审维度可以保留「触发、边界、输入输出、验证、分发」，但评分样例要换成自己的真实工作流。

## 适用场景

- 需要从零设计一套 Skill 生产线，而不是零散写技能。
- 需要把同一 Skill 发布到不同 Agent 平台。
- 需要用评审、eval 和 benchmark 管住 Skill 质量。

## 不适用场景

- 只写一两个内部轻量 Skill。
- 没有 Claude Code 环境或不采用 Agent Skills 标准。
- 还没有真实案例，无法验证评分和 benchmark 是否有效。

## 公开版边界

- 外部系统集成需保留人工确认，本卡只保留方法论参考。

## 参考信息

- 原项目：[skill-forge](https://github.com/AgriciDaniel/skill-forge)
- 作者：AgriciDaniel
- 相关概念：[[Skill 设计]]、[[复杂度分层]]、[[质量评审]]
- 相关卡片：[workflow-read-027](skill-forge-design-skillforge.md)
