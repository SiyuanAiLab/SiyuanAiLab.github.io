---
title: "浏览器自动化参考：mote"
description: "一个 methodology-first 的浏览器自动化 Agent 框架，用 record → normalize → execute → validate 生命周期把人工流程变成可复用 preset。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["浏览器自动化", "Playwright", "网页QA", "Agent工具"]
prerequisites: []
related_cards: ["ai-core-27-tool-use-function-calling", "ai-core-32-agentic-workflow"]
scenario: "基础设施层 / 浏览器自动化"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的浏览器自动化流程。"
confidence: "高"
verifiedDate: "2026-06-30"
source: "https://github.com/Te29/mote"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# Mote

> 一个 methodology-first 的浏览器自动化 Agent 框架，用 record → normalize → execute → validate 生命周期把人工流程变成可复用 preset。

## 这个能力解决什么问题

网页自动化常见问题是：纯脚本怕页面变化，纯 LLM 又容易乱点。Mote 解决的是把人类浏览器流程录下来，整理成可重复执行的 session plan，再在执行时按步骤决定“直接用 selector 执行”还是“让 LLM 根据语义判断”，并用验证脚本和人工介入控制风险。

## 核心逻辑

输入可以是用户录制的浏览器操作、手写 preset、任务 goal、session plan 和配置。处理层先 record 人类路径，再 normalize 成 setup/cycle/wrapup 等阶段；execute 时由 Playwright browser context 执行动作，runtime 在每步通过 observe/reason/act 循环读取页面、选择工具、执行点击/输入等动作；validate 阶段运行 verification script 检查阶段是否成功，失败时可重试、继续、终止或请求人工。输出是完成的网页任务、session traces、screenshots、checkpoint 和可复用 preset。

## 技术结构

- **生命周期**：`record → normalize → execute → validate` 是 Mote 区别于普通 browser-use demo 的主线。
- **核心目录**：`src/browser.ts` 管 Playwright context；`src/recorder` 处理录制、页面观察、checkpoint 和 LLM 生成；`src/runtime` 管 runtime state；`src/handlers` 分 setup/cycle/reason/act/wrapup。
- **Preset 系统**：一个 preset 包含任务定义、session plan、可选 prompts 和配置覆盖。
- **执行模式**：直接执行、LLM-assisted、Hybrid 三类步骤并存；`llmRequired`、selector hint 和 step prompt 决定是否调用模型。
- **人工参与**：autonomous/minimal/standard/supervised/full 五种 engagement mode 控制审批强度。

## 为什么值得参考

Mote 没有把 LLM 当成万能点击器，而是把 LLM 放进预定义路径的分支判断和异常恢复里。它承认真实网页流程需要人工路径、脚本动作、语义选择、验证脚本和 checkpoint 共同工作，这对企业流程自动化比“让 agent 自己逛网页”更可靠。

## 为什么不建议直接套用

项目仍是轻量框架，生态和维护成熟度不如 Playwright 官方；实际效果依赖 preset 质量、验证脚本和页面稳定性。录制流程若包含账号、验证码、支付、后台敏感操作，必须单独处理权限和测试数据。LLM-assisted 步骤会引入 token 成本和不确定性，不能替代业务验收。

## 如何改造成自己的版本

可以借 Mote 的 preset 思路：为每个网页流程建立一个目录，包含任务定义、固定 setup、循环步骤、wrapup 和验证函数。先把可确定动作写成 selector 脚本，只在“选择哪个未完成项目”“识别页面状态”这类语义节点调用模型。每个流程都必须有失败截图、重试次数、人工接管点和最终验证条件。

## 适用场景

- 重复网页流程，如后台录入、课程/表单检查、运营 QA。
- 页面有一定变化，需要脚本和 LLM 混合。
- 想把人工操作沉淀成可复用 preset。

## 不适用场景

- 验证码、支付、敏感账号操作等高风险流程。
- 页面结构频繁大改且没有可靠验证条件。
- 只需一次性浏览，不值得录制和维护 preset。

## 参考信息

- 原项目：[mote](https://github.com/Te29/mote)
- 作者：Te29
- 相关概念：[[浏览器自动化]]、[[Human-in-the-loop]]、[[工作流验证]]
- 相关卡片：保守留空
