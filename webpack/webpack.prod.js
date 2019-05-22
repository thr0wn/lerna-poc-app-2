const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
  mode: 'production',
  entry: {
    index: commonPaths.indexPath,
  },
  output: {
    filename: `[name].js`,
    path: commonPaths.outputPath,
    chunkFilename: `[name].js`,
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              camelCase: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[name].css`,
    }),
    new CopyPlugin([
      { from: commonPaths.packagePath, to: commonPaths.outputPath },
    ]),
  ],
  devtool: 'source-map',
};
