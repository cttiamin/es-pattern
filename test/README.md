### Test

```
BDD: 行为驱动开发
TDD: 测试驱动开发


测试类库
chaijs.com
cnpm i --save-dev chai


测试框架
mocha： https://mochajs.org/
npm install --global mocha
cnpm i --save-dev mocha

package.json => scrip :
"test": "mocal" // 执行目录下所有文件
"test": "mocha test/mocha.js"
# npm test


测试覆盖率
istanbul
https://github.com/gotwarlost/istanbul
cnpm install istanbul --save-dev


持续集成
团队协作 ：尽早发现错误
egg
https://travis-ci.org
添加 .travis.yml

图标获得 : repo-badges
```

[![Build Status](https://travis-ci.org/cttiamin/es-pattern.svg?branch=master)](https://travis-ci.org/cttiamin/es-pattern)

[![codecov](https://codecov.io/gh/cttiamin/es-pattern/branch/master/graph/badge.svg)](https://codecov.io/gh/cttiamin/es-pattern)

### Benchmark.js

```
https://benchmarkjs.com
精准运行速度测试
cnpm i --save benchmark

```

### UI 测试

```
jest
https://jestjs.io/zh-Hans/

cnpm i --save-dev jest babel-jest babel-preset-env babel-preset-react react-test-renderer
cnpm i --save-dev babel-plugin-transform-class-properties

.babelrc
"presets":  [
    "env","react"
  ],
  "plugins": [
    "transform-class-properties"
  ]


Enzyme
https://airbnb.io/enzyme/
cnpm i --save react@16 react-dom@16
cnpm i --save-dev enzyme enzyme-adapter-react-16
```

### web-driver

```
selenium-webdriver
https://www.npmjs.com/package/selenium-webdriver
cnpm i --save-dev selenium-webdriver
```
