# Basic Example

这是一个使用 `webpack-config-builder` 的基础示例项目，展示了如何配置 React + TypeScript + SCSS 的开发环境。

## 功能特性

- ✅ React 18 with TypeScript
- ✅ SCSS 支持（CSS Modules）
- ✅ 热模块替换 (HMR)
- ✅ 生产环境优化
- ✅ 源码映射 (Source Maps)
- ✅ 代码分割和懒加载

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

### 4. 分析构建产物

```bash
npm run build:analyze
```

这将生成一个 bundle 分析报告。

## 项目结构

```
basic/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── styles/
│   │   ├── index.scss      # 全局样式
│   │   └── App.scss        # 组件样式
│   ├── App.tsx             # 主组件
│   └── index.tsx           # 入口文件
├── webpack.config.js        # Webpack 配置
├── tsconfig.json           # TypeScript 配置
└── package.json
```

## Webpack 配置说明

这个示例展示了如何使用 `webpack-config-builder` 提供的预设配置：

```javascript
const { webpackCommon, webpackDev, webpackProd, webpackAnalyze } = require('webpack-config-builder');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = env && env.analyze;

  if (isAnalyze) {
    return webpackAnalyze({ production: true });
  }

  if (isProduction) {
    return webpackProd({ production: true });
  } else {
    return webpackDev({ production: false });
  }
};
```

## 自定义配置

如果需要自定义配置，可以基于预设配置进行扩展：

```javascript
const { webpackDev } = require('webpack-config-builder');
const { merge } = require('webpack-merge');

module.exports = merge(webpackDev(), {
  // 你的自定义配置
  devServer: {
    port: 8080,
  },
});
```

## 更多信息

查看 [webpack-config-builder 文档](../../README.md) 了解更多配置选项。

