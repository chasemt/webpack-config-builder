#!/usr/bin/env node

import { program } from 'commander';
import figlet from 'figlet';
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

// 显示欢迎信息
console.log(chalk.cyan(figlet.textSync('WCB', { horizontalLayout: 'full' })));
console.log(chalk.gray('Webpack Config Builder v1.0.0\n'));

program.name('wcb').description('A powerful webpack configuration builder').version('1.0.0');

// init 命令
program
  .command('init [project-name]')
  .description('Initialize a new project')
  .option('-t, --template <template>', 'project template (basic, react, vue, minimal)')
  .option('-f, --framework <framework>', 'framework (react, vue, angular)')
  .option('-ts, --typescript', 'use TypeScript')
  .option('-c, --css <preprocessor>', 'CSS preprocessor (css, scss, less)')
  .option('-y, --yes', 'use default options')
  .action(async (projectName: string, options: any) => {
    const spinner = ora('Initializing project...').start();

    try {
      // 交互式询问
      const answers = options.yes
        ? {}
        : await inquirer.prompt([
            {
              type: 'input',
              name: 'projectName',
              message: 'Project name:',
              default: projectName || 'my-app',
              validate: (input: string) => input.trim() !== '',
            },
            {
              type: 'list',
              name: 'template',
              message: 'Choose template:',
              choices: [
                { name: 'Basic (React + TypeScript + SCSS)', value: 'basic' },
                { name: 'React only', value: 'react' },
                { name: 'Vue.js', value: 'vue' },
                { name: 'Minimal (no framework)', value: 'minimal' },
              ],
              default: options.template || 'basic',
            },
            {
              type: 'confirm',
              name: 'typescript',
              message: 'Use TypeScript?',
              default: options.typescript !== undefined ? options.typescript : true,
            },
            {
              type: 'list',
              name: 'cssPreprocessor',
              message: 'CSS preprocessor:',
              choices: ['css', 'scss', 'less'],
              default: options.css || 'scss',
            },
            {
              type: 'confirm',
              name: 'installDeps',
              message: 'Install dependencies?',
              default: true,
            },
          ]);

      const finalProjectName = (answers as any).projectName || projectName || 'my-app';
      const projectPath = path.resolve(process.cwd(), finalProjectName);

      // 检查目录是否存在
      if (fs.existsSync(projectPath)) {
        spinner.fail(`Directory ${finalProjectName} already exists!`);
        process.exit(1);
      }

      // 创建项目目录
      fs.mkdirSync(projectPath, { recursive: true });

      // 复制模板
      const templateName = options.template || (answers as any).template || 'basic';
      await copyTemplate(templateName, projectPath, {
        projectName: finalProjectName,
        typescript: (answers as any).typescript,
        cssPreprocessor: (answers as any).cssPreprocessor,
      });

      // 生成package.json
      const packageJson = generatePackageJson(finalProjectName, {
        template: templateName,
        typescript: (answers as any).typescript,
        cssPreprocessor: (answers as any).cssPreprocessor,
      });

      fs.writeFileSync(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2),
      );

      spinner.succeed(`Project ${chalk.green(finalProjectName)} created successfully!`);

      // 安装依赖
      if ((answers as any).installDeps) {
        spinner.start('Installing dependencies...');
        await installDependencies(projectPath);
        spinner.succeed('Dependencies installed successfully!');
      }

      // 显示下一步提示
      console.log('\nNext steps:');
      console.log(chalk.cyan(`  cd ${finalProjectName}`));
      if (!(answers as any).installDeps) {
        console.log(chalk.cyan('  npm install'));
      }
      console.log(chalk.cyan('  npm run dev\n'));

      console.log('Happy coding! 🎉');
    } catch (error: any) {
      spinner.fail(`Failed to initialize project: ${error.message}`);
      process.exit(1);
    }
  });

// build 命令
program
  .command('build')
  .description('Build project for production')
  .option('-c, --config <path>', 'webpack config path')
  .option('-a, --analyze', 'analyze bundle size')
  .option('-p, --profile', 'profile build performance')
  .action((options: any) => {
    const spinner = ora('Building project...').start();

    const args = ['webpack', '--mode=production'];

    if (options.config) {
      args.push('--config', options.config);
    }

    if (options.analyze) {
      args.push('--env', 'analyze');
    }

    if (options.profile) {
      args.push('--profile');
    }

    const child = spawn('npx', args, { stdio: 'inherit' });

    child.on('close', (code) => {
      if (code === 0) {
        spinner.succeed('Build completed successfully!');
      } else {
        spinner.fail('Build failed!');
        process.exit(code || 1);
      }
    });
  });

// dev 命令
program
  .command('dev')
  .description('Start development server')
  .option('-p, --port <port>', 'server port', '3000')
  .option('-h, --host <host>', 'server host', 'localhost')
  .option('-o, --open', 'open browser automatically')
  .action((options: any) => {
    const spinner = ora('Starting development server...').start();

    const args = ['webpack', 'serve', '--mode=development'];

    if (options.port) {
      args.push('--port', options.port);
    }

    if (options.host) {
      args.push('--host', options.host);
    }

    if (options.open) {
      args.push('--open');
    }

    const child = spawn('npx', args, { stdio: 'inherit' });

    child.on('spawn', () => {
      spinner.succeed('Development server started!');
    });

    child.on('error', (err) => {
      spinner.fail(`Failed to start server: ${err.message}`);
    });
  });

// config 命令
program
  .command('config')
  .description('Generate webpack configuration')
  .option('-o, --output <path>', 'output path', 'webpack.config.js')
  .option('-p, --preset <preset>', 'config preset (react, vue, library)')
  .action((options: any) => {
    // TODO: 实现WebpackConfigBuilder类
    console.log(chalk.yellow('Config command is not yet implemented'));
    console.log(chalk.green(`Would generate configuration at ${options.output}`));
  });

// 工具函数
async function copyTemplate(
  templateName: string,
  targetPath: string,
  options: { projectName?: string; typescript?: boolean; cssPreprocessor?: string },
): Promise<void> {
  // 在运行时，__dirname指向编译后的lib/bin目录
  // 需要向上两级到达项目根目录，然后进入templates
  const templatePath = path.join(__dirname, '../../../templates', templateName);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template ${templateName} not found`);
  }

  // 递归复制文件
  function copyDir(src: string, dest: string): void {
    fs.mkdirSync(dest, { recursive: true });

    for (const item of fs.readdirSync(src)) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);

      if (fs.statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        // 处理模板变量
        if (path.extname(item) === '.tmpl') {
          let content = fs.readFileSync(srcPath, 'utf-8');
          const finalDest = destPath.replace('.tmpl', '');

          // 替换变量
          content = content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return (options as any)[key] || match;
          });

          fs.writeFileSync(finalDest, content);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  }

  copyDir(templatePath, targetPath);
}

function generatePackageJson(
  projectName: string,
  options: { template?: string; typescript?: boolean; cssPreprocessor?: string },
): any {
  const dependencies: Record<string, string> = {
    react: '^18.2.0',
    'react-dom': '^18.2.0',
    'webpack-config-builder': '^1.0.0',
  };

  const devDependencies: Record<string, string> = {
    '@types/react': '^18.2.37',
    '@types/react-dom': '^18.2.15',
    typescript: '^5.3.2',
  };

  // 根据选项调整依赖
  if (options.cssPreprocessor === 'scss') {
    devDependencies['sass'] = '^1.69.5';
  } else if (options.cssPreprocessor === 'less') {
    devDependencies['less'] = '^4.2.0';
  }

  return {
    name: projectName,
    version: '1.0.0',
    description: `A project built with webpack-config-builder`,
    private: true,
    scripts: {
      dev: 'wcb dev',
      build: 'wcb build',
      'build:analyze': 'wcb build --analyze',
      lint: 'eslint src --ext .js,.jsx,.ts,.tsx',
      format: 'prettier --write "src/**/*.{js,jsx,ts,tsx,css,scss,less}"',
    },
    dependencies: dependencies,
    devDependencies: devDependencies,
    browserslist: {
      production: ['>0.2%', 'not dead', 'not op_mini all'],
      development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
    },
  };
}

function installDependencies(projectPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['install'], {
      cwd: projectPath,
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`npm install failed with code ${code}`));
      }
    });
  });
}

// 解析命令
program.parse();

