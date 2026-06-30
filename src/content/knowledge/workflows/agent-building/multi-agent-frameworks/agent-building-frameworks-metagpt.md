---
title: "多 Agent 框架参考：MetaGPT"
description: "把一句自然语言软件需求拆成产品、架构、项目管理和工程角色协作的 SOP，让多 Agent 按“软件公司”流程产出项目仓库与文档。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["多Agent", "Agent框架", "协作", "工具调用"]
prerequisites: []
related_cards: []
scenario: "Agent Building / 多 Agent 框架"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的多 Agent 框架流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/FoundationAgents/MetaGPT"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# MetaGPT

> 把一句自然语言软件需求拆成产品、架构、项目管理和工程角色协作的 SOP，让多 Agent 按“软件公司”流程产出项目仓库与文档。

## 这个能力解决什么问题

MetaGPT 解决的不是“让一个模型写代码”，而是软件项目从需求到交付中角色职责混杂的问题。用户只给一句需求时，单 Agent 往往会直接进入实现，跳过用户故事、竞品分析、数据结构、API、任务分解和工程交付之间的依赖关系。MetaGPT 把这些中间产物显式化，让产品经理、架构师、项目经理、工程师等角色按 SOP 传递材料，最后输出一个工作区里的项目结构和文件。

## 核心逻辑

它的核心哲学是 `Code = SOP(Team)`：先把软件公司的工作流程固化为 SOP，再把 SOP 分配给 LLM 角色团队。输入是一句老板式需求，例如创建一个小游戏或数据分析任务；系统先由产品/需求角色产生用户故事、竞品和需求文档，再由架构/项目角色设计数据结构、API 和任务拆分，最后交给工程角色生成代码与项目文件。输出不是一次回答，而是一组可落盘的文档、代码、仓库结构或 Data Interpreter 执行结果。

## 技术结构

- 关键模块：`metagpt.software_company` 负责软件公司式流水线，`ProjectRepo` 管理生成仓库，`roles` 承载产品、架构、项目管理、工程和 Data Interpreter 等角色，`config` 管理 OpenAI、Azure、Ollama、Groq 等 LLM Provider 配置。
- 调用链路：CLI 或库函数接收自然语言需求，初始化配置和角色团队，角色按 SOP 产出中间文档，后续角色读取前序产物继续加工，最终写入 workspace 或返回项目结构。
- 输入输出：输入是自然语言项目需求、LLM 配置和可选运行参数；输出是用户故事、需求、竞品分析、数据结构、API 文档、代码文件、数据分析图表等项目资产。
- 核心依赖：Python 3.9 到 3.11，实际使用需要 Node/pnpm 支撑部分项目生成，LLM Provider 通过配置文件接入。

## 为什么值得参考

它最有参考价值的地方，是把 Agent Building 的“角色”落到可传递的工件，而不是停留在 persona。每个角色的意义来自它消费什么上游材料、产出什么下游材料。对独立站工作流读者来说，MetaGPT 是一个很清楚的样例：多 Agent 协作要先定义组织过程，再定义角色话术。

## 为什么不建议直接套用

MetaGPT 的默认目标是软件项目生成，SOP 很重，且对本地环境、模型配置、Node/pnpm 和 workspace 写入都有要求。把它直接套到内容生产、研究整理或轻量业务流程，容易出现流程比任务本身更重的问题。它的角色链还隐含“软件公司”视角，不适合需要快速人工判断、少量证据归纳或高度定制交付风格的场景。

## 如何改造成自己的版本

1. 先保留“角色按工件交接”的思想，而不是复制 PM/Architect/Engineer 这些角色名。
2. 为自己的业务定义 3 到 5 个中间产物，例如线索卡、判断表、方案草稿、质检报告、交付包。
3. 每个 Agent 只负责一个工件转换：读什么、判断什么、写什么、失败时退回给谁。
4. 把最终输出改成可审阅目录或 Markdown 包，而不是自动生成代码仓库。
5. 增加人工 checkpoint，尤其是需求定义和最终交付前，不让流水线自动越过判断点。

## 适用场景

- 软件原型、代码仓库、数据分析项目等需要多阶段产物交接的任务。
- 想学习如何把多 Agent 角色绑定到 SOP，而不是只写角色设定。
- 需要把自然语言需求转成文档、API、任务和代码资产的实验。

## 不适用场景

- 一次性问答、轻量改写、短研究卡片等不需要完整组织流程的任务。
- 不允许本地写文件、安装依赖或配置 LLM key 的环境。
- 角色产物需要强人工判断，而不是可以稳定自动传递的场景。

## Agent Building 判断

- 多步工作流：需求输入 → 产品/需求文档 → 架构/API/数据结构 → 项目任务 → 工程实现 → 仓库/文档输出。
- 工作标准：每个角色有明确上游输入和下游文档，最终以项目文件和结构作为交付物。
- Loop 标准：SOP 驱动的顺序传递是主要循环，Data Interpreter 等角色可在执行中运行代码、观察结果并继续修正。
- Harness 标准：README 提供 CLI、库调用、配置和 workspace 输出路径；项目本身有配置样例与安装路径，但具体质量评估需另配测试任务。
- 工具调用链路或 Agent 间通信：角色通过共享项目材料和中间文档通信，CLI/库函数负责启动团队流程。
- 为什么不是 persona / profile / system prompt only：它不是单纯角色口吻，而是把角色嵌入 SOP 和文件产物链。

## 参考信息

- 原项目：[MetaGPT](https://github.com/FoundationAgents/MetaGPT)
- 作者：FoundationAgents
- 相关概念：[[多Agent协作]]、[[Agent编排]]
- 相关卡片：[workflow-read-077](workflow-read-077.md)
