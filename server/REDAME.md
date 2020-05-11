

## PM2 线上环境进程守护

```
rest 6个限制：
1. 客户端-服务器
2. 无状态(Stateless)
3. 缓存(Cache)
4. 统一接口(Uniform Interface)
5. 分层系统 (Layered System)
6. 按需代码 (Code-On-Demand)

http options 方法的作用是什么？
检测服务器所支持的请求方法
CORS 中的预检请求

```


```
npm install pm2 -g
pm2 --version
pm2 list
pm2 restart/stop/delete/info/log [name]
pm2 monit     // 程序分析

```

### http
```bash
#查看 dns
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
anywhere
```

#### 启动工具
```
npm i -g supervisor 
supervisor app.js
nodemon 修改自动重启 node 服务
cross-env 设置环境变量 mac linux, windows
```

### 安装包
```
handlebars 模板引擎
yargs node 参数管理
```

#### 爬虫
```
cheerio : jquery 获取页面
puppeteer:
```

