# React Example

这是一个使用 `webpack-config-builder` 的 React 示例项目，展示了如何配置 React + TypeScript 的开发环境。

## 功能特性

- ✅ React 18 with TypeScript
- ✅ 热模块替换 (HMR)
- ✅ React Fast Refresh
- ✅ 生产环境优化
- ✅ 源码映射 (Source Maps)

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
react/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── App.tsx             # 主组件
│   └── index.tsx           # 入口文件
├── webpack.config.js        # Webpack 配置
├── tsconfig.json           # TypeScript 配置
└── package.json
```

## Webpack 配置说明

这个示例展示了如何使用预设的 React 配置：

```javascript
const { webpackDev, webpackProd } = require('webpack-config-builder');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  if (isProduction) {
    return webpackProd({ production: true });
  } else {
    return webpackDev({ production: false });
  }
};
```

## 示例应用

这个示例包含一个简单的 Todo 应用，展示了：

- React Hooks (useState)
- TypeScript 类型定义
- 组件状态管理
- 事件处理

## 更多信息

查看 [webpack-config-builder 文档](../../README.md) 了解更多配置选项。

