#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// 获取项目根目录
const projectRoot = path.resolve(__dirname, '..');

console.log(chalk.cyan('🔍 Starting TypeScript compiler in watch mode...\n'));
console.log(chalk.gray(`📁 Project root: ${projectRoot}\n`));

// 使用本地安装的 TypeScript 编译器
// 优先使用 node_modules/.bin/tsc，如果不存在则使用 npx
const tscPath = path.join(projectRoot, 'node_modules', '.bin', 'tsc');
const useLocalTsc = fs.existsSync(tscPath);
const tscCommand = useLocalTsc ? tscPath : 'npx';
const tscArgs = useLocalTsc
  ? ['--build', '--watch', '--preserveWatchOutput']
  : ['tsc', '--build', '--watch', '--preserveWatchOutput'];

// 使用 tsc --build --watch 来监听文件变化并自动编译
// --watch 模式会持续监听文件变化并自动重新编译
// --preserveWatchOutput 保持输出格式，不会清除之前的输出
const tscProcess = spawn(tscCommand, tscArgs, {
  stdio: 'inherit',
  shell: !useLocalTsc, // 使用 npx 时需要 shell
  cwd: projectRoot,
});

// 处理进程退出
tscProcess.on('close', (code) => {
  if (code !== 0 && code !== null) {
    console.error(chalk.red(`\n❌ TypeScript compiler exited with code ${code}`));
    process.exit(code);
  } else {
    console.log(chalk.green('\n✅ Watch mode stopped'));
  }
});

// 处理错误
tscProcess.on('error', (error) => {
  console.error(chalk.red(`\n❌ Failed to start TypeScript compiler: ${error.message}`));
  console.error(chalk.yellow('\n💡 Make sure TypeScript is installed: npm install --save-dev typescript'));
  process.exit(1);
});

// 优雅退出处理
const cleanup = () => {
  console.log(chalk.yellow('\n\n⏹️  Stopping watch mode...'));
  if (tscProcess && !tscProcess.killed) {
    tscProcess.kill('SIGINT');
  }
  // 给进程一点时间优雅退出
  setTimeout(() => {
    process.exit(0);
  }, 500);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error(chalk.red(`\n❌ Uncaught exception: ${error.message}`));
  cleanup();
});

process.on('unhandledRejection', (reason) => {
  console.error(chalk.red(`\n❌ Unhandled rejection: ${reason}`));
  cleanup();
});

