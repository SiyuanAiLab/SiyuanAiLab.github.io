---
title: "目标明确参考：bot with plan"
description: "一个把 ReAct Agent 的「规划」和「函数调用」拆开的实验项目，用来判断任务是否应该先训练/约束 planner，而不是直接让模型调用工具。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["目标明确", "可行性判断", "Skill生产线"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 目标明确"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的目标明确流程。"
confidence: "低"
verifiedDate: "2026-06-30"
source: "https://github.com/krasserm/bot-with-plan"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# bot with plan

> 一个把 ReAct Agent 的「规划」和「函数调用」拆开的实验项目，用来判断任务是否应该先训练/约束 planner，而不是直接让模型调用工具。

## 这个能力解决什么问题

bot-with-plan 面对的问题是：小模型或开源模型在 ReAct 流程里既要决定下一步做什么，又要写对工具参数，负担过重，容易产生错误工具调用。它把目标明确为「planner 只描述下一步任务并选择工具，具体函数参数由函数调用模型或工具侧处理」。对 Skill Forge 的启发是，做 Skill 前要先判断失败点在目标分解、工具选择还是参数执行，不要把三者混在一个提示词里。

## 核心逻辑

真实输入是用户请求、当前观察、可用工具列表，以及模拟或真实环境返回的 observation。处理逻辑是：planner 只生成下一步非正式任务描述和工具选择；工具或函数调用层把这个描述转成具体调用；环境执行后返回观察；循环直到 10 步内完成或失败。项目还用 GPT-4 planner 在 simulation 环境中生成 synthetic trajectories，再用这些轨迹 fine-tune Mistral-7B planner，并用 schema-guided generation/pydantic grammar 限制模块输出。

## 技术结构

- 关键模块：`simulation/` 负责模拟工具、轨迹生成和评估；`gba/` 放真实 agent、planner、tool 接口；`train/` 负责 planner fine-tuning；`gba/tools/search/` 提供 SearXNG 搜索工具；notebook 展示 fine-tuned planner、zero-shot planner 和 JSON schema guided generation。
- 调用链路：用户请求 -> planner 读 observation 并选择工具/描述任务 -> 工具层生成并执行具体函数调用 -> 环境返回 observation -> evaluator 用 pass rate、bad task rate、completion rate 评估轨迹。
- 输入输出：输入是自然语言请求、工具 schema、观察记录和模拟轨迹；输出是下一步计划、工具调用、最终回答、训练数据集和评估指标。
- 核心依赖：Python、Poetry、Conda、llama.cpp server、本地 GGUF 模型、SearXNG、OpenAI/GPT-4 生成轨迹或 baseline。

## 为什么值得参考

它的项目特定亮点是「降低 planner 的职责」：不要求 planner 同时会规划、写参数、懂每个 API，而是让它只做任务拆分和工具选择。这对 Skill 设计很有用：一个能力如果经常失败，可能不是说明书不够长，而是职责没有拆开。

## 为什么不建议直接套用

它是研究性仓库，README 的模型下载、GPU Docker、llama.cpp 端口和 SearXNG 依赖都偏重；评估集只有 50 个请求，场景集中在该项目定义的工具集。其术语也和常见 Agent 框架不同，直接搬会让团队把「任务」「动作」「工具调用」混淆。

## 如何改造成自己的版本

先不训练模型，只借它的分层：在每个 Skill 里区分 `plan_output`、`tool_selection`、`tool_arguments`、`observation`。为失败案例标注是「计划错」「工具选错」还是「参数错」。如果同类任务很多，再积累 30-50 条内部轨迹，做小规模 regression eval，而不是一开始就 fine-tune planner。

## 适用场景

- 需要让 Agent 在多工具任务里先稳定选步骤，而不是马上写调用参数。
- 需要评估小模型是否能承担规划职责。
- 需要把模拟环境轨迹用于 planner 训练或回归测试。

## 不适用场景

- 只需要调用一两个稳定 API，没必要拆 planner。
- 没有本地模型、GPU 或 SearXNG 环境。
- 任务的关键风险在权限和数据安全，而不是步骤规划。

## 参考信息

- 原项目：[bot-with-plan](https://github.com/krasserm/bot-with-plan)
- 作者：krasserm
- 相关概念：[[任务边界]]、[[工具选择]]、[[Planner]]
- 相关卡片：[workflow-read-037](../skill-forge-evaluation/skill-forge-evaluation-crab.md)
