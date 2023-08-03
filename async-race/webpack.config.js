const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(png|gif|jpg|jpeg|ico)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main-[hash:8].js',
    path: path.resolve(__dirname, 'dist/async-race/src'),
    assetModuleFilename: '../../assets/img/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      favicon: './src/assets/favicon/favicon.png',
      filename: 'index.html',
    }),
    new EslintPlugin({ extensions: 'ts' }),
    new CopyPlugin({
      patterns: [{ from: './src/assets', to: './assets' }],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
  return merge(baseConfig, envConfig);
};
