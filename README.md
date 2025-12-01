my-package/
├── .github/                    # GitHub 相关配置
│   ├── workflows/             # GitHub Actions 工作流
│   │   └── ci.yml            # CI/CD 配置
│   └── PULL_REQUEST_TEMPLATE.md # PR 模板
│
├── .vscode/                   # VSCode 配置
│   └── settings.json         # 编辑器设置
│
├── src/                      # 源代码目录
│   ├── index.ts             # 主入口文件
│   ├── core/                # 核心逻辑
│   │   ├── feature-a.ts
│   │   └── feature-b.ts
│   ├── utils/               # 工具函数
│   │   └── helpers.ts
│   └── types/               # 类型定义
│       └── index.ts
│
├── dist/                     # 构建输出目录（通常 .gitignore）
│   ├── index.js             # CommonJS 输出
│   ├── index.esm.js         # ES Module 输出
│   └── index.d.ts           # 类型声明文件
│
├── tests/                    # 测试文件
│   ├── unit/                # 单元测试
│   │   ├── feature-a.test.ts
│   │   └── feature-b.test.ts
│   └── integration/         # 集成测试
│       └── app.test.ts
│
├── examples/                 # 使用示例
│   ├── basic-usage.js
│   └── advanced-usage.js
│
├── docs/                     # 文档
│   ├── getting-started.md
│   ├── api-reference.md
│   └── CONTRIBUTING.md
│
├── scripts/                  # 构建脚本
│   ├── build.js             # 构建脚本
│   └── release.js           # 发布脚本
│
├── .gitignore               # Git 忽略文件
├── .npmignore              # NPM 发布忽略文件
├── .eslintrc.js            # ESLint 配置
├── .prettierrc             # Prettier 配置
├── .editorconfig           # 编辑器统一配置
├── .npmrc                  # NPM 配置
│
├── package.json            # 项目配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.build.json    # 生产构建配置
├── README.md              # 项目说明
├── CHANGELOG.md           # 变更日志
├── LICENSE                # 开源许可证
└── .gitattributes         # Git 属性配置