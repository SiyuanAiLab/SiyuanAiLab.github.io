---
title: "Skill 设计参考：skill forge"
description: "一个把本地实验技能整理成可安装、可信、可发布 Agent Skill 的后置工程工具，重点是校验、抽取、发布和多平台同步。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["Skill设计", "模板化", "指令结构", "能力封装"]
prerequisites: []
related_cards: []
scenario: "Skill 生产线 / Skill 设计"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的Skill 设计流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/motiful/skill-forge"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# skill forge

> 一个把本地实验技能整理成可安装、可信、可发布 Agent Skill 的后置工程工具，重点是校验、抽取、发布和多平台同步。

## 这个能力解决什么问题

motiful/skill-forge 解决的是 Skill 写完后如何工程化：它审计目录、抽取混乱原型、检测注册冲突、扫描泄密、验证 README 主张、发布到 GitHub，并同步到 Claude Code、Codex、Cursor、Windsurf、GitHub Copilot 等本地 skill root。它不负责领域内容写作，而负责把「像个技能」变成「可安装可信的技能」。

## 核心逻辑

真实输入是一个技能 repo、混杂原型文件夹、项目中的 rules/agent instructions，或用户说的「review/create/extract/publish」。处理逻辑是：发现 skill/rule/agent 文件；判断是 review、create、extract 还是 publish；验证名称、description、body 长度、references、README、LICENSE、密钥、`.gitignore`、硬编码路径；必要时调用 readme-craft、rules-as-skills、self-review；本地 ready 后才进入 GitHub 发布和本机多平台 symlink。输出是清理后的 skill repo、审计结果、修复建议、发布仓库和多平台安装视图。

## 技术结构

- 关键模块：根目录 `SKILL.md` 是可安装 skill；`.agents/skills/maintenance-rules` 与 `.claude/skills/maintenance-rules` 显示维护规则；`docs/skill-philosophy.md`、`docs/skill-quality-model.md`、`docs/attention-and-feedback.md` 定义质量模型；`references/` 存格式、调用、配置、模板和组合说明。
- 调用链路：用户触发 review/create/extract/publish -> Skill 检查配置和路径 -> 发现参考技能与规则 -> 安全/结构/README/触发覆盖校验 -> 修复到 local ready -> 可选 git init、GitHub 创建、跨平台 symlink。
- 输入输出：输入是本地目录、skill 内容、配置、目标 GitHub org 和本机已安装平台；输出是 clean repo、审计报告、阻断项、安装链接和发布命令。
- 核心依赖：Git、Node.js、`npx skills add`、GitHub CLI；依赖技能包括 readme-craft、rules-as-skills、self-review。

## 为什么值得参考

它的设计亮点是把 Skill Forge 定位成 post-authoring 工具：内容创作和工程验收分离。对于自己的生产线，这个边界很重要：不要让同一个技能同时负责写内容、审安全、发 GitHub、同步本机，否则责任会糊掉。

## 为什么不建议直接套用

它的发布链会触发 GitHub 创建/推送和本机 symlink，属于高风险动作，必须人工确认。它的 quality model 偏 Agent Skills 生态，且 README 里提到安全漏洞、平台目录和 GitHub 发布，直接用于内容卡片生产会过重。它也明确不测试领域效果，只验证工程包装。

## 如何改造成自己的版本

把它拆成「发布前验收 Skill」：输入是已写好的 `SKILL.md` 或工作流卡，输出是阻断项清单。先只做五项检查：触发描述是否覆盖、是否有本地绝对路径、是否引用密钥、README/正文主张是否超出能力、是否有最小验证样例。发布、git、symlink 全部留给人工或单独工具。

## 适用场景

- Skill 已写完，需要发布前做结构、安全和可安装性检查。
- 需要从混乱原型目录抽取干净 Skill。
- 需要多平台同步一个 source of truth。

## 不适用场景

- 需要生成领域知识正文或测试任务效果。
- 不准备发布到 GitHub，也不需要跨平台安装。
- 不能接受工具触碰 git、symlink 或本机 skill root。

## 参考信息

- 原项目：[skill-forge](https://github.com/motiful/skill-forge)
- 作者：motiful
- 相关概念：[[发布前验收]]、[[Skill 工程化]]、[[安全扫描]]
- 相关卡片：[workflow-read-026](skill-forge-design-agricidaniel-skill-forge.md)
