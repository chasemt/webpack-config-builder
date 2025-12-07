# Webpack Config Builder

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

**一个强大且灵活的 Webpack 配置构建器，用于现代 Web 应用程序**

[快速开始](#快速开始) • [文档](#文档) • [示例](#示例) • [贡献](#贡献)

</div>

## 📖 简介

`webpack-config-builder` 是一个开箱即用的 Webpack 配置工具，提供了预设的配置和便捷的 API，帮助你快速搭建现代化的前端开发环境。无需从零开始配置 Webpack，即可获得生产就绪的构建配置。

## ✨ 功能特性

- 🚀 **开箱即用** - 预设了开发和生产环境的完整配置
- ⚡ **快速开发** - 支持热模块替换 (HMR) 和 React Fast Refresh
- 📦 **代码分割** - 自动优化代码分割和懒加载
- 🎨 **样式支持** - 内置支持 CSS、SCSS、Less 和 CSS Modules
- 🔧 **TypeScript** - 完整的 TypeScript 支持
- 📊 **Bundle 分析** - 内置 Bundle 分析工具
- 🛠️ **CLI 工具** - 提供命令行工具快速创建项目
- 📝 **类型安全** - 完整的 TypeScript 类型定义
- 🎯 **生产优化** - 自动代码压缩、Tree Shaking、资源优化

## 📦 安装

```bash
npm install --save-dev webpack-config-builder
```

或使用 yarn：

```bash
yarn add -D webpack-config-builder
```

或使用 pnpm：

```bash
pnpm add -D webpack-config-builder
```

## 🚀 快速开始

### 使用预设配置

最简单的使用方式是直接使用预设的配置：

```javascript
// webpack.config.js
const { webpackDev, webpackProd } = require('webpack-config-builder');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return isProduction
    ? webpackProd({ production: true })
    : webpackDev({ production: false });
};
```

### 使用 defineConfig

如果你需要自定义配置，可以使用 `defineConfig` 函数：

```javascript
// webpack.config.js
const { defineConfig } = require('webpack-config-builder');

module.exports = defineConfig({
  entry: './src/index.js',
  output: {
    path: require('path').resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // 更多配置...
});
```

### 使用 CLI 工具

使用命令行工具快速创建项目：

```bash
# 全局安装
npm install -g webpack-config-builder

# 创建新项目
wcb init my-project

# 或使用完整命令
webpack-config-builder init my-project
```

## 📚 API 文档

### 预设配置

#### `webpackCommon(env?)`

基础配置，包含通用的 loader 和插件配置。

```javascript
const { webpackCommon } = require('webpack-config-builder');

const config = webpackCommon({ production: false });
```

**参数：**
- `env.production` (boolean): 是否为生产环境

**包含：**
- Babel 转译 (支持 JS/TS/JSX/TSX)
- CSS/SCSS/Less 支持
- 图片和字体资源处理
- HTML 模板插件
- 路径别名配置

#### `webpackDev(env?)`

开发环境配置，基于 `webpackCommon` 扩展。

```javascript
const { webpackDev } = require('webpack-config-builder');

const config = webpackDev({ production: false });
```

**特性：**
- 热模块替换 (HMR)
- React Fast Refresh
- 开发服务器配置
- 快速源码映射
- 友好的错误提示

#### `webpackProd(env?)`

生产环境配置，基于 `webpackCommon` 扩展。

```javascript
const { webpackProd } = require('webpack-config-builder');

const config = webpackProd({ production: true });
```

**特性：**
- 代码压缩和优化
- CSS 提取和压缩
- 资源压缩 (Gzip)
- 代码分割优化
- 生产环境源码映射

#### `webpackAnalyze(env?)`

Bundle 分析配置，用于分析构建产物。

```javascript
const { webpackAnalyze } = require('webpack-config-builder');

const config = webpackAnalyze({ production: true });
```

**使用：**
```bash
webpack --mode production --env analyze
```

### 工具函数

#### `defineConfig(overrides?)`

创建自定义 Webpack 配置。

```javascript
const { defineConfig } = require('webpack-config-builder');

const config = defineConfig({
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'app.js',
  },
});
```

**参数：**
- `overrides` (DeepPartial<Configuration>): 配置覆盖项

#### `paths`

路径工具函数，提供常用的路径配置。

```javascript
const { paths } = require('webpack-config-builder');

console.log(paths.appSrc);      // 源代码目录
console.log(paths.appBuild);     // 构建输出目录
console.log(paths.appPublic);    // 公共资源目录
```

## 🎯 使用示例

### 基础示例

查看 [examples](./examples/) 目录获取完整示例：

- **[Basic Example](./examples/basic/)** - React + TypeScript + SCSS 完整示例
- **[Minimal Example](./examples/minimal/)** - 最小化配置示例
- **[React Example](./examples/react/)** - React + TypeScript 示例

### 扩展预设配置

使用 `webpack-merge` 扩展预设配置：

```javascript
const { webpackDev } = require('webpack-config-builder');
const { merge } = require('webpack-merge');

module.exports = merge(webpackDev(), {
  devServer: {
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  resolve: {
    alias: {
      '@components': require('path').resolve(__dirname, 'src/components'),
    },
  },
});
```

### 自定义 loader 和 plugin

```javascript
const { webpackProd } = require('webpack-config-builder');
const { merge } = require('webpack-merge');
const MyPlugin = require('my-plugin');

module.exports = merge(webpackProd(), {
  module: {
    rules: [
      {
        test: /\.custom$/,
        use: 'custom-loader',
      },
    ],
  },
  plugins: [
    new MyPlugin(),
  ],
});
```

## 🛠️ CLI 工具

### 初始化项目

```bash
wcb init [project-name] [options]
```

**选项：**
- `-t, --template <template>` - 项目模板 (basic, react, vue, minimal)
- `-f, --framework <framework>` - 框架 (react, vue, angular)
- `-ts, --typescript` - 使用 TypeScript
- `-c, --css <preprocessor>` - CSS 预处理器 (css, scss, less)
- `-y, --yes` - 使用默认选项

**示例：**
```bash
# 交互式创建项目
wcb init my-app

# 使用默认选项创建 React + TypeScript 项目
wcb init my-app -t basic -y
```

### 开发服务器

```bash
wcb dev [options]
```

**选项：**
- `-p, --port <port>` - 服务器端口 (默认: 3000)
- `-h, --host <host>` - 服务器主机 (默认: localhost)
- `-o, --open` - 自动打开浏览器

### 构建项目

```bash
wcb build [options]
```

**选项：**
- `-c, --config <path>` - webpack 配置文件路径
- `-a, --analyze` - 分析 bundle 大小
- `-p, --profile` - 分析构建性能

## 📋 配置说明

### 支持的 Loader

- **JavaScript/TypeScript**: Babel Loader
- **CSS**: CSS Loader + Style Loader
- **SCSS**: Sass Loader
- **Less**: Less Loader
- **图片**: Asset Modules
- **字体**: Asset Resource

### 默认插件

- **开发环境**:
  - HtmlWebpackPlugin
  - FriendlyErrorsWebpackPlugin
  - ReactRefreshWebpackPlugin

- **生产环境**:
  - MiniCssExtractPlugin
  - TerserPlugin
  - CssMinimizerPlugin
  - CompressionPlugin
  - CopyPlugin

### 路径别名

默认配置了以下路径别名：

- `@` → `src/` 目录

### 环境变量

可以通过 `env` 参数传递环境变量：

```javascript
const config = webpackDev({
  production: false,
  proxy: {
    '/api': 'http://localhost:3001',
  },
});
```

## 🔧 开发

### 构建项目

```bash
npm run build
```

### 开发模式

```bash
npm run dev
```

### 运行测试

```bash
npm test
```

### 代码检查

```bash
npm run lint
```

### 代码格式化

```bash
npm run format
```

## 📖 更多文档

- [项目结构说明](./PROJECT_STRUCTURE.md)
- [示例项目](./examples/)
- [变更日志](./CHANGELOG.md)

## 🤝 贡献

欢迎贡献！请阅读 [贡献指南](./docs/CONTRIBUTING.md) 了解如何参与项目。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 🙏 致谢

- [Webpack](https://webpack.js.org/) - 强大的模块打包工具
- [Babel](https://babeljs.io/) - JavaScript 编译器
- [React](https://react.dev/) - UI 库

## 📮 联系方式

- **Issues**: [GitHub Issues](https://github.com/yourusername/webpack-config-builder/issues)
- **Email**: your.email@example.com

---

<div align="center">

**如果这个项目对你有帮助，请给它一个 ⭐️**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>
