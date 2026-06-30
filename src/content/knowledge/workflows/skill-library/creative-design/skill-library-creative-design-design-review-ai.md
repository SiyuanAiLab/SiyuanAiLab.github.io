---
title: "创意与设计参考：design review ai"
description: "一个商品图审稿自动化脚本，监听产品文件夹，按 5 套图像审查 prompt 分析 infography 和 mobile banner，并生成 Word 报告/邮件。"
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
source: "https://github.com/nityansh10/design-review-ai"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# design review ai

> 一个商品图审稿自动化脚本，监听产品文件夹，按 5 套图像审查 prompt 分析 infography 和 mobile banner，并生成 Word 报告/邮件。

## 这个能力解决什么问题

它解决的是电商商品图上线前需要检查文案、技术规格、兼容性、图片顺序和 banner 质量的问题。输入是每个产品文件夹下的 `Infography` 和 `Mobile Banner` 图片；输出是分 5 步的图像审查结果、`.docx` 报告和可选邮件发送。

## 核心逻辑

`watcher.py` 用 watchdog 监听文件夹，发现新产品目录后查找名称包含 infograph/mobile 的子目录。脚本分别用 5 个 prompt 分析：listing 表达、技术复查、2026 兼容性、mobile banner、全图交叉校验。每一步调用图像模型服务，结果汇总后由 `report_generator.py` 渲染成 Word 文档，`processed_folders.json` 避免重复处理。

## 技术结构

- 关键模块：`app/watcher.py` 管监听和五步流水线；`claude_service.py` 管图像模型调用；`prompts.py` 读取 prompt；`report_generator.py` 生成 docx；`email_service.py` 发送邮件；`prompts/prompt1-5.txt` 存审查要求。
- 调用链路：folder created -> image collection -> 5 prompt analyses -> report docx -> optional email。
- 输入输出：输入是商品图文件夹；输出是审查报告和修正清单。
- 核心依赖：google-genai、python-docx、watchdog、pillow、python-dotenv。

## 为什么值得参考

它把设计评审做成了“文件夹触发的多轮审稿流水线”，每一步职责明确，最后生成给设计团队看的报告。对图片审稿类 Skill 来说，按图像类型分 prompt、再做 cross-verify 的结构值得借鉴。

## 为什么不建议直接套用

## 如何改造成自己的版本

保留五步审稿思路，但把 prompt 改成结构化评分表：信息准确性、规格一致性、平台规范、转化表达、缺失图片。竞品和兼容性只允许读取用户提供的参考资料，不让模型自行猜。报告生成后进入 review 文件夹，不自动发送邮件。

## 适用场景

- 电商商品图、banner、详情页上线前审稿。
- 设计团队批量获得修改清单。
- 图像多轮审查 workflow 参考。

## 不适用场景

- 需要法律级广告合规结论。
- 未提供竞品和设备资料却要求事实核查。
- 自动把审查报告发给外部客户。

## 公开版边界

- 基于公开 README 解读。

## 参考信息

- 原项目：[design-review-ai](https://github.com/nityansh10/design-review-ai)
- 作者：nityansh10
- 相关概念：[[设计评审]]、[[图像审稿]]
- 相关卡片：保守留空
