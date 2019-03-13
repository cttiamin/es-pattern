### HTTP 

```bash
curl baidu.com
curl www.baidu.com
curl -v www.baidu.com # 详细信息
```

```bash
# 跨域允许请求的头信息
# https://fetch.spec.whatwg.org/#cors-safelisted-request-header
# 允许的方法: GET HEAD POST
# 允许的 Content-Type: text/plain 
#     multipart/form-data 
#     application/x-www-form-urlencoded
# 突破跨域限制 011-createServer.js

# cache-Control
到期:
public    # http 经过的任何地方都可以缓存
private   # 只有浏览器
no-cache  # 可以在本地缓存, 需在服务器验证
max-age=<seconds>  # 过期时间
s-maxage=<seconds> # 代理服务器生效
max-stale=<seconds> # max-age 已过期, 在max-stale内仍可用旧缓存
重新验证:
must-revalidate   # max-age 过期 必须重新在源服务器重新验证
proxy-revalidate  # 指定缓存服务器 
其它:
no-store    # 本地, 代理都不能拿缓存
no-tranform # 不允许 转换内容

# 验证头
Last-Modified     # 上次修改时间
  If-Modified-Since 
  If-Unmodified-Since
# Etag    # 更严格的验证 数据签名, 对资源的内容进行 hash 计算
  # 浏览器
  If-Math
  If-Non-Match 

```


```javascript
// cookie 
// 工具 chrome : hostAdmin
'Set-Cookie': ['id=123; max-age=2', 'abc=456;domain=test.com']

// 长连接
// 在次请求时: 不需要三次握手的消耗
// chrome=>network=>disable cache=>name右键=>ConnectionId(http-id)
// 网速调慢些测试 online=> fast 3G
response.writeHead(200, {
  'Connection': 'keep-alive'  // 创建长链接 close
})

```

### 数据协商

```bash
##### 请求
Accept  # 想要的数据类型
Accept-Encodeing # 数据编码压缩
Accept-Language  # 
User-Agent       # 浏览器相关信息

##### 返回
Content-Type  # 返回数据格式
Content-Encoding # gzip 或其它压缩方式
Content-Language # 是跟据请求返回 语言

# mime types 
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types


##### 带数据请求
# chrome => network => Preserve log
# 表单发送 => 在页面跳转前把数据打印出来


##### redirect 重定向
302 临时跳转
301 永久跳转

##### Content-Security-Policy 内容安全策略

```

#### nginx
```


```
