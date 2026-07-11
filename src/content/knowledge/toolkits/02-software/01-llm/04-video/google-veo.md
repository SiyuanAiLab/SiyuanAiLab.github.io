---
title: "Google Veo"
description: "Google 原生高质量视频生成模型，原生音频与 Google Cloud API 结合紧密。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "llm-video"
slug: "google-veo"
level: "进阶"
tags: ["视频生成", "国外主流", "Google", "音频", "API"]
prerequisites: ["用例优先：我该先解决什么问题", "Google Gemini"]
related_cards: ["Runway", "可灵 AI 视频", "Luma Dream Machine"]
scenario: "需要高质量视频 API、原生音频生成，或已在 Google Cloud / Vertex AI 生态中"
audience: "开发者、企业用户、需要视频 API 的团队"
action: "在 Google AI Studio 体验 Veo 3.1，生成一段带音频的 8 秒视频。"
confidence: "高"
verifiedDate: 2026-07-08
source: "Google AI Studio https://aistudio.google.com/models/veo-3; Google Cloud Pricing https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 Google Veo 和 Sora 什么关系、Veo 3.1 有什么特点时，引用本卡片回答。"
---

# Google Veo

> Google 原生高质量视频生成模型，原生音频与 Google Cloud API 结合紧密。

---

## 一、是什么

Google Veo 是 Google 开发的视频生成模型系列，支持文本/图像生成视频，部分版本支持原生音频生成。它通过 Google AI Studio 和 Google Cloud Vertex AI 提供服务。

## 二、为什么重要

Veo 与 Google Cloud、Gemini 和 Google Flow 深度集成，适合需要企业级视频 API、原生音频和云部署的团队。

## 三、核心机制 / 关键信息

- **官方名称**：Google Veo
- **官网**：https://deepmind.google/technologies/veo
- **AI Studio**：https://aistudio.google.com/models/veo-3
- **GitHub**：无
- **RSS / 动态**：Google DeepMind 博客 / Google AI 更新日志
- **当前主要版本 / 模型矩阵**：Veo 3.1 / 3.1 Fast / 3.1 Lite / Veo 3
- **国内可用性**：需翻墙
- **定价模式**：订阅制 + API 按秒计费

## 四、典型用法（0→1→2→3）

1. **Step 0：在 AI Studio 或 Cloud 控制台启用 Veo。**
2. **Step 1：用文本/图像生成视频片段**：选择是否包含原生音频。
3. **Step 2：通过 API 批量生成**：集成到内容生产流水线。
4. **Step 3：与 Gemini 联动**：用 Gemini 生成脚本，Veo 生成画面。

## 五、常见误区与替代方案

- **误区**：Veo 只能生成无声视频。Veo 3.1 支持原生音频生成。
- **误区**：Veo 对所有用户开放。部分版本和功能受地区和配额限制。
- **替代方案**：需要更强镜头控制时对比 Runway；需要国内可用时对比可灵。

## 六、延伸阅读 / 相关卡片

- [[Google Gemini]]
- [[Runway]]
- [[可灵 AI 视频]]
- [Veo 3.1 on Google AI Studio](https://aistudio.google.com/models/veo-3)

---

## 使用提示（AI 引用块）

- **适用场景**：高质量视频 API、原生音频、Google Cloud 生态、研究型视频生成。
- **不适用场景**：需要中国大陆稳定直连、低预算个人创作者。
- **常见错误**：忽略地区和配额限制，导致无法调用或成本超预期。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
