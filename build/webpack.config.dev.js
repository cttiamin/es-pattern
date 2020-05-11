// webpack 打包基础
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.common.js')
const proxy = require('./proxy')
const HtmlWebpackPlugin = require('html-webpack-plugin');

// console.log(__dirname)
const devConfig = {
  // development / production
  mode: 'development',
  // 源文件错误显示4 inline-source-map
  // prod: cheap-module-eval-source-map
  devtool: 'inline-source-map',
  devServer: {
    // 显示 eslint 错误
    overlay: true,
    port: '8080',
    // host: '0.0.0.0',
    // overlay: {  // webpack 编译出现错误，则显示到网页上
    //     errors: true,
    // },
    contentBase: '../dist',
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
  plugins: [
    // new webpack.NamedModulesPlugin(),
    // HMR 热模块更新
    new webpack.HotModuleReplacementPlugin(),

    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: options.devtool
    //   && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    // }),
    // new HtmlWebpackPlugin({
    //   title: '爱读首页',
    //   // chunks: ['app'],
    //   // filename: 'index.html',
    //   template: 'build/index.html',
    //   inject: 'body'
    // }),

    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ],
  output: {
    filename: '[name].js',
    // main 代码中引入 lodash...
    chunkFilename: '[name].js',
  }
};

module.exports = merge(commonConfig, devConfig)
