---
title: "数据与分析参考：claude data analysis"
description: "一个 Claude Code 数据分析工作区模板，用 sub-agents、slash commands 和 hooks 管理数据探索、可视化、代码生成、报告和质量检查。"
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
source: "https://github.com/liangdabiao/claude-data-analysis"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# claude data analysis

> 一个 Claude Code 数据分析工作区模板，用 sub-agents、slash commands 和 hooks 管理数据探索、可视化、代码生成、报告和质量检查。

## 这个能力解决什么问题

它解决的是数据分析任务在聊天里零散执行、代码和报告不沉淀的问题。用户把 CSV/JSON/Excel 等数据放到 `data_storage/`，通过 `/analyze`、`/visualize`、`/generate`、`/report`、`/quality`、`/hypothesis` 等命令触发不同子代理；输出是可视化、分析代码、报告和质量检查结果。

## 核心逻辑

项目把数据分析生命周期拆成多个 Claude Code sub-agents：data-explorer 做统计和模式发现，visualization-specialist 画图，code-generator 生成 Python/R/SQL/JS 分析代码，report-writer 写报告，quality-assurance 做数据校验，hypothesis-generator 生成研究假设。hooks 用于数据上传校验和上下文加载。

## 技术结构

- 关键模块：`.claude/agents`、`.claude/commands`、`.claude/hooks`、`data_storage/`、`visualizations/`、`generated_code/`、`analysis_reports/`。
- 调用链路：数据文件 -> slash command -> 对应 sub-agent -> 生成图表/代码/报告 -> 文件夹沉淀。
- 输入输出：输入是数据集和分析类型；输出是 EDA、图表、代码、报告、质量建议。
- 核心依赖：Claude Code sub-agents、Python 数据科学栈、可选 pandas/NumPy/scikit-learn/matplotlib/Plotly。

## 为什么值得参考

它的价值在“分析工作台目录约定”：原始数据、可视化、生成代码和分析报告分开存放，命令也对应分析阶段。这比让模型在一个聊天窗口里临时算数更适合复现和交接。

## 为什么不建议直接套用

README 中有一些明显愿景型指标和未完成 roadmap，当前更像模板而不是成熟平台。它没有真正定义数据权限、PII 脱敏、执行沙箱和大型数据处理策略。把数据放进工作区前需要确认敏感性，生成的统计结论也必须人工复核。

## 如何改造成自己的版本

保留目录和命令体系，先实现 `/analyze`、`/visualize`、`/report` 三个闭环。为每个数据集增加 `README` 或 metadata，说明来源、字段、权限、更新时间。所有生成代码默认写到 `generated_code/`，运行前先让用户确认，不自动改原始数据。

## 适用场景

- 小团队建立可复现数据分析工作区。
- CSV/Excel 探索、图表和报告生成。
- Claude Code subagent 模式学习。

## 不适用场景

- 大规模数据仓库分析。
- 涉密数据无脱敏直接放进工作区。
- 需要严格统计验证的正式研究结论。

## 参考信息

- 原项目：[claude-data-analysis](https://github.com/liangdabiao/claude-data-analysis)
- 作者：liangdabiao
- 相关概念：[[数据分析工作区]]、[[可复现分析]]
- 相关卡片：保守留空
