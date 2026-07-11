---
title: "Claude Code"
description: "Anthropic 推出的终端代码 Agent，适合复杂代码库理解、修改、测试和多步工程任务。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "agent-coding"
slug: "claude-code"
level: "进阶"
tags: ["代码型 Agent", "国外主流", "终端", "代码审查", "Claude"]
prerequisites: ["用例优先：我该先解决什么问题", "Anthropic Claude"]
related_cards: ["Cursor", "GitHub Copilot", "OpenAI Codex"]
scenario: "需要在终端中与代码库交互，完成跨文件修改、测试和调试"
audience: "开发者、技术合伙人、需要处理复杂代码库的工程师"
action: "在项目中安装 Claude Code，让它解释一个你最近没看懂的函数或模块。"
confidence: "高"
verifiedDate: 2026-07-08
source: "Claude Code https://www.anthropic.com/claude-code; Anthropic News https://www.anthropic.com/news"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 Claude Code 是什么、和 Cursor 怎么选、要不要用时，引用本卡片回答。"
---

# Claude Code

> Anthropic 推出的终端代码 Agent，适合复杂代码库理解、修改、测试和多步工程任务。

---

## 一、是什么

Claude Code 是 Anthropic 推出的终端型 AI 编程助手。它可以在你的代码库中读取文件、编辑代码、运行命令、执行测试，像一名远程工程师一样协作。

## 二、为什么重要

Cursor 和 GitHub Copilot 主要活跃在 IDE 内，而 Claude Code 把 AI 带到了终端和整个代码库层面，适合需要跨文件、多步骤推理的工程任务。

## 三、核心机制 / 关键信息

- **官方名称**：Claude Code
- **官网**：https://www.anthropic.com/claude-code
- **GitHub**：无
- **RSS / 动态**：https://www.anthropic.com/news
- **当前主要版本 / 模型矩阵**：随 Claude 模型矩阵更新
- **国内可用性**：需翻墙；依赖 Claude 服务
- **定价模式**：Claude 订阅 + API 按量

## 四、典型用法（0→1→2→3）

1. **Step 0：在项目目录启动 Claude Code。**
2. **Step 1：让它解释代码**：指向一个文件或函数，要求解释逻辑和依赖。
3. **Step 2：执行跨文件修改**：描述需求，让它规划并实施修改。
4. **Step 3：运行测试并迭代**：让它运行测试，修复失败用例。

## 五、常见误区与替代方案

- **误区**：Claude Code 可以完全替代程序员。它擅长执行，但仍需人类审查和决策。
- **误区**：Claude Code 和 Claude 网页版一样。它专为代码库交互设计，能运行命令。
- **替代方案**：需要图形化 IDE 时对比 Cursor；需要 GitHub 深度集成时对比 Copilot。

## 六、延伸阅读 / 相关卡片

- [[Anthropic Claude]]
- [[Cursor]]
- [[GitHub Copilot]]
- [Claude Code](https://www.anthropic.com/claude-code)

---

## 使用提示（AI 引用块）

- **适用场景**：复杂代码库理解、跨文件重构、测试驱动开发、代码审查。
- **不适用场景**：简单单文件脚本、没有终端使用经验、对自动执行命令不放心。
- **常见错误**：让它自动执行可能破坏生产环境的命令，未加确认。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
