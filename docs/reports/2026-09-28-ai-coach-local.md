# AI Coach 本地交付

无需处理；本地可审阅，未 Push、未上线。下一步由思远查看成品并提出微调；未来推送/上线需要新口令。本轮没有向 CC 发消息，未冒称 CC 独立复验完成。

## 预览入口

- [作品卡](http://127.0.0.1:4326/skills/ai-coach/)
- [证据页](http://127.0.0.1:4326/skills/ai-coach/evidence/)
- [开工判定卡](http://127.0.0.1:4326/skills/ai-coach/evidence/#card)
- [KB 实录](http://127.0.0.1:4326/skills/ai-coach/evidence/#kb)
- [Skills 列表](http://127.0.0.1:4326/skills/)

## 边界与结果

工作目录：`/Users/yangsiyuan/.codex/worktrees/231f/思远的独立站`，分支 `codex/homepage-opinion-20260927`，基线 `3ec77fa3d29071699373c35e7eb0c67a43858912`。原先只有未跟踪的 node_modules 符号链接，未改、未提交、未删除。

- 两母本按原字节复制到 src/data/ai-coach/work.html、evidence.html，SHA256 和原始来源见同目录 sources.json。
- 呈现转换仅移除五个 module-tag 角标与不可见 HTML 注释，替换两种本地文件 href 为站内地址；正文、五模块、01–05、GitHub/SkillHub 链接保留。网页 title 使用无打磨版本标记的站内标题，母本 title 仍保存在快照中。
- 新作品位于 Skills 第二件。摘要直接取母本原句。每条作品独立搜索标识，避免新条目误命中 business-consult。
- WorkPage 只增加可选插画参数与页面样式类；默认行为未改。新增样式都限定在 coach-work / coach-evidence，未修改共享 work-page.css。
- 导航仍区分 Skills / MCP / 操作系统，研究与学习继续筹备中。
- 主仓库运维文档、生产、Mac mini、策展数据及自动流程均未改；本地旧数据未向线上发送。
- docs/ 原本在 .gitignore 中，本轮任务卡和报告为本地备查文件，未暂存、未提交；日后提交需明确携带这些证据。

## 验收

- TESTED：`npm run build` 成功，351 页。日志：[build](2026-09-28-ai-coach-build.log)。新插画生成 200px / 400px WebP，约 3KB / 7KB（源 PNG 约 812KB，不直接向访客发送）。
- RUNTIME_VERIFIED：curl 读取真实本地 HTTP；两页及站内锚点、返回路径可达。两母本原件/快照字节一致、SHA 相同；五模块五步骤、外链顺序、全部 href 的允许替换、证据 pre 的空格换行均核对通过。
- 文本规范化明确采用：提取正文，去除批准删除的 module-tag 元素；解码 HTML 实体；合并文本节点并去除 Unicode 空白后对照 SHA256。同时独立精确对照 pre 文本、href 顺序及所有来源 id。**原始快照是字节相同；站内排版 HTML 不是原 HTML 字节相同。**
- 首件四份冻结正文（含内嵌报告）、外链与快照回归通过。[HTTP 证据](2026-09-28-ai-coach-http-audit.json)，可重跑 `python3 docs/reports/verify-ai-coach.py`。
- RUNTIME_VERIFIED：ego-browser 检查作品卡、证据页、列表及首件在 375 / 768 / 1440 下均无页面横向溢出；新插画和首件两图加载正常，图片矩形与正文文本行无碰撞；桌面导航、手机菜单显示策略正确。[尺寸与图片记录](2026-09-28-ai-coach-browser.json)。
- RUNTIME_VERIFIED：手机菜单开/关，01/02 链接跳转并落到可见锚点，返回正确作品卡；英文/标识/中文用途搜索、清空、无结果；首件报告展开/收起、深链自动展开通过。[交互记录](2026-09-28-ai-coach-interactions.json)。交互采用真实浏览器 DOM 事件，未声称完成原生坐标点击全链路测试。

## 未完成项与错误记录

- **截图未完成**：375px 的 ego-browser `Page.captureScreenshot` 再次报 CdpRequestTimeoutError；没有继续重试或把空文件当截图，768/1440 未再尝试。尺寸/碰撞检查不能替代完整网页截图的审美验收；插画源图已目视检查。
- 初次浏览器读取发生在 build 完成前，现有静态预览返回 404；build 完成后同服务两页均 200，无需换端口。
- 首次坐标 helper click 未导航，随后读取 #card 报 null；改用 DOM click 与目标元素等待，完整交互复测通过。
- 施工目录缺少 AGENTS.md 与 docs/00-project-control.md，读取报不存在；按本对话提供规则并只读主仓库主控及摘要，未补写或改动主仓库。初次搜索 scripts/ 也因目录不存在报错，后续验收脚本放 docs/reports/。
- 上线后 CC 独立复验尚未开始，属于未来发布环节。

## 插画资产与最终提示词

使用内置 image_gen 工具，未使用 CLI/API fallback。源图：[human-decision.png](../../src/assets/ai-coach/human-decision.png)。主题是人手控制流程开关与三本参考书，不复用首页图标或首件人物/放大镜。仅放作品卡标题区，证据页保持纯文字。

> Use case: illustration-story. Asset type: small decorative title illustration for AI Coach Skill portfolio, 200px display. Create one minimalist editorial black ink line drawing on pure white square background. Subject: a human hand turning a small decision switch on a simple branching workflow board, next to three upright reference books; conveys human approval before AI execution and checking existing knowledge first. Crisp thin expressive black outlines, a few solid black accents, generous white negative space, restrained Notion-like editorial drawing, no gradients, no shading, no text, no letters, no logos, no watermark. Compact centered composition legible at 100px. No magnifying glass, no report-organizing person, no robot, no reused illustration.
