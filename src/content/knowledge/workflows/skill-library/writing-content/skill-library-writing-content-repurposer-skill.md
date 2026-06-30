---
title: "写作与内容参考：content repurposer skill"
description: "一个把同一技术观点分发到 LinkedIn、X、Newsletter、Substack、Medium 和 GitHub Pages 的 Claude Code 写作 Skill 组，核心资产是共享声音文件而不是平台提示词。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["写作", "内容改写", "多平台内容", "品牌声音"]
prerequisites: []
related_cards: ["ai-core-43-system-prompt", "ai-core-17-prompt-engineering"]
scenario: "Skill 参考库 / 写作与内容"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的写作与内容流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/asadani/content-repurposer-skill"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# content repurposer skill

> 一个把同一技术观点分发到 LinkedIn、X、Newsletter、Substack、Medium 和 GitHub Pages 的 Claude Code 写作 Skill 组，核心资产是共享声音文件而不是平台提示词。

## 这个能力解决什么问题

它解决的是“同一主题多平台重写”里最容易失控的两件事：声音漂移和平台格式重复劳动。输入是一个技术主题、观点或材料片段；输出不是直接发帖，而是保存到 `drafts/<date>-<topic>/` 下的各平台草稿，包括 LinkedIn、X thread、newsletter、Substack、Medium 和静态博客 HTML/骨架。

## 核心逻辑

项目把写作任务拆成 7 个 Claude Code skills：6 个单平台 writer 加一个 `repurpose-all` 编排器。每个单平台 skill 先读取共享的 `voice-rules`、`voice-samples`、`pet-peeves`、`topic-modes`、`platform-styles`，再按平台长度、技术深度和密度生成草稿。`repurpose-all` 只问一次要哪些格式，然后把同一主题分发给多个平台规则，避免每个平台重复澄清。

## 技术结构

- 关键模块：`skills/<format>/SKILL.md` 负责平台任务；`shared/` 保存声音、样本、禁用表达和平台风格；`install.sh` 把 7 个 skill symlink 到 Claude skills 目录。
- 调用链路：用户给主题 -> 选择单平台 skill 或 `repurpose-all` -> 加载共享声音资产 -> 生成草稿与备选 hook/meta -> 写入 `drafts/`。
- 输入输出：输入是主题和可选平台/长度/emoji 约束；输出是 Markdown 或 HTML 草稿，不调用社媒 API。
- 核心依赖：主要是 Claude Code Skill 机制和 shell 安装脚本，没有独立后端。

## 为什么值得参考

它真正值得看的是“共享声音文件”这个设计：声音不藏在每个提示词里，而是抽成可维护的五个文件；平台差异只负责长度、密度、标题方式和技术深度。这样做比“给每个平台写一段大 prompt”更适合长期维护个人写作系统。

## 为什么不建议直接套用

默认声音样本来自作者本人，直接用会把你的语气、禁用词和表达偏好带偏。`github-page-write` 还会在运行时取作者博客的 HTML 模板，换成自己的博客体系前不应直接使用。它也没有测试、lint 或发布接口，产物只是草稿，不能当自动运营系统。

## 如何改造成自己的版本

## 适用场景

- 技术创作者把一个观点拆成多平台草稿。
- 团队想统一创始人或专家的写作声音。

## 不适用场景

- 追求增长黑客、互动诱导、热点搬运的社媒运营。
- 没有稳定个人样本文字，无法建立声音文件。
- 需要一键发布到平台账号的流程。

## 公开版边界

- 涉及外部平台内容流转时，需人工确认后执行。

## 参考信息

- 原项目：[content-repurposer-skill](https://github.com/asadani/content-repurposer-skill)
- 作者：asadani
- 相关概念：[[内容核心]]、[[风格迁移]]
- 相关卡片：保守留空
