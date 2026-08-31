# 思远 AI Lab

思远 AI Lab 独立站源码。

这是一个 Astro 静态站，用来承载文章、知识库、实验室、个人操作系统与 Skill 展厅。

## 快速开始

```sh
npm install
npm run dev
```

本地开发地址默认是：

```text
http://localhost:4321
```

构建验证：

```sh
npm run build
```

预览构建结果：

```sh
npm run preview
```

## 主要目录

```text
.
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 部署

正式站目标为阿里云 OSS + CDN，采用本地人工发布，避免把阿里云长期密钥托管到 GitHub。

- 上线操作单：[`ops/deploy-aliyun-oss.md`](ops/deploy-aliyun-oss.md)
- `.github/workflows/deploy.yml` 只保留手动构建检查，不再发布 GitHub Pages。
- OSS 上传、CDN 刷新与 DNS 变更属于生产操作，必须在单次明确授权后执行。
