# es6 环境

## environment Configuration 
```
nvm install node
nvm use node
node --v8-options | grep harmony 
// 查看node es6 实现的特性

// 检测各种运行环境对 es6 的支持情况
npm install -g es-checker
es-checker
```

### Babel es6 转码器 babel-preset
* https://babeljs.io/

```
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react
```

> ES7 不同阶段语法提案的转码规则（共有4个阶段），选装一个
```
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

>注意，以下所有 Babel 工具和模块的使用，都必须先写好 .babelrc
```
{
    "presets": [
      "es2015",
      "react",
      "stage-3"
    ],
  "plugins": []
}
```

```
// imooc: cnpm i  @babel/preset-env --save-dev


```

#### 命令行转码 babel-cli
```
$ npm install --global babel-cli

// => 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

> 上例无法支持不同项目使用不同版本的Babel。
个解决办法是:
#### 将 babel-cli 安装在项目之中。
```
# 安装
$ npm install --save-dev babel-cli
```
> 然后，改写 package.json
```
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
```
>转码的时候，就执行下面的命令。
```
$ npm run build
```


#### babel-node
> babel-cli 自带babel-node, 支持ES6的REPL环境,可以直接运行ES6代码。
```
$ babel-node
> (x => x * 2)(1)
2

# 运行文件
$ babel-node es6.js

# install 在项目中
$ npm install --save-dev babel-cli
```
> 改写 package.json
```
{
  "scripts": {
    "script-name": "babel-node script.js"
  }
}
```


#### babel-register
> babel-register 模块改写 require命令, 
```
$ npm install --save-dev babel-register
```
使用时，必须首先加载babel-register。
```
require("babel-register");
require("./index.js");
```
然后，就不需要手动对index.js转码了。


#### babel-core
```
$ npm install babel-core --save
```
* 官方文档 http://babeljs.io/docs/usage/options/

#### babel-polyfill
>Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象
```
$ npm install --save babel-polyfill
```

### 浏览器环境
```
$ npm install babel-core@5

<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```

> 将代码打包成浏览器可以使用的脚本
```
# npm install --save-dev babelify babel-preset-es2015
// 再用命令行转换ES6脚本
$ browserify script.js -o bundle.js \
  -t [ babelify --presets [ es2015 ] ]
```
> 在package.json设置下面的代码，就不用每次命令行都输入参数了
```
{
  "browserify": {
    "transform": [["babelify", { "presets": ["es2015"] }]]
  }
}
```
### 与其他工具的配合 
ESLint用于静态检查代码的语法和风格，安装命令如下
```
$ npm install --save-dev eslint babel-eslint
```
在项目根目录下，新建一个配置文件.eslintrc，在其中加入parser字段
```
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}
```
package.json
```
  {
    "name": "my-module",
    "scripts": {
      "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
```
#### Mocha
package.json
```
"scripts": {
  "test": "mocha --ui qunit --compilers js:babel-core/register"
}
```
--compilers参数指定脚本的转码器，规定后缀名为js的文件，都需要使用babel-core/register先转码。


### Traceur 转码器
google
```
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
<script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
<script type="module">
  import './Greeter.js';
</script>

```
#### 在线转换 
http://google.github.io/traceur-compiler/demo/repl.html#

#### 命令行转换
```
$ npm install -g traceur

$ traceur calc.js
Calc constructor
9

$ traceur --script calc.es6.js --out calc.es5.js

#为了防止有些特性编译不成功，最好加上--experimental选项。
$ traceur --script calc.es6.js --out calc.es5.js --experimental
```
#### node 环境的用法 
```
var traceur = require('traceur');
var fs = require('fs');

// 将ES6脚本转为字符串
var contents = fs.readFileSync('es6-file.js').toString();

var result = traceur.compile(contents, {
  filename: 'es6-file.js',
  sourceMap: true,
  // 其他设置
  modules: 'commonjs'
});

if (result.error)
  throw result.error;

// result对象的js属性就是转换后的ES5代码
fs.writeFileSync('out.js', result.js);
// sourceMap属性对应map文件
fs.writeFileSync('out.js.map', result.sourceMap);
```





















