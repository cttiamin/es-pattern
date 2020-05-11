// webpack 打包基础
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.common.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// console.log(__dirname)
const prodConfig = {
  // development / production
  mode: 'production',
  // 源文件错误显示4 inline-source-map
  // prod: cheap-module-eval-source-map
  // devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // 'style-loader',
        // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        MiniCssExtractPlugin.loader,
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
      	// 处理css, 单独打包出来文件
      	MiniCssExtractPlugin.loader,
        // 'style-loader',
        'css-loader',
        'postcss-loader'
       ]
    }]
  },
  optimization: {
  	// css 文件压缩
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
  	new MiniCssExtractPlugin({
  		filename: '[name].css',
  		chunkFilename: '[name].chunk.css'
  	})
  ],
  output: {
  	// 文件缓存刷新, hash
    filename: '[name].[contenthash].js',
    // main 代码中引入 lodash...
    chunkFilename: '[name].[contenthash].js',
  }

};
// console.log(merge(commonConfig, prodConfig))

module.exports = merge(commonConfig, prodConfig)
