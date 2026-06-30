---
title: "研究与知识参考：paper2md"
description: "一个把学术 PDF 批量抽取、分块总结并汇总成结构化 Markdown 的论文上下文生成工具。"
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
source: "https://github.com/angelotc/paper2md"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# paper2md

> 一个把学术 PDF 批量抽取、分块总结并汇总成结构化 Markdown 的论文上下文生成工具。

## 这个能力解决什么问题

它解决的是工程团队读论文时“PDF 难放进代码库上下文”的问题。输入是一批放在 `papers/` 下的 PDF；输出是一个带索引的 Markdown 汇总，包含 TL;DR、问题、方法、结果、实践 takeaway、限制和 DOI 信息，适合作为项目文档或 Agent 上下文。

## 核心逻辑

`summary_papers.py` 是薄编排层：先用标题提取级联策略识别论文名，再用 `pdfminer.six` 提取全文并清洗；长文本按 `prompts.json` 的 chunk 配置切分，先对每个 chunk 做 map summary，再用 reduce prompt 合并成论文级摘要。缓存层只缓存提取文本，不缓存最终摘要，因此 PDF 不变时可以跳过重复抽取，但仍可重跑总结。

## 技术结构

- 关键模块：`lib/pdf_extract.py` 管 PDF 元数据、XMP、首页启发和文件名 fallback；`text_clean.py` 做清洗；`summarization.py` 管 OpenAI 兼容 API；`cache.py` 管增量文本缓存；`models.py` 定义不可变数据对象。
- 调用链路：PDF 目录 -> 标题识别 -> 全文抽取 -> 清洗 -> chunk map -> reduce -> Markdown 汇总。
- 输入输出：输入是 PDF 和可选 prompts 配置；输出是 `PAPERS_SUMMARY.md`。
- 核心依赖：`pdfminer.six`、`openai`、`python-dotenv`、`tqdm`。

## 为什么值得参考

它没有把论文总结写成一个“上传 PDF 然后问模型”的黑盒，而是显式处理标题、缓存、chunk、map-reduce 和统一输出结构。对知识库流水线来说，`PDF -> Paper object -> SummarizedPaper -> Markdown` 的层次清楚，适合改造成可审计的论文摄取环节。

## 为什么不建议直接套用

它假设论文 PDF 能被文本抽取，复杂扫描版、公式、图表和多栏排版仍可能丢信息。默认 prompt 和输出结构偏工程推荐系统论文，不一定适合社科、法律或商业报告。它使用 LLM 摘要，不提供逐段引用校验，不能作为严肃文献综述的最终证据。

## 如何改造成自己的版本

保留标题提取、文本缓存和 map-reduce 框架；把输出 schema 改成你的阅读卡结构，例如“问题、零点、位移、落点、行囊”。增加 per-paper source hash、页码片段、摘要置信度和“需要人工复核”字段。对扫描 PDF 先接 OCR，对表格/图像另设提取器。

## 适用场景

- 批量把论文变成工程上下文。
- 需要在仓库里维护论文阅读摘要。
- 构建 RAG 前的论文预处理。

## 不适用场景

- 需要逐字引用、页码证据或严谨学术综述。
- PDF 主要是扫描图片、公式或复杂表格。
- 不允许把论文内容发给外部 LLM 的场景。

## 参考信息

- 原项目：[paper2md](https://github.com/angelotc/paper2md)
- 作者：angelotc
- 相关概念：[[论文阅读]]、[[Map Reduce 摘要]]
- 相关卡片：保守留空
