---
title: "写作与内容参考：content repurposer mvp"
description: "一个 Streamlit 内容复用 MVP：把粘贴文本、上传文件或网页正文转换成 LinkedIn、X 和 Newsletter 变体，并导出 CSV。"
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
source: "https://github.com/tdawe1/content-repurposer-mvp"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# content repurposer mvp

> 一个 Streamlit 内容复用 MVP：把粘贴文本、上传文件或网页正文转换成 LinkedIn、X 和 Newsletter 变体，并导出 CSV。

## 这个能力解决什么问题

它解决的是“长内容变成多渠道草稿并可批量交付”的问题。用户输入可以是直接粘贴文本、`.txt/.docx` 文件或 URL 抽取正文；系统按 tone preset 和 glossary 生成 LinkedIn、Twitter/X、Newsletter 内容，最后让用户在界面里编辑并导出带 metadata 的 CSV。

## 核心逻辑

Streamlit UI 负责收集输入、语气和 glossary；`backend/file_handlers.py` 把文本、文件、URL 统一成内容字符串；`backend/presets.py` 管 professional、casual、technical、creative 等语气；`backend/generator.py` 调 OpenAI API 生成各平台变体；`backend/csv_exporter.py` 把结果、渠道、variant index、preset、时间戳写入 CSV。

## 技术结构

- 关键模块：`app/main.py` 是界面；`backend/` 是业务逻辑；`prompts/` 分平台模板；`tests/` 覆盖 generator、file handler 和 preset。
- 调用链路：输入材料 -> 文本抽取 -> tone/glossary 配置 -> OpenAI 生成 -> UI 编辑 -> CSV 导出。
- 输入输出：输入是文本、文件或 URL；输出是可编辑草稿和结构化 CSV。
- 核心依赖：Streamlit、OpenAI、python-docx、requests、BeautifulSoup、pandas、pytest。

## 为什么值得参考

它比纯 Skill 更像一个可交付内部工具：有 UI、有输入限制、有 glossary、有测试、有 CSV 交付格式。对内容生产系统来说，CSV metadata 是亮点，因为它让后续人工审核、导入表格或自动化排期更容易，而不是只在聊天里吐一堆文案。

## 为什么不建议直接套用

README 标注为 Bridge & Signal 的 proprietary MVP，不应直接拿来商业复用。URL 抽取没有复杂反爬和版权处理，不能把任意网页当可改写素材。它依赖 OpenAI key，受 100000 字符、10MB 文件和 API rate limit 约束，且没有账号权限、审批流或发布边界。

## 如何改造成自己的版本

保留“输入适配器 -> preset/glossary -> 平台生成 -> CSV 导出”结构。把平台从 LinkedIn/X/Newsletter 改成你的渠道，例如公众号短版、独立站摘要、小红书卡片脚本。增加来源授权字段、人工审核状态、拒绝生成规则，并把 prompt 模板从代码仓库中拆成可版本化配置。

## 适用场景

- 内部内容团队批量生成待审草稿。
- 需要 glossary 保持术语一致的 B2B 内容。
- 想把聊天式生成改造成轻量 UI 工具。

## 不适用场景

- 需要处理敏感、版权不明或大规模网页抓取内容。
- 要求复杂品牌声音和事实核查的高风险内容。

## 公开版边界

- 涉及外部平台内容流转时，需人工确认后执行。

## 参考信息

- 原项目：[content-repurposer-mvp](https://github.com/tdawe1/content-repurposer-mvp)
- 作者：tdawe1
- 相关概念：[[内容复用]]、[[结构化导出]]
- 相关卡片：保守留空
