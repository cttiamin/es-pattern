// webpack 打包基础
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.common.js')
const proxy = require('./proxy')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const fs = require('fs')
const path = require('path');

const makePlugins = () => {
  let plugins = [
    // new webpack.NamedModulesPlugin(),
    // HMR 热模块更新
    new webpack.HotModuleReplacementPlugin(),
  ];
  const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
  files.forEach(file => {
    if(/.*\.dll.js/.test(file)) {
      plugins.push(new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll/', file)
      }))
    }
    //使用导出 dll 文件
    if(/.*\.manifest.json/.test(file)) {
      plugins.push(new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll', file)
      }))
    }
  })
  return plugins;
}

// console.log(__dirname)
const devConfig = {
  mode: 'development',
  // 源文件错误显示4 inline-source-map
  // prod: cheap-module-eval-source-map
  devtool: 'source-map',
  devServer: {
    // 显示 eslint 错误
    overlay: true,
    port: '8080',
    // host: '0.0.0.0',
    // overlay: {  // webpack 编译出现错误，则显示到网页上
    //     errors: true,
    // },
    contentBase: '../dist',
    // publicPath: '../',
    open: true,
    // 不刷新热 --mode development 加载数据
    hot: true,
    // 不触发 全局更新 (可不配)
    // hotOnly: true,
    proxy: proxy, // 代理接口
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 通过 sass import 引入，也要走下边的 loader
              importLoaders: 2,
              // 开启模块化打包
              // modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
         ]
        // 
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
         ]
      }
    ]
  },
  plugins: makePlugins(),
  output: {
    filename: '[name].js',
    // main 代码中引入 lodash...
    chunkFilename: '[name].js',
  }
};

module.exports = merge(commonConfig, devConfig)
