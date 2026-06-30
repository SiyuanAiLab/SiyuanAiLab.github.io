---
title: "研究与知识参考：headroom"
description: "一个本地优先的 Agent 上下文压缩层，在工具输出、日志、RAG chunk 和文件进入 LLM 前做内容感知压缩，并可按需找回原文。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "进阶"
tags: ["研究", "知识库", "摘要", "RAG"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 研究与知识"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的研究与知识流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/headroomlabs-ai/headroom"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# headroom

> 一个本地优先的 Agent 上下文压缩层，在工具输出、日志、RAG chunk 和文件进入 LLM 前做内容感知压缩，并可按需找回原文。

## 这个能力解决什么问题

Agent 工具输出常常是长 JSON、日志、代码搜索结果或网页文本。Headroom 解决的是“如何减少进入模型的 token，同时保留后续推理所需信息”。输入是 messages、tool outputs、RAG chunks、files 或 conversation history；输出是压缩后的 prompt，以及可通过 retrieval 工具取回的原始片段。

## 核心逻辑

Headroom 在本地代理或库中拦截上下文，先用 `CacheAligner` 稳定 prompt 前缀，提高 KV cache 命中；再由 `ContentRouter` 判断内容类型，把 JSON 交给 `SmartCrusher`，代码交给 AST-aware `CodeCompressor`，普通文本交给 HuggingFace `Kompress-v2-base`；最后 CCR 把原文缓存在本地，模型看到压缩内容，需要细节时调用 `headroom_retrieve`。

## 技术结构

- 关键模块：Library `compress()`、OpenAI-compatible proxy、`headroom wrap`、MCP server、cross-agent memory、`headroom learn`、dashboard/doctor/perf。
- 调用链路：Agent/app -> Headroom proxy/library/wrap -> content router/compressor/CCR -> LLM provider -> 可选 retrieve。
- 输入输出：输入是聊天消息和工具结果；输出是压缩 prompt、统计、retrieval handle 和节省报告。
- 核心依赖：Python 3.10+、TypeScript SDK、ONNX/HF model、可选 ML/code/vector/memory extras、MCP。

## 为什么值得参考

它不是摘要工具，而是 Agent 中间件。最有价值的是把压缩做成多种接入形态：库、代理、wrap、MCP；并且通过 CCR 保留“压缩后可找回”的审计路径。对长上下文工作流来说，这比简单截断更可控。

## 为什么不建议直接套用

项目依赖较重，`[all]` 会拉多类额外能力，部分向量后端还需要 C++ 工具链。压缩策略会改变模型看到的上下文，不适合对原文完整性要求极高的法律、医疗、财务材料。代理和 wrapper 会影响多个 Agent 的运行环境，团队共享时要明确全局配置和缓存 TTL。

## 如何改造成自己的版本

先做一个小型“工具输出压缩器”，只处理三类最常见输入：JSON 搜索结果、日志、网页正文。输出必须带 `dropped_fields`、`retention_reason`、`retrieve_key`。先用离线样本测任务完成率，再考虑接 proxy 或 MCP；不要一开始包装所有 Agent。

## 适用场景

- 代码搜索、日志排障、RAG 返回过长。
- 多 Agent 共享上下文和记忆。
- 需要本地缓存原文并可回查。

## 不适用场景

- 上下文很短，压缩成本高于收益。
- 必须逐字保留原文的高风险文档。
- 不允许本地代理或 wrapper 改写请求的环境。

## 参考信息

- 原项目：[headroom](https://github.com/headroomlabs-ai/headroom)
- 作者：headroomlabs-ai
- 相关概念：[[上下文压缩]]、[[可逆压缩]]
- 相关卡片：保守留空
