---
title: "Skill 设计参考：bmad module skill forge"
description: "一个把代码、文档和开发者讨论编译成「可溯源 AI 指令文件」的 BMAD 模块，核心是让每条 API 用法都有上游证据。"
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
source: "https://github.com/armelhbobdad/bmad-module-skill-forge"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# bmad module skill forge

> 一个把代码、文档和开发者讨论编译成「可溯源 AI 指令文件」的 BMAD 模块，核心是让每条 API 用法都有上游证据。

## 这个能力解决什么问题

bmad-module-skill-forge 解决的是 AI 使用库/API 时乱猜函数名、参数、同步异步和调用模式的问题。它把 Skill 设计重点放在 provenance：每条指令都要能追到 pinned commit 的文件行，或追到外部文档 URL。对 Skill 设计阶段的价值是，它把「写得像真的」变成「能被反证」。

## 核心逻辑

真实输入是一个代码仓库、文档 URL、包名或一组要编译的技能目标。处理逻辑是：Ferris 先做 Setup Forge，检测本机工具和能力 tier；`forge-auto` 自动确定范围、生成 brief、抽取代码/文档证据、过质量门并导出；`forge` 手动链路走 Brief -> Create -> Test -> Export；campaign 模式管理多技能批量生成和依赖恢复。输出是一套版本化 skill：`SKILL.md`、`context-snippet.md`、`metadata.json`、`provenance-map.json`、测试与证据文件。

## 技术结构

- 关键模块：`src/forger/` 存 forge tier 与偏好；`src/knowledge/` 存 provenance、confidence tier、zero hallucination 等知识；`src/skf-analyze-source`、`src/skf-brief-skill`、`src/skf-create-skill`、`src/skf-audit-skill`、`src/skf-campaign` 等技能负责从分析到导出；`src/shared/scripts/` 包含扫描 manifest、抽取 public API、校验 frontmatter、写 brief、处理 provenance gap 等脚本。
- 调用链路：目标仓库/文档 -> 工具探测与 tier 判定 -> AST/doc/source 抽取 -> brief 定义范围 -> skill 编译 -> 测试与证据检查 -> export 到目标目录。
- 输入输出：输入是 repo/doc URL、package name、范围 brief、capability tier、工具可用性；输出是可审计 skill、source line 映射、context snippet、质量分数、issue/health check。
- 核心依赖：Node.js 22+、Python 3.10+、uv、GitHub CLI、ast-grep、ast-grep MCP、cocoindex-code、QMD、skill-check、BMAD module 系统。

## 为什么值得参考

它最值得学的是「证据链优先」：Skill 不是把 README 改写成说明书，而是把函数签名、参数、异步要求、常见模式和文档主张绑定到可验证来源。这个思路能显著降低 API 类 Skill 的幻觉风险。

## 为什么不建议直接套用

它的环境门槛高，安装依赖横跨 Node、Python、uv、GitHub CLI、AST 工具、搜索索引和 BMAD/Ferris 工作流；README 也提示 workflow 会加载大量 context，最好新会话执行。对非代码类 Skill 或轻量内容工作流来说，这套 provenance 机制可能成本过高。

## 如何改造成自己的版本

只抽取它的三件套：`source_claim`、`evidence_ref`、`confidence`。为自己的每张 Skill 卡要求至少把关键命令、API、输入输出绑定到 README/docs/代码路径；不必一开始生成完整 `provenance-map.json`。API 类 Skill 再加一个 `context-snippet.md`，用于常驻提醒 agent 去读完整 skill，而不是把全部说明塞进上下文。

## 适用场景

- 为第三方库/API 生成可验证的 AI 使用说明。
- 需要版本固定、证据追踪和批量技能编译。
- 需要给团队交付可审计的 stack skill。

## 不适用场景

- 非代码知识流程，证据来源不是函数、类型或文档 URL。
- 只需要快速草稿，不需要 pinned commit 级别证明。
- 团队无法维护 BMAD、AST、索引和多工具链。

## 参考信息

- 原项目：[bmad-module-skill-forge](https://github.com/armelhbobdad/bmad-module-skill-forge)
- 作者：armelhbobdad
- 相关概念：[[可溯源指令]]、[[证据链]]、[[API 幻觉]]
- 相关卡片：[workflow-read-026](skill-forge-design-agricidaniel-skill-forge.md)
