---
title: "MCP 官方文档"
description: "模型上下文协议（Model Context Protocol）的官方规范与开发者指南，是 Agent 与外部工具交互的开放标准。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: sources
subcategory: "官方文档与产品更新"
level: 入门
tags: ["MCP", "模型上下文协议", "官方文档", "Agent", "信源"]
related_cards: ["ai-official-docs-directory", "anthropic-official-docs"]
scenario: "需要判断「MCP 官方文档」是否适合作为 AI 学习、研究或行业观察信源时。"
audience: "非技术背景的 AI 学习者、产品经理、内容创作者和企业 AI 服务从业者。"
action: "把 MCP 官方文档 加入或排除出自己的 AI 信源清单，并在关键判断前交叉验证。"
confidence: 高
verifiedDate: 2026-07-08
source: "https://modelcontextprotocol.io/docs / 独立站产品化框架讨论"
sourcePath: "06-Knowledge/02-AI与智能系统/02-实践与经验/MCP官方文档.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
---
# MCP 官方文档

> 模型上下文协议（Model Context Protocol）的官方规范与开发者指南，是 Agent 与外部工具交互的开放标准。

---

## 一、是什么

MCP 官方文档（modelcontextprotocol.io/docs）是 Anthropic 发起的模型上下文协议的规范入口。MCP 定义了 AI 应用如何安全、标准化地连接外部数据源和工具。文档覆盖：

- 协议核心概念（Server、Client、Tool、Resource、Prompt）
- 快速开始与示例
- Server 与 Client 开发指南
- 认证、安全与最佳实践
- 官方 SDK（TypeScript、Python、Java、Kotlin 等）

它属于第 1 级信源，是判断 MCP 能力和集成方式的最权威依据。

## 二、为什么存在

随着 AI Agent 需要连接数据库、文件、API、浏览器等外部系统，碎片化的集成方式成为瓶颈。MCP 试图成为“AI 的 USB-C 接口”，官方文档是理解这一标准的起点。

## 三、核心机制

### 3.1 主要板块

| 板块 | 用途 | 典型入口 |
|---|---|---|
| Core Concepts | 理解 Server/Client/Tool/Resource | https://modelcontextprotocol.io/docs/concepts/architecture |
| Quickstart | 5 分钟搭建第一个 MCP server | https://modelcontextprotocol.io/quickstart |
| SDK Reference | TypeScript / Python / Java SDK | https://modelcontextprotocol.io/sdk |
| Examples | 官方示例仓库 | https://github.com/modelcontextprotocol/servers |
| Specification | 协议详细规范 | https://modelcontextprotocol.io/specification |

### 3.2 关键使用路径

- **想理解 MCP 是什么** → Core Concepts
- **想给 Claude 做一个工具** → Quickstart + Server 开发指南
- **找现成工具集成** → GitHub 官方 servers 仓库
- **做安全评估** → 认证与最佳实践部分

## 四、常见误解

| 误解 | 真相 |
|---|---|
| MCP 只是 Anthropic 的私有协议 | MCP 是开放协议，已被多家公司和工具支持 |
| MCP 等同于 Function Calling | MCP 是更高层的连接标准，Function Calling 是模型能力之一 |
| 只有工程师需要看 | 产品经理和架构师需要理解其安全边界和集成模式 |
| MCP 已经很成熟 | 协议仍在快速演进，需关注版本和弃用说明 |

## 五、怎么用

### Level 0：收藏入口

把 https://modelcontextprotocol.io/docs 加入书签。

### Level 1：理解架构

阅读 Core Concepts，区分 Server、Client、Tool、Resource 四个核心概念。

### Level 2：跑通示例

按 Quickstart 搭建一个简单 MCP server，理解协议实际工作方式。

### Level 3：评估集成

在项目中引入 MCP 前，评估认证模型、权限边界和已有生态支持度。

## 六、延伸阅读

- 目录卡：[AI官方文档与产品更新](/knowledge/sources/ai-official-docs-directory/)
- 关联概念：`[[模型上下文协议]]` / `[[工具调用]]` / [Anthropic官方文档](/knowledge/sources/anthropic-official-docs/)
