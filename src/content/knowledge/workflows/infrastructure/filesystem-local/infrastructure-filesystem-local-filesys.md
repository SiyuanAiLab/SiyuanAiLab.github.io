---
title: "文件系统与本地执行参考：Filesys"
description: "一个只暴露安全目录中文件列表和读取能力的轻量 MCP server，并附带 Claude 工具客户端示例。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["文件系统", "本地执行", "文档处理", "CLI"]
prerequisites: []
related_cards: []
scenario: "基础设施层 / 文件系统与本地执行"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的文件系统与本地执行流程。"
confidence: "低"
verifiedDate: "2026-06-30"
source: "https://github.com/OmniS0FT/Filesys"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Filesys

> 一个只暴露安全目录中文件列表和读取能力的轻量 MCP server，并附带 Claude 工具客户端示例。

## 这个能力解决什么问题

很多本地文件工具一上来就开放读写删，风险过高。Filesys 解决的是一个更窄的问题：让 LLM 只能在预配置的安全目录里列出可见文件、读取指定文件内容和元数据，同时阻止目录穿越。它更像“安全文件读取最小样例”，而不是完整文件管理器。

## 核心逻辑

输入是 MCP resource 请求或 Claude tools 调用：列出安全目录文件，或读取某个文件名。处理层读取配置中的 base directory；`src/resources.py` 的 `list_files()` 扫描目录，`read_file(filename)` 校验路径后读取文件内容、大小和最后修改时间；`src/server.py` 用 FastMCP 注册 `files://list` 和 `files://read/{filename}` 两个 resource；`claude_tool_client.py` 把 MCP 请求包装成 Claude 可用函数；`interact_with_claude.py` 提供命令行对话。输出是文件列表、文件正文和 metadata。

## 技术结构

- **config/config.json**：定义唯一允许访问的目录。
- **src/resources.py**：核心安全逻辑，负责目录扫描、文件读取、路径校验和目录穿越防护。
- **src/server.py / run.py**：启动 FastMCP server，注册两个资源 endpoint。
- **claude_tool_client.py**：把 MCP resource 调用转成普通函数，方便 Claude Tools 使用。
- **tests/test_resources.py**：覆盖文件列表和读取逻辑，说明项目至少把资源层作为测试对象。

## 为什么值得参考

它的参考价值是“极小权限面”：只读、单目录、两个资源、路径校验。这比功能丰富的文件 MCP 更适合作为内部安全基线。对工作流缓存层来说，很多任务只需要让 Agent 读材料，不需要写或删；Filesys 展示了如何把能力边界缩到最小。

## 为什么不建议直接套用

项目星标低、功能非常基础，README 还要求本地环境文件放 Anthropic API key 才能跑交互脚本；对真实团队来说，认证、审计、文件大小限制、二进制文件处理、编码错误、隐藏文件策略都还不完整。它只支持文件列表和单文件读取，不能处理目录递归、搜索、写结果和批处理。

## 如何改造成自己的版本

可以把它改造成“只读知识目录 MCP”：配置多个命名 root，每个 root 有说明、允许扩展名、最大文件大小和是否递归；工具返回时带相对路径、mtime、size、hash，禁止返回本机绝对路径；读取大文件时只返回分块摘要或片段。写入能力另做独立 server，不和只读 server 混在一起。

## 适用场景

- 只需要让 Agent 安全读取指定目录。
- 教学或原型阶段验证 MCP resource 设计。
- 知识库/项目资料不允许 Agent 写入。

## 不适用场景

- 需要完整文件管理、搜索、写入或批处理。
- 目录中包含敏感密钥或不可直接暴露内容。
- 需要成熟认证、审计和多用户隔离。

## 公开版边界

- 项目较新，成熟度待验证。

## 参考信息

- 原项目：[Filesys](https://github.com/OmniS0FT/Filesys)
- 作者：OmniS0FT
- 相关概念：[[只读文件访问]]、[[MCP Resource]]、[[路径校验]]
- 相关卡片：保守留空
