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

GitHub Pages 使用 `.github/workflows/deploy.yml` 自动构建并发布 `dist/`。
