---
title: "写作与内容参考：content repurposer"
description: "一个从公开视频字幕抽取内容，再生成 LinkedIn、X thread、博客大纲和摘录 quote 的命令行工具。"
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
source: "https://github.com/joemolto/content-repurposer"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# content repurposer

> 一个从公开视频字幕抽取内容，再生成 LinkedIn、X thread、博客大纲和摘录 quote 的命令行工具。

## 这个能力解决什么问题

它面向的不是任意长文改写，而是 YouTube 视频内容复用：给一个带字幕的公开视频 URL，自动拿到 transcript，再产出不同渠道可用的内容资产。输出包括原始字幕、LinkedIn 帖、X thread、博客大纲、关键 quote 和 metadata，统一放在 `output/<video_id>/`。

## 核心逻辑

流程很直：`main.py` 解析 URL、平台、语气和输出格式；`extractors/youtube.py` 用 `youtube-transcript-api` 拉字幕；各个 `generators/` 模块把同一份 transcript 交给 Anthropic 模型，分别生成 LinkedIn、Twitter、blog、quotes。用户可以指定只生成某些平台，也可以调整语气为 professional、casual 或 provocative。

## 技术结构

- 关键模块：`extractors/` 管字幕，`generators/base.py` 封装生成器基类，`generators/linkedin.py`、`twitter.py`、`blog.py`、`quotes.py` 处理平台产物，`config.py` 存模型和数量默认值。
- 调用链路：YouTube URL -> transcript -> 平台生成器 -> Markdown/plain/json 输出。
- 输入输出：输入是公开视频 URL 和平台参数；输出是按视频 ID 分组的文本文件。
- 核心依赖：`youtube-transcript-api`、`anthropic`、`python-dotenv`。

## 为什么值得参考

它把“素材抽取”和“平台重写”分成了两个层次，目录也很干净：先保证 transcript 可复用，再让每个平台生成器消费同一份文本。这比把 URL 丢进一个大 prompt 更容易定位失败点，例如字幕缺失是 extractor 问题，风格不对是某个 generator 问题。

## 为什么不建议直接套用

它依赖 YouTube 字幕可用性，不适合没有字幕、私密视频或版权边界不清的素材。示例输出里有明显社媒诱导句式，作为严肃内容系统需要改掉。项目只处理字幕文本，不验证视频画面，也不保留逐句时间戳来源，因此引用和事实核查能力有限。

## 如何改造成自己的版本

把 extractor 抽象成“输入适配器”：YouTube、播客转录、会议纪要、文章都转成统一 `source_text + metadata`。平台生成器不要只按平台名写，而要按“渠道目标+受众+证据强度”写。输出里增加 `source_url`、`transcript_available`、`needs_fact_check`，并把自动生成的 quote 标成“待人工核对”。

## 适用场景

- 公开演讲、播客、教程视频的二次整理。
- 需要快速得到多个平台草稿，但仍由人审核。
- 小型命令行内容工具原型。

## 不适用场景

- 无授权的视频搬运或平台洗稿。
- 需要严格逐字引用、法律合规或学术引用的场景。
- 需要图像理解的视频内容分析。

## 公开版边界

- 涉及外部平台内容流转时，需人工确认后执行。

## 参考信息

- 原项目：[content-repurposer](https://github.com/joemolto/content-repurposer)
- 作者：joemolto
- 相关概念：[[内容复用]]、[[视频转写]]
- 相关卡片：保守留空
