---
title: "文件系统与本地执行参考：outline sync"
description: "一个 Outline 文档与本地文件系统双向同步工具，并提供 AI 标注、语义搜索和 MCP 文档工具。"
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
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/kingston/outline-sync"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# outline-sync

> 一个 Outline 文档与本地文件系统双向同步工具，并提供 AI 标注、语义搜索和 MCP 文档工具。

## 这个能力解决什么问题

团队文档常困在 SaaS 知识库里，AI 读不到完整层级；但直接让 Agent 操作 SaaS API 又容易丢结构和图片。outline-sync 解决的是把 Outline workspace 的 collection/document 树同步到本地 Markdown 文件，保留 frontmatter 和图片，再允许本地修改上传回 Outline，同时提供 annotate、semantic search 和 MCP tools 让 AI 更容易读写文档。

## 核心逻辑

输入是 Outline API token、`outline-sync.config.js` 中的 collections、API URL、输出目录和图片/清理等选项。download 命令从 Outline API 拉取 collections 和 documents，把层级转成本地文件夹和 Markdown；图片会下载到文档相关目录并把附件 URL 转成相对路径。upload 命令读取本地 Markdown 和图片，创建或更新 Outline 文档与附件。annotate 扫描缺失 title/description 的 Markdown，用配置的模型生成 frontmatter。search/rag-search 为文档建向量索引并返回语义匹配结果。输出是本地 docs 目录、更新后的 Outline 文档、frontmatter 标注和搜索结果。

## 技术结构

- **commands**：`download.ts`、`upload.ts`、`annotate.ts`、`search.ts`、`rag-search.ts`、`mcp.ts` 对应 CLI 能力。
- **services**：`outline.ts` 调 Outline API，`documents.ts` 管文档，`attachments.ts` 管图片，`output-files.ts` 管本地文件，`vector-store.ts`/`rag-store.ts` 管语义搜索。
- **MCP 层**：resources/documents，以及 create/edit/get/list/search document tools，让 MCP client 直接访问同步后的知识结构。
- **AI 依赖**：annotate/search 可接 Anthropic、Google、OpenAI 等 LangChain provider，需要额外 API key。
- **本地结构**：collection 变文件夹，document 变 Markdown，metadata 放 frontmatter，图片变相对文件。

## 为什么值得参考

它很适合作为“知识库缓存层”的参考：SaaS API 不是直接喂给模型，而是先落成本地 Markdown 和图片资产，再让 AI 在本地结构上读、改、搜。双向同步、图片处理、frontmatter 保存和 MCP 工具层，正好对应知识工作流从远程系统到本地可审计材料的桥。

## 为什么不建议直接套用

它依赖 Outline API token 和读写权限，upload 会真实修改远端文档；AI annotate/search 还需要外部模型 key。双向同步天然有冲突、删除、重命名、图片 UUID 映射和权限漂移问题，README 没有把冲突策略作为核心展开。Issue 链接仍是模板式 username，项目成熟度需要复核。

## 如何改造成自己的版本

内部可以先只做单向 download：远端文档 → 本地 Markdown cache，禁用 upload。每个文件 frontmatter 加 source id、urlId、collection、updatedAt、sync hash；图片统一落在相对 assets 目录；AI 搜索索引可作为派生缓存，随时重建。等下载稳定后，再把 upload 做成“生成 patch/草稿”，由人确认后手动同步，而不是 Agent 直接写回 Outline。

## 适用场景

- Outline 知识库需要进入本地 AI 工作流或静态站构建。
- 文档含层级、frontmatter、图片和语义搜索需求。
- 希望通过 MCP 让 Agent 查询/编辑文档。

## 不适用场景

- 不允许工具持有 Outline 写权限。
- 文档冲突和删除策略尚未定义。
- 只需要一次性导出，不需要长期同步。

## 公开版边界

- 项目较新，成熟度待验证。

## 参考信息

- 原项目：[outline-sync](https://github.com/kingston/outline-sync)
- 作者：kingston
- 相关概念：[[知识库同步]]、[[Markdown 缓存]]、[[语义搜索]]
- 相关卡片：保守留空
