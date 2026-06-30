---
title: "研究与知识参考：llmwiki"
description: "一个 VS Code 扩展和 MCP Server，让 LLM 维护 `.wiki/raw -> wiki -> index/log` 的持久 Markdown 知识库。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["研究", "知识库", "摘要", "RAG"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 研究与知识"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的研究与知识流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/microsoft/llmwiki"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# llmwiki

> 一个 VS Code 扩展和 MCP Server，让 LLM 维护 `.wiki/raw -> wiki -> index/log` 的持久 Markdown 知识库。

## 这个能力解决什么问题

它解决的是传统 RAG 每次临时检索、临时总结，知识不会沉淀的问题。用户只负责把 raw sources 放进 `.wiki/raw/` 或通过扩展摄入；LLM 负责生成 entity、concept、source 页面，维护 index、backlinks、lint 和 log。输出是一套可浏览、可查询、可被 MCP 工具继续维护的 Markdown wiki。

## 核心逻辑

LLM Wiki 把知识库分三层：Raw Sources 是人类维护且不可变的材料；Wiki 是 LLM 生成和更新的页面；`AGENTS.md` 是人机共同演化的 schema。摄入时，扩展复制外部文件到 raw，再由 LM API 增强生成 wiki 页，更新 index 和 log。查询时不是直接读 raw，而是先搜索 wiki index、summary 和页面正文。

## 技术结构

- 关键模块：`packages/core` 提供 page I/O、index ops、log、sources、backlinks、lint、ingest、query、status 和 MCP server；`packages/vscode` 提供 tree view、命令、chat participant 和 MCP 自动注册。
- 调用链路：文件/文件夹 ingest -> raw 存档 -> LLM enrichment -> wiki 页面/index/log -> VS Code tree/MCP tools/query。
- 输入输出：输入是本地文件、文件夹或聊天命令；输出是 `.wiki/` 下的 Markdown 页面、索引、日志和 MCP JSON 响应。
- 核心依赖：Node 20、TypeScript、VS Code LM API/GitHub Copilot、gray-matter、MCP SDK、Vitest。

## 为什么值得参考

它的亮点是“编译型知识库”：不是每问一次才从原文里重新抽，而是每次新增来源都把知识并入持久 wiki。MCP 工具也覆盖了读、写、lint、crosslink、index update，这让 Agent 可以围绕知识库做维护闭环，而不只是检索。

## 为什么不建议直接套用

它强依赖 VS Code 1.101+ 和 GitHub Copilot Language Model API，不适合 Obsidian 或纯命令行用户直接使用。写工具允许 create/update 页面，如果 schema 没设好，LLM 可能把 wiki 维护成一团。删除 raw source 和派生页面的能力也需要明确权限与备份策略。

## 如何改造成自己的版本

借鉴三层结构即可：`raw/` 人类只追加，`wiki/` 由 Agent 生成，`AGENTS.md` 定义页面类型和交叉引用规则。先只开放 read/query/lint 工具，等结构稳定再开放 write/update。为每个页面加入 `source_path`、`ingested`、`confidence` 和“可追溯来源”段落，避免 wiki 变成无来源总结。

## 适用场景

- 个人或团队持续沉淀项目知识。
- 需要 LLM 帮忙维护实体、概念、backlink。
- 想把知识库能力暴露给 MCP Agent。

## 不适用场景

- 只需要一次性资料摘要。
- 原始材料不能复制进项目目录。
- 没有 schema 约束却允许 LLM 自动改知识库。

## 参考信息

- 原项目：[llmwiki](https://github.com/microsoft/llmwiki)
- 作者：microsoft
- 相关概念：[[编译型知识库]]、[[MCP 工具]]
- 相关卡片：保守留空
