# 稷下学宫本地施工交付

## 状态

本地施工完成；`npm run build` 已实际通过，共 353 页。详细输出：`2026-09-28-private-board-build.log`。
未提交、未 Push、未上线，未修改 Mac mini 自动流程。HTTP 正文、三端浏览器与首两件回归由主控独立执行，本文不冒称已通过。

## 页面与源码

- 作品卡：`/skills/private-board/`
- 互驳证据：`/skills/private-board/evidence/`
- 03 步「看这场真实互驳 →」与「← 返回作品卡」相互接通。
- Skills 第三位，支持稷下学宫/private-board/Jixia Academy/开一场稷下/行动承诺搜索。
- `src/pages/skills.astro` 仅新增第三条数据；没有修改前两条。
- 新增 `src/data/private-board/{work.html,evidence.html,pages.ts,sources.json}`。
- 新增 `src/pages/skills/private-board/{index.astro,evidence.astro}`。
- 新增 `src/styles/private-board.css`，所有规则独立限定；席位三段在手机竖排，避免共享 station 规则挤压。
- 新增 `src/assets/private-board/roundtable-discussion.png`。
- 共享 WorkPage 未改。

## 冻结口径

两份母本完整字节副本与 SHA256 存档，渲染阶段只做授权删除标记、注释以及站内链接替换。正常页面 HTML 因站内结构、样式、链接和标记删除不可能与母本 HTML 字节 SHA 一致。原件字节核验与规范化可见正文核验是两项独立检查，不能混称为「页面 HTML 字节与母本相同」。诚实声明完整保留。

## 插画

使用 imagegen 技能、内置 image_gen 工具新生成。已 view_image 检视原图：三人围桌讨论、黑白线描、空对白形状、无人名和品牌，无复用前两件图。原图复制入源码，由 Astro Image 自动输出 200/400 宽 WebP，构建约 6 KB / 19 KB。无 Python 绘图或图像编辑。

原始生成文件：`/Users/yangsiyuan/.codex/generated_images/01a0e7d0-5c95-7741-81aa-23573dc3854d/exec-77f1ed86-8e77-436f-9f78-c35feb6eb016.png`。

最终生成提示词：

> Use case: illustration-story. Asset: small editorial illustration for a minimal black-and-white Chinese independent website Skill product page called Jixia Academy / Private Board. Draw three distinct anonymous thoughtful adults seated around a small round table in an engaged intellectual debate: one gestures with open hand, another leans back considering, the third takes a small note. A few blank speech shapes suggest contrasting points of view. Fine expressive black pen outlines, simple white shapes, very restrained black fills, no gray wash, no color, no shading, no text, no logos, no celebrity likeness. Pure white background. Square composition, complete figures and table centrally arranged with broad white breathing room, compact silhouette readable at 180 pixels. Human warmth, serious collegial discussion, hand-drawn editorial line art, not cartoon emoji, not 3D.

## 尚待

主控独立验收、思远本地审阅；后续明确发布口令及 CC 上线后独立复验。本文与任务卡位于被忽略的 docs/，尚未进入 Git 提交。

## 总控独立验收回收

2026-09-28 本地联合核对：verify-skills-three.py 实跑通过，三件8份母本原始快照、规范化正文、原外链与允许的站内路径替换均一致；列表顺序为 Business Consult / AI Coach / 稷下学宫。互驳实录诚实声明保留。

浏览器实跑：品卡与证据页375/768/1440无横向溢出；三档插画已加载且无文本碰撞；5席位块无内部横向溢出。03步真实点击到证据页、返回品卡、中文/英文/用途搜索及前两件搜索、无结果与清空恢复通过；手机菜单开合和Escape焦点恢复通过。证据为同目录 private-board-browser.json / private-board-interactions.json（均带2026-09-28前缀）。

首个自动滚动点击超时，复查命中元素即目标链接，重新snapshot后的ref点击成功；原问题明确披露。没有重试已知持续超时的截图工具，不把尺寸检测当截图审美验收。待思远实际预览，CC上线后独立复验未发生。

未commit、未Push、未上线。第一件已上线封板；第二、三件等待新统一发布口令，不沿用原授权。
