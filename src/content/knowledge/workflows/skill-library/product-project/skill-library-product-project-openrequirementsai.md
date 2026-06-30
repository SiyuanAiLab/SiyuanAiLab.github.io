---
title: "产品与项目参考：OpenRequirementsAI"
description: "一个 DeFOSPAM 需求验证 Skill，用 7 个分析角色从定义、特性、结果、场景、预测、歧义和缺失七个角度审查需求。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["产品管理", "PRD", "需求分析", "项目管理"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 产品与项目"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的产品与项目流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/AgenticTesting/OpenRequirementsAI"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# OpenRequirementsAI

> 一个 DeFOSPAM 需求验证 Skill，用 7 个分析角色从定义、特性、结果、场景、预测、歧义和缺失七个角度审查需求。

## 这个能力解决什么问题

它解决的是 PRD/需求说明“看起来完整，但读者无法预测系统行为”的问题。输入可以是 `.docx/.pdf/.md/.txt` 需求文件、用户故事或粘贴文本；输出包括聊天摘要、Markdown 报告、HTML 报告和可选 JSON 结果，内容包含 glossary、business stories、scenario tables、findings 和严重度。

## 核心逻辑

DeFOSPAM 把需求质量拆成 7 个原则：Definitions、Features、Outcomes、Scenarios、Prediction、Ambiguity、Missing。Claude Code/Cowork 有 subagent 时，按三阶段并行运行：先定义和特性，再结果/场景/歧义，最后预测和缺失；没有 subagent 时按顺序执行。最终聚合、去重、生成报告，并可做 diff mode 跟踪改进。

## 技术结构

- 关键模块：单个 `SKILL.md` 内定义触发、输入类型、7 个 analyst prompt、报告结构、confidence/severity 规则、pipeline JSON 和 diff mode。
- 调用链路：requirements file/text -> parse -> 7 analysts -> findings/business stories/scenarios -> aggregate -> md/html/json report。
- 输入输出：输入是需求材料；输出是缺陷清单、场景、故事、glossary 和报告文件。
- 核心依赖：Claude Code/Cowork/Claude.ai，Claude Code 下可用 Agent、Read、Write、Edit、Bash 等工具。

## 为什么值得参考

它把“需求评审”从泛泛建议变成了固定检查维度，每个角色只看一种缺口，最后再聚合。这种结构非常适合改造成内部 PRD 质检 Skill，因为每条 finding 都有 confidence、severity、recommendation 和所属原则。

## 为什么不建议直接套用

当前仓库核心实现几乎都在 `SKILL.md`，包含大量角色提示词，工程边界比较薄。它会写报告文件，落点和覆盖策略要先确认。并行 subagent 结果可能重复或互相矛盾，需要人工判断。需求涉及商业机密时，不应直接粘到无合规保障的环境。

## 如何改造成自己的版本

保留 DeFOSPAM 七维框架，但把输出改成你的 PRD 审核表：P0 blocking、P1 clarify、P2 improve。减少角色人格描述，增加可机器校验的 finding schema。把 HTML 报告设为可选，默认先生成 Markdown 和 JSON，便于进入项目评审流。

## 适用场景

- PRD、用户故事、需求说明的质量评审。
- 测试人员从需求生成场景和预测检查。
- CI/pre-commit 中做轻量需求检查。

## 不适用场景

- 需求本身还没有业务上下文。
- 涉密需求不能进入外部模型。
- 想让 AI 代替 PO/BA 做最终需求决策。

## 参考信息

- 原项目：[OpenRequirementsAI](https://github.com/AgenticTesting/OpenRequirementsAI)
- 作者：AgenticTesting
- 相关概念：[[需求评审]]、[[Specification by Example]]
- 相关卡片：保守留空
