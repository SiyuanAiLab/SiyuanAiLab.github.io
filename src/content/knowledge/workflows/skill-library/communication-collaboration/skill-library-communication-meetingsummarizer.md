---
title: "沟通与协作参考：MeetingSummarizer"
description: "一个本地桌面/CLI 会议录音工具，用 OpenAI Whisper 转写，再用 GPT-3.5 生成摘要。"
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
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/rajpdus/MeetingSummarizer"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# MeetingSummarizer

> 一个本地桌面/CLI 会议录音工具，用 OpenAI Whisper 转写，再用 GPT-3.5 生成摘要。

## 这个能力解决什么问题

它解决的是个人在 Mac 上录制会议音频、转成文字并快速得到摘要的问题。输入可以是现场录制生成的 MP3，或已有录音文件；输出是 transcript 和 summary，CLI 与 PyQt GUI 都可操作。

## 核心逻辑

CLI 的 `record` 命令先录音到指定文件，`summarize` 命令读取音频，调用 Whisper 做 ASR，再调用 GPT-3.5-turbo 对转写文本摘要。GUI 只是把“开始录音、停止并总结”包装成按钮流程，降低命令行门槛。

## 技术结构

- 关键模块：`cli.py` 提供录音/摘要命令；`gui.py` 提供 PyQt5 桌面界面。
- 调用链路：麦克风录音 -> 保存 MP3 -> Whisper 转写 -> GPT 摘要 -> GUI/CLI 展示。
- 输入输出：输入是会议音频；输出是转写文本和会议摘要。
- 核心依赖：Python 3.10、FFmpeg、PyQt5、OpenAI Whisper、OpenAI API。

## 为什么值得参考

它是最小可理解的会议总结流水线：录音、ASR、摘要三个阶段分明。对想做内部 meeting assistant 的团队，它提醒我们不要一上来做会议平台集成，先把音频文件到摘要的链路跑通。

## 为什么不建议直接套用

它会录制会议音频，必须先获得参会者授权；否则涉及严重隐私和合规风险。它没有说清音频/转写保存周期，也没有权限、加密、审计或多用户隔离。GPT-3.5 摘要可能遗漏决策和行动项，不能作为正式会议纪要直接发送。

## 如何改造成自己的版本

去掉“直接录会议”的默认入口，改成“上传已授权音频”。增加 consent、retention、delete-after-processing 和本地加密选项。输出不要只有 summary，至少拆成 decisions、action_items、risks、open_questions，并标注“需主持人确认”。

## 适用场景

- 个人本地试验会议转写摘要。
- 已取得授权的小范围录音整理。
- 学习音频 -> 文本 -> 摘要的基础链路。

## 不适用场景

- 企业级会议资料留存。
- 需要 speaker diarization、权限和审计的场景。

## 公开版边界

- 录音和转写须获得参会者知情同意。

## 参考信息

- 原项目：[MeetingSummarizer](https://github.com/rajpdus/MeetingSummarizer)
- 作者：rajpdus
- 相关概念：[[会议纪要]]、[[录音隐私]]
- 相关卡片：保守留空
