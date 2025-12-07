const { defineConfig } = require('webpack-config-builder');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return defineConfig({
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: require('path').resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devServer: {
      static: {
        directory: require('path').join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: true,
    },
  });
};

