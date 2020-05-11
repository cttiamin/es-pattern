// webpack 打包基础
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

// console.log(__dirname)
module.exports = {
  // development / production
  mode: 'development',
  entry: {
    app: './src/main.js',
    // main2: './src/main2.js'
  },
  // 源文件错误显示4 inline-source-map
  // prod: cheap-module-eval-source-map
  devtool: 'cheap-module-source-map',
  devServer: {
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
    hotOnly: true,
    // proxy: proxy
  },
  output: {
    // cdn加前缀
    // publicPath: 'http://cdn.com.cn',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // 使用服务器脚本(根目录) /server.js => localhost:3000
    // publicPath: '/'
  },
  // style-loader, css-loader
  module: {
    rules: [
      {
        test: /\.js$/,
        // 排除 node_modules 目录
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            // 适用于业务代码，使用语法注入 
            // "presets": [
            //   [
            //     "@babel/preset-env",
            //     {
            //       // 跟据使用情况 polyfill 自动填充
            //       "useBuiltIns": "usage",
            //       "targets":
            //       {
            //         "chrome": "67",
            //       }
            //     }
            //   ]
            // ]
            // 适用于库项目
            // 使用 transform 填充后，不使用 useBuiltIns 配置
            // plugins: [
            //   "@babel/plugin-transform-runtime",
            //   {
            //     absoluteRuntime: false,
            //     corejs: 2,
            //     helpers: true,
            //     regenerator: true,
            //     useESModules: false
            //   }
            // ],
          }
        }
      },
      // css
      //npm i --save-dev style-loader css-loader
      {
        test: /\.(css|scss)$/,
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
      // url-loader
      // 把图片转 base64，不适合 大于
      // file-loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          // 配置项
          options: {
            // 文件名输出
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            // 大小超过 2kb
            limit: 2048
          }
        }
      },
      // Loading fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // loading xml
      // {
      //   test: /\.(csv|tsv)$/,
      //   use:[
      //     'csv-loader'
      //   ]
      // },
      // {
      //   test: /\.xml$/,
      //   use: [
      //     'xml-loader'
      //   ]
      // }
    ] // end rules[]
  }, //end module{}
  plugins: [
    // 打包前运行
    new CleanWebpackPlugin(['../dist']),

    // 生成显示html，打包后运行
    new HtmlWebpackPlugin({
      template: 'build/index.html',
      // title: 'Output Management'
    }),
    // HMR
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),

    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: options.devtool
    //   && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    // }),

    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ],
  optimization: {
    // 开发环境使用 tree shaking
    usedExports: true
  }
};
