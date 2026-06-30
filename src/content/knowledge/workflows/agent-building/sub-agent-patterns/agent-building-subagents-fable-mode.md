---
title: "Sub-agent 模式参考：fable mode"
description: "一个 Claude Skill，用“阶段计划、可失败验证、可并行委派、自我审稿”约束大任务执行纪律。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["Sub-agent", "任务委派", "专家Agent", "Agent通信"]
prerequisites: []
related_cards: ["ai-core-30-delegation", "ai-core-25-multi-agent-system"]
scenario: "Agent Building / Sub-agent 模式"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的Sub-agent 模式流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/mrtooher/fable-mode"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# fable mode

> 一个 Claude Skill，用“阶段计划、可失败验证、可并行委派、自我审稿”约束大任务执行纪律。

## 这个能力解决什么问题

fable-mode 解决的是大任务中模型容易直接开干、跳过拆解和验证的问题。它不声称提升模型智力，而是给模型加一套过程纪律：先写阶段计划，能并行就委派子任务，每个阶段必须有会失败的检查，交付前做 skeptical self-review。它适合多文件、多来源、多会话任务，不适合简单一步任务。

## 核心逻辑

输入是一个复杂任务和当前 Claude/Agent runtime。Skill 被触发后，模型先把任务拆成 stage map；每个 stage 都要定义完成标准和验证方式。如果 runtime 有 Agent tool，可用 fable-sonnet 或 fable-haiku 变体把同一套 stage map、验证、审稿和安全规则传给子 Agent。输出不是某种固定文件，而是按阶段完成的结果、验证记录和最终自我审查后的交付。

## 技术结构

- 关键模块：`SKILL.md` 是默认执行纪律；`EXAMPLE.md` 展示验证如何抓住 one-shot 会漏掉的错误；`fable-sonnet` 和 `fable-haiku` 是指定模型的子 Agent 变体。
- 调用链路：复杂任务触发 skill → 生成阶段计划 → 按阶段执行/委派 → 每阶段运行 failable verification → 汇总结果 → skeptical self-review → 交付。
- 输入输出：输入是任务、材料、可用子 Agent/runtime；输出是阶段产物、检查结果、最终答案或文件修改。
- 核心依赖：Claude Skill 机制；子 Agent 变体要求宿主 runtime 支持 Agent tool。

## 为什么值得参考

它值得参考的是非常克制：明确说自己只是 checklist，不是能力移植。这对 Skill 设计很重要。很多 Agent Building 项目会夸大 prompt 的作用，而 fable-mode 把边界写清楚：结构能减少跳步，但不能提高模型推理上限。

## 为什么不建议直接套用

它是执行纪律 Skill，不是完整 orchestrator。没有独立 trace、状态存储、工具权限管理或评估报告；如果模型本身不具备长期一致性，skill 也只能提醒，不能保证自我纠错。对简单任务强行启用会拖慢交付、掩盖答案。

## 如何改造成自己的版本

1. 把它改成内部“大任务协议”：阶段计划、完成标准、验证命令、自审问题四项必填。
2. 对每类任务定义不同 failable check，例如测试、抽检、对照源文档、格式校验。
3. 子 Agent 委派只允许给独立材料块或独立目录，避免多人改同一文件。
4. 自我审稿要列“可能错在哪里”，而不是写泛泛总结。
5. 对简单任务设置免触发条件，避免流程泛滥。

## 适用场景

- 多文件改写、长文档整理、多来源研究、跨会话执行。
- 需要强制模型先拆阶段、再验证、再交付的工作。
- 想做轻量过程 Skill，而不是引入完整框架。

## 不适用场景

- 单步答案、短文本改写、很明确的小修小补。
- 需要真实状态恢复、trace 或自动调度的任务。
- 模型能力不足以理解验证失败并修正的场景。

## Agent Building 判断

- 多步工作流：stage plan → staged execution/delegation → failable verification → skeptical review → delivery。
- 工作标准：每阶段必须有完成定义和可失败检查，变体传递同一套规则。
- Loop 标准：验证失败应回到阶段修正，交付前自我审查形成最后循环。
- Harness 标准：只有示例和检查纪律，没有完整外部 harness，因此置信度应低于工程框架。
- 工具调用链路或 Agent 间通信：依赖宿主 Agent tool；Sonnet/Haiku 变体可把任务委派给子 Agent。
- 为什么不是 persona / profile / system prompt only：它不是角色设定，而是执行流程约束；但缺少独立 runtime，属于轻量 Agent Building 边界项。

## 公开版边界

- 本卡按标准和治理参考解读，不作为可直接采用的完整工具方案。

## 参考信息

- 原项目：[fable-mode](https://github.com/mrtooher/fable-mode)
- 作者：mrtooher
- 相关概念：[[Sub-agent模式]]、[[执行纪律]]
- 相关卡片：[workflow-read-088](workflow-read-088.md)
