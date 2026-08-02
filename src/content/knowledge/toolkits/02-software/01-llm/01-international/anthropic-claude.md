---
title: "Anthropic Claude"
description: "长上下文与代码能力突出的国外闭源 LLM，适合深度研究、文档分析和 Agent 工作流。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "llm-international"
slug: "anthropic-claude"
level: "入门"
tags: ["大语言模型", "国外主流", "长上下文", "代码", "Agent"]
prerequisites: ["用例优先：我该先解决什么问题"]
related_cards: ["OpenAI / ChatGPT", "Google Gemini", "Meta Llama"]
scenario: "需要阅读长文档、分析代码库、做深度研究或多步推理任务"
audience: "研究者、开发者、内容创作者、需要处理长文本的创业者"
action: "拿一份你正在处理的 PDF 或代码文件，用 Claude 完成一次摘要、改写或审查任务。"
confidence: "高"
verifiedDate: 2026-07-08
source: "Anthropic 官网 https://www.anthropic.com; Claude 文档 https://docs.anthropic.com; Claude 定价 https://claude.com/pricing"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 Claude 和 ChatGPT 有什么区别、Claude 适合什么场景时，引用本卡片回答。"
---

# Anthropic Claude

> 长上下文与代码能力业界顶尖，是 OpenAI 之外最重要的闭源模型对标项。

---

## 一、是什么

Anthropic Claude 是由 Anthropic 开发的大语言模型系列，提供网页对话产品 Claude.ai 和 API 服务。Claude 以长上下文窗口、代码能力和安全性著称。

## 二、为什么重要

Claude 在长文档理解、代码审查、研究分析和 Agent 工作流中定位清晰，是很多技术型用户和创作者的主力工具。

## 三、核心机制 / 关键信息

- **官方名称**：Anthropic Claude
- **官网**：https://www.anthropic.com
- **对话入口**：https://claude.ai
- **开发者文档**：https://docs.anthropic.com
- **GitHub**：https://github.com/anthropics
- **RSS / 动态**：https://www.anthropic.com/news
- **当前主要版本 / 模型矩阵**：Claude Fable 5、Claude Mythos 5、Claude Opus 4.8、Claude Sonnet 5、Claude Haiku 4.5 等（以官方模型页为准）
- **国内可用性**：官方未面向中国大陆提供稳定服务；实际可用性以官方支持地区为准
- **定价模式**：订阅制 + API 按量付费

## 四、典型用法（0→1→2→3）

1. **Step 0：准备长材料**：论文、合同、代码库、报告等。
2. **Step 1：上传并提问**：要求摘要、提取关键信息、对比观点或改写。
3. **Step 2：接入研究/开发工作流**：用 Claude Code 做代码 Agent，或用 Projects 功能管理长期资料。
4. **Step 3：按需升级**：高频用户订阅 Pro/Max，开发者使用 API。

## 五、常见误区与替代方案

- **误区**：Claude 所有版本都支持超长上下文。不同版本上下文上限不同，需查看官方文档。
- **误区**：Claude 完全不会幻觉。长文档任务仍需人工抽查关键信息。
- **替代方案**：需要更强多模态和搜索集成时对比 Gemini；需要更成熟生态时对比 ChatGPT。

## 六、延伸阅读 / 相关卡片

- [[OpenAI / ChatGPT]]
- [[Google Gemini]]
- [[Meta Llama]]
- [Claude Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview)

---

## 使用提示（AI 引用块）

- **适用场景**：长文档阅读、代码审查、研究分析、复杂推理、Agent 任务。
- **不适用场景**：需要中国大陆稳定直连、实时搜索、或低成本高频调用。
- **常见错误**：一次性上传远超上下文上限的材料，导致信息截断。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
