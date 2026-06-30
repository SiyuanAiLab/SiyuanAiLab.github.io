---
title: "数据与分析参考：ReFoRCE"
description: "一个研究级 Text-to-SQL Agent，通过数据库信息压缩、自我修正、多数投票和列探索处理复杂企业 schema。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["数据分析", "Text-to-SQL", "报表", "可视化"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 数据与分析"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的数据与分析流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/Snowflake-Labs/ReFoRCE"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# ReFoRCE

> 一个研究级 Text-to-SQL Agent，通过数据库信息压缩、自我修正、多数投票和列探索处理复杂企业 schema。

## 这个能力解决什么问题

它解决的是 Spider 2.0 这类真实 Text-to-SQL benchmark 中 schema 巨大、SQL 方言复杂、查询需要多步转换的问题。输入是自然语言问题、数据库 schema、Spider2-lite/snow 数据和 BigQuery/Snowflake 凭据；输出是参考 SQL、执行结果和 pass@k/evaluation 结果。

## 核心逻辑

ReFoRCE 先做 database information compression：用模式化 table grouping 和 LLM-guided schema linking 缓解上千列 schema 的长上下文问题；生成 SQL 后进行 self-refinement，利用语法/语义执行反馈修正；多数投票选择高置信参考；遇到复杂或分歧案例，再做 iterative column exploration，并基于执行反馈重新运行。

## 技术结构

- 关键模块：`methods/ReFoRCE/agent.py` 主算法；`schema_linking.py` 表级 schema linking；`sql.py` 执行；`chat.py` GPT/Azure API；`run.py` 主入口；`eval.py` pass@k；`scripts/` 提供 main、eval 和 ablation。
- 调用链路：Spider data + credentials -> schema linking/compression -> SQL generation -> self-refinement -> majority vote -> column exploration/rerun -> evaluation。
- 输入输出：输入是 benchmark 数据、schema、凭据和模型参数；输出是 SQL、CSV 执行结果和分数。
- 核心依赖：OpenAI/Azure GPT family、Snowflake/BigQuery 凭据、Spider2 数据、Python 3.10。

## 为什么值得参考

它给 Text-to-SQL 一个更真实的工程方向：不是只问模型“写 SQL”，而是先压缩 schema、再通过执行反馈修正、再用投票和列探索处理不确定性。对企业数据 Agent 来说，这些机制比 demo 型 SQL chatbot 更有参考价值。

## 为什么不建议直接套用

它是研究/benchmark 仓库，不是生产数据助手。需要 Spider2 数据、Snowflake/BigQuery 凭据和 GPT/Azure 配置，运行成本高。多数投票和自我修正会多次执行 SQL，生产库必须有沙箱、只读副本和查询成本限制。README 的 leaderboard 分数不能外推到你的业务库。

## 如何改造成自己的版本

借鉴机制，不搬实现：为自己的数据库建立 schema linking cache；查询先在只读 replica 或样本库执行；self-refinement 只允许修正 SELECT；多数投票改成“给人工看 2-3 个参考及差异”。对高成本表和敏感列建立不可访问清单。

## 适用场景

- 研究复杂 Text-to-SQL Agent 设计。
- 企业大 schema 下的 SQL 生成评估。
- benchmark、离线实验和方法借鉴。

## 不适用场景

- 直接连接生产数据库回答业务问题。
- 小型 SQLite demo，不需要复杂 schema linking。
- 没有执行沙箱和成本控制的环境。

## 参考信息

- 原项目：[ReFoRCE](https://github.com/Snowflake-Labs/ReFoRCE)
- 作者：Snowflake-Labs
- 相关概念：[[Text-to-SQL]]、[[执行反馈]]
- 相关卡片：保守留空
