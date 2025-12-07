# Examples

本目录包含了使用 `webpack-config-builder` 的各种示例项目，帮助你快速上手和了解不同的使用场景。

## 示例列表

### 1. [Basic Example](./basic/)

**React + TypeScript + SCSS** 完整示例

- ✅ React 18 with TypeScript
- ✅ SCSS 支持（CSS Modules）
- ✅ 热模块替换 (HMR)
- ✅ 生产环境优化
- ✅ Bundle 分析

**适用场景**：需要完整功能的 React 项目

### 2. [Minimal Example](./minimal/)

**最小化配置**，无框架依赖

- ✅ 纯 JavaScript
- ✅ CSS 支持
- ✅ Babel 转译
- ✅ 开发服务器

**适用场景**：
- 学习 webpack 基础配置
- 创建简单的静态网站
- 不需要框架的小型项目

### 3. [React Example](./react/)

**React + TypeScript** 简化示例

- ✅ React 18 with TypeScript
- ✅ 热模块替换 (HMR)
- ✅ React Fast Refresh
- ✅ 生产环境优化

**适用场景**：需要 React 但不需要样式预处理器的项目

## 快速开始

### 选择示例

选择一个示例目录，进入并安装依赖：

```bash
cd examples/basic  # 或其他示例目录
npm install
```

### 开发模式

```bash
npm run dev
```

开发服务器通常会在 `http://localhost:3000` 启动。

### 生产构建

```bash
npm run build
```

构建文件将输出到 `dist/` 目录。

## 使用本地包

所有示例都配置为使用本地的 `webpack-config-builder` 包：

```json
{
  "devDependencies": {
    "webpack-config-builder": "file:../.."
  }
}
```

这意味着你需要先构建主项目：

```bash
# 在项目根目录
npm run build
```

然后才能在示例中使用。

## 自定义示例

你可以基于这些示例创建自己的项目：

1. 复制一个示例目录
2. 修改 `package.json` 中的项目名称
3. 根据需要调整配置和代码
4. 运行 `npm install` 安装依赖

## 配置说明

### 使用预设配置

```javascript
const { webpackDev, webpackProd } = require('webpack-config-builder');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return isProduction
    ? webpackProd({ production: true })
    : webpackDev({ production: false });
};
```

### 使用 defineConfig

```javascript
const { defineConfig } = require('webpack-config-builder');

module.exports = defineConfig({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // ... 更多配置
});
```

### 扩展预设配置

```javascript
const { webpackDev } = require('webpack-config-builder');
const { merge } = require('webpack-merge');

module.exports = merge(webpackDev(), {
  devServer: {
    port: 8080,
  },
  // 你的自定义配置
});
```

## 常见问题

### Q: 如何添加新的 loader 或 plugin？

A: 使用 `webpack-merge` 扩展配置：

```javascript
const { webpackDev } = require('webpack-config-builder');
const { merge } = require('webpack-merge');
const MyPlugin = require('my-plugin');

module.exports = merge(webpackDev(), {
  plugins: [new MyPlugin()],
});
```

### Q: 如何修改输出目录？

A: 在配置中覆盖 `output.path`：

```javascript
const { webpackProd } = require('webpack-config-builder');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(webpackProd(), {
  output: {
    path: path.resolve(__dirname, 'build'),
  },
});
```

### Q: 如何添加环境变量？

A: 使用 `webpack.DefinePlugin`：

```javascript
const { webpackDev } = require('webpack-config-builder');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(webpackDev(), {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://api.example.com'),
    }),
  ],
});
```

## 更多资源

- [webpack-config-builder 主文档](../README.md)
- [Webpack 官方文档](https://webpack.js.org/)
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

## 贡献

如果你有新的示例想法或发现了问题，欢迎提交 Issue 或 Pull Request！

