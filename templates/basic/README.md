# {{projectName}}

这是一个使用 `webpack-config-builder` 创建的项目。

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动。

### 生产构建

```bash
npm run build
```

构建文件将输出到 `dist/` 目录。

### 分析构建产物

```bash
npm run build:analyze
```

这将生成一个 bundle 分析报告。

## 项目结构

```
{{projectName}}/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── styles/
│   │   ├── index.scss      # 全局样式
│   │   └── App.scss       # 组件样式
│   ├── App.tsx             # 主组件
│   └── index.tsx           # 入口文件
├── webpack.config.js        # Webpack 配置
├── tsconfig.json           # TypeScript 配置
└── package.json
```

## 功能特性

- ✅ React 18 with TypeScript
- ✅ SCSS 支持（CSS Modules）
- ✅ 热模块替换 (HMR)
- ✅ 生产环境优化
- ✅ 源码映射 (Source Maps)
- ✅ 代码分割和懒加载

## 更多信息

查看 [webpack-config-builder 文档](https://github.com/yourusername/webpack-config-builder) 了解更多配置选项。
