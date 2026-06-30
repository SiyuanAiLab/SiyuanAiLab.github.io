---
title: "代码实现参考：cross agent skills template"
description: "一个跨 Antigravity、Codex、Gemini CLI、Claude Code 管理技能目录的模板仓库，把 skill catalog、manifest 和安装投影分开。"
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
source: "https://github.com/yammaku/cross-agent-skills-template"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# cross agent skills template

> 一个跨 Antigravity、Codex、Gemini CLI、Claude Code 管理技能目录的模板仓库，把 skill catalog、manifest 和安装投影分开。

## 这个能力解决什么问题

cross-agent-skills-template 解决的是同一套技能在多 Agent 工具之间不同步的问题。它把用户自己的 skills-registry repo 作为 source of truth，再按 agent adapter 投影到各平台的 global/project skill root。对实现层的参考价值是：它把「技能源文件」和「平台安装视图」分开，避免每个工具各维护一份拷贝。

## 核心逻辑

真实输入是用户自己的 registry repo、本机已有 skill roots、选择管理的 agents、`manifest.toml`、项目里的 `.agent-skills.toml`，以及迁移或同步请求。处理逻辑是：AI 先判断当前 repo 是上游模板还是用户私有 repo；检查机器状态和 git 状态；对新机选择 fresh install/migration/replace backup；把共享 skill 放在 `skills/shared/`，agent-specific skill 放在对应目录；根据 manifests 执行 `sync-agent-global` 或 `sync-project`，把同一 catalog materialize 到 `.agents/skills`、`.claude/skills`、`.codex/skills` 等兼容面。输出是本机各 Agent 可发现的技能目录和同步报告。

## 技术结构

- 关键模块：`skills/shared/manage-agent-skills/` 是通用 meta-skill；`agents/*.toml` 描述 Antigravity、Claude Code、Codex、Gemini CLI 适配；`manifests/agent-global/*.toml` 声明全局安装；`templates/project-manifest.toml` 定义项目级需求；`bootstrap/apply_global_skill_migration.py` 和 `skills/shared/manage-agent-skills/scripts/manage_agent_skills.py` 负责迁移与同步。
- 调用链路：读 README onboarding contract -> 判断 repo/机器/git 状态 -> 选择 agents -> 更新 manifest -> 同步 registry -> materialize global/project install surfaces。
- 输入输出：输入是 registry 状态、manifest、agent 选择、本机 skill roots；输出是 symlink/文件投影、备份、同步结果和冲突提示。
- 核心依赖：Python 脚本、TOML manifests、git、各 Agent 的本地技能发现规则、symlink 或文件级链接策略。

## 为什么值得参考

它的重点不是生成 Skill，而是实现「一个目录，多平台投影」。这对 Skill Forge 很关键：当技能开始跨 Codex/Claude/Cursor/Gemini 使用时，真正难的是安装约定、冲突、迁移和 git 同步，而不是再写一份内容。

## 为什么不建议直接套用

README 的 onboarding contract 很谨慎，说明它会检查本机 skill roots、迁移旧技能、处理 git dirty/ahead/diverged 状态。这些都是会影响用户机器的操作，不适合在内容生产任务里自动执行。不同工具的 symlink 粒度也存在兼容差异，直接搬可能造成某个平台发现不了技能。

## 如何改造成自己的版本

先只借它的 manifest 模型：建立 `skills/shared`、`skills/codex`、`skills/claude` 三层目录和一个 `project-manifest.toml`，但不要自动同步到全局目录。等手工验证不同平台发现规则后，再写只读 dry-run：列出将创建/覆盖的链接，用户确认后才 materialize。

## 适用场景

- 同一套技能需要同时供 Codex、Claude Code、Gemini CLI、Antigravity 使用。
- 需要区分共享技能和 agent-specific 技能。
- 多机器同步技能目录，需要 registry repo 作为源。

## 不适用场景

- 单平台使用，不需要投影层。
- 不允许工具检查或修改本机 skill roots。
- git 状态复杂但没有人负责合并/冲突处理。

## 参考信息

- 原项目：[cross-agent-skills-template](https://github.com/yammaku/cross-agent-skills-template)
- 作者：yammaku
- 相关概念：[[跨 Agent 技能同步]]、[[Manifest]]、[[安装投影]]
- 相关卡片：[workflow-read-023](../skill-forge-scene-analysis/skill-forge-scene-analysis-agentic-config.md)
