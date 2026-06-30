---
title: "产品与项目参考：rana"
description: "一个 UX 需求分析 Skill，把 PM PRD、截图或需求清单转成设计师可用的结构化分析文档，并内置批判规则和质量 gate。"
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
source: "https://github.com/amumulam/rana"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# rana

> 一个 UX 需求分析 Skill，把 PM PRD、截图或需求清单转成设计师可用的结构化分析文档，并内置批判规则和质量 gate。

## 这个能力解决什么问题

它解决的是交互设计师拿到 PRD 后，需要先澄清问题、目标、方案、指标和体验风险的问题。输入可以是 PRD 文本、PDF/Word/PNG 截图或需求清单；输出是 Quick Mode 的四维分析和提问清单，或 Full Mode 的 8 章完整需求分析文档、change log 和 quality report。

## 核心逻辑

Rana 先做 Stage 0 文件预处理，再按用户意图和文件复杂度选择 Quick 或 Full。Quick Mode 用“问题 -> 目标 -> 供给 -> 指标”快速分析；Full Mode 分 Diagnosis、Solution、Refine 三阶段，阶段之间检查 P0 缺口。Must-Challenge 规则要求对目标冲突、迁移成本、MVP 膨胀、缺少基线数据等问题至少两轮深入探讨。

## 技术结构

- 关键模块：`rana/SKILL.md` 负责模式路由和总流程；`references/` 存 quick/full guideline、collaboration protocol、P0 gates、三阶段说明；`assets/` 存输出模板；`scripts/quality-validator.py` 做文件结构、来源追踪、P0 章节完整性检查。
- 调用链路：PRD/文件/截图 -> 预处理 -> 模式判定 -> 分阶段分析/协作讨论 -> final/quick analysis -> validator。
- 输入输出：输入是需求资料；输出是设计分析文档、澄清问题、质量报告。
- 核心依赖：Agent skill runtime，Python validator，可选 pdfplumber/外部 file parser skill。

## 为什么值得参考

它最有价值的是把“设计师的反驳能力”写进 workflow：不是顺着 PRD 整理，而是在迁移成本、MVP 边界、目标冲突和极端场景上强制挑战。对于产品/设计协作，这比普通 PRD 总结更接近真实设计分析。

## 为什么不建议直接套用

它包含大量中文协作风格和 OpenClaw/blockStreaming 配置假设，迁移到其他 Agent 需要改。输出目录和文件解析器路径也与运行平台有关。Full Mode 不适合几十页大文档，README 明确建议拆分功能点。Figma 链接和 `.fig` 不支持。

## 如何改造成自己的版本

保留 Quick/Full 双模式和 Must-Challenge 规则，把文件预处理改成你当前 Agent 能力。把质量 gate 改为“是否有用户目标、业务目标、核心场景、反例、指标和 MVP 边界”。输出不要写入固定本地路径，而由用户指定项目目录或只在对话中生成。

## 适用场景

- 设计师分析 PM PRD 或需求截图。
- 需要在设计前识别体验风险和澄清问题。
- 想把需求评审变成可复用 Skill。

## 不适用场景

- 超大 PRD 未拆分。
- 需要直接读取 Figma 源文件。
- 只想快速生成最终 UI，不想做需求探讨。

## 参考信息

- 原项目：[rana](https://github.com/amumulam/rana)
- 作者：amumulam
- 相关概念：[[UX 需求分析]]、[[批判式需求评审]]
- 相关卡片：保守留空
