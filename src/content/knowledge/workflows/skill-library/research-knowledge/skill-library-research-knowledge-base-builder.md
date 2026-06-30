---
title: "研究与知识参考：knowledge base builder"
description: "一个 Python 包和 CLI，把网页、PDF、GitHub、YouTube、arXiv、RSS、Notebook、PPT 等多源材料抽取并合并成 Markdown、llms.txt 或 chunks。"
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
source: "https://github.com/kostadindev/knowledge-base-builder"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# knowledge base builder

> 一个 Python 包和 CLI，把网页、PDF、GitHub、YouTube、arXiv、RSS、Notebook、PPT 等多源材料抽取并合并成 Markdown、llms.txt 或 chunks。

## 这个能力解决什么问题

它解决的是“资料来源太杂，难以统一进入 RAG 或 LLM 上下文”的问题。输入可以混合 URL、本地文件、sitemap、GitHub repo、RSS、YouTube、arXiv ID、Jupyter、PPT；输出可以是完整 Markdown 知识库、符合 llms.txt 规范的导航文件，或带 metadata 的 JSON chunks。

## 核心逻辑

`KBBuilder.build()` 先按 URL 模式和文件扩展识别 source type，由 11 类 processor 并发抽取文本；然后把文本按文档分隔符合并，并按段落/句子边界切 chunk；最后按配置的 LLM provider 逐 chunk 总结，生成层次化 Markdown。增量模式会缓存抽取文本，metadata sidecar 记录来源、成功失败、模型和输出质量。

## 技术结构

- 关键模块：`kb_builder.py` 编排；`pdf/document/spreadsheet/web/website/github` 等 processor 负责抽取；`llm_client` 封装 Gemini/OpenAI/Anthropic；`chunker.py` 输出向量库 chunks；`validator.py` 做质量校验；`build_metadata.py` 写 provenance。
- 调用链路：sources dict/CLI flags -> source classification -> async extraction -> merge/chunk -> LLM summarization 或 chunks 输出 -> `.meta.json`。
- 输入输出：输入是多源资料定义；输出是 Markdown、llms.txt/llms-full.txt 或 JSON chunks。
- 核心依赖：Python、requests/BeautifulSoup、各类文档处理器、Gemini/OpenAI/Anthropic API、GitHub API 可选 token。

## 为什么值得参考

它比单一“网页转 Markdown”更像一个摄取框架：source processor、LLM provider、metadata、incremental、dry-run、validation 都有位置。尤其 `chunks` 模式跳过 LLM，直接给向量库带 source attribution 的切片，这对知识管线很实用。

## 为什么不建议直接套用

支持来源多也意味着风险面大：网页、YouTube、RSS、GitHub 都可能涉及版权、反爬、rate limit 和来源质量问题。LLM 自动总结会压缩细节，不能替代原文证据。GitHub 用户全仓处理、sitemap 爬取和 YouTube transcript 都必须先确认授权和抓取边界。

## 如何改造成自己的版本

先收窄 source type，不要一开始全开。为每类 source 建准入规则和失败原因，例如 `licensed_web`、`owned_repo`、`public_pdf`。保留 metadata sidecar 和 validation，把输出改成 `raw -> extracted -> chunks -> summary` 四层，所有自动合并前先进入 review queue。

## 适用场景

- 构建项目 llms.txt、RAG 预处理或资料汇总。
- 多格式材料需要统一 Markdown 化。
- 需要 provenance 和增量缓存的资料管线。

## 不适用场景

- 未授权批量抓取网站或视频。
- 高精度法律、财务、医疗文档摘要。
- 无法承担多 API key、解析依赖和失败重试维护的团队。

## 参考信息

- 原项目：[knowledge-base-builder](https://github.com/kostadindev/knowledge-base-builder)
- 作者：kostadindev
- 相关概念：[[知识库构建]]、[[来源追踪]]
- 相关卡片：保守留空
