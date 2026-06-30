---
title: "文件系统与本地执行参考：Document Parser Agent"
description: "一个针对产品更新 Excel 的专用解析 Agent，把多月 worksheet 拆分、LLM 抽取为 JSON，再合并成年度/功能矩阵。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["文件系统", "本地执行", "文档处理", "CLI"]
prerequisites: []
related_cards: []
scenario: "基础设施层 / 文件系统与本地执行"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的文件系统与本地执行流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/Micheliliuv87/Document-Parser-Agent"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Document Parser Agent

> 一个针对产品更新 Excel 的专用解析 Agent，把多月 worksheet 拆分、LLM 抽取为 JSON，再合并成年度/功能矩阵。

## 这个能力解决什么问题

很多“文档解析 Agent”其实无法说明输入格式和输出结构。这个项目很具体：输入是一份包含 Date、Title、Features、Editions 的 Google 产品更新 Excel，目标是从每行描述中抽出具体 feature、判断 added/removed/updated，并映射到受影响产品或版本，最后按月份和年份整理成表格。它解决的是半结构化 Excel 更新记录到结构化产品变更矩阵的转换。

## 核心逻辑

输入是按 worksheet 组织的 Excel 文件。第一步用 `Year_Sheet_fun.py` 把源 Excel 按年份/月度拆成更小文件，减少长上下文导致的幻觉；第二步 `Parser.py` 遍历目录中的 Excel sheet，检查必需列，把每行格式化成文本；第三步 `Agent.py` 用 ChatOpenAI/ChatPromptTemplate 把文本抽取成 JSON 数组；第四步 `Combine.py` 清洗字符串列，把 JSON 结果按年份和 sheet 名合并回 Excel；后续转换脚本再转成功能×年份的矩阵。输出是 JSON 中间文件、年度 Excel、功能特定矩阵。

## 技术结构

- **Packages/Year_Sheet_fun.py**：预处理和按年份拆分，用来控制 LLM 输入长度。
- **Packages/Parser.py**：目录级批处理，读取 sheet、校验 Date/Title/Features/Editions、跳过无效行、保存 JSON。
- **Packages/Agent.py**：实际 LLM 抽取层，围绕产品更新文本生成结构化字段。
- **Packages/Combine.py**：后处理层，清洗 DataFrame 字符串结构，并把 JSON 合并成 Excel。
- **脚本入口**：README 说明先运行 `prepare.py`，再运行 `main.py`，体现“预处理 → 抽取 → 合并”的批处理链路。

## 为什么值得参考

它的价值不在通用性，而在“任务窄到可验证”：输入列、抽取字段、JSON 中间层、Excel 输出都很明确。尤其是先按年份/月度拆分再让 LLM 抽取，这比把整份 Excel 一次塞给模型更接近可维护的数据管线。

## 为什么不建议直接套用

项目高度绑定 Google 产品更新样例和固定列名；换一个行业文档就需要重写 schema、字段推断和合并逻辑。它依赖 GPT-4o/OpenAI 与 LangChain，缺少对模型输出 JSON 失败、重复 feature、跨 sheet 去重和人工复核的完整说明。作为生产解析器，还需要补充测试样本和错误报告。

## 如何改造成自己的版本

借它的流水线：先固定输入表结构和目标字段，再做“拆小文件/分 sheet → 行级抽取 → JSON 中间层 → 表格合并 → 人工抽检”。内部版本应把抽取 schema 独立成配置，给每条 JSON 加来源 sheet、行号、原文摘要和置信度；合并前做字段枚举规范化，例如 action 只能是 added/removed/updated。不要把行业 prompt 写死在 Agent 代码里。

## 适用场景

- 半结构化 Excel/CSV 中有固定列和重复抽取任务。
- 需要保留 JSON 中间层，方便复核和重跑。
- 输出目标是月度/年度统计表或功能矩阵。

## 不适用场景

- 输入文档格式变化很大、没有固定列。
- 需要法律/财务级逐字准确，不允许 LLM 推断。
- 没有人维护 schema、去重和人工抽检流程。

## 公开版边界

- 项目较新，成熟度待验证。

## 参考信息

- 原项目：[Document-Parser-Agent](https://github.com/Micheliliuv87/Document-Parser-Agent)
- 作者：Micheliliuv87
- 相关概念：[[文档解析]]、[[结构化抽取]]、[[Excel 批处理]]
- 相关卡片：保守留空
