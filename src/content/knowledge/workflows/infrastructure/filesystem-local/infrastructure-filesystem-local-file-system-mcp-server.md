---
title: "文件系统与本地执行参考：file system mcp server"
description: "一个基于 FastMCP 的本地文件系统工具 server，提供读写、复制、移动、搜索、目录和系统信息工具。"
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
source: "https://github.com/calebmwelsh/file-system-mcp-server"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# File System MCP Server

> 一个基于 FastMCP 的本地文件系统工具 server，提供读写、复制、移动、搜索、目录和系统信息工具。

## 这个能力解决什么问题

Agent 要处理本地材料时，不能只靠聊天框上传文件；它需要列目录、读文件、写结果、搜索文件、查看元信息，甚至组织一组相关文件。这个项目解决的是把这些本地文件动作暴露成 MCP 工具，让 Claude 等 MCP host 可以通过结构化 API 操作文件系统。

## 核心逻辑

输入是 MCP 客户端发出的工具调用，例如 `read_file`、`write_file`、`search_files`、`list_directory`、`get_disk_info`。处理层用 FastMCP 注册工具，用 Pydantic 做参数校验；文件操作前做路径校验，复制/移动/删除支持备份或安全检查；系统信息工具读取 OS、CPU、内存、磁盘和目录统计。输出是文件内容、操作结果、搜索列表、目录树、文件/磁盘元数据或错误信息。

## 技术结构

- **FastMCP server**：`fs_server.py` 作为 MCP 入口，通过 Python 解释器在 Claude Desktop 配置中启动。
- **File operations**：copy/move/delete/read/write/info/search/create_collection，覆盖读写和组织文件集合。
- **Directory operations**：list/create/delete/tree/search，适合让 Agent 探索工作区结构。
- **System information**：system/disk/directory info，给 Agent 判断空间、平台和目录规模。
- **平台差异**：README 明确 Windows 功能更完整，macOS/Linux 只有基础文件和目录能力，未来计划补齐平台工具。

## 为什么值得参考

它适合作为“文件 MCP 最小工具面”的清单：哪些动作应该开放、哪些动作需要安全检查、哪些元信息对 Agent 有用。README 还直接列出 Known Issues，说明删除、驱动器检测、跨平台行为都不能想当然。

## 为什么不建议直接套用

项目星标很低，README 明确 `delete_file` 有已知问题，`list_drives` 也可能不准；跨平台能力偏 Windows，macOS/Linux 支持较薄。它包含写入、移动、删除等高风险工具，若直接接到 Agent，误操作成本很高。路径校验和备份策略需要实际代码审计，不能只凭 README 信任。

## 如何改造成自己的版本

内部文件 MCP 应从只读开始：`list_directory`、`read_file`、`search_files`、`get_file_info` 先上线；写入工具只允许写到指定 output 目录；删除和移动默认禁用。每个工具都要带 workspace root、最大文件大小、允许扩展名和审计日志。等只读稳定后，再引入“写草稿文件”和“复制备份”这类低风险动作。

## 适用场景

- 本地知识库、项目目录、文档批处理的 MCP 文件访问。
- 需要让 Agent 搜索和读取多个本地文件。
- 想参考文件工具命名和权限分层。

## 不适用场景

- 直接开放删除/移动给无人监督 Agent。
- 需要成熟跨平台生产级文件管理。
- 文件包含密钥、隐私或不可恢复资产。

## 公开版边界

- 项目较新，成熟度待验证。

## 参考信息

- 原项目：[file-system-mcp-server](https://github.com/calebmwelsh/file-system-mcp-server)
- 作者：calebmwelsh
- 相关概念：[[MCP]]、[[本地文件系统]]、[[权限边界]]
- 相关卡片：保守留空
