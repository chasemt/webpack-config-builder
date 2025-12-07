const { webpackCommon, webpackDev, webpackProd } = require('webpack-config-builder');
const { VueLoaderPlugin } = require('vue-loader');
const { merge } = require('webpack-merge');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const baseConfig = webpackCommon({ production: isProduction });

  // 添加 Vue 特定的配置
  const vueConfig = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
    ],
    resolve: {
      alias: {
        vue: '@vue/runtime-dom',
      },
    },
  };

  const mergedConfig = merge(baseConfig, vueConfig);

  if (isProduction) {
    return merge(mergedConfig, webpackProd({ production: true }));
  } else {
    return merge(mergedConfig, webpackDev({ production: false }));
  }
};

