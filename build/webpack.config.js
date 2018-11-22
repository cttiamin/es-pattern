const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

// console.log(__dirname)
module.exports = {
  mode: 'production',
  entry: {
    app: './src/main.js'
  },
  // 源文件错误显示4
  devtool: 'inline-source-map',
  devServer: {
    // port: '8080',
    // host: '0.0.0.0',
    // overlay: {  // webpack 编译出现错误，则显示到网页上
    //     errors: true,
    // },
    contentBase: './dist'
    // open: true,
    // 不刷新热 --mode development 加载数据
    // hot: true,
    // proxy: proxy
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // 使用服务器脚本 /server.js => localhost:3000
    publicPath: '/'
  },
  // style-loader, css-loader
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // @babel/preset-env --save-dev
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions']
                  }
                }
              ]
            ]
          }
        }
      },
      // css
      //npm i --save-dev style-loader css-loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // file-loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
      // Loading fonts
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     'file-loader'
      //   ]
      // },
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
    new CleanWebpackPlugin(['dist']),

    // // 生成显示html
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    // HMR
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),

    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: options.devtool
    //   && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    // }),

    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ]
};
