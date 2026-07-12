# AI·LAB 与首页阶段成果合并报告

## 目标

把实验仓已经完成并经过多轮审核的首页、AI·LAB 和个人操作系统阶段成果，合并到正式主仓。

## 合并范围

- 首页三入口结构：AI·LAB、AI·观、AI·外脑。
- AI·LAB 首页与三个展区。
- 个人操作系统总览。
- “AI 如何认识我”。
- “我与 AI 如何相处”。
- “信息如何沉淀到大脑”。
- “我如何管理生活与经营”。
- “我如何推进每天的动作”。
- 脱敏驾驶舱演示数据、页面组件、样式和已使用的插图。

## 合并边界

本次没有把以下实验仓内容带入正式仓：

- `screenshots/` 实验截图缓存。
- `skills/` 实验用视觉 Skill。
- 空文件 `amp`。
- 页面已不再引用的 `dialogue-to-memory-v1.png`。

没有修改 `.env`、密钥、token、数据结构或数据库。

## 验收结果

- 正式主仓 `npm run build` 成功。
- 共生成 344 个静态页面。
- 首页、AI·LAB、个人操作系统与 7 个子路由全部返回 200。
- 375px、768px、1440px 三端全部无横向溢出。
- 三端全部无页面脚本报错。
- 受检页面的站内链接全部正常。
- `knowledge-input.astro` 的 Front Matter 示例不含行号。
- 首页驾驶舱图片的红框只包围图片，不再与图片说明重叠。

## 截图

- `docs/reports/screenshots/2026-07-12-stage-merge/home-375.png`
- `docs/reports/screenshots/2026-07-12-stage-merge/home-768.png`
- `docs/reports/screenshots/2026-07-12-stage-merge/home-1440.png`
- `docs/reports/screenshots/2026-07-12-stage-merge/personal-os-375.png`
- `docs/reports/screenshots/2026-07-12-stage-merge/personal-os-768.png`
- `docs/reports/screenshots/2026-07-12-stage-merge/personal-os-1440.png`

## 遗留问题

无阻断性问题。本次是阶段性合并，后续 AI·LAB 的 Skill 链接和产品 Demo 仍可继续在实验仓迭代，经审核后再进入正式主仓。
