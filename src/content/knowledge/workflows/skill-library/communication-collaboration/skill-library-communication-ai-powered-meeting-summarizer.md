---
title: "沟通与协作参考：AI Powered Meeting Summarizer"
description: "一个 Gradio 音频上传应用，用 whisper.cpp 本地转写会议录音，再通过 Ollama 本地模型生成摘要。"
pubDate: "2026-06-30"
updatedDate: "2026-06-30"
category: "workflows"
level: "入门"
tags: ["会议纪要", "行动项", "协作", "沟通"]
prerequisites: []
related_cards: []
scenario: "Skill 参考库 / 沟通与协作"
audience: "关注 AI 工作流、Skill 生产和 Agent Building 的读者"
action: "先阅读边界说明，再判断它是否适合改造成自己的沟通与协作流程。"
confidence: "中"
verifiedDate: "2026-06-30"
source: "https://github.com/AlexisBalayre/AI-Powered-Meeting-Summarizer"
curated_by: "思远 AI Lab"
public: true
draft: false
---

# AI Powered Meeting Summarizer

> 一个 Gradio 音频上传应用，用 whisper.cpp 本地转写会议录音，再通过 Ollama 本地模型生成摘要。

## 这个能力解决什么问题

它解决的是不想把音频和文本发到云端时的会议摘要需求。用户上传 `.wav/.mp3` 等音频，可选会议上下文、Whisper 模型和 Ollama 总结模型；系统输出摘要，并提供完整 transcript 下载。

## 核心逻辑

启动脚本会创建 Python 环境、检查 FFmpeg、克隆并构建 `whisper.cpp`、下载默认 Whisper 模型，然后启动 Gradio。运行时先把音频转为 whisper.cpp 可处理格式，执行本地 ASR；随后调用正在运行的 Ollama server，用选定模型对 transcript 做摘要。

## 技术结构

- 关键模块：`run_meeting_summarizer.sh` 管环境、whisper.cpp 构建和模型下载；`main.py` 管 Gradio UI、音频处理、Ollama 请求。
- 调用链路：音频上传 -> FFmpeg/whisper.cpp -> transcript -> Ollama summarization -> summary + transcript download。
- 输入输出：输入是音频文件和可选上下文；输出是摘要和转写文本。
- 核心依赖：Python、FFmpeg、whisper.cpp、Ollama、Gradio、requests。

## 为什么值得参考

它的价值在本地优先：ASR 和总结都能跑在自己的机器或服务器上，隐私边界比云端 Whisper + 云端 LLM 更清楚。模型选择下拉也把“转写模型”和“总结模型”分开，便于按性能和质量调整。

## 为什么不建议直接套用

它仍然处理会议录音，授权和留存必须先定义。whisper.cpp 和 Ollama 的安装成本不低，不适合非技术用户直接维护。README 中翻译参数示例表述有混淆，语言检测/翻译行为需要实测。没有用户隔离、审计日志或企业权限系统。

## 如何改造成自己的版本

把它改成“本地会议资料处理台”：只接受用户主动上传的已授权录音，默认处理后删除临时音频。增加 speaker/时间戳、action items 和人工确认状态。对中文场景单独测试 Whisper 模型和 Ollama 中文摘要质量，不要默认相信英文 meeting prompt。

## 适用场景

- 本地或内网运行的会议转写摘要。
- 对隐私敏感、不想调用云 ASR 的团队。
- 研究 whisper.cpp + Ollama 的离线工作流。

## 不适用场景

- 未授权会议录音。
- 要求多人账号、权限、审计的企业产品。
- 低配置电脑上处理长音频。

## 公开版边界

- 录音和转写须获得参会者知情同意。

## 参考信息

- 原项目：[AI-Powered-Meeting-Summarizer](https://github.com/AlexisBalayre/AI-Powered-Meeting-Summarizer)
- 作者：AlexisBalayre
- 相关概念：[[本地转写]]、[[会议摘要]]
- 相关卡片：保守留空
