import merge from 'webpack-merge';
import prodConfig from './webpack.prod';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import type { Configuration } from 'webpack';

const smp = new SpeedMeasurePlugin();

const analyze = (env: Record<string, any> = {}): Configuration => {
  return smp.wrap((merge as any)(prodConfig(env), { plugins: [] } as Configuration));
};

export default analyze;
