const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = (env = {}) => {
  return smp.wrap(merge(prodConfig(env), {
    plugins: [],
  }));
};