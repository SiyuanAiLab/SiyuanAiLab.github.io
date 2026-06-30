---
title: "模型上下文协议（Model Context Protocol）"
description: "一种让 AI 应用以标准方式连接工具、数据源和上下文服务的开放协议。"
pubDate: 2026-06-29
category: concepts
level: 入门
tags: ["MCP", "Model Context Protocol", "工具协议"]
prerequisites: []
related_cards: []
scenario: "适合用来建立 AI 核心概念的共同语言。"
audience: "非技术创业者、AI 产品使用者、内容与业务负责人"
action: "先用一句话复述这个概念，再判断它和你的业务场景有什么关系。"
source: "06-Knowledge 改写 / Model Context Protocol documentation"
sourcePath: "06-Knowledge/02-AI与智能系统/01-理论与原理/独立站公开版/31-模型上下文协议-Model-Context-Protocol.md"
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
draft: false
---
# 模型上下文协议（Model Context Protocol）

> 一种让 AI 应用以标准方式连接工具、数据源和上下文服务的开放协议。

---

## 一、是什么

- 一种让 AI 应用以标准方式连接工具、数据源和上下文服务的开放协议。
- 类比：像给 AI 工具世界制定统一插头和插座。
- 关键澄清：

| 它不是什么 | 它是什么 |
|---|---|
| 不是某一个模型 | 连接模型应用与外部资源的协议层 |

## 二、为什么重要

- 它降低了工具接入成本，让不同应用更容易复用能力。
- 不懂它会怎样：协议接通后仍要处理权限、认证和数据边界。

## 三、日常怎么理解

- 用一句话讲给非技术朋友听：MCP 是 AI 调工具和资料的通用接口协议。
- 常见场景：让桌面 AI 助手读取文件、连数据库、查浏览器或调用内部服务。

## 四、常见误解

| 误解 | 真相 |
|---|---|
| 用了 MCP 就自动安全 | MCP 只是接口标准，安全要靠认证、权限和审计。 |

## 五、延伸阅读

- 本知识库相关：工具调用、API密钥即护栏
- [Model Context Protocol documentation](https://modelcontextprotocol.io/docs)
- 06-Knowledge: MCP认证隔离架构.md: `
