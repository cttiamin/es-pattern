
const CleanWebpackPlugin = require('clean-webpack-plugin')

// "build": "webpack --env production --config build/webpack.common.conf.js",
// "server": "webpack-dev-server --env development --config build/webpack.common.conf.js"

// "build": "webpack --config build/webpack.prod.js",
// "dev": "webpack-dev-server --env development --open --config build/webpack.dev.js",


module.exports = {
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // new PurifyWebpack({
    //   paths: glob.sync([
    //     './*.html',
    //     './src/*.js'
    //   ])
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest'
    // }),
    // new HtmlInlinkChunkPlugin({
    //   inlineChunks: ['manifest']
    // }),
    // new webpack.optimize.UglifyJsPlugin(),
    // config.optimization.minimize
    // new CleanWebpackPlugin(['dist']),
    new CleanWebpackPlugin(['../dist'])
  ]
}

// const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const common = require('./webpack.common.js');
// const webpack = require('webpack');
// module.exports = merge(common, {
//   mode: 'production',
//   devtool: 'source-map',
//   plugins: [
//     new UglifyJSPlugin({
//       sourceMap: true
//     }),
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('production')
//     })
//   ]
// });