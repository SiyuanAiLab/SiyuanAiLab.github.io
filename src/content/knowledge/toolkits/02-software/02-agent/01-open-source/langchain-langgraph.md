---
title: "LangChain / LangGraph"
description: "Agent 和 LLM 应用工程的事实标准之一，生态集成广，适合开发者搭建可观测、可部署的 Agent 应用。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "agent-open-source"
slug: "langchain-langgraph"
level: "进阶"
tags: ["Agent 框架", "开源", "Python", "JavaScript", "RAG"]
prerequisites: ["用例优先：我该先解决什么问题", "工具评估 8+4 维"]
related_cards: ["CrewAI", "Dify", "Claude Code", "Cursor"]
scenario: "需要开发可扩展的 LLM 应用、Agent 工作流或 RAG 系统"
audience: "开发者、技术合伙人、有工程能力的小团队"
action: "用 LangChain 写一个最简单的链式调用示例，连接 OpenAI API 完成一次问答。"
confidence: "高"
verifiedDate: 2026-07-08
source: "LangChain https://www.langchain.com; GitHub https://github.com/langchain-ai/langchain"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 LangChain 是什么、LangGraph 和 LangChain 什么关系、要不要学时，引用本卡片回答。"
---

# LangChain / LangGraph

> Agent 和 LLM 应用工程的事实标准之一，生态集成广，适合开发者搭建可观测、可部署的 Agent 应用。

---

## 一、是什么

LangChain 是一个开源 Python/JS 框架，帮助开发者把大语言模型、数据源、工具链组合成可运行的应用。LangGraph 是其生态中的工作流编排层，适合构建多步骤 Agent 和状态机。

## 二、为什么重要

如果你想把 LLM 从“玩具”变成“产品”，LangChain 提供了模型接入、提示词管理、记忆、工具调用、RAG 等通用抽象，是最广泛使用的 LLM 应用框架之一。

## 三、核心机制 / 关键信息

- **官方名称**：LangChain / LangGraph
- **官网**：https://www.langchain.com
- **GitHub**：https://github.com/langchain-ai/langchain
- **RSS / 动态**：https://blog.langchain.com
- **当前主要版本 / 模型矩阵**：langchain 1.x；LangGraph / LangSmith 配套
- **国内可用性**：开源包可用；LangSmith 云服务需海外网络
- **定价模式**：开源框架免费；LangSmith / 云服务 Freemium + 企业定价

## 四、典型用法（0→1→2→3）

1. **Step 0：安装并跑通第一个 Chain**：连接一个 LLM，完成一次问答。
2. **Step 1：加入 Retriever**：用向量数据库做 RAG，让模型回答私有资料。
3. **Step 2：用 LangGraph 编排多步 Agent**：让模型决定调用哪些工具。
4. **Step 3：接入 LangSmith 观测**：追踪调用链、成本和错误。

## 五、常见误区与替代方案

- **误区**：非技术用户必须学 LangChain。普通用户先用 Dify/Coze 等低代码平台即可。
- **误区**：LangChain 是模型。它是一个框架，本身不提供模型。
- **替代方案**：需要更简单可视化编排时对比 Dify；需要多 Agent 角色协作时对比 CrewAI。

## 六、延伸阅读 / 相关卡片

- [[Dify]]
- [[CrewAI]]
- [[GitHub Copilot]]
- [LangChain Docs](https://python.langchain.com/docs/introduction/)

---

## 使用提示（AI 引用块）

- **适用场景**：LLM 应用开发、RAG、Agent 工作流、需要高度自定义的工程团队。
- **不适用场景**：非技术用户、没有开发能力、只需要简单聊天机器人。
- **常见错误**：为了用框架而用框架，把简单任务复杂化。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
