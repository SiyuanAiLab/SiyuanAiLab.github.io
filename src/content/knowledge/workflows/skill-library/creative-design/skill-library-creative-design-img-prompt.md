---
title: "创意与设计参考：img prompt"
description: "一个多语言 AI 图像/视频 prompt 编辑器，用 5000+ 原生语言标签生成模型可识别的英文提示词。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["创意生成", "设计辅助", "图像提示词", "设计评审"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 创意与设计"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的创意与设计流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/rockbenben/img-prompt"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# img prompt

> 一个多语言 AI 图像/视频 prompt 编辑器，用 5000+ 原生语言标签生成模型可识别的英文提示词。

## 这个能力解决什么问题

它解决的是非英语用户做图像/视频 prompt 时，找不到准确英文视觉词的问题。输入是用户在母语界面里选择 Object、Attribute 和 tags，或在输出面板输入自由文本；输出是英文 prompt、可复制模板、负面提示词和可分享 URL state。

## 核心逻辑

界面按三步组织：先选对象类别，再选属性，再点选标签。标签数据存放在 `src/app/data/prompt/prompt-<locale>.json`，同一视觉概念有多语言 UI 和英文输出。右侧输出面板会去重、提示 exact/fuzzy tag suggestions、自动翻译自由输入，并支持随机颜色 token、模板按钮和一键复制。URL 参数保存当前筛选状态，便于分享。

## 技术结构

- 关键模块：Next.js App Router；`messages/` 多语言界面；`src/app/data/prompt` prompt 数据；`next-intl` 路由；Ant Design/Tailwind UI；构建脚本支持 per-locale static build。
- 调用链路：locale -> object/attribute filter -> tag selection/preview -> prompt assembly -> copy/share/download client。
- 输入输出：输入是母语标签选择和自由文本；输出是英文 prompt 和 URL state。
- 核心依赖：Next.js 16、React 19、TypeScript、Ant Design 6、Tailwind CSS 4、next-intl、next-themes、rtl-detect。

## 为什么值得参考

它把 prompt 工具从“文本输入框”改成“可浏览的视觉词典”。5000+ 标签、多语言、hover preview、URL 状态和 JSON 数据开放，都说明 prompt 库可以作为产品资产维护，而不是一堆散乱例句。

## 为什么不建议直接套用

prompt 数据聚合自多个开源来源，包含 AGPL、CC BY 等不同许可，商用前必须核对数据许可和署名。它面向图像/视频模型通用 prompt，不等于你的品牌视觉规范。自动翻译和模糊匹配可能选错词，重要商业图像仍需设计师确认。

## 如何改造成自己的版本

借鉴三层：多语言标签库、视觉 preview、prompt 输出面板。把数据源换成你自己的视觉语义库，字段至少包含 `zh_label`、`en_prompt`、`category`、`preview`、`license`、`brand_allowed`。给每个模型建立 profile，区分 Midjourney、Flux、GPT-Image、视频模型的语法差异。

## 适用场景

- 多语言用户生成视觉 prompt。
- 团队维护品牌/行业视觉词库。
- 教学和灵感浏览型 prompt 产品。

## 不适用场景

- 不核对许可就商用第三方 prompt 数据。
- 需要严格品牌一致性但没有设计审核。
- 只要一次性 prompt、不需要词库产品化。

## 参考信息

- 原项目：[img-prompt](https://github.com/rockbenben/img-prompt)
- 作者：rockbenben
- 相关概念：[[视觉语义库]]、[[多语言 prompt]]
- 相关卡片：保守留空
