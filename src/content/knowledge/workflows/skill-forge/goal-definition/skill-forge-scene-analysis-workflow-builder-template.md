---
title: "目标明确参考：workflow builder template"
description: "一个 Vercel 出品的 AI 工作流 Builder 模板，把自然语言生成、可视化配置、真实集成、执行日志和 TypeScript 代码生成放在同一套应用里。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "进阶"
tags: ["目标明确", "可行性判断", "Skill生产线"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 目标明确"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的目标明确流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/vercel-labs/workflow-builder-template"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# workflow builder template

> 一个 Vercel 出品的 AI 工作流 Builder 模板，把自然语言生成、可视化配置、真实集成、执行日志和 TypeScript 代码生成放在同一套应用里。

## 这个能力解决什么问题

workflow-builder-template 解决的是「需求能否从自然语言变成可执行工作流」。它不是只展示流程图，而是要求每个 trigger/action 都能落到真实 plugin、数据库记录、执行 API 和可生成的 TypeScript。对目标明确阶段的价值是：它让一个想法必须经过节点类型、集成凭证、运行方式、执行历史和代码导出五道检查。

## 核心逻辑

真实输入包括用户的自然语言描述、React Flow 画布上的 trigger/action 节点、各 plugin 的 credentials、workflow 数据库记录和手动/webhook/schedule/database trigger。处理逻辑是：AI generation API 可把 prompt 转成 workflow 草稿；用户在 UI 中配置节点 schema；workflow 存到 Postgres/Drizzle；执行 API 调用 workflow executor；代码生成模块把流程转换成带 use-workflow 指令的 TypeScript；执行日志通过 API 查询。输出是可运行 workflow、execution logs、可下载/可复制的 TypeScript 和第三方集成动作结果。

## 技术结构

- 关键模块：`components/workflow/` 提供 canvas、toolbar、node config、trigger/action node；`app/api/workflows/*` 管理 CRUD、execute、webhook、executions、code/download；`lib/workflow-executor.workflow.ts` 和 `lib/workflow-codegen*.ts` 负责执行与生成；`plugins/` 存放 AI Gateway、Blob、Clerk、Firecrawl、GitHub、Linear、Perplexity、Resend、Slack、Stripe、Superagent、v0、Webflow 等集成。
- 调用链路：自然语言或手工配置 -> workflow DB -> execute/webhook API -> executor 调 plugin step -> workflow logs -> codegen API 输出 TypeScript。
- 输入输出：输入是 prompt、节点 schema、credentials、workflow id、trigger payload；输出是 workflow definition、execution status/logs、TypeScript 代码和真实外部服务响应。
- 核心依赖：Next.js、React Flow、Workflow DevKit、PostgreSQL/Neon、Drizzle ORM、Better Auth、AI Gateway、shadcn/ui、pnpm、Vercel 部署。

## 为什么值得参考

它的价值在于把「想法」和「实现」之间加了一个可检验中间层：可视化 workflow 不是终点，还能生成可运行代码。做 Skill 时可以借这个思路：先把用户需求变成结构化 spec，再决定是否生成脚本或命令，不要让模型直接从需求跳到实现。

## 为什么不建议直接套用

这是完整 SaaS 模板，依赖 Vercel、Postgres、Better Auth、AI Gateway 和大量外部 integration credentials。它默认包含 Firecrawl、GitHub、Slack、Stripe、Webflow 等会产生真实外部动作的插件，直接用于内部知识流程会引入过多授权和风控工作。它适合产品化平台，不适合轻量本地 Skill。

## 如何改造成自己的版本

保留「prompt -> workflow spec -> code/export」三段。自己的版本可以先不做 UI：用一个 `workflow.yaml` 描述 trigger、steps、credentials_needed、outputs、review_gate；用小脚本从 YAML 生成 checklist 或脚本骨架。需要外部集成时，按插件模板拆成 `credentials`、`steps`、`test` 三件套，并为每个 step 加 dry-run。

## 适用场景

- 需要把自然语言需求转换成可视化流程和可执行代码。
- 需要真实集成、执行日志、下载代码和分享 workflow。
- 需要为独立站工作流产品寻找全栈模板参考。

## 不适用场景

- 只需要本地 Markdown Skill，不需要 SaaS 和登录系统。
- 无法管理多个外部服务的 API key 和权限边界。
- 需求还没有稳定到可以生成可运行代码。

## 参考信息

- 原项目：[workflow-builder-template](https://github.com/vercel-labs/workflow-builder-template)
- 作者：vercel-labs
- 相关概念：[[可行性判断]]、[[工作流代码生成]]、[[节点配置]]
- 相关卡片：[workflow-read-025](skill-forge-scene-analysis-m8m.md)
