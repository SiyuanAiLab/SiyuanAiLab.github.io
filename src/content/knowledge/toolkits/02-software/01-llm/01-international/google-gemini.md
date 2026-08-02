---
title: "Google Gemini"
description: "Google 原生多模态 LLM，长上下文和免费额度突出，适合研究型用户和 Google 生态使用者。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "llm-international"
slug: "google-gemini"
level: "入门"
tags: ["大语言模型", "国外主流", "多模态", "长上下文", "搜索"]
prerequisites: ["用例优先：我该先解决什么问题"]
related_cards: ["OpenAI / ChatGPT", "Anthropic Claude", "Meta Llama"]
scenario: "需要处理长文档、多模态内容，或已经与 Google 办公/云服务深度绑定"
audience: "研究者、学生、Google 生态用户、需要多模态理解的创业者"
action: "在 Google AI Studio 或 Gemini App 中上传一份长文档，尝试用中文提问并验证答案。"
confidence: "高"
verifiedDate: 2026-07-08
source: "Google AI https://ai.google.dev; Gemini API 文档 https://ai.google.dev/gemini-api/docs; Gemini API Changelog https://ai.google.dev/gemini-api/docs/changelog"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 Gemini 适合什么、和 ChatGPT 比有什么优势时，引用本卡片回答。"
---

# Google Gemini

> Google 原生多模态 LLM，长上下文和免费额度慷慨，适合研究型用户。

---

## 一、是什么

Google Gemini 是 Google 开发的大语言模型系列，支持文本、图像、音频、视频输入，提供 Gemini App 消费者产品和 Gemini API 开发者接口。

## 二、为什么重要

Gemini 与 Google 搜索、YouTube、Google Workspace、Google Cloud 深度集成，在多模态理解、长上下文和搜索 grounding 方面有独特优势。

## 三、核心机制 / 关键信息

- **官方名称**：Google Gemini
- **官网**：https://ai.google.dev
- **对话入口**：https://gemini.google.com
- **开发者文档**：https://ai.google.dev/gemini-api/docs
- **GitHub**：https://github.com/google-gemini
- **RSS / 动态**：https://ai.google.dev/gemini-api/docs/changelog
- **当前主要版本 / 模型矩阵**：Gemini 3 / 3.5 系列、Gemini 2.5 系列、Veo、Imagen 等（官方按 stable / preview / experimental 标识）
- **国内可用性**：官方未面向中国大陆提供稳定服务；实际可用性以官方支持地区为准
- **定价模式**：免费层 + API 按量付费

## 四、典型用法（0→1→2→3）

1. **Step 0：准备多模态材料**：PDF、图片、视频、音频或代码仓库。
2. **Step 1：在 Gemini App 或 AI Studio 提问**：利用长上下文一次性处理大量材料。
3. **Step 2：接入 Google 工作流**：在 Google Docs、Sheets 或 Cloud 中使用 Gemini。
4. **Step 3：API 自动化**：调用 Gemini API 做批量内容处理或 RAG 应用。

## 五、常见误区与替代方案

- **误区**：Gemini 所有功能在中国大陆可用。Google  consumer 服务在大陆访问受限。
- **误区**：免费版无限制。免费层有速率限制，商业使用需关注配额。
- **替代方案**：需要更成熟的第三方生态时对比 ChatGPT；需要更强代码能力时对比 Claude。

## 六、延伸阅读 / 相关卡片

- [[OpenAI / ChatGPT]]
- [[Anthropic Claude]]
- [[Meta Llama]]
- [Gemini API Changelog](https://ai.google.dev/gemini-api/docs/changelog)

---

## 使用提示（AI 引用块）

- **适用场景**：长文档分析、多模态理解、Google 生态集成、学术研究。
- **不适用场景**：需要中国大陆稳定直连、严格数据不出境。
- **常见错误**：把 Gemini 的搜索 grounding 结果当作完全权威，仍需核对来源。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
