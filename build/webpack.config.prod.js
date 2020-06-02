const webpack = require('webpack');
// js 文件 css 提出
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.common.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
// 开启多线程打包
const HappyPack = require('happypack');
// 多线程压缩代码
const ParalleUglifyPlugin = require('webpack-parallel-uglify-plugin')
// scope Hosting
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

// console.log(__dirname)
const prodConfig = {
  mode: 'production',
  // 源文件错误显示4 inline-source-map
  // prod: cheap-module-eval-source-map
  // devtool: 'cheap-module-eval-source-map',
  resolve: {
    // 针对 npm 中第三方模块优先采用 jsnext:main 中指向的 Es6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        use: ['happypack/loader?id=babel']
      },{
      test: /\.scss$/,
      use: [
        // 'style-loader',
        // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        // 抽离js 中 css，单独打包出来文件
        MiniCssExtractPlugin.loader,
        // 'vue-style-loader',
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
      	// 抽离js 中 css，单独打包出来文件
        MiniCssExtractPlugin.loader,
        // 'vue-style-loader',
        // 'style-loader',
        'css-loader',
        'postcss-loader'
       ]
    },{
      // url-loader
      // 把图片转 base64，不适合 大于
      // file-loader
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        // loader: 'file-loader',
        loader: 'url-loader',
        // 配置项
        options: {
          // 文件名输出
          name: '[name]_[hash].[ext]',
          outputPath: '/img1/',
          // 超过 3kb, 用 base64
          limit: 3 * 1024
        }
      }
    },]
  },
  optimization: {
  	// 抽离 css 文件后压缩
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    // 打包前运行
    new CleanWebpackPlugin(['dist'], {
      // 声明上级目录是根跟径
      root: path.resolve(__dirname, '../')
    }),
  	new MiniCssExtractPlugin({
      // 抽离 css文件位置
  		filename: '[name].[contentHash:8].css',
  		chunkFilename: '[name].[contentHash:8].chunk.css'
    }),
    // 忽略 /locale 目录
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),

    // happyPack 开启多进程打包
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory']
    }),
    // 开启多进程压缩 js 代码、比 webpack 压缩更快
    // new ParalleUglifyPlugin({
    //   uglifyES: {
    //     output: {
    //       // 最紧凑的输出
    //       beautify: false,
    //       // 删除所有的注释
    //       comments: false,
    //     },
    //     compress: {
    //       // 删除所有的 `console` 语句，可以兼容ie
    //       drop_console: true,
    //       // 内嵌定义了但是只用到了一次的变量
    //       collapse_vars: true,
    //       // 提取出出现多次但是没有定义成变量去引用的静态值
    //       reduce_vars: true,
    //     }
    //   }
    // })

    // 开启 Scope Hosting
    new ModuleConcatenationPlugin(),
  ],
  output: {
    // 文件缓存刷新, hash
    // contenthash: 根据文件内容生成
    filename: '[name].[contenthash].js',
    // main 代码中引入 lodash...
    chunkFilename: '[name].[contenthash].js',
  }

};
// console.log(merge(commonConfig, prodConfig))

module.exports = merge(commonConfig, prodConfig)
