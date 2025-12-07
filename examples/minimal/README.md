# Minimal Example

这是一个最小化的示例项目，展示了如何使用 `webpack-config-builder` 的 `defineConfig` 函数创建基础的 webpack 配置，不依赖任何框架。

## 功能特性

- ✅ 纯 JavaScript（无框架）
- ✅ CSS 支持
- ✅ Babel 转译
- ✅ 开发服务器
- ✅ 热模块替换 (HMR)
- ✅ 生产环境优化

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

```bash
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动。

### 3. 生产构建

```bash
npm run build
```

构建文件将输出到 `dist/` 目录。

## 项目结构

```
minimal/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── styles.css          # 样式文件
│   └── index.js            # 入口文件
├── webpack.config.js        # Webpack 配置
└── package.json
```

## Webpack 配置说明

这个示例展示了如何使用 `defineConfig` 函数创建自定义配置：

```javascript
const { defineConfig } = require('webpack-config-builder');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return defineConfig({
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: require('path').resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      clean: true,
    },
    // ... 更多配置
  });
};
```

## 适用场景

这个最小化示例适合：

- 学习 webpack 基础配置
- 创建简单的静态网站
- 不需要框架的小型项目
- 作为其他项目的起点

## 更多信息

查看 [webpack-config-builder 文档](../../README.md) 了解更多配置选项。

