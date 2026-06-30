---
title: "代码实现参考：AI Architecture Toolkit"
description: "一个给企业/解决方案架构师使用的 agent、skill、template 仓库，展示了如何把专业交付物变成可复用技能模块和文档模板。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["代码实现", "脚手架", "CLI", "工具链"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 代码实现"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的代码实现流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/Future-CX/AI-Architecture-Toolkit"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# AI Architecture Toolkit

> 一个给企业/解决方案架构师使用的 agent、skill、template 仓库，展示了如何把专业交付物变成可复用技能模块和文档模板。

## 这个能力解决什么问题

AI-Architecture-Toolkit 解决的是架构团队用 AI 时输出不一致的问题：ADR、目标架构、解决方案设计、数据架构、集成设计、Draw.io 图、epic 拆解等交付物需要同一套角色、模板、存放路径和私有/公开边界。对代码实现层的参考点是，它不是写一个大脚本，而是把每种架构任务实现成独立 skill，并配套模板和脚本。

## 核心逻辑

真实输入是架构工作目标、业务能力、技术方案、数据对象、集成边界、私有公司上下文和选定 agent brief。处理逻辑是：先选 agent 角色，例如 Enterprise/Solution/Data/Integration Architect；再调用对应 skill；skill 读取模板，生成 ADR、能力概览、目标架构、解决方案设计、数据架构、集成设计或 epic；公共 toolkit 保持通用，真实公司信息放到 private company lab。输出是 Markdown 交付物、Draw.io 源文件与 SVG、ADR、glossary、requirements/epics 等。

## 技术结构

- 关键模块：`agents/` 是角色 brief；`skills/` 包含 architecture-decision-record、solution-architecture-design、data-architecture-design、integration-design、target-architecture-document、create-drawio-diagram、to-epics 等；每个 skill 下有 `SKILL.md`、templates 和少量脚本；`examples/` 放参考图；`governance/` 管公开/私有边界。
- 调用链路：用户选择架构任务 -> Agent brief 约束角色 -> Skill 按模板询问/生成 -> 脚本写 ADR/原则/能力概览或 Draw.io -> 输出到约定目录。
- 输入输出：输入是业务能力、架构选择、接口/数据/风险材料和私有上下文；输出是架构文档、图源、SVG、ADR、epic 和 glossary。
- 核心依赖：Markdown 模板、Draw.io XML 模板、Python 小脚本、Confluence REST API（可选发布 skill）、git submodule 用于公私分离。

## 为什么值得参考

它展示了实现 Skill 时如何把「专业角色 + 模板 + 输出目录」三者绑在一起。实现层不一定要重模型编排，很多稳定工作流只需要清晰目录、模板和写文件脚本，就能让 AI 输出可复用。

## 为什么不建议直接套用

它面向企业架构团队，术语、TOGAF 式阶段、Confluence 发布和 Draw.io 模板对内容/知识管理场景过重。README 反复强调公开 toolkit 与 private lab 分离，直接套到真实客户项目时必须重建私有上下文隔离，否则容易把内部系统名和决策泄露到公共仓库。

## 如何改造成自己的版本

借它的「公共模板 + 私有上下文」结构：把可公开的 skill、模板、示例留在通用仓库，把客户资料、真实案例、输出件放到 private lab。实现时每个 Skill 只写一个交付物类型，例如「写 ADR」「画流程图」「拆 epics」，脚本只负责写文件、校验命名和嵌入图，不要把所有架构能力塞进一个命令。

## 适用场景

- 需要把专业咨询/架构交付物做成可复用 Skill。
- 需要模板化输出和固定目录落点。
- 需要区分公共方法论和私有公司上下文。

## 不适用场景

- 非架构场景，交付物不需要 ADR、目标架构或 Draw.io。
- 只有一次性文档，不需要维护 toolkit。
- 私有资料无法和公开模板清晰隔离。

## 参考信息

- 原项目：[AI-Architecture-Toolkit](https://github.com/Future-CX/AI-Architecture-Toolkit)
- 作者：Future-CX
- 相关概念：[[模板化交付]]、[[私有上下文隔离]]、[[架构 Skill]]
- 相关卡片：[workflow-read-026](../skill-forge-design/skill-forge-design-agricidaniel-skill-forge.md)
