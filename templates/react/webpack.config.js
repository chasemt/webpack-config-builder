const { webpackCommon, webpackDev, webpackProd } = require('webpack-config-builder');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  if (isProduction) {
    return webpackProd({ production: true });
  } else {
    return webpackDev({ production: false });
  }
};
