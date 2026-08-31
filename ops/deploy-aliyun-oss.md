# 阿里云 OSS + CDN 手动上线操作单

> 状态：施工说明已准备，生产资源尚未开通。  
> 适用站点：`https://siyuanailab.com`  
> 执行边界：本文件只记录步骤和命令模板，不保存密钥。任何 OSS 上传、CDN 刷新或 DNS 变更，都必须在 P2 前取得思远单次明确授权。

## 1. 当前现场

2026-09-01 只读核查结果：

- OSS 尚未开通，没有 Bucket。
- CDN 尚未开通，没有加速域名。
- 数字证书管理中正式证书、免费证书均为 0。
- RAM 用户总数为 0，没有部署专用子账号。
- `siyuanailab.com` 在云解析 DNS 中的记录数为 0。
- 本机尚未安装 `ossutil`。

以上事项统一留到 P2，上线授权前不创建、不配置。

## 2. P2 前置条件

只有以下条件全部成立，才允许实际上传：

- [ ] 思远明确授权本次 P2 上线。
- [ ] 本地 `npm run build` 成功，构建页数不低于 340。
- [ ] G2 页面验收通过。
- [ ] OSS 与 CDN 已开通。
- [ ] 已创建华东 1（杭州）Bucket，默认保持私有。
- [ ] 已创建只服务该 Bucket 的 RAM 用户，并按最小权限授权。
- [ ] 已为 CDN 配置 OSS 私有 Bucket 回源。
- [ ] 已申请并在 CDN 侧配置 `siyuanailab.com` HTTPS 证书，开启 HTTP → HTTPS。
- [ ] 已记录 CDN 给出的 CNAME，但尚未修改 DNS。

## 3. OSS 静态网站设置

本项目采用 Astro 的目录式静态输出，例如 `/about/` 对应 `about/index.html`。Bucket 需设置：

- 默认首页：`index.html`。
- 子目录首页：开通。
- 文件 404 规则：`Redirect`，让 `/about` 规范跳转到 `/about/`。
- 不把默认 404 页设为 `index.html`，避免不存在的地址伪装成成功页面。
- Bucket 保持私有，由 CDN 开启“同账号 OSS 私有 Bucket 回源”。

## 4. RAM 最小权限边界

部署专用 RAM 用户只用于上传和读取目标 Bucket：

- 必需：列出目标 Bucket 对象、读取对象信息、上传或覆盖对象。
- 默认不授予删除对象权限；发布命令禁止使用 `--delete`。
- CDN 刷新先由主账号在控制台人工执行，不把 CDN 刷新权限加入长期 AccessKey。
- AccessKey 只进入本机 `ossutil` 配置，不进入本仓库、GitHub Secrets、日志或报告。

## 5. 安装和配置 ossutil 2.0

安装前按阿里云官方页面选择适配 Apple Silicon 的版本：

- [安装 ossutil](https://help.aliyun.com/zh/oss/developer-reference/install-ossutil/)
- [配置 ossutil](https://help.aliyun.com/zh/oss/developer-reference/configure-ossutil)

安装完成后，由思远本人在终端交互填写 AccessKey：

```sh
ossutil config
chmod 600 ~/.ossutilconfig
```

核对工具与账号可用性：

```sh
ossutil version
ossutil ls "oss://<bucket-name>/"
```

不得把 AccessKey ID 或 Secret 写在命令参数、`.env`、脚本或本文中。

## 6. 本地构建与试运行

```sh
npm ci
npm run build
export OSS_BUCKET='<bucket-name>'
ossutil sync dist/ "oss://${OSS_BUCKET}/" --dry-run
```

`--dry-run` 只展示计划动作，不修改 OSS。确认输出只包含本次站点文件后，回到 P2 授权门。

## 7. 实际上传（P2 红线）

以下命令会改变生产状态，未获本次 P2 授权时不得执行：

```sh
ossutil sync dist/ "oss://${OSS_BUCKET}/"
```

禁止追加 `--delete`。首次上线 Bucket 为空，不需要远端删除；后续如需清理旧路由，另报删除授权。

## 8. CDN 与 DNS（P2 红线）

上传完成后在阿里云控制台依次处理：

1. CDN 加速域名使用 `siyuanailab.com`，源站类型选择同账号 OSS Bucket。
2. 开启同账号 OSS 私有 Bucket 回源。
3. 在 CDN 侧配置 HTTPS 证书并强制 HTTPS 跳转。
4. CDN 首次接入完成后，复制系统生成的 CNAME。
5. 在云解析 DNS 中为根域名设置 CDN 要求的 CNAME；`www` 是否作为第二个加速域名或跳转入口，P2 时单独确认。
6. DNS 生效后，在 CDN 控制台对 `https://siyuanailab.com/` 执行目录刷新。刷新通常需要数分钟，完成前不宣告上线。

参考：

- [OSS 静态网站托管](https://help.aliyun.com/zh/oss/user-guide/hosting-static-websites)
- [通过 CDN 加速访问 OSS](https://help.aliyun.com/zh/oss/user-guide/cdn-acceleration)
- [CDN 刷新和预热资源](https://help.aliyun.com/zh/cdn/user-guide/refresh-and-prefetch-resources)

## 9. 上线验收

至少检查：

```sh
curl -I https://siyuanailab.com/
curl -I https://siyuanailab.com/about/
curl -I https://siyuanailab.com/lab/skills/
curl -I https://siyuanailab.com/this-path-should-404
```

通过标准：

- 首页和核心页面返回 `200`。
- 不存在地址返回 `404`，不返回首页假成功。
- HTTP 自动跳转 HTTPS，证书域名正确且在有效期内。
- Header、Footer、备案号和 GitHub 链接可见。
- 全站内部链接爬取无 404。
- CDN 响应头可见，刷新后的首页内容与本地 G2 版本一致。

## 10. 停止与回退

出现下列任一情况立即停止，不继续改 DNS：

- OSS 子目录路由不能正确返回对应 `index.html`。
- HTTPS 证书未生效或域名不匹配。
- CDN 回源返回 403、404 或循环跳转。
- 线上页面与 G2 验收版本不一致。

如果 DNS 已切换后发现故障，回退 DNS 同样属于生产变更，必须取得明确授权后执行。
