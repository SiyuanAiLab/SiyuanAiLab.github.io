---
title: "代码实现参考：copa"
description: "一个 prompt 模板语言和 CLI，用占位符把本地文件、目录树、网页内容和子模板组合成可重复生成的结构化提示词。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["代码实现", "脚手架", "CLI", "工具链"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / 代码实现"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的代码实现流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/romansky/copa"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# copa

> 一个 prompt 模板语言和 CLI，用占位符把本地文件、目录树、网页内容和子模板组合成可重复生成的结构化提示词。

## 这个能力解决什么问题

CoPa 解决的是提示词工程里的手工拼上下文问题。很多代码审查、调试、文档生成任务都需要固定包含某些文件、排除测试快照、显示目录树、抓取网页文档、移除 import 或复用子 prompt。CoPa 把这些规则写成模板语法，让同一类任务每次输入一致、可审查、可统计 token。

## 核心逻辑

真实输入是 `.copa` 模板文件、其中的 `@path_or_url` 占位符、glob 排除规则、选项如 `clean`、`dir`、`remove-imports`、`md`、`eval`，以及全局忽略配置。处理逻辑是：CLI 解析模板；读取本地文件、目录或 URL；按选项清洗、HTML 转 Markdown、生成目录树、移除 imports、递归处理子模板；自动为多行内容选择安全代码围栏；最后输出到 stdout 并可报告 token 或错误。输出是完整 prompt 文本、错误列表或 token 数。

## 技术结构

- 关键模块：`src/promptProcessor.ts` 处理模板；`src/fileReader.ts` 读取本地/网页；`src/directoryTree.ts` 生成目录树；`src/filterFiles.ts` 按 glob 和 `.gitignore` 过滤；`src/options.ts` 管占位符选项；`src/copa.ts` 是 CLI 入口。
- 调用链路：`npx copa to prompt.copa` -> 解析占位符 -> 读取/过滤/清洗资源 -> 递归 eval 子模板 -> 生成最终 prompt -> 输出文本、token 或错误。
- 输入输出：输入是模板、文件路径、URL、目录、忽略规则；输出是 prompt、Markdown 代码块、目录树、HTML 转 Markdown 内容和 token 统计。
- 核心依赖：TypeScript/Node、npm/npx、dom-to-semantic-markdown、gitignore 过滤和 token counting。

## 为什么值得参考

它是实现 Skill 的轻量工具层范例：不是让 Agent 每次猜该读哪些文件，而是把上下文选择固化成模板。对 Skill Forge 来说，很多「实现」其实可以先做成可重复 prompt assembler，再决定是否需要完整 Agent。

## 为什么不建议直接套用

CoPa 会把本地文件和网页内容直接塞进 prompt，容易超上下文或误包含敏感文件；虽然尊重 `.gitignore`，但全局 ignore 需要自己维护。它也不理解业务语义，只做模板渲染；如果模板选错文件，输出仍然会很规整但方向错误。

## 如何改造成自己的版本

为每个高频 Skill 写一个 `context.copa`：明确包含 README、目标文件、测试、目录树和补充文档；默认排除密钥、日志、图片、构建产物和大数据文件。再加一个 `--tokens` 预检查，把超预算的模板挡在执行前。用于知识工作流时，把 URL 抓取替换成先归档再引用，避免实时网页漂移。

## 适用场景

- 代码审查、bug 分析、迁移方案等需要固定上下文集合的任务。
- 团队希望共享 prompt 模板而不是复制长提示词。
- 需要把目录树、文件内容和网页文档组合进一次模型调用。

## 不适用场景

- 文件包含敏感数据且没有严格 ignore 策略。
- 任务需要动态判断材料价值，而不是固定模板。
- 需要执行外部动作或长流程状态管理。

## 参考信息

- 原项目：[copa](https://github.com/romansky/copa)
- 作者：romansky
- 相关概念：[[Prompt 模板]]、[[上下文组装]]、[[Token 预算]]
- 相关卡片：[workflow-read-035](skill-forge-implementation-skillforge-core.md)
