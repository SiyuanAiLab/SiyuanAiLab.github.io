---
title: Claude Code 入门配置指南
description: 非技术用户在 Mac 上安装、配置并开始使用 Claude Code 的最小步骤。
pubDate: 2026-06-29
category: toolkits
level: 入门
tags: [Claude Code, 配置, 无代码, 工具]
scenario: 想用 AI 助理管理本地文件和项目，但不知道如何开始配置
audience: 非技术背景、M 芯片 Mac 用户
action: 按本指南完成安装后，用 Claude Code 打开一个本地文件夹并尝试"列出最近修改的 5 个文件"
source: 实测整理
confidence: 高
verifiedDate: 2026-06-29
curated_by: 杨思远 / 思远 AI Lab
public: true
---

# Claude Code 入门配置指南

> 非技术用户在 Mac 上安装、配置并开始使用 Claude Code 的最小步骤。

---

## 一、是什么

Claude Code 是 Anthropic 推出的命令行 AI 助理，能直接读取、编辑、执行本地项目文件，适合把重复判断和操作交给 AI。

## 二、为什么存在

对于非程序员来说，传统编程环境门槛高。Claude Code 用自然语言交互，让非技术用户也能指挥 AI 处理本地文件。

## 三、核心步骤

1. 安装 Homebrew（如未安装）
2. 运行 `brew install anthropic/tap/claude-code`
3. 运行 `claude` 并按提示登录
4. 在目标文件夹内运行 `claude`，开始对话
5. 用自然语言让 AI 读取文件、修改内容、运行命令

## 四、常见误解

| 误解 | 真相 |
|------|------|
| 需要会写代码 | 不需要，但需要理解文件和文件夹结构 |
| AI 会自动删文件 | 每次写入/删除都会请求确认，保持监督 |

## 五、怎么用

- **Level 0**：让 Claude Code 读取并总结一个 Markdown 文件
- **Level 1**：让它按你的要求重命名、整理一批文件
- **Level 2**：加载 SKILL.md，让 AI 按你的规则审阅内容
- **Level 3**：与 Obsidian、Hermes 组合，形成个人工作系统

## 六、延伸阅读

- 相关卡片：AI Agent、Agent Skill
