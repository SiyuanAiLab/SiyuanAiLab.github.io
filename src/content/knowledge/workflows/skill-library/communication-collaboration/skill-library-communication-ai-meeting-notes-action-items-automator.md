---
title: "沟通与协作参考：AI Meeting Notes Action Items Automator"
description: "一个 Next.js + Supabase 原型，把会议 transcript 或音频转成可追踪行动项仪表盘。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["会议纪要", "行动项", "协作", "沟通"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 沟通与协作"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的沟通与协作流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/ChristosLeptokaropoulos/AI-Meeting-Notes-Action-Items-Automator"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# AI Meeting Notes Action Items Automator

> 一个 Next.js + Supabase 原型，把会议 transcript 或音频转成可追踪行动项仪表盘。

## 这个能力解决什么问题

它解决的是会议之后任务埋在纪要里没人跟的问题。用户粘贴 transcript 或上传音频/视频文件；系统用 Whisper 转写音频，再用 GPT-4o 结构化抽取 action items、owner、deadline、priority、summary，并写入 Supabase，最后在 dashboard 里筛选和更新状态。

## 核心逻辑

文本路径直接调用 `/api/extract`；音频路径先走 `/api/transcribe` 调 OpenAI Whisper，得到 transcript 后再进入同一个抽取接口。抽取结果以 JSON 存入 `meetings` 和 `action_items` 两张表，source 字段区分 paste/audio。前端提供输入页和 dashboard，支持 PATCH 更新行动项状态、负责人、deadline 和优先级。

## 技术结构

- 关键模块：`src/app/page.tsx` 输入；`dashboard/page.tsx` 看板；`api/transcribe`、`api/extract`、`api/meetings`、`api/action-items/[id]`；`lib/openai.ts`、`whisper.ts`、`supabase.ts`、`types.ts`。
- 调用链路：paste/audio -> Whisper 可选 -> GPT-4o JSON extraction -> Supabase -> dashboard tracking。
- 输入输出：输入是 transcript 或 25MB 内音频；输出是会议记录和行动项看板。
- 核心依赖：Next.js 16、React 19、Supabase/Postgres、OpenAI GPT-4o/Whisper、shadcn/ui、Tailwind、Vercel。

## 为什么值得参考

它把“会议摘要”缩到最有业务价值的对象：可追踪行动项。相比长篇纪要，owner、deadline、priority、status 更容易进入团队执行系统。RLS、server-side key 和 JSON output mode 也比普通 demo 更接近真实内部工具。

## 为什么不建议直接套用

音频上传涉及会议授权，README 的 roadmap 还提到实时录音和通知，这些都必须谨慎。Supabase RLS 开启不等于权限策略已经适合你的组织。Whisper 25MB 限制、无 speaker diarization 和 deadline 推断不稳定，都会影响行动项可信度。

## 如何改造成自己的版本

保留两张核心表：meetings 和 action_items；增加 `source_consent`、`extraction_confidence`、`reviewed_by` 字段。把音频上传放到二期，先支持手工粘贴已确认 transcript。输出后必须进入“主持人确认”状态，再同步到任务系统。

## 适用场景

- 快速把会议 transcript 转成任务清单。
- 内部 prototype 或 portfolio 级产品验证。
- 已有 Supabase/Vercel 技术栈的小团队。

## 不适用场景

- 未授权音视频上传。
- 企业级权限、审计和数据隔离要求。
- 需要自动通知 Slack/Teams 或日历写入的高风险流程。

## 公开版边界

- 录音和转写须获得参会者知情同意。

## 参考信息

- 原项目：[AI-Meeting-Notes-Action-Items-Automator](https://github.com/ChristosLeptokaropoulos/AI-Meeting-Notes-Action-Items-Automator)
- 作者：ChristosLeptokaropoulos
- 相关概念：[[行动项提取]]、[[会议授权]]
- 相关卡片：保守留空
