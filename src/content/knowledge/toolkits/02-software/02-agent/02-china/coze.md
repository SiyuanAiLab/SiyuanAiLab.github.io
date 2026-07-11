---
title: "Coze / Coze Studio"
description: "字节跳动的低代码 Agent 平台，与微信、飞书、Discord 等生态集成紧密，适合国内社媒和客服场景。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "agent-china"
slug: "coze"
level: "入门"
tags: ["Agent 框架", "国内主流", "低代码", "社媒", "客服"]
prerequisites: ["用例优先：我该先解决什么问题"]
related_cards: ["Dify", "FastGPT", "字节豆包"]
scenario: "需要快速搭建公众号/飞书/微信群机器人或内容助手"
audience: "自媒体运营、客服团队、需要国内社媒集成的创业者"
action: "在 Coze 创建一个简单 Bot，配置一个插件（如天气查询），并发布到飞书或公众号。"
confidence: "高"
verifiedDate: 2026-07-08
source: "Coze 中国站 https://www.coze.cn; Coze Studio GitHub https://github.com/coze-dev/coze-studio"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 Coze 是什么、和 Dify 怎么选、能不能接入微信公众号时，引用本卡片回答。"
---

# Coze / Coze Studio

> 字节跳动的低代码 Agent 平台，与微信、飞书、Discord 等生态集成紧密。

---

## 一、是什么

Coze 是字节跳动推出的低代码 AI Bot 开发平台，提供可视化 Bot 搭建、插件市场、知识库、工作流和多平台发布。Coze Studio 是其开源版本，支持自部署。

## 二、为什么重要

对于需要把 AI 助手发布到微信公众号、飞书、Discord 等国内/国际社媒平台的用户，Coze 提供了最便捷的集成路径之一。

## 三、核心机制 / 关键信息

- **官方名称**：Coze / Coze Studio
- **官网**：https://www.coze.cn（中国站）
- **GitHub**：https://github.com/coze-dev/coze-studio
- **RSS / 动态**：Coze 官方公众号 / GitHub releases
- **当前主要版本 / 模型矩阵**：Coze 平台 + Coze Studio 开源版
- **国内可用性**：直连可用；Coze Studio 可自部署
- **定价模式**：消费端 / 平台额度制；开源 Coze Studio 自部署免费

## 四、典型用法（0→1→2→3）

1. **Step 0：创建 Bot 并设定角色**：给它一个身份和任务范围。
2. **Step 1：添加插件和知识库**：如天气、搜索、企业 FAQ。
3. **Step 2：设计工作流**：用可视化编排处理多步骤任务。
4. **Step 3：发布到目标平台**：微信公众号、飞书、Discord、Telegram 等。

## 五、常见误区与替代方案

- **误区**：Coze 只能做客服。它也适合做内容助手、游戏 NPC、个人助理。
- **误区**：Coze Studio 和 Coze 平台完全相同。Studio 是自部署开源版，功能有差异。
- **替代方案**：需要更强 RAG 和私有部署时对比 Dify；需要完全自定义代码时对比 LangChain。

## 六、延伸阅读 / 相关卡片

- [[Dify]]
- [[FastGPT]]
- [[字节豆包]]
- [Coze Studio GitHub](https://github.com/coze-dev/coze-studio)

---

## 使用提示（AI 引用块）

- **适用场景**：社媒机器人、客服、内容助手、快速上线 MVP。
- **不适用场景**：严格数据隐私、完全离线、需要复杂自定义后端。
- **常见错误**：Bot 角色和任务范围设定模糊，导致回答偏离预期。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
