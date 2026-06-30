---
title: "Skill 设计参考：SkillForge"
description: "一个把 Skill 创建方法论化的 Claude/Codex 技能，强调四阶段架构、11 个分析视角、XML 规格和多 Agent 一致通过。"
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
source: "https://github.com/tripleyak/SkillForge"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# SkillForge

> 一个把 Skill 创建方法论化的 Claude/Codex 技能，强调四阶段架构、11 个分析视角、XML 规格和多 Agent 一致通过。

## 这个能力解决什么问题

tripleyak/SkillForge 解决的是 Skill 创建过程过于随意的问题。它把「想到一个技能」拆成 triage、deep analysis、specification/generation、multi-agent synthesis 四阶段，并在 v5.2 加入 Context Skill Advisor，主动根据会话/项目/个人上下文建议是否需要现有技能、改进技能、创建新技能或组合技能。

## 核心逻辑

真实输入是用户的自然语言目标、当前会话上下文、项目上下文、个人上下文和已有 skill 列表。处理逻辑是：Phase 0 先做 triage，判断 USE_EXISTING、IMPROVE_EXISTING、CREATE_NEW 或 COMPOSE；Phase 1 用 11 个 thinking lenses 深挖问题；Phase 2 把分析转成结构化 XML spec；Phase 3 用 fresh context 生成 skill 并迭代；Phase 4 交给设计、可用性、演进、脚本等 panel 审查，要求一致通过。Context Advisor 则按 proactivity level 把建议写入 advisory queue，需用户确认后才调用。

## 技术结构

- 关键模块：`SKILL.md` 是主技能；`references/` 包含 regression questions、multi-lens framework、specification template、evolution scoring、synthesis protocol、degrees of freedom、iteration guide；`assets/templates/` 有 skill spec、skill md 和脚本模板；`scripts/` 包含 `triage_skill_request.py`、`discover_skills.py`、`init_skill.py`、`validate-skill.py`、`package_skill.py`、`context_advisor.py`、`advisor_scoring.py`、`install_skillforge.py`。
- 调用链路：用户目标或 advisor checkpoint -> triage -> 深度分析 -> XML spec -> skill generation -> iteration -> multi-agent synthesis -> package/安装。
- 输入输出：输入是目标、已有技能库、上下文来源、proactivity level；输出是新 skill、规格文档、advisor 建议、验证结果和 `.skill` 包。
- 核心依赖：Codex CLI 或 Claude Code CLI、Python 3.8+、本地 skill 目录、可选 advisor 配置和 scheduled advising。

## 为什么值得参考

它的强项是把 Skill 设计前的判断做得很细：先确认是不是已有 skill 能解决，再决定改进、创建或组合；再用 degrees of freedom 判断哪些地方该写死、哪些地方只给原则。这能避免把所有能力都写成同一种详细程度。

## 为什么不建议直接套用

它方法论很重，适合高价值 Skill，不适合每个小工具都走 11 lenses 和 panel 审查。v5.2 的 proactive advisor 会读取会话、项目和个人上下文，虽然有确认机制，但在客户项目里需要明确隐私边界。README 的手动安装示例还涉及复制到用户 skill 目录和清理文件，不能无审查自动跑。

## 如何改造成自己的版本

保留 Phase 0 和 degrees of freedom：每个参考先判定 `use_existing / improve_existing / create_new / compose`，再为每个步骤标注 high/medium/low freedom。只有高风险或长期复用的 Skill 才进入 11 lenses 和多 Agent synthesis；普通内容工作流用轻量三问：目标、边界、验收。

## 适用场景

- 需要为高价值 Skill 做系统化设计和评审。
- 需要主动发现「现在该调用哪个 Skill」。
- 需要在 Skill 中区分原则指导、伪代码和确定性脚本。

## 不适用场景

- 小型一次性流程，设计成本高于收益。
- 对会话/项目/个人上下文读取非常敏感的环境。
- 团队没有 Claude/Codex skill 目录和 Python 脚本执行条件。

## 参考信息

- 原项目：[SkillForge](https://github.com/tripleyak/SkillForge)
- 作者：tripleyak
- 相关概念：[[Skill 设计]]、[[自由度设计]]、[[多 Agent 评审]]
- 相关卡片：[workflow-read-026](skill-forge-design-agricidaniel-skill-forge.md)
