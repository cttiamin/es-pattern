## webpack 构建



# 打包速度
```bash 
 # 它能监控 webpack 每一步操作的耗时
speed-measure-webpack-plugin 

# 打包结果分析
webpack --profile --json > stats.json

http://webpack.github.io/analyse/
cnpm i webpack-bundle-analyzer --save-dev

```



#### Command:
```bash
Webpack hello.js hello.bundle.js
Webpack hello.js hello.bundle.js --module-binds 'css=style-loader!css-loader'
--watch 自动打包
--progress 显示进度
--display-modules 
--display-reasons 显示引用原因
--config webpack.dev.config.js  指定配置文件
```

``` json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --env production --config build/webpack.common.conf.js",
    "server": "webpack-dev-server --env development --config build/webpack.common.conf.js",
    "watch": "webpack --watch --config build/webpack.config.js --mode development",
    "open": "webpack-dev-server --config webpack.config.js"
}
```

### Server
```bash 
# 服务器 + 自动编译 + 刷新浏览器
cnpm i --save-dev webpack-dev-server

# webpack.config.js
devServer: {
  contentBase: './dist'
},

# server 中间件 构建服务
cnpm install --save-dev 
express # koa
webpack-dev-middleware  # 可选
connect-history-api-fallback  # 可选, 地址rewrite
opn     # 可选, 打开浏览器

webpack.js
+     publicPath: '/'
+ /server.js
package.json
+ "server": "node server.js",

# 代理远程接口请求
http-proxy-middleware --save-dev
devServer.proxy

# 模块热更新
devServer.hot = true
```



### babel
```bash
--save-dev babel-core babel-loader babel-preset-env babel-polyfill
# 最新：--save-dev babel-loader@8.0.0-bate.0 @babel/core
# 预处理 => 语法 
babel-preset-env
# 最新：cnpm i @babel/preset-env --save-dev
babel-preset-es2015 废弃换 babel-preset-env
# 预处理 => 函数和方法 generator/Set/Map/Array.from/
babel-polyfill

# 全局垫片 为应用做准备
cnpm i babel-plugin-transform-runtime --save-dev
cnpm i babel-runtime --save

# 创建 json 文件
.babelrc 
"presets": ["es2015", "react", "stage-3"]
"presets": ["env"]
# 局部垫片 为开发框架/组件, 不污染全局变量

# tree-shakng 借助 babel-plugin-lodash 精简代码
cnpm i babel-plugin-lodash --save-dev
```


### CSS
```bash
cnpm i css-loader style-loader  --save-dev
cnpm i postcss postcss-loader cssnano 
postcss-cssnext 废弃换：postcss-preset-env --save-dev
# less
cnpm i less less-loader --save-dev
# 额外的 css
mini-css-extract-plugin --save-dev

```

#### plugin 
```
cnpm install --save-dev html-webpack-plugin clean-webpack-plugin
webpack-merge
webpack-dev-middleware
webpack-hot-middleware

```

### File
```
cnpm i ExtractTextWebpackPlugin webpack   --save-dev
// 外部js/css 引入， 合并雪碧图
cnpm i file-loader url-loader img-loader postcss-loader postcss-sprites --save-dev
// 外部js 引入
cnpm i imports-loader --save-dev
// html 引入图片
html-loader --save-dev
// webpack js 代码载入到 html 页面中
html-webpack-inline-chunk-plugin --save-dev
```


### source-map: 
```
devtool: 'eval',
devtool: 'source-map',
```



### eslint 
```bash

eslint eslint-loader eslint-plugin-html eslint-friendly-formatter --save-dev
# .eslintrc.*
# package.json 中的 eslintConfig
# https://standardjs.com

# eslint-config
cnpm i eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard --save-dev
```


# vue
```bash
cnpm i phantomjs-prebuilt --save-dev
base => output + chunkFilename: '[name].js',

cnpm i --save vue vue-router 
cnpm i --save-dev vue-loader vue-style-loader vue-template-compiler
# webpack4+ ：
const VueLoaderPlugin = require('vue-loader/lib/plugin')
```


### 模块化
```
Command.js => webpack
AMD => require.js 
DMD => sea.js
ES Module => es6
```

### 核心概念
```
input
output
loader
plugin
```

## webpack 面试问题
1. Webpack 是什么, grunt 和 gulp 有什么不同？
Webpack 是一个模块打包器，他可以递归的打包项目中的所有模块，最终生成几个打包后的文件，他和其他的工具最大的不同在于他支持 code-splitting, 模块化 (AMD, ESM, CommonJs), 全局分析

2. Bundle 是由 webpack 打包出来的文件，chunk 是指 webpack 在进行模块的依赖分析的时候，代码分割出来的代码块， module 是开发中的单个模块

3. 什么是 loader？ 什么是 Plugin?
Loaders 是用来告诉 webpack 如何转化处理某一类型的文件，并且引入到打包出的文件中
Plugin 是用来自定义webpack 打包过程的方式， 一个插件是含有applay 方法的一个对象， 通过个这方法可以参与到整 webpack 打包的各个流程(生命周期)

1. Webpack-dev-server 和 http 服务器如 nginx 有什么区别？
Webpack-dev-server 使用内存来存储 webpack 开发环境下的打包文件， 并且可以使用模块热更新，他比传统的 http 服务对开发更简单高效

1. 什么是长缓存？ 在webpack 中如何做到长缓存优化？
浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称，在 webpack 中可以在output给输出的文件 指定 chunkhash, 并眀分离经常更新的代码和框架代码。通过 NameModulesPlugin 或是 HashedModuleIdsPlugin 使再次打包文件名不变

2. 什么是tree-shaking ? Css 可以 Tree-shaking 码？
Tree-shaking 是指在打包中去除那些引入了，但是在代码中没有被用到的那些死代码，在 webpack 中 Tree-shaking 是通过 uglifyJSPlugin 来 Tree-shaking Js. Css 需要使用 Purify-CSS


