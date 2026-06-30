---
title: "代码实现参考：oh my taiyiforge"
description: "一个把 AI 编码流程实现成九阶段状态机和多终端通用命令的工程流水线，强调工件契约、人类门控和断点续传。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["代码实现", "脚手架", "CLI", "工具链"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 代码实现"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的代码实现流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/Dong90/oh-my-taiyiforge"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# oh my taiyiforge

> 一个把 AI 编码流程实现成九阶段状态机和多终端通用命令的工程流水线，强调工件契约、人类门控和断点续传。

## 这个能力解决什么问题

TaiyiForge 解决的是 AI 写代码时跳过需求、设计、测试和 review 的问题。它把一次 change 固定为九阶段：change、requirement、design、ui-design、task、dev、test、review、integration，并要求关键节点由人审批。对实现层的参考点是，它把流程纪律做成命令、状态文件、工件模板和门控，而不是靠提示词提醒。

## 核心逻辑

真实输入是 change 名称、README/PRD/PDF/URL、profile、当前阶段工件和用户审批。处理逻辑是：`/taiyi:new` 创建 change；`/taiyi:write` 生成当前阶段工件；`/taiyi:continue` 根据状态机推进；`/taiyi:plan` 把大需求拆成模块，可在 auto 模式生成全栈骨架；dev 阶段强制 TDD；test 阶段收集证据；review 和 integration 做门控。输出是 `.taiyi/changes/<slug>/` 下的 CHANGE、REQUIREMENT、DESIGN、TASK、TEST、CHANGELOG、CONTEXT-COMPACT 等工件，以及可运行代码骨架。

## 技术结构

- 关键模块：`docs/taiyi/` 定义 canonical commands、phases、quality gate、workflow manifest、token budget、control plane；`app/` 是 FastAPI 参考服务；`.taiyi/changes/` 示例展示状态、日志、上下文压缩；`examples/browser-e2e-smoke` 和 `examples/translation-assistant/agent` 展示测试和 auto 输出；安装脚本把命令同步到 Claude、Cursor、OpenCode、Codex。
- 调用链路：需求/命令 -> 状态机判断阶段 -> 生成或校验阶段工件 -> 人类门控或引擎门控 -> 推进到下一阶段 -> 归档/集成。
- 输入输出：输入是需求文件、change slug、profile、阶段上下文、验证命令；输出是阶段 Markdown、状态 JSON、测试证据、代码骨架、上下文压缩文件。
- 核心依赖：npm 包、跨终端 skill 安装脚本、FastAPI/前端示例、Playwright/E2E 示例、Docker/CI 文档、Markdown 工件契约。

## 为什么值得参考

它最有价值的是「状态机 + 工件契约」：每阶段产物和拍板者都固定，Agent 无法跳过需求直接写代码。对自己的 Skill Forge，复杂实现流程也应该用阶段文件和 gate 管住，而不是把所有规则塞到一个长 prompt。

## 为什么不建议直接套用

九阶段对小改动很重，且 auto 模式会生成大量代码和测试文件；如果需求边界不清，自动骨架会扩大误差。它还涉及跨终端安装、命令同步、状态目录和人类审批，直接用在内容卡片生产会过度。README 中的 `.taiyi/changes` 属于本地工件，不应混入公开交付。

## 如何改造成自己的版本

为 Skill 生产线抽取简化四阶段：brief -> design -> implement -> verify。每阶段只要求一个 Markdown 工件和一个验证命令；高风险节点加人工 gate。把 token 压缩改成每阶段末的 `context-compact.md`，用于长任务续跑。只有代码生成类 Skill 才借 TDD 和 integration gate。

## 适用场景

- 长周期 AI 编码任务，需要阶段推进和人工审批。
- 需要跨工具保持同一命令词汇和工件格式。
- 需要断点续传、上下文压缩和变更依赖追踪。

## 不适用场景

- 简单文案、资料整理或一次性脚本。
- 用户不愿意逐阶段审批。
- 没有维护状态目录和阶段工件的纪律。

## 参考信息

- 原项目：[oh-my-taiyiforge](https://github.com/Dong90/oh-my-taiyiforge)
- 作者：Dong90
- 相关概念：[[状态机]]、[[工件契约]]、[[人类门控]]
- 相关卡片：[workflow-read-021](../skill-forge-scene-analysis/skill-forge-scene-analysis-workflow-builder-template.md)
