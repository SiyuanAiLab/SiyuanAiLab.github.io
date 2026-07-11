---
title: "CrewAI"
description: "多 Agent 角色协作和流程编排框架，适合把复杂业务任务拆成多个角色协同完成。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "agent-open-source"
slug: "crewai"
level: "进阶"
tags: ["Agent 框架", "开源", "多 Agent", "角色协作"]
prerequisites: ["用例优先：我该先解决什么问题", "工具评估 8+4 维"]
related_cards: ["LangChain / LangGraph", "Dify", "Coze / Coze Studio"]
scenario: "需要把复杂任务拆成多个 AI 角色协作完成，例如研究、写作、审核"
audience: "开发者、业务分析师、需要多 Agent 协作的团队"
action: "用 CrewAI 定义 2–3 个角色和任务，让它们协作完成一篇简短的研究报告。"
confidence: "高"
verifiedDate: 2026-07-08
source: "CrewAI https://crewai.com; GitHub https://github.com/crewAIInc/crewAI"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 CrewAI 是什么、多 Agent 协作怎么做、和 LangChain 怎么选时，引用本卡片回答。"
---

# CrewAI

> 多 Agent 角色协作和流程编排框架，适合把复杂业务任务拆成多个角色协同完成。

---

## 一、是什么

CrewAI 是一个开源 Python 框架，专注于多 Agent 角色协作。你可以定义多个 Agent（如研究员、写手、编辑），给它们分配任务，让它们按流程协同产出结果。

## 二、为什么重要

很多复杂工作不是单个提示词能完成的。CrewAI 提供了角色、任务、流程、工具四个抽象，让非纯研发人员也能设计多 Agent 工作流。

## 三、核心机制 / 关键信息

- **官方名称**：CrewAI
- **官网**：https://crewai.com
- **GitHub**：https://github.com/crewAIInc/crewAI
- **RSS / 动态**：https://www.crewai.com/blog
- **当前主要版本 / 模型矩阵**：CrewAI 开源框架 + CrewAI AMP Suite 商业控制平面
- **国内可用性**：开源包可用；云服务大陆可用性未确认
- **定价模式**：开源框架免费；商业平台 Free + Enterprise custom

## 四、典型用法（0→1→2→3）

1. **Step 0：定义角色**：研究员、写手、编辑、审核员等。
2. **Step 1：分配任务**：每个角色有明确输入、输出和验收标准。
3. **Step 2：设置流程**：顺序、并行或条件分支。
4. **Step 3：运行并迭代**：观察 Agent 之间的协作效果，调整角色和任务描述。

## 五、常见误区与替代方案

- **误区**：多 Agent 一定比单 Agent 好。角色过多会增加成本和错误累积。
- **误区**：CrewAI 不需要编程。基础使用仍需 Python 和提示词设计能力。
- **替代方案**：需要可视化低代码时对比 Dify/Coze；需要更底层控制时对比 LangGraph。

## 六、延伸阅读 / 相关卡片

- [[LangChain / LangGraph]]
- [[Dify]]
- [[Coze / Coze Studio]]
- [CrewAI Docs](https://docs.crewai.com/)

---

## 使用提示（AI 引用块）

- **适用场景**：复杂研究、内容生产、多步骤业务流程自动化。
- **不适用场景**：简单问答、单轮任务、没有开发能力。
- **常见错误**：角色分工模糊，导致 Agent 互相推诿或重复工作。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
