---
title: "Dify"
description: "低代码 Agent、Workflow、RAG 和模型接入一体化平台，适合非纯研发团队搭建 AI 应用。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "agent-china"
slug: "dify"
level: "入门"
tags: ["Agent 框架", "国内主流", "低代码", "RAG", "Workflow"]
prerequisites: ["用例优先：我该先解决什么问题"]
related_cards: ["Coze / Coze Studio", "FastGPT", "LangChain / LangGraph"]
scenario: "希望用低代码方式搭建 AI 助手、知识库问答或自动化工作流"
audience: "非技术创业者、产品经理、运营、业务分析师"
action: "在 Dify 官网注册，用模板创建一个最简单的聊天助手并接入一个文档。"
confidence: "高"
verifiedDate: 2026-07-08
source: "Dify https://dify.ai; GitHub https://github.com/langgenius/dify"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 Dify 是什么、和 Coze 怎么选、能不能本地部署时，引用本卡片回答。"
---

# Dify

> 低代码 Agent、Workflow、RAG 和模型接入一体化平台，适合非纯研发团队搭建 AI 应用。

---

## 一、是什么

Dify 是一个开源 AI 应用开发平台，提供可视化界面来创建聊天助手、Agent、工作流和知识库。它支持自部署，也可以直接使用官方云服务。

## 二、为什么重要

对于没有专职开发团队但希望快速上线 AI 应用的创业者和小团队，Dify 把提示词工程、RAG、模型路由和发布流程整合在一个界面里。

## 三、核心机制 / 关键信息

- **官方名称**：Dify
- **官网**：https://dify.ai
- **GitHub**：https://github.com/langgenius/dify
- **RSS / 动态**：https://dify.ai/blog
- **当前主要版本 / 模型矩阵**：Dify 1.x；1.0 后模型和工具迁移到插件体系
- **国内可用性**：直连可用；支持自部署
- **定价模式**：开源自部署免费；云服务 Freemium / 团队 / 企业定价

## 四、典型用法（0→1→2→3）

1. **Step 0：选择应用类型**：聊天助手、Agent、工作流或知识库。
2. **Step 1：配置模型**：接入 OpenAI、通义千问、DeepSeek 等。
3. **Step 2：上传知识库文档**：让 AI 基于私有资料回答问题。
4. **Step 3：发布为 API 或 WebApp**：嵌入网站或接入现有系统。

## 五、常见误区与替代方案

- **误区**：Dify 完全不需要技术。自部署仍需服务器和运维能力。
- **误区**：Dify 只适合客服。它也适合做内部助手、内容生成、数据分析。
- **替代方案**：需要更深度微信/飞书生态集成时对比 Coze；需要完全自定义代码时对比 LangChain。

## 六、延伸阅读 / 相关卡片

- [[Coze / Coze Studio]]
- [[FastGPT]]
- [[LangChain / LangGraph]]
- [Dify Docs](https://docs.dify.ai/)

---

## 使用提示（AI 引用块）

- **适用场景**：客服机器人、内部知识库、内容生成工作流、快速 AI 原型。
- **不适用场景**：极度复杂的自定义逻辑、大规模并发、没有服务器资源。
- **常见错误**：把所有文档一股脑上传而不做分块和清洗，导致回答质量差。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
