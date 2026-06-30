---
title: "创意与设计参考：reactbits design assistant agent"
description: "一个 ReactBits 专家 Agent，专门辅助选择动画组件、编排动效、控制性能预算和无障碍实现。"
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
source: "https://github.com/unobtuse/reactbits-design-assistant-agent"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# reactbits design assistant agent

> 一个 ReactBits 专家 Agent，专门辅助选择动画组件、编排动效、控制性能预算和无障碍实现。

## 这个能力解决什么问题

它解决的是前端团队使用 ReactBits 这类动效组件库时，容易只追求炫技、忽略品牌、性能和可访问性的问题。输入是页面类型、品牌个性、目标受众、性能/无障碍要求和具体 UI 问题；输出是组件选择、prop 建议、组合方案、替代方案和代码示例。

## 核心逻辑

Agent 先问清上下文，再按决策框架选组件：识别 UI 目标，匹配 Text/UI/Background/Animation 类别，考虑品牌个性，检查性能预算，验证 accessibility。每次建议都要求具体组件名、prop 值、trade-off 和完整示例；遇到移动端、粒子、并发动画等场景，会给 bundle、FPS、particle count 和 prefers-reduced-motion 约束。

## 技术结构

- 关键模块：`AGENT.md` 定义 agent persona、调用场景、决策框架、性能预算、常见场景；README 展示安装、示例和知识范围。
- 调用链路：用户设计问题 -> context questions -> component selection framework -> recommendation/trade-off/code -> accessibility/performance checklist。
- 输入输出：输入是前端设计需求；输出是 ReactBits 组件方案和实现建议。
- 核心依赖：Claude Code/OpenClaw agent 机制，ReactBits 组件知识，可选 ReactBits MCP tools。

## 为什么值得参考

它把“组件推荐”写成设计咨询，而不是代码补全。尤其性能预算表、动画时长表和 accessibility checklist 很实用，能防止 Agent 一味堆动效。对前端设计 Skill 来说，这是把品味、工程和无障碍放在同一决策框里的样板。

## 为什么不建议直接套用

它只适用于 ReactBits 生态，组件清单和 prop 可能随上游变化。README 里的代码示例是说明性内容，不保证直接适配你的项目结构。Agent 可能建议高成本动画，仍需要真实设备测试、Playwright 截图和性能 profiling。

## 如何改造成自己的版本

把 ReactBits 替换成你的组件库，例如 shadcn、Ant Design 或内部 Design System。保留五步选择框架和性能预算，把组件 catalog 变成可更新资源文件。每条建议必须带“不用这个组件的替代方案”和“移动端降级策略”。

## 适用场景

- React 动效组件选型和组合。
- Landing page、portfolio、SaaS 页面动效审查。
- 前端设计 agent 的决策框架参考。

## 不适用场景

- 不使用 ReactBits 或 React 技术栈。
- 需要直接生成完整应用而非设计咨询。
- 没有性能测试和无障碍验收的上线流程。

## 参考信息

- 原项目：[reactbits-design-assistant-agent](https://github.com/unobtuse/reactbits-design-assistant-agent)
- 作者：unobtuse
- 相关概念：[[动效编排]]、[[前端无障碍]]
- 相关卡片：保守留空
