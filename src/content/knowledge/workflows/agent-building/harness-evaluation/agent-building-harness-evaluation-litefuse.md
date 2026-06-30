---
title: "Harness 与评估参考：litefuse"
description: "一个开源 LLM engineering 平台，覆盖 trace、prompt management、eval、dataset、playground、API 和自托管部署。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "深度"
tags: ["Harness", "trace", "observability", "Agent评估"]
prerequisites: []
related_cards: []
scenario: "Agent Building / Harness 与评估"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的Harness 与评估流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/litefuse/litefuse"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# litefuse

> 一个开源 LLM engineering 平台，覆盖 trace、prompt management、eval、dataset、playground、API 和自托管部署。

## 这个能力解决什么问题

Litefuse 解决的是 LLM/Agent 应用上线后缺少统一调试和评估平台的问题。Agent 工作流会包含 LLM call、retrieval、embedding、工具动作、用户反馈和人工标注；如果这些数据散在应用日志里，就很难复现失败、比较 prompt 版本或做上线前评估。Litefuse 把 traces、prompts、datasets、evals、playground 和 API 放在一个 LLMOps 平台里。

## 核心逻辑

输入是应用通过 SDK、OpenAI drop-in、LangChain callback、LlamaIndex、LiteLLM、Vercel AI SDK、CrewAI 等集成发来的 trace/observation/prompt/eval 数据。平台保存 trace 和 session，支持从坏结果跳到 playground 调 prompt，用 dataset 跑 benchmark，用 LLM-as-judge、用户反馈、人工标签或自定义 pipeline 评估。输出是可检索 trace、评估分数、prompt 版本、dataset run 和 API 查询结果。

## 技术结构

- 关键模块：Tracing 记录 LLM call、retrieval、embedding 和 agent actions；Prompt Management 管版本与缓存；Evaluations 支持 judge、feedback、manual label、自定义 pipeline；Datasets 支持测试集和 benchmark；Playground 支持调参；API/SDK 支撑自定义工作流。
- 调用链路：应用 instrumentation → Litefuse ingest trace/observation → UI 查看 session 和成本/延迟/输入输出 → 失败样例加入 dataset → eval pipeline 打分 → prompt/playground 迭代 → 新版本继续采集。
- 输入输出：输入是 trace、prompt、dataset item、feedback、eval score；输出是 dashboard、trace detail、eval report、prompt version、API 数据。
- 核心依赖：Litefuse 可云端或自托管，README 标明可 Docker Compose、VM、Kubernetes/Helm、Terraform；底层强调使用 Apache Doris，且与 Langfuse API/SDK 兼容。

## 为什么值得参考

它的参考价值是把 Agent Harness 放到产品运营层：不是只跑一次 benchmark，而是把线上 trace、人工反馈、数据集、prompt 版本和 playground 连接成持续改进循环。对工作流专栏读者来说，Litefuse 是“Agent 上线后怎么改进”的样板。

## 为什么不建议直接套用

Litefuse 是平台型工具，部署和数据治理成本不低。它会保存 LLM 输入输出、工具动作和用户 session，涉及敏感数据、留存策略和访问权限。另一个注意点是它是 Langfuse fork，README 强调 API 兼容和后端替换，采用前需要确认项目维护状态、License、升级路线和与现有 Langfuse 生态的差异。

## 如何改造成自己的版本

1. 先不搭平台，定义内部 trace schema：run id、step、model、tool、latency、cost、input/output hash、error。
2. 把失败样例沉淀成 dataset，而不是只在聊天记录里抱怨。
3. Prompt 版本和 eval 结果绑定，禁止改 prompt 后不知道哪版在线。
4. 对高风险客户数据做脱敏或只存摘要，再进入观测平台。
5. 等内部 trace/eval 稳定后，再决定用 Litefuse、Langfuse 或自建。

## 适用场景

- 已有 LLM/Agent 应用，需要 traces、prompt version、eval 和 dataset。
- 团队希望自托管 LLMOps 平台，并接入 Python/JS/TS SDK。
- 需要把线上失败案例转成持续评估集。

## 不适用场景

- 还没有稳定应用流量，只是本地一次性实验。
- 对 LLM 输入输出不能留存，且没有脱敏方案。
- 只需要标准化 Agent 轨迹重放，而不需要完整 LLMOps 平台。

## Agent Building 判断

- 多步工作流：instrument app → ingest trace → inspect/debug → dataset/eval → prompt/playground iteration → production monitoring。
- 工作标准：trace、prompt、dataset、eval、feedback 都是平台对象。
- Loop 标准：线上 trace 进入 dataset，eval 反馈 prompt/模型/工具迭代，形成持续改进循环。
- Harness 标准：evals、datasets、LLM-as-judge、manual labeling、custom pipelines 和 API 构成 harness。
- 工具调用链路或 Agent 间通信：通过 integrations 捕获 agent actions、retrieval、embedding 和框架调用链。
- 为什么不是 persona / profile / system prompt only：它是观测与评估平台，不生产角色设定。

## 公开版边界

- 本卡按标准和治理参考解读，不作为可直接采用的完整工具方案。

## 参考信息

- 原项目：[litefuse](https://github.com/litefuse/litefuse)
- 作者：litefuse
- 相关概念：[[Agent Harness]]、[[可观测性]]
- 相关卡片：[workflow-read-092](workflow-read-092.md)
