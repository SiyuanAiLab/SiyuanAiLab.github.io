---
title: "测试评估参考：crab"
description: "一个 Python-first 的跨环境 Agent benchmark 框架，用 Action、Environment、Task、Evaluator 和 Benchmark 组织多模态具身任务。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["测试评估", "eval", "benchmark", "回归检查"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 测试评估"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的测试评估流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/camel-ai/crab"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# crab

> 一个 Python-first 的跨环境 Agent benchmark 框架，用 Action、Environment、Task、Evaluator 和 Benchmark 组织多模态具身任务。

## 这个能力解决什么问题

CRAB 解决的是多模态 Agent 评估无法统一管理多个环境的问题。一个任务可能同时涉及 Ubuntu 桌面、Android 手机、远程 VM 或 Docker 环境；Agent 需要在统一接口下观察、行动、提交结果。CRAB 把操作封装为 Python action，把评估封装为 evaluator graph，让跨环境 benchmark 可以用同一套循环运行。

## 核心逻辑

真实输入是 benchmark config、environment、action space、task id、agent policy、模型配置和 observation。处理逻辑是：`create_benchmark` 创建 Benchmark；`start_task` 返回 task 和 action_space；agent 根据 `observe()` 的多环境状态选择 action 和参数；`step()` 执行动作并返回 evaluation results；多个 evaluator 可用 AND/OR/NOT 或 graph 组合判断任务进度。CRAB-Benchmark-v0 还提供 Android + Ubuntu 两个环境、100 个任务和 59 个 evaluator。

## 技术结构

- 关键模块：`crab/core/benchmark.py` 和 `crab/core/models/*` 定义 benchmark、config、evaluator；`crab/environments/` 管环境；`crab/agents/policies/` 提供 single_agent、multi_agent_by_env、multi_agent_by_func；`crab/server/` 提供 API；`crab-benchmark-v0/` 存 Android/Ubuntu/cross-platform 数据集；`docs/get_started/build_your_own_benchmark.md` 说明 Action/Evaluator/Environment/Task/Benchmark 五件套。
- 调用链路：定义 actions/evaluators/environments/tasks -> create_benchmark -> start_task -> observe -> agent determine action -> benchmark.step -> evaluator graph 更新结果 -> reset。
- 输入输出：输入是自然语言任务、环境观察、action schema、action 参数；输出是环境状态变化、evaluation_results、terminated 标志和 benchmark 分数。
- 核心依赖：Python 3.10+、Pydantic、networkx、Docker/VM/KVM/ADB、Android Studio emulator、Google Cloud 可选、OpenAI/CAMEL/Gemini/Claude backend model 接入。

## 为什么值得参考

它把评估对象拆得很清楚：Action 是可执行操作，Evaluator 是可判定条件，Environment 是状态空间，Task 是自然语言目标，Benchmark 是总控。做 Skill 评估时也可以按这五件套建模，而不是只写一段「请判断好坏」。

## 为什么不建议直接套用

CRAB 的完整 benchmark 环境成本很高：Ubuntu KVM、本地显示器、32G 内存、Android emulator/ADB，或 Google Cloud 环境。它适合多模态具身 Agent，不适合普通 Markdown/代码 Skill 的轻量回归。图评估方法也需要为每个任务认真写 evaluator，否则框架不会自动给出好标准。

## 如何改造成自己的版本

借它的五件套做轻量版：把你的 Skill 输入定义为 Task，把允许工具定义为 Actions，把工作目录/网页/API 定义为 Environment，把验收脚本定义为 Evaluator，把批量运行器定义为 Benchmark。先在本地文件任务中实现，不要一开始接 Android/VM。

## 适用场景

- 需要评估跨桌面、手机、浏览器或远程机器的 Agent。
- 需要为动作和评估条件写 Python 原生接口。
- 需要支持单 Agent、多环境 Agent 或按功能拆分的 Agent 策略。

## 不适用场景

- 纯文本生成或文档整理任务。
- 没有资源维护 KVM、ADB、VM 或云环境。
- 验收标准无法写成 evaluator graph。

## 参考信息

- 原项目：[crab](https://github.com/camel-ai/crab)
- 作者：camel-ai
- 相关概念：[[评估基准]]、[[跨环境 Agent]]、[[Evaluator Graph]]
- 相关卡片：[workflow-read-039](skill-forge-evaluation-frontier-swe.md)
