---
title: "创意与设计参考：interior design assistant agent skill"
description: "一个室内设计分析 Skill，用风水、空间规划、色彩、人体工学和亲自然设计五维评分，并输出改造路线图。"
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
source: "https://github.com/dungnotnull/interior-design-assistant-agent-skill"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# interior design assistant agent skill

> 一个室内设计分析 Skill，用风水、空间规划、色彩、人体工学和亲自然设计五维评分，并输出改造路线图。

## 这个能力解决什么问题

它解决的是用户给出房间目标后，如何从功能、审美、风水、人体工学和可持续性多维度评估并提出改造建议。输入是空间尺寸、现状、生活方式、预算、风格偏好和目标；输出是带评分、证据引用、风险、优先级和实施建议的专业报告。

## 核心逻辑

主 skill 运行 7 阶段 harness：Intake 收集信息；Framework Selection 选择风水/空间规划/色彩/人体工学/亲自然等框架；Research 搜索或回退到 knowledge brain；Scoring 按五维权重评分；Challenge 反向压力测试假设；Roadmap 按 effort/impact 排优先级；Synthesize 汇总并跑质量 gate。

## 技术结构

- 关键模块：`skills/main.md` 总流程；`sub-intake`、`sub-framework-selector`、`sub-scoring-engine`、`sub-improvement-roadmap`；`SECOND-KNOWLEDGE-BRAIN.md` 领域知识；`tools/knowledge_updater.py` 更新知识；`tests/test-scenarios.md` 验收场景。
- 调用链路：空间需求 -> intake -> framework selection -> research -> scoring -> challenge -> roadmap -> report。
- 输入输出：输入是房间/目标/约束；输出是评分表、改造路线图和限制说明。
- 核心依赖：Claude Code Skill，WebSearch/WebFetch，可选 crawl4ai/requests/BeautifulSoup。

## 为什么值得参考

它不像普通“家装建议”那样只给风格图，而是用权重、评分、证据、挑战和路线图让建议可解释。质量 gate 要求每个分数有引用、每条路线图可追溯到 findings，这很适合改造成其他设计评审 Skill。

## 为什么不建议直接套用

它混合风水和现代设计研究，证据强度差异很大，不能把所有评分当科学结论。房屋尺寸、结构安全、电气、消防和施工成本必须由专业人士确认。knowledge updater 自动抓取来源也需要审查，不应无限制更新知识库。

## 如何改造成自己的版本

保留五维评分 + challenge + roadmap；把风水维度换成你实际需要的“品牌一致性”或“商业转化”。对每条建议标注证据等级：研究、规范、经验、审美判断。涉及施工、安全和结构的建议只写方向，强制提示咨询专业人员。

## 适用场景

- 室内布局和空间优化建议。
- 设计咨询报告结构参考。
- 多维评分型设计 Skill。

## 不适用场景

- 结构改造、消防、电气等专业设计替代。
- 把风水判断当硬科学指标。
- 缺少尺寸和现场信息却要求精确方案。

## 参考信息

- 原项目：[interior-design-assistant-agent-skill](https://github.com/dungnotnull/interior-design-assistant-agent-skill)
- 作者：dungnotnull
- 相关概念：[[设计评分]]、[[证据分级]]
- 相关卡片：保守留空
