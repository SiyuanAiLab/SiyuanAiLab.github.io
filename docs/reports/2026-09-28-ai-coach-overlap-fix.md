# 证据页文字遮挡修复

用户截图明确显示 KB 三段正文灰色块互相遮挡。先前 UTF-8/正文核对正常不能排除视觉错误；先前尺寸和插画碰撞验收未覆盖行内元素背景重叠，这处漏检成立。

原因：共享 `.frozen-page .a` 与 AI Coach 的 `.coach-evidence .a` 优先级相同，共享样式后加载覆盖局部 padding/background。行内 span 因此获得桌面 20px 24px、手机 18px 内边距及灰底，遮住上下行。

修复：局部选择器提升为 `.frozen-page.coach-evidence .a`，只修本件证据页，不改共享样式或冻结正文。

RUNTIME_VERIFIED：修前浏览器 computed style 确认异常内边距与灰底；修后强制重新加载，在 375/768/1440 下三段均为 padding 0px、透明背景、inline，页面无水平溢出。证据见同名前缀 browser.json。首次复查仍是旧文档，Page.reload(ignoreCache) 后新样式生效。

TESTED：npm run build 成功 351 页；HTTP 两母本/首件四份正文及链接复核通过；git diff --check 通过。未重新尝试已知持续超时的截图接口，未声称截图验收。

未 Push、未上线。浏览器已打开页面需要刷新以加载本次静态构建。
