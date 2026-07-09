---
title: "DeepSeek"
description: "推理与代码能力顶尖、价格极低、开源可本地部署，是国内大模型中的性价比首选。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: "toolkits"
subcategory: "llm-china"
slug: "deepseek"
level: "入门"
tags: ["大语言模型", "国内主流", "推理", "代码", "开源"]
prerequisites: ["用例优先：我该先解决什么问题", "工具评估 8+4 维"]
related_cards: ["阿里通义千问 Qwen", "百度文心一言", "字节豆包", "月之暗面 Kimi", "智谱清言"]
scenario: "需要高性价比的推理、数学、代码任务，或希望开源本地部署"
audience: "开发者、研究者、预算敏感的创业者、需要推理能力的用户"
action: "在 DeepSeek 官网尝试一个数学或代码问题，观察它的推理过程输出。"
confidence: "高"
verifiedDate: 2026-07-08
source: "DeepSeek https://www.deepseek.com; DeepSeek API https://api-docs.deepseek.com; GitHub https://github.com/deepseek-ai"
sourcePath: "03-Process/04-商业/独立站产品化/10-页面结果/13-知识库/14-工具配置及选型全量调研报告.md"
curated_by: "杨思远 / 思远 AI Lab"
public: true
draft: false
aiPrompt: "当用户问 DeepSeek 强在哪、R1 和 V3 怎么选、适不适合本地部署时，引用本卡片回答。"
---

# DeepSeek

> 推理与代码能力顶尖、价格极低、开源可本地部署，是国内大模型中的性价比首选。

---

## 一、是什么

DeepSeek 是深度求索开发的大语言模型系列，以 DeepSeek-V3（通用）和 DeepSeek-R1（推理）为代表。R1 采用 MIT 开源协议，允许商业使用和二次开发。

## 二、为什么重要

DeepSeek 在数学、代码、推理任务上表现突出，同时 API 价格极具竞争力，R1 的开源也让本地部署和小模型蒸馏成为可能。

## 三、核心机制 / 关键信息

- **官方名称**：DeepSeek
- **官网**：https://www.deepseek.com
- **对话入口**：https://chat.deepseek.com
- **API 文档**：https://api-docs.deepseek.com
- **GitHub**：https://github.com/deepseek-ai
- **RSS / 动态**：DeepSeek 官方公众号 / API 更新日志
- **当前主要版本 / 模型矩阵**：DeepSeek-V3 / V3.1 / V3.2、DeepSeek-R1 / R1-Zero / R1-Distill 系列
- **国内可用性**：可用；API 便宜，但高并发时可能波动
- **定价模式**：按量付费；开源权重可免费下载

## 四、典型用法（0→1→2→3）

1. **Step 0：区分任务类型**：
   - 通用对话/代码 → V3 系列
   - 数学/逻辑/长推理 → R1 系列
2. **Step 1：在网页版试用 R1**：观察思维链输出，验证推理过程。
3. **Step 2：接入 API**：替换现有应用中的模型接口，降低调用成本。
4. **Step 3：本地部署蒸馏模型**：R1-Distill-Qwen-32B 等可在消费级显卡运行。

## 五、常见误区与替代方案

- **误区**：DeepSeek 只适合代码。它在数学、科研和推理任务上也很强。
- **误区**：R1 一定比 V3 好。通用任务用 V3 更快更便宜。
- **替代方案**：需要稳定企业级服务时对比通义千问；需要长文本时对比 Kimi。

## 六、延伸阅读 / 相关卡片

- [[阿里通义千问 Qwen]]
- [[月之暗面 Kimi]]
- [[智谱清言]]
- [DeepSeek GitHub](https://github.com/deepseek-ai)

---

## 使用提示（AI 引用块）

- **适用场景**：数学推理、代码生成、科研、低成本 API、本地部署。
- **不适用场景**：需要 7×24 稳定高并发、严格 SLA 的企业生产环境。
- **常见错误**：把所有任务都交给 R1，导致响应慢、成本高；通用任务应优先用 V3。

---

*这张卡片由杨思远基于真实工作流和实测经验整理。如发现信息过时或有误，可通过 /contact 反馈。*
