---
title: "Stable Diffusion"
description: "开源可本地部署的图像生成生态代表，社区最丰富，适合需要可控生成和技术型用户。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "llm-image"
slug: "stable-diffusion"
level: "进阶"
tags: ["图像生成", "国外主流", "开源", "本地部署", "可控生成"]
prerequisites: ["用例优先：我该先解决什么问题", "工具评估 8+4 维"]
related_cards: ["Midjourney", "FLUX", "OpenAI GPT Image"]
scenario: "需要本地部署、模型微调、ControlNet 控制生成或批量图像生产"
audience: "技术型用户、设计师、需要数据隐私或成本控制的团队"
action: "在 ComfyUI 或 Stable Diffusion WebUI 中加载 SD 3.5，完成一次文生图和一次图生图。"
confidence: "高"
verifiedDate: 2026-07-08
source: "Stability AI https://stability.ai; GitHub https://github.com/Stability-AI; Hugging Face https://huggingface.co/stabilityai"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 Stable Diffusion 怎么本地部署、需要什么显卡、和 Midjourney 怎么选时，引用本卡片回答。"
---

# Stable Diffusion

> 开源可本地部署，社区生态最丰富，适合需要可控生成的技术型用户。

---

## 一、是什么

Stable Diffusion 是 Stability AI 发布的开源图像生成模型，可在本地或云端运行。围绕它形成了 ComfyUI、Stable Diffusion WebUI、ControlNet、LoRA 等庞大生态。

## 二、为什么重要

对于需要数据隐私、批量生产、精细控制或二次训练的用户，Stable Diffusion 提供了闭源工具无法比拟的灵活性。

## 三、核心机制 / 关键信息

- **官方名称**：Stable Diffusion（Stability AI）
- **官网**：https://stability.ai
- **GitHub**：https://github.com/Stability-AI
- **Hugging Face**：https://huggingface.co/stabilityai
- **RSS / 动态**：https://stability.ai/news-updates
- **当前主要版本 / 模型矩阵**：Stable Diffusion 3.5 Large / Large Turbo / Medium；SDXL 生态仍活跃
- **国内可用性**：权重可下载，本地/云部署可用；官网可用性以官方支持地区为准
- **定价模式**：开源权重 + Stability API credits

## 四、典型用法（0→1→2→3）

1. **Step 0：选择运行环境**：本地 GPU、云服务或在线工作流（如 LiblibAI、吐司）。
2. **Step 1：安装 ComfyUI 或 WebUI**：加载 SD 3.5 或 SDXL 模型。
3. **Step 2：掌握 ControlNet / LoRA**：用姿势、深度图、风格模型控制输出。
4. **Step 3：建立批处理工作流**：用提示词模板和参数网格批量生成。

## 五、常见误区与替代方案

- **误区**：Stable Diffusion 免费。本地部署需要硬件和电费，云服务也有成本。
- **误区**：开源就等于零门槛。ComfyUI 等工作流有学习曲线。
- **替代方案**：想要开箱即用的高质量生成时对比 Midjourney；需要更好的文字渲染时对比 FLUX。

## 六、延伸阅读 / 相关卡片

- [[Midjourney]]
- [[FLUX]]
- [[OpenAI GPT Image]]
- [Stable Diffusion 3.5](https://stability.ai/news-updates/introducing-stable-diffusion-3-5)

---

## 使用提示（AI 引用块）

- **适用场景**：本地图像生成、模型微调、ControlNet 控制、批量生产。
- **不适用场景**：希望零配置即用、没有技术维护能力。
- **常见错误**：下载来路不明的模型文件，存在安全和版权风险。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
