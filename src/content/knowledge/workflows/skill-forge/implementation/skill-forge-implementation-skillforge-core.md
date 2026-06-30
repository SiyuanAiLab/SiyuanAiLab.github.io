---
title: "代码实现参考：SkillForge Core"
description: "一个本地优先的仓库蒸馏工作台，用 Web UI 把混杂文档扫描、证据抽取、能力聚类和 Skill 导出串成可审阅流水线。"
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
source: "https://github.com/wwyharry/SkillForge-Core"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# SkillForge Core

> 一个本地优先的仓库蒸馏工作台，用 Web UI 把混杂文档扫描、证据抽取、能力聚类和 Skill 导出串成可审阅流水线。

## 这个能力解决什么问题

SkillForge-Core 解决的是团队已有材料太散，无法直接变成 AI Skill 的问题。它不是做 Agent 编排框架，而是实现一条从 repository/document corpus 到 skill package 的本地流水线：先扫描、解析、抽证据，再聚类成能力，最后编译并导出技能。

## 核心逻辑

真实输入是本地仓库或文档语料、job 名称、用户描述的提取目标、可选模型 API 配置。处理逻辑是：用户在 Web UI 创建 job；inventory 服务发现参考文件；parsing 解析 Markdown、txt、docx、pdf、xlsx；extraction 抽取 workflow-relevant evidence；clustering 把证据归成 capability；compiler 生成 skill plan 和 skill preview；exporter 写出 `SKILL.md`、references、scripts、assets。输出是可预览、可覆盖审查、可导出的 skill folder。

## 技术结构

- 关键模块：`backend/app/main.py` 启动 FastAPI；`web.py` 负责服务端页面；`api/routes/` 管 jobs、documents、evidence、inventory、skills、settings；`services/jobs.py` 编排 pipeline；`services/inventory.py` 扫描；`services/parsing.py` 解析文档；`services/extraction.py` 抽证据；`services/distillation.py` 和 `services/compiler.py` 做能力聚类/编译；`services/exporter.py` 输出；SSE 提供实时状态。
- 调用链路：创建 job -> scan/parse -> evidence workbench -> capability cluster preview -> skill plan/generated skill preview -> export 到 folder。
- 输入输出：输入是本地路径、目标描述、支持格式文档、模型配置；输出是 job 状态、解析文档、证据片段、能力 cluster、skill preview 和导出目录。
- 核心依赖：Python 3.11+、FastAPI、Jinja2、Uvicorn、Vanilla JS、SSE、Pydantic v2、SQLAlchemy/SQLite、Alembic、Celery/Redis 可选、python-docx、pypdf、openpyxl、OpenAI/Azure/Anthropic compatible 配置可选。

## 为什么值得参考

它的设计亮点是「可视化中间态」：不是一次性把资料扔给模型生成 Skill，而是让用户看到 parsed documents、evidence、capabilities、plan 和 generated skill。对实现自己的 Skill Forge，这种中间态审阅比黑盒生成更可靠。

## 为什么不建议直接套用

项目仍标注 local-first，README 说明 evidence extraction、clustering、planning、compilation 目前有 heuristic/local implementations；若想生成完整技能仍建议配置外部大模型。仓库还包含 `__pycache__` 文件，工程洁净度需复核。对于纯 Markdown 卡片生产，启动 Web app、数据库、后台任务会过重。

## 如何改造成自己的版本

抽取它的 pipeline 而不是整套 UI：先做命令行版 `scan -> parse -> evidence -> capability -> 草稿 -> export`，每一步输出 Markdown/JSON 供人工审查。证据抽取先用规则和关键词，等样例稳定后再接模型。UI 可以最后做，只展示中间态和人工确认，不负责自动写入知识库。

## 适用场景

- 需要把一堆内部文档、SOP、研究材料转成 Skill 包。
- 需要审阅证据和 capability cluster，而不是盲生成。
- 需要本地优先，不强依赖外部模型。

## 不适用场景

- 只处理一两个 README，命令行足够。
- 需要成熟 SaaS 多租户能力。
- 不希望维护 FastAPI、数据库、文档解析和 UI。

## 参考信息

- 原项目：[SkillForge-Core](https://github.com/wwyharry/SkillForge-Core)
- 作者：wwyharry
- 相关概念：[[仓库蒸馏]]、[[证据抽取]]、[[能力聚类]]
- 相关卡片：[workflow-read-035](skill-forge-implementation-copa.md)
