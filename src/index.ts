// /Users/chasemt/chase/webpack-config-builder/src/index.ts

import { merge } from 'webpack-merge';
import type { Configuration } from 'webpack';

type Primitive = string | number | boolean | null | undefined | symbol | bigint;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Primitive
    ? T[P]
    : T[P] extends Array<infer U>
      ? Array<U> | DeepPartial<T[P]>
      : DeepPartial<T[P]>;
};

/**
 * 一个简单的 webpack 配置类型（根据需要扩展）
 */
export type WebpackConfig = Configuration;

const defaultConfig: Configuration = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: 'dist',
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {},
  },
  module: {
    rules: [],
  },
  plugins: [],
};

/**
 * 定义配置函数：返回合并后的默认配置，支持传入覆盖项
 *
 * 使用示例：
 * const config = definCongfig({ mode: 'production', output: { filename: 'app.js' } });
 */
export function definCongfig(overrides?: DeepPartial<Configuration>): Configuration {
  // 使用 webpack-merge 的 merge 来合并配置
  // 把 overrides 当作部分配置传入，merge 会返回一个完整的 Configuration
  if (!overrides) return defaultConfig;
  return merge(defaultConfig, overrides as Configuration);
}
