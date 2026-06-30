---
title: "创意与设计参考：AI Image PromptGenerator"
description: "一个已归档的 Gradio/Python 图像提示词生成器，用关键词词典、模板、黑名单和导出格式组合 Stable Diffusion/Midjourney prompts。"
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
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/526christian/AI-Image-PromptGenerator"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# AI Image PromptGenerator

> 一个已归档的 Gradio/Python 图像提示词生成器，用关键词词典、模板、黑名单和导出格式组合 Stable Diffusion/Midjourney prompts。

## 这个能力解决什么问题

它解决的是早期 AI 绘图用户不会组织英文视觉词汇的问题。输入是带方括号关键词的 prompt template、随机形容词/风格/质量数量、黑名单和自定义短语列表；输出是可复制的 prompt，或 Automatic1111/InvokeAI 命令行格式和日志。

## 核心逻辑

用户在 UI 里选择或编辑模板，模板里的列表名会从 phrase dictionary 随机抽词；`listadj`、`liststy`、`listqual` 这类特殊关键词由 slider 控制抽取数量。生成后再通过 blacklist 过滤不想出现的词。用户还可以保存自定义模板，下次从下拉菜单复用。

## 技术结构

- 关键模块：`promptgen.py` 是入口；`scripts/main.py` 和 `GUIandFileFuncs.py` 管 UI 与文件；`jsons/templates.json` 存模板；`jsons/blacklists.json` 存黑名单；`outputs/log.txt` 保存记录。
- 调用链路：模板/关键词 -> 词典随机抽取 -> blacklist 过滤 -> prompt/命令格式导出。
- 输入输出：输入是模板、词表、滑块数量和黑名单；输出是 prompt 文本、A1111/InvokeAI 命令和日志。
- 核心依赖：Python 3、Gradio。

## 为什么值得参考

它的价值不是模型能力，而是“可组合词库 + 模板 + 黑名单”的低成本 prompt 工作台。对于视觉提示词系统，词汇分类、随机探索和禁止词过滤比单次让 LLM 写 prompt 更可控。

## 为什么不建议直接套用

项目 README 明确标注 archived，作者也表示维护价值不确定。它面向旧的 Stable Diffusion/Midjourney 语法，默认词库和审美已经过时。随机词拼接容易产生堆砌式 prompt，不适合品牌级视觉系统。

## 如何改造成自己的版本

保留词库、模板、黑名单三个概念，换成你的视觉标准库：主体、场景、构图、光线、材质、镜头、禁用词。加入品牌 palette、比例、用途和模型 profile；输出时不要只给英文 prompt，还要给“为什么选这些词”和“可删减字段”。

## 适用场景

- 探索式图像 prompt 灵感生成。
- 构建可编辑视觉词库。
- 旧 SD/A1111 工作流参考。

## 不适用场景

- 需要稳定品牌视觉的一致性生产。
- 最新多模态模型的复杂图文指令。
- 需要持续维护和现代 UI 的团队工具。

## 参考信息

- 原项目：[AI-Image-PromptGenerator](https://github.com/526christian/AI-Image-PromptGenerator)
- 作者：526christian
- 相关概念：[[视觉提示词]]、[[词库模板]]
- 相关卡片：保守留空
