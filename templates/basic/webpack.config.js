const { webpackCommon, webpackDev, webpackProd, webpackAnalyze } = require('webpack-config-builder');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = env && env.analyze;

  // 基础配置
  const commonConfig = webpackCommon({ production: isProduction });

  if (isAnalyze) {
    // 分析模式
    return webpackAnalyze({ production: true });
  }

  if (isProduction) {
    // 生产环境配置
    return webpackProd({ production: true });
  } else {
    // 开发环境配置
    return webpackDev({ production: false });
  }
};
