---
title: "测试评估参考：TheAgentCompany"
description: "一个模拟软件公司的 Agent benchmark，用 GitLab、Plane、ownCloud、RocketChat 等服务测试数字员工式任务。"
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
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/TheAgentCompany/TheAgentCompany"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# TheAgentCompany

> 一个模拟软件公司的 Agent benchmark，用 GitLab、Plane、ownCloud、RocketChat 等服务测试数字员工式任务。

## 这个能力解决什么问题

TheAgentCompany 解决的是 Agent 在真实办公环境中能否完成复杂工作的问题。它不只测代码，还测软件工程、产品、数据、HR、财务、行政、研究等角色任务；Agent 需要浏览网页、写代码、跑程序、和模拟同事沟通、处理文件与表格。对 Skill 评估阶段的价值是，它展示了如何把企业工作流做成带服务、账号、任务容器和评分脚本的 benchmark。

## 核心逻辑

真实输入是 175 个任务镜像、预置业务系统数据、`/instruction/task.md`、agent 轨迹、环境 LLM 配置和评估密钥。处理逻辑是：先启动 GitLab、Plane、ownCloud、RocketChat、API server 等服务；每个任务启动 Docker 容器并运行 `/utils/init.sh` 初始化环境；Agent 只应读取任务说明并完成工作；完成后用 `/utils/eval.py` 调 encrypted evaluator 评分，部分任务还用 LLM/NPC 作为同事或语义评估器。输出是 JSON 分数、checkpoint 结果、轨迹、截图和汇总报告。

## 技术结构

- 关键模块：`servers/` 定义公司服务和数据恢复；`workspaces/base_image` 提供共享 eval/init/npc scaffolding；`workspaces/tasks/*` 是 175 个任务，每个含 Dockerfile、task、evaluator、dependencies；`evaluation/run_eval.sh` 是 OpenHands baseline；`evaluation/summarise_results.py` 汇总结果；`docs/EVALUATION.md` 和 `docs/SETUP.md` 说明手动/自动评估。
- 调用链路：启动服务 -> 启动 task container -> `init.sh` 重置依赖服务与 hosts -> Agent 完成 `/instruction/task.md` -> 传 trajectory/output -> `eval.py` 解密并运行 checkpoint -> 输出评分。
- 输入输出：输入是 task image、服务 hostname、LLM API 配置、Agent 轨迹、任务产物；输出是 checkpoint score、结果 JSON、screenshots、final agent state 和 summary。
- 核心依赖：Docker/Compose、30GB+ 磁盘、host networking、GitLab、Plane、ownCloud、RocketChat、LiteLLM 环境模型、OpenHands baseline、Python 3.12/Poetry、root 权限或等效容器权限。

## 为什么值得参考

它的强项是任务环境真实：评估不是让 Agent 写答案，而是让它在一组公司系统里完成数字工作。对企业 AI 服务来说，这种 benchmark 思路很有价值：把客户场景还原成服务、账号、文件、沟通和评分点。

## 为什么不建议直接套用

环境极重：README 要求 Docker、Docker Compose、30GB 以上空间、host networking，baseline 还使用 EC2 t3.2xlarge；部分评估需要环境 LLM，evaluator 加密且需要解密 key，完整跑可能需要几天。它模拟公司任务，不适合轻量 Skill 卡片或本地知识工作流的日常回归。

## 如何改造成自己的版本

为客户场景做小型「公司沙盒」：只选一个服务组合，例如文档库 + 项目管理 + 聊天；每个任务提供 `task.md`、初始化脚本、隐藏评分脚本和可选 trajectory。先做 5 个任务，不做 175 个；先人工重置环境，不急着全 Docker 化。

## 适用场景

- 评估 Agent 能否完成跨系统企业任务。
- 需要模拟同事、账号、文件、网页和项目管理系统。
- 需要 result-based + checkpoint + trajectory 的综合评分。

## 不适用场景

- 单文件、单 API 或短内容任务。
- 没有容器资源和服务运维能力。
- 不希望使用外部 LLM 参与环境 NPC 或评分。

## 参考信息

- 原项目：[TheAgentCompany](https://github.com/TheAgentCompany/TheAgentCompany)
- 作者：TheAgentCompany
- 相关概念：[[企业任务 Benchmark]]、[[任务容器]]、[[轨迹评分]]
- 相关卡片：[workflow-read-038](skill-forge-evaluation-claw-bench.md)
