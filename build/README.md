## webpack 构建

```bash
#不全局安装webpack， 影响其它项目安装的不同版本
npm uninstall webpack webpack-cli -g
npm i webpack webpack-cli -D
#项目根目录下: 
npx webpack -v
#查看所有版本号
npm info webpack

```

old package.json
```json
"imports-loader": "^0.8.0",

"img-loader": "^3.0.1",
"istanbul": "^0.4.5",
"postcss": "^7.0.5",
"postcss-sprites": "^4.2.1",
"postcss-preset-env": "^6.1.9",
"jest": "^23.6.0",
"@babel/polyfill": "^7.6.0",
"babel-jest": "^23.6.0",
"babel-plugin-transform-class-properties": "^6.24.1",
"babel-preset-react": "^6.24.1",
"enzyme-adapter-react-16": "^1.7.0", ？废弃
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

### Server
```bash 
# 服务器 + 自动编译 + 刷新浏览器
webpack-dev-server --save-dev

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
--save-dev:
babel-loader
@babel/core # babel 语法库 babel-core 
# es6 翻译 es5, babel-preset-env
@babel/preset-env
# babel-preset-es2015 废弃换 babel-preset-env
# 预处理 => 函数和方法 generator/Set/Map/Array.from/

# 低版本浏览器函数补充(新 preset-env 已包含)
@babel/polyfill # 依赖 core-js@3

# For polyfill 全局垫片
@babel/plugin-transform-runtime
@babel/runtime --save
@babel/runtime-corejs2 --save 

# ？废 tree-shakng 借助 babel-plugin-lodash 精简代码
babel-plugin-lodash --save-dev
```


### CSS
```bash
css-loader
style-loader

# 浏览器厂商前缀 -webkit...
postcss-loader
# 根目录 postcss.config.js
autoprefixer

postcss # ？废弃
cssnano  # ？废弃

postcss-cssnext 废弃换：postcss-preset-env --save-dev

# less
cnpm i less less-loader --save-dev

# sass
node-sass sass-loader@7.3.1
```

#### plugin 
```bash
--save-dev
html-webpack-plugin
clean-webpack-plugin
# webpack 配置文件合并
webpack-merge
webpack-dev-middleware
webpack-hot-middleware
```

### File
```bash
ExtractTextWebpackPlugin webpack   --save-dev
# 外部js/css 引入， 合并雪碧图 
file-loader
# 对图片转 base64
url-loader 

img-loader	# ？废
postcss-sprites # ？废

# shimming 垫片： this => window
imports-loader

# html 引入图片
html-loader --save-dev
# webpack js 代码载入到 html 页面中
html-webpack-inline-chunk-plugin --save-dev
```

### source-map: 
```
devtool: 'eval',
devtool: 'source-map',
```

### tree shaking: 
```javascript
// package.json:
"sideEffects": false
// 忽略 polyfill, .css 文件
"sideEffects": [
	"@babel/polyfill",
	"*.css"
]
```

### code split 代码分割
```bash
# 动态引入类库
@babel/plugin-syntax-dynamic-import

#css
--save-dev
# css 单独打包出来, pro, 不会即时更新
mini-css-extract-plugin
# .css 代码压缩
optimize-css-assets-webpack-plugin

```

### eslint 
```bash
eslint
# 初始化，生成 .eslint 文件
npx eslint init
# 检测目录
npx eslint src
babel-eslint
# 打包时显示
eslint-loader

# git 钩子 eslint 代码检测
-----
eslint-plugin-html 
eslint-friendly-formatter --save-dev
# eslint-config
eslint-config-standard
eslint-plugin-promise
eslint-plugin-node
eslint-plugin-import
eslint-plugin-standard --save-dev
```

# vue
```bash
phantomjs-prebuilt
vue --save
vue-router --save
vue-loader
vue-style-loader
vue-template-compiler
# webpack4+ ：
const VueLoaderPlugin = require('vue-loader/lib/plugin')
```

# 打包分析
```bash 
www.github.com/webpack/analyse
# 打包结果分析 package.json
"build": "webpack --profile --json > stats.json --config fileName"
上传 stats.json 文件 

chrome: command + shift + p 代码覆盖率

# 它能监控 webpack 每一步操作的耗时
speed-measure-webpack-plugin 
# 
cnpm i webpack-bundle-analyzer --save-dev
```

### 打包速度
``` bash
1. 升级 node, npm, yarn, webpack 
2. 少的模块上用 loader
3. 尽可能少用 plugin, 使用官方 plugin, 性能有保障
4. 使用 DllPlugin，第3方模块打包1次, DllReferencePlugin 查找映射文件
6. 控制包文件大小
7. thread-loader, parallel-webpack, happypack 多进程打包
8. 合理使用 source-map,
9. 结合 stats 分析打包结果
10. 开发环境内存编译
11. 开发环境无用插件剔除

```

