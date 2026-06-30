---
title: "MCP 工具参考：Figma Context MCP"
description: "一个 Figma MCP server，把设计文件裁剪成适合 coding agent 使用的布局、样式和图片上下文。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "进阶"
tags: ["MCP", "工具接口", "Agent工具", "协议生态"]
prerequisites: []
related_cards: ["ai-core-31-model-context-protocol", "ai-core-27-tool-use-function-calling"]
scenario: "基础设施层 / MCP 工具"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的MCP 工具流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/GLips/Figma-Context-MCP"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Framelink MCP for Figma

> 一个 Figma MCP server，把设计文件裁剪成适合 coding agent 使用的布局、样式和图片上下文。

## 这个能力解决什么问题

让 AI 根据 Figma 实现 UI 时，直接贴截图信息太少，直接把 Figma API 原始 JSON 给模型又太大、太乱。Figma Context MCP 解决的是把 Figma file/frame/group 链接转成简化后的设计上下文，只保留 coding agent 真正需要的布局、样式、文本、组件和图片信息，让 Cursor 等工具更准确地生成前端代码。

## 核心逻辑

输入是 Figma 文件、frame 或 group 链接，以及 Figma access token。MCP server 解析 URL，调用 Figma API 拉取节点数据；`extractors` 和 `transformers` 遍历节点树，把布局、flex/grid、颜色、渐变、图片、文本、组件、effects 等原始设计信息转换成可序列化的精简结构；必要时 `download-figma-images` 工具下载图片资源。输出是 coding agent 可读的设计 metadata、样式上下文和图片文件，而不是完整 Figma 原始响应。

## 技术结构

- **MCP tools**：`get-figma-data-tool` 获取设计数据，`download-figma-images-tool` 处理图片资产。
- **Figma service**：`figma.ts` 和 `get-figma-data.ts` 负责 API 请求、错误、rate limit 和指标。
- **Extractors**：`design-extractor`、`node-walker`、`finalize` 负责从 Figma 节点树抽出有效信息。
- **Transformers**：layout/flex/grid、style/color/gradient/image、text、component、effects 等模块把原始属性转换成模型友好的结构。
- **安全与质量测试**：tests 覆盖 path validation、telemetry redaction、rich text、layout alignment、image processing、serialization 等。

## 为什么值得参考

它的亮点是“上下文裁剪”，不是简单 API proxy。Figma API 信息非常多，真正有用的是布局约束、视觉 token、文本层级和必要图片；项目把这些抽取和转换做成独立模块，给所有设计转代码工具一个关键启发：给模型的不是更多信息，而是更贴近实现的信息。

## 为什么不建议直接套用

它需要 Figma personal access token，且默认面向 Cursor 这类 coding agent；企业设计文件权限、token 存储、telemetry、图片下载路径都要单独审查。Figma 的复杂组件、auto layout、变量、响应式约束并不总能无损转成代码语义，输出仍需要前端工程师判断。若设计系统和代码组件库强绑定，单纯读取 Figma 还不够，还要映射到本地组件。

## 如何改造成自己的版本

内部可以借它做“设计上下文中间层”：先定义自己的输出 schema，包括 colors、typography、spacing、layout、components、assets、implementation_notes；再把 Figma node 转成这个 schema，同时把 design token 名称映射到代码库 token。图片下载要限制目录和文件名，Figma token 只放环境变量。给 Agent 的提示里只传目标 frame 的精简上下文和本地组件约束。

## 适用场景

- Figma 到前端代码的 AI 辅助实现。
- 需要从设计稿提取布局、样式、图片和文本上下文。
- coding agent 已在 Cursor/VS Code 等 MCP host 中运行。

## 不适用场景

- 设计文件权限敏感，不能给工具 token。
- 需要完整设计评审，而非代码实现上下文。
- 本地组件库映射规则尚未建立。

## 参考信息

- 原项目：[Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP)
- 作者：GLips
- 相关概念：[[设计转代码]]、[[MCP]]、[[上下文裁剪]]
- 相关卡片：保守留空
