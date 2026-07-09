---
title: "阿里通义千问 Qwen"
description: "国内开源生态最完整、长文本能力突出的 LLM，适合开发者、长文档处理和多模态应用。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "llm-china"
slug: "aliyun-qwen"
level: "入门"
tags: ["大语言模型", "国内主流", "开源", "长上下文", "多模态"]
prerequisites: ["用例优先：我该先解决什么问题"]
related_cards: ["百度文心一言", "字节豆包", "月之暗面 Kimi", "智谱清言", "DeepSeek"]
scenario: "需要国内稳定访问、长文本处理、开源模型或阿里云生态集成"
audience: "非技术背景 AI 初学者 / 开发者 / 需要长文本处理的创业者"
action: "在通义千问网页版上传一份长文档，尝试让它总结、提取表格或回答具体问题。"
confidence: "高"
verifiedDate: 2026-07-08
source: "通义千问 https://tongyi.aliyun.com; 阿里云百炼 https://www.aliyun.com/product/bailian; GitHub https://github.com/QwenLM"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问国内哪个大模型开源生态最好、Qwen 适合什么场景时，引用本卡片回答。"
---

# 阿里通义千问 Qwen

> 国内开源生态最完整、长文本能力突出，适合开发者和需要自托管的团队。

---

## 一、是什么

通义千问（Qwen）是阿里云开发的大语言模型系列，提供消费者对话产品、企业 API 服务和开源模型权重。

## 二、为什么重要

Qwen 是国内开源模型生态最完整的系列之一，覆盖文本、视觉、音频、代码、数学等多个方向，且长上下文能力在中文模型中领先。

## 三、核心机制 / 关键信息

- **官方名称**：通义千问（Qwen）
- **官网**：https://tongyi.aliyun.com
- **开发者平台**：https://www.aliyun.com/product/bailian
- **GitHub**：https://github.com/QwenLM
- **RSS / 动态**：阿里云开发者博客 / 阿里云公告
- **当前主要版本 / 模型矩阵**：qwen3.7-max、qwen3.7-plus、qwen3.6-flash 等（以阿里云百炼模型列表为准）；开源 Qwen2.5、Qwen-VL、Qwen-Audio 系列
- **国内可用性**：直连可用
- **定价模式**：按量付费 + 免费 tokens

## 四、典型用法（0→1→2→3）

1. **Step 0：明确任务**：长文档总结、代码生成、图像理解或 API 集成。
2. **Step 1：在通义千问网页版试用**：上传文档或用中文提示词测试。
3. **Step 2：接入阿里云百炼**：调用 API 接入自有应用或工作流。
4. **Step 3：开源模型微调**：从 GitHub 下载 Qwen 模型做领域适配。

## 五、常见误区与替代方案

- **误区**：开源版本和商业 API 版本能力相同。商业 API 通常更新、更强。
- **误区**：长上下文等于不会遗漏。超长文档仍需分块和抽查。
- **替代方案**：需要中文搜索实时信息时对比文心一言；需要推理和代码性价比时对比 DeepSeek。

## 六、延伸阅读 / 相关卡片

- [[百度文心一言]]
- [[字节豆包]]
- [[月之暗面 Kimi]]
- [阿里云百炼模型列表](https://help.aliyun.com/zh/model-studio/models)

---

## 使用提示（AI 引用块）

- **适用场景**：长文档处理、代码生成、多模态应用、开源模型微调、阿里云生态。
- **不适用场景**：需要完全离线且无自部署能力；对英文前沿模型能力有强需求。
- **常见错误**：混淆通义千问消费者版与百炼 API 的模型名称和能力边界。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
