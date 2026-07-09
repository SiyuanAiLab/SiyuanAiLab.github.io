---
title: "FLUX"
description: "开源图像生成质量最接近闭源旗舰的模型，提示词遵循和文字渲染优秀。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "llm-image"
slug: "flux"
level: "进阶"
tags: ["图像生成", "国外主流", "开源", "文字渲染", "高质量"]
prerequisites: ["用例优先：我该先解决什么问题"]
related_cards: ["Midjourney", "Stable Diffusion", "OpenAI GPT Image"]
scenario: "需要高质量开源图像生成，尤其是提示词遵循严格、包含文字的画面"
audience: "设计师、开发者、需要开源部署的创业者"
action: "在 Black Forest Labs 官网或 ComfyUI 中下载 FLUX.1 [dev]，生成一张带文字的海报。"
confidence: "高"
verifiedDate: 2026-07-08
source: "Black Forest Labs https://blackforestlabs.ai; GitHub https://github.com/black-forest-labs/flux; Hugging Face https://huggingface.co/black-forest-labs"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 FLUX 是什么、和 Stable Diffusion 哪个好、能不能本地跑时，引用本卡片回答。"
---

# FLUX

> 开源图像生成质量最接近闭源旗舰，提示词遵循和文字渲染优秀。

---

## 一、是什么

FLUX 是由 Black Forest Labs（Stable Diffusion 部分原团队创立）发布的开源图像生成模型。它在图像质量、提示词遵循和文字渲染方面表现突出。

## 二、为什么重要

FLUX 提供了一个接近 Midjourney/DALL-E 质量但可本地部署和商业使用的开源选择，尤其适合需要文字渲染和精确构图的场景。

## 三、核心机制 / 关键信息

- **官方名称**：FLUX（Black Forest Labs）
- **官网**：https://blackforestlabs.ai
- **GitHub**：https://github.com/black-forest-labs/flux
- **Hugging Face**：https://huggingface.co/black-forest-labs
- **RSS / 动态**：https://blackforestlabs.ai/#news
- **当前主要版本 / 模型矩阵**：FLUX.1 [pro] / [dev] / [schnell]；FLUX.2 系列逐步发布中
- **国内可用性**：开源权重可下载；官方 API 需海外网络
- **定价模式**：开源权重 + 官方 API 按量付费

## 四、典型用法（0→1→2→3）

1. **Step 0：选择版本**：pro 质量最高但需 API，dev 可商用，schnell 本地最快。
2. **Step 1：本地部署**：用 ComfyUI 或 Forge 加载 FLUX.1 模型。
3. **Step 2：测试文字渲染**：生成包含指定文字的海报或 Logo 概念。
4. **Step 3：结合 ControlNet / IP-Adapter**：做更精确的构图和风格控制。

## 五、常见误区与替代方案

- **误区**：FLUX 完全免费商用。dev 版可商用，pro 版需遵守 API 条款。
- **误区**：FLUX 在所有风格上都超越 Stable Diffusion。两者生态侧重点不同。
- **替代方案**：需要最强艺术风格时对比 Midjourney；需要最大生态和插件时对比 Stable Diffusion。

## 六、延伸阅读 / 相关卡片

- [[Midjourney]]
- [[Stable Diffusion]]
- [[OpenAI GPT Image]]
- [Black Forest Labs](https://blackforestlabs.ai)

---

## 使用提示（AI 引用块）

- **适用场景**：高质量图像生成、文字渲染、商业设计、本地部署。
- **不适用场景**：完全没有本地部署条件、也不想使用 API。
- **常见错误**：混淆 FLUX.1 pro/dev/schnell 的许可和性能差异。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
