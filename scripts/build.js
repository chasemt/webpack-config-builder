#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// 获取项目根目录
const projectRoot = path.resolve(__dirname, '..');
const libDir = path.join(projectRoot, 'lib');

// 构建开始时间
const startTime = Date.now();

console.log(chalk.cyan('🔨 Building project...\n'));
console.log(chalk.gray(`📁 Project root: ${projectRoot}`));
console.log(chalk.gray(`📦 Output directory: ${libDir}\n`));

// 递归删除目录（兼容所有 Node.js 版本）
function removeDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  fs.readdirSync(dir).forEach((file) => {
    const curPath = path.join(dir, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      removeDir(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(dir);
}

// 清理旧的构建文件
function cleanBuildDir() {
  if (fs.existsSync(libDir)) {
    console.log(chalk.yellow('🧹 Cleaning previous build...'));
    try {
      // 优先使用 fs.rmSync（Node.js 14.14.0+）
      if (fs.rmSync) {
        fs.rmSync(libDir, { recursive: true, force: true });
      } else {
        // 兼容旧版本，使用递归删除
        removeDir(libDir);
      }
      console.log(chalk.green('✅ Cleaned previous build\n'));
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Warning: Could not clean build directory: ${error.message}\n`));
    }
  }
}

// 检查 TypeScript 是否安装
function checkTypeScript() {
  const tscPath = path.join(projectRoot, 'node_modules', '.bin', 'tsc');
  if (!fs.existsSync(tscPath)) {
    console.error(chalk.red('❌ TypeScript compiler not found!'));
    console.error(chalk.yellow('\n💡 Please install TypeScript:'));
    console.error(chalk.cyan('   npm install --save-dev typescript\n'));
    process.exit(1);
  }
  return tscPath;
}

// 执行构建
function build() {
  // 清理旧的构建文件
  cleanBuildDir();

  // 检查 TypeScript 是否安装
  const tscPath = checkTypeScript();

  console.log(chalk.cyan('📝 Compiling TypeScript...\n'));

  // 使用 tsc --build 进行构建
  // --force 强制重新构建所有项目
  const tscProcess = spawn(tscPath, ['--build', '--force'], {
    stdio: 'inherit',
    shell: false,
    cwd: projectRoot,
  });

  // 处理进程退出
  tscProcess.on('close', (code) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    if (code !== 0) {
      console.error(chalk.red(`\n❌ Build failed with exit code ${code}`));
      console.error(chalk.gray(`⏱️  Duration: ${duration}s\n`));
      process.exit(code);
    }

    // 检查构建输出是否存在
    if (!fs.existsSync(libDir)) {
      console.error(chalk.red('\n❌ Build output directory not found!'));
      console.error(chalk.gray(`⏱️  Duration: ${duration}s\n`));
      process.exit(1);
    }

    // 统计构建的文件
    try {
      const files = getAllFiles(libDir);
      const jsFiles = files.filter(f => f.endsWith('.js')).length;
      const dtsFiles = files.filter(f => f.endsWith('.d.ts')).length;
      const mapFiles = files.filter(f => f.endsWith('.map')).length;

      console.log(chalk.green('\n✅ Build completed successfully!'));
      console.log(chalk.gray(`📊 Build statistics:`));
      console.log(chalk.gray(`   - JavaScript files: ${chalk.cyan(jsFiles)}`));
      console.log(chalk.gray(`   - Type definitions: ${chalk.cyan(dtsFiles)}`));
      console.log(chalk.gray(`   - Source maps: ${chalk.cyan(mapFiles)}`));
      console.log(chalk.gray(`   - Total files: ${chalk.cyan(files.length)}`));
      console.log(chalk.gray(`⏱️  Duration: ${chalk.cyan(duration)}s\n`));
    } catch (error) {
      console.log(chalk.green('\n✅ Build completed successfully!'));
      console.log(chalk.gray(`⏱️  Duration: ${duration}s\n`));
    }
  });

  // 处理错误
  tscProcess.on('error', (error) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error(chalk.red(`\n❌ Failed to start TypeScript compiler: ${error.message}`));
    console.error(chalk.yellow('\n💡 Make sure TypeScript is installed:'));
    console.error(chalk.cyan('   npm install --save-dev typescript'));
    console.error(chalk.gray(`⏱️  Duration: ${duration}s\n`));
    process.exit(1);
  });
}

// 递归获取所有文件
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.error(chalk.red(`\n❌ Uncaught exception: ${error.message}`));
  console.error(chalk.gray(`⏱️  Duration: ${duration}s\n`));
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.error(chalk.red(`\n❌ Unhandled rejection: ${reason}`));
  console.error(chalk.gray(`⏱️  Duration: ${duration}s\n`));
  process.exit(1);
});

// 开始构建
build();
