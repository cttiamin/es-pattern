const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');
const path = require('path');
const fs = require('fs')

const makePlugins = (configs) => {
  let plugins = [
    // 当有1个引入$, 其它模块使用自动引入
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash'
    }),
    new VueLoaderPlugin(),
  ];
  Object.keys(configs.entry).forEach(item => {
    console.log('------', item)
    plugins.push(
      new HtmlWebpackPlugin({
        template: `build/${item}.html`,
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item]
      }),
    )
  })
  // const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
  // // console.log(files)
  // files.forEach(file => {
  //   if(/.*\.dll.js/.test(file)) {
  //     plugins.push(new AddAssetHtmlWebpackPlugin({
  //       filepath: path.resolve(__dirname, '../dll/', file)
  //     }))
  //   }
  //   //使用导出 dll 文件
  //   if(/.*\.manifest.json/.test(file)) {
  //     plugins.push(new webpack.DllReferencePlugin({
  //       manifest: path.resolve(__dirname, '../dll', file)
  //     }))
  //   }
  // })
  return plugins;
}

// const plugins = [
//   // 生成显示html，打包后运行
//   new HtmlWebpackPlugin({
//     template: 'build/index.html',
//     filename: 'main.html',
//     chunks: ['runtime', 'vendors', 'main']
//   }),
//   new HtmlWebpackPlugin({
//     template: 'build/index.html',
//     filename: 'list.html',
//     chunks: ['runtime', 'vendors', 'list']
//   }),
// ]

// module.exports = {
const configs = {
  entry: {
    index: './src/main.js',
    list: './src/list.js',
    vue: './src/vue.js'
  },
  // 类库打包 ？
  // externals: {
  //   lodash: {
  //     root: '_',
  //     commonjs: 'lodash'
  //   }
  // },
  resolve: {
    // 引入文件时，先找 .js .jsx
    extensions: ['.js', '.jsx'],
    alias: {
      // jquery$: path.resolve(__dirname, '../src/libs/jquery.min.js'),
      vue$: 'vue/dist/vue.esm.js',
      // '@': resolve('src'),
      "@src":path.resolve("src"),
      "@vue":path.resolve("src/vue"),
      // assets: resolve('src/assets'),
      // api: resolve('src/api'),
      // libs: resolve('libs'),
    }
  },
  module: {
    //不去解析jquery中的依赖库
    // noParse:/jquery/,
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
        // options: createVueLoaderOptions(true)
      },
      {
        // ?: x 可有可无
        test: /\.jsx?$/,
        // 只有 src 目录下才执行
        include: path.resolve(__dirname, '../src'),
        // 排除 node_modules 目录
        // exclude: /node_modules/,
        use: [
          {
            // 开启缓存:babel-loader?cacheDirectory
            loader: 'babel-loader',
            options: {
              // 适用于业务代码，使用语法注入 
              // "presets": [
              //   [
              //     "@babel/preset-env",
              //     {
              //       // 跟据使用情况 polyfill 自动填充, 无需 import
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
          },
          {
            // 降低打包速度
            loader: 'eslint-loader',
            options: {
              fix: true,
              // 强制先行 eslint-loader
              force: 'pre'
            },
          }
        ]
      },
      {
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
            outputPath: 'images/',
            // 大小超过 2kb
            limit: 2048
          }
        }
      },
      {
      	// Loading fonts
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
  // plugins: plugins,
  // [
  //   // 打包前运行
  //   new CleanWebpackPlugin(['dist'], {
  //   	// 声明上级目录是根跟径
  //   	root: path.resolve(__dirname, '../')
  //   }),
  //   // 生成显示html，打包后运行
  //   new HtmlWebpackPlugin({
  //     template: 'build/index.html',
  //     // title: 'Output Management'
  //   }),
  //   // 当有1个引入$, 其它模块使用自动引入
  //   new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     _: 'lodash'
  //   }),
  //   // 增加静态资源
  //   new AddAssetHtmlWebpackPlugin({
  //     filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
  //   }),
  //   // dll 引用, 查找与第3方模块映射关系, 从全局变量拿
  //   new webpack.DllReferencePlugin({
  //     manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
  //   })
  // ],
  optimization: {
    // mainfast 关系抽离出来(缓存 hash 更新)
    runtimeChunk: {
      name: 'runtime'
    },
    // tree shaking
    usedExports: true,
  	// code split 自动完成 代码分割
  	splitChunks: {
      // async:对异步生效；all:同步+异步；initial:非异步
  		chunks: 'all',
      // 大于 30kb 才分割
      minSize: 30000,
      // maxSize: 0,
      minChunks: 1,
      // 同时加载的模块数：5
      maxAsyncRequests: 5,
      // 入口文件做代码分割数
      maxInitialRequests: 3,
      // 分割符
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      // 缓存存组, 输出文件位置
      cacheGroups: {
        // 打包规则
        // 第三方模块
        vendors: {
          // chunk 名称
          name: 'vendors',
          // 分割文件名
          // filename: 'vendors.js'
          // 是否 node_modules 中引入的文件
          test: /[\\/]node_modules[\\/]/,
          // 优先级、优先抽离
          priority: -10,
          // 最少复用过几次
          minChunks: 1,
          // 大小限制
          // minSize: 0
          
        },
        // 默认通用
        default: {
          // 最少复用过几次
          minChunks: 2,
          priority: -20,
          // 复用已打包过的模块
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
  	}
  },
  // 不提示性能问题
  performance: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    // cdn加前缀
    // publicPath: 'http://cdn.com.cn',
    // 使用服务器脚本(根目录) /server.js => localhost:3000
    // publicPath: '/'
    // filename: '[name].bundle.js',
    // chunkFilename: 'js/[name].js'
  }
}

// module.exports = (env) = {
//   if (env && env.production) {
//     return merge(commonConfig, prodConfig)
//   } else {
//     return merge(commonConfig, devConfig)
//   }
// }

configs.plugins = makePlugins(configs);
// configs.plugins = plugins;

module.exports = configs

