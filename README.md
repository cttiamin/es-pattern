


[![Build Status](https://travis-ci.org/cttiamin/es-pattern.svg?branch=master)](https://travis-ci.org/cttiamin/es-pattern)


[![codecov](https://codecov.io/gh/cttiamin/es-pattern/branch/master/graph/badge.svg)](https://codecov.io/gh/cttiamin/es-pattern)

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




```

### lib
```
javascript-state-machine 状态机模式
cheerio: node 爬虫
handlebars 模块引擎
yargs 参数管理
chai 测试库
mocha  js测试框架
```


### install
```
// 不能用 cnpm 
# npm init -y
# npm install webpack webpack-cli --save-dev

// package.json
"scripts": {
  "config": "webpack --config build/webpack.config.js"
},
// webpack.config.js
npm run config




```


