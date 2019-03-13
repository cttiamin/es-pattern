

### http
```bash
#查看dns
chrome://net-internals/
#源码：
https://github.com/nodejs/node
# 按 t , 检索文件名

# 并发测试
ab -n1000 -c10 http://localhost:2014/
```

#### 调试
```bash
1. Inspector
# node --inspect-brk argv.js
# chrome://inspect
// nim-node-inspector

2. VS Code
#条件调试
n > 8

```

#### 静态资源服务器
```
1. anywhere
```

#### 修改重启服务
```
npm i -g supervisor 
supervisor app.js
nodemon
```

### 安装包
```
handlebars 模板引擎
yargs  node 参数管理
```

#### 爬虫
```
cheerio : jquery 获取页面
puppeteer:



```