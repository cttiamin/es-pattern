const webpack = require('webpack');
const proxy = require('./proxy')
const historyFallback = require('./historyfallback')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 7000,
    host: '0.0.0.0',
    // 开启 html 显示语法报错
    overlay: {
      errors: true // webpack 编译出现错误，则显示到网页上
    },
    contentBase: '../dist',
    // open: true,
    hot: true,
    // hotOnly: true, // 不通过全局更新触发
    proxy: proxy, // 代理接口
    // 单页面开发应用，页面不跳转
    // historyApiFallback: true
    historyApiFallback: historyFallback
  },
  plugins: [
    
    // HMR 查看相对路径输出
    new webpack.NamedModulesPlugin(),
    // 模块热更新
    new webpack.HotModuleReplacementPlugin()
  ]
};

// module.exports = merge(common, {});
// const merge = require('webpack-merge');
// const common = require('./webpack.common.js');
