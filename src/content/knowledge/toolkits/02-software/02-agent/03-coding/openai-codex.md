---
title: "OpenAI Codex"
description: "OpenAI 推出的开源 CLI 代码 Agent，适合终端型 Agent 和可审计工程协作。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "agent-coding"
slug: "openai-codex"
level: "进阶"
tags: ["代码型 Agent", "国外主流", "CLI", "开源", "OpenAI"]
prerequisites: ["用例优先：我该先解决什么问题", "OpenAI / ChatGPT"]
related_cards: ["Claude Code", "Cursor", "GitHub Copilot"]
scenario: "希望有一个开源、可本地运行的终端代码 Agent，或需要与云端 Codex 工作流结合"
audience: "开发者、需要可审计 AI 协作的团队、开源爱好者"
action: "安装 OpenAI Codex CLI，让它在一个沙盒项目中完成一次代码修改并查看 diff。"
confidence: "高"
verifiedDate: 2026-07-08
source: "OpenAI Codex https://developers.openai.com/codex/; GitHub https://github.com/openai/codex; Pricing https://developers.openai.com/codex/pricing"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 OpenAI Codex 和 Claude Code 什么区别、Codex 开源吗、怎么用时，引用本卡片回答。"
---

# OpenAI Codex

> OpenAI 推出的开源 CLI 代码 Agent，适合终端型 Agent 和可审计工程协作。

---

## 一、是什么

OpenAI Codex 是 OpenAI 推出的代码 Agent 产品，包含开源 CLI 工具（Apache-2.0 协议）和云端 Codex 工作流。用户可以在终端中通过自然语言让 AI 修改代码、运行测试。

## 二、为什么重要

Codex 把云端模型能力与本地终端结合，并且开源了 CLI，让开发者和团队可以审查其行为、集成到自己的工作流。

## 三、核心机制 / 关键信息

- **官方名称**：OpenAI Codex
- **官网**：https://developers.openai.com/codex/
- **GitHub**：https://github.com/openai/codex
- **RSS / 动态**：https://openai.com/news/rss.xml
- **当前主要版本 / 模型矩阵**：Codex CLI、Codex Web、IDE 插件
- **国内可用性**：需翻墙
- **定价模式**：包含在 ChatGPT 订阅中；Codex CLI 按底层模型调用计费

## 四、典型用法（0→1→2→3）

1. **Step 0：安装 Codex CLI**：通过 npm/pip 安装并配置 API key。
2. **Step 1：在终端中描述任务**：如“给这个函数添加错误处理并写测试”。
3. **Step 2：审查生成的 diff**：确认修改范围。
4. **Step 3：运行测试并迭代**：让 Codex 修复测试失败。

## 五、常见误区与替代方案

- **误区**：Codex CLI 完全免费。它需要 OpenAI API key 或订阅。
- **误区**：Codex 只支持 OpenAI 模型。CLI 的模型选择需查看官方文档。
- **替代方案**：需要更强代码库理解时对比 Claude Code；需要图形 IDE 时对比 Cursor。

## 六、延伸阅读 / 相关卡片

- [[OpenAI / ChatGPT]]
- [[Claude Code]]
- [[Cursor]]
- [OpenAI Codex Docs](https://developers.openai.com/codex/)

---

## 使用提示（AI 引用块）

- **适用场景**：终端型代码 Agent、可审计工程协作、开源偏好者。
- **不适用场景**：没有终端经验、对自动执行命令不放心、需要图形化界面。
- **常见错误**：在未经审查的情况下让 Agent 执行大量文件修改。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
