
## webpack 构建

####  package.json 
```
"scripts": {
  构建生产环境
  "build": "webpack --config build/webpack.prod.js",

  开发环境启动
  "dev": "webpack-dev-server --env development --open --config build/webpack.dev.js",

  监控代码修改后自动编译
  "watch": "webpack --watch --config build/webpack.config.js --mode development",

  // express + webpack 启动
  "server": "node server.js"
}


# lib
javascript-state-machine 状态机模式
cheerio: node 爬虫
handlebars 模块引擎
yargs 参数管理
chai 测试库
mocha  js测试框架

```



### install
```
// 不能用 cnpm 装
# npm init -y
# npm install webpack webpack-cli --save-dev

// package.json
"scripts": {
  "config": "webpack --config build/webpack.config.js"
},
// webpack.config.js
npm run config




```

### Server
```
//  服务器 + 自动编译 + 刷新浏览器
cnpm install --save-dev webpack-dev-server

// webpack.config.js
devServer: {
  contentBase: './dist'
},

// server 中间件 构建服务
cnpm install --save-dev express webpack-dev-middleware

webpack.js
+     publicPath: '/'
+ /server.js
package.json
+ "server": "node server.js",

// 代理远程接口请求
http-proxy-middleware --save-dev
devServer.proxy

// 模块热更新
devServer.hot = true

```

### babel
```

--save-dev babel-core babel-loader babel-preset-env babel-polyfill

最新：--save-dev babel-loader@8.0.0-bate.0 @babel/core

// 预处理 => 语法 
babel-preset-env
最新：cnpm i @babel/preset-env --save-dev
babel-preset-es2015 废弃换 babel-preset-env

// 预处理 => 函数和方法 generator/Set/Map/Array.from/
cnpm i babel-polyfill --save 

// 全局垫片 为应用做准备
cnpm i babel-plugin-transform-runtime --save-dev
cnpm i babel-runtime --save

// 创建 json 文件
.babelrc 
"presets": ["es2015", "react", "stage-3"],
// 局部垫片 为开发框架/组件, 不污染全局变量

// tree-shakng 借助 babel-plugin-lodash 精简代码
// cnpm i babel-plugin-lodash --save-dev
```


### CSS
```
cnpm i css-loader style-loader  --save-dev
cnpm i postcss postcss-loader cssnano postcss-preset-env --save-dev
// less
cnpm i less less-loader --save-dev
// 额外的 css
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
```
eslint-loader
eslint-plugin-html
eslint-friendly-formatter
.eslintrc.*
package.json 中的 eslintConfig
https://standardjs.com
eslint-config

eslint eslint-loader eslint-plugin-html eslint-friendly-formatter --save-dev
cnpm i eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard --save-dev
```

# 打包结果分析
webpack --profile --json > stats.json
http://webpack.github.io/analyse/
cnpm i webpack-bundle-analyzer --save-dev

# 打包速度
UglifyJsPlugin => parallel / cache
HappyPack => 

# vue
cnpm i phantomjs-prebuilt --save-dev
base => output +
chunkFilename: '[name].js',


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


