declare module 'speed-measure-webpack-plugin';
declare module '@soda/friendly-errors-webpack-plugin';
declare module 'webpack-bundle-analyzer';
declare module 'mini-css-extract-plugin';
declare module 'css-minimizer-webpack-plugin';
declare module 'compression-webpack-plugin';
declare module 'copy-webpack-plugin';
declare module 'react-refresh/babel';
declare module 'react-refresh';
declare module '@pmmmwh/react-refresh-webpack-plugin';
declare module 'webpack-merge';
declare module 'html-webpack-plugin';
// More specific shims for third-party webpack plugins used in this repo.
// These are minimal typings (constructor options + common methods) to
// provide better type information than generic `declare module`.

declare module 'speed-measure-webpack-plugin' {
  interface SMPOptions {
    disable?: boolean;
    outputFormat?: string;
    outputTarget?: string | ((report: string) => void);
  }

  class SpeedMeasurePlugin {
    constructor(options?: SMPOptions);
    wrap<T = any>(config: T): T;
  }

  export default SpeedMeasurePlugin;
}

declare module '@soda/friendly-errors-webpack-plugin' {
  interface FriendlyOptions {
    clearConsole?: boolean;
  }
  class FriendlyErrorsWebpackPlugin {
    constructor(options?: FriendlyOptions);
  }
  export default FriendlyErrorsWebpackPlugin;
}

declare module 'webpack-bundle-analyzer' {
  interface BundleAnalyzerOptions {
    analyzerMode?: string;
    reportFilename?: string;
    openAnalyzer?: boolean;
  }
  export class BundleAnalyzerPlugin {
    constructor(opts?: BundleAnalyzerOptions);
  }
}

declare module 'mini-css-extract-plugin' {
  interface MiniCssOptions {
    filename?: string;
    chunkFilename?: string;
  }
  class MiniCssExtractPlugin {
    constructor(opts?: MiniCssOptions);
    static loader: string;
  }
  export default MiniCssExtractPlugin;
}

declare module 'css-minimizer-webpack-plugin' {
  class CssMinimizerPlugin {
    constructor(opts?: any);
  }
  export default CssMinimizerPlugin;
}

declare module 'terser-webpack-plugin' {
  class TerserPlugin {
    constructor(opts?: any);
  }
  export default TerserPlugin;
}

declare module 'compression-webpack-plugin' {
  class CompressionPlugin {
    constructor(opts?: any);
  }
  export default CompressionPlugin;
}

declare module 'copy-webpack-plugin' {
  class CopyPlugin {
    constructor(opts?: any);
  }
  export default CopyPlugin;
}

declare module '@pmmmwh/react-refresh-webpack-plugin' {
  class ReactRefreshWebpackPlugin {
    constructor(opts?: any);
  }
  export default ReactRefreshWebpackPlugin;
}

declare module 'react-refresh' {
  const refresh: any;
  export default refresh;
}

declare module 'react-refresh/babel' {
  const plugin: any;
  export default plugin;
}

declare module 'html-webpack-plugin' {
  interface HtmlPluginOptions {
    template?: string;
    filename?: string;
    inject?: boolean | 'head' | 'body';
    minify?: any;
  }
  class HtmlWebpackPlugin {
    constructor(opts?: HtmlPluginOptions);
  }
  export default HtmlWebpackPlugin;
}

declare module 'webpack-merge' {
  export function merge<T = any>(...configs: any[]): T;
  const _default: typeof merge;
  export default _default;
}
