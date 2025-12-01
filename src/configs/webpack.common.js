const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const paths = require('../utils/paths');

module.exports = (env = {}) => {
  const isProduction = env.production;
  
  return {
    entry: {
      app: paths.appIndexJs,
    },
    
    output: {
      path: paths.appBuild,
      filename: isProduction 
        ? 'js/[name].[contenthash:8].js'
        : 'js/[name].bundle.js',
      chunkFilename: isProduction
        ? 'js/[name].[contenthash:8].chunk.js'
        : 'js/[name].chunk.js',
      publicPath: '/',
      clean: true,
    },
    
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@': paths.appSrc,
        'react-dom': '@hot-loader/react-dom',
      },
      modules: [paths.appNodeModules, 'node_modules'],
    },
    
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: paths.appSrc,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                presets: [
                  ['@babel/preset-env', { 
                    useBuiltIns: 'usage', 
                    corejs: 3 
                  }],
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [
                  '@babel/plugin-transform-runtime',
                  '@babel/plugin-syntax-dynamic-import',
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-optional-chaining',
                  !isProduction && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        
        {
          test: /\.css$/,
          use: [
            isProduction 
              ? require('mini-css-extract-plugin').loader
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[hash:base64:8]'
                    : '[path][name]__[local]',
                },
              },
            },
            'postcss-loader',
          ],
        },
        
        {
          test: /\.scss$/,
          use: [
            isProduction 
              ? require('mini-css-extract-plugin').loader
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  auto: /\.module\.scss$/,
                  localIdentName: isProduction
                    ? '[hash:base64:8]'
                    : '[path][name]__[local]',
                },
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        
        {
          test: /\.less$/,
          use: [
            isProduction 
              ? require('mini-css-extract-plugin').loader
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  auto: /\.module\.less$/,
                  localIdentName: isProduction
                    ? '[hash:base64:8]'
                    : '[path][name]__[local]',
                },
              },
            },
            'postcss-loader',
            'less-loader',
          ],
        },
        
        {
          test: /\.(png|jpe?g|gif|webp|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 10KB
            },
          },
          generator: {
            filename: 'images/[name].[hash:8][ext]',
          },
        },
        
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash:8][ext]',
          },
        },
        
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
          type: 'asset/resource',
          generator: {
            filename: 'media/[name].[hash:8][ext]',
          },
        },
      ],
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.appHtml || path.join(__dirname, '../../templates/index.html'),
        filename: 'index.html',
        inject: 'body',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : undefined,
      }),
      
      new FriendlyErrorsWebpackPlugin(),
    ],
    
    cache: {
      type: 'filesystem',
      cacheDirectory: paths.appCache,
      buildDependencies: {
        config: [__filename],
      },
    },
    
    stats: 'errors-only',
  };
};