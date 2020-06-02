// 原生 blog
const querystring = require('querystring')
const { get, set } = require('./db/redis')
const { access } = require('./utils/log')
const handleBlogRouter = require('./routes/blog')
const handleUserRouter = require('./routes/user')
const http = require('http')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log('d.toGMTString() is ', d.toGMTString())
  return d.toGMTString()
}

// 用于处理 post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    // 不是 json 格式, 忽略 www-form 格式
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')
  // res.setHeader('Content-type', 'application/json')
  // res.writeHead('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]
  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''  // k1=v1;k2=v2;k3=v3
  cookieStr.split(';').forEach(item => {
      if (!item) {
          return
      }
      const arr = item.split('=')
      const key = arr[0].trim()
      const val = arr[1].trim()
      req.cookie[key] = val
  })

  // // 解析 session
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // if (userId) {
  //     if (!SESSION_DATA[userId]) {
  //         SESSION_DATA[userId] = {}
  //     }
  // } else {
  //     needSetCookie = true
  //     userId = `${Date.now()}_${Math.random()}`
  //     SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  // 解析 session （使用 redis）
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
      needSetCookie = true
      userId = `${Date.now()}_${Math.random()}`
      // 初始化 redis 中的 session 值
      set(userId, {})
  }
  // 获取 session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
        // 初始化 redis 中的 session 值
        set(req.sessionId, {})
        // 设置 session
        req.session = {}
    } else {
        // 设置 session
        req.session = sessionData
    }
    // console.log('req.session ', req.session)

    // 处理 post data
    return getPostData(req)
  })
  // getPostData(req)
  .then(postData => {
    req.body = postData

    // blog route
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          // 锁定客户端不许修改 cookie
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      // console.log('app blogData', JSON.stringify(blogData))
      return
    }
    // user route
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(JSON.stringify(userData))
    //   return
    // }
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
      })
      return
    }    

    // 未命中路由，返回 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()

  }).catch(err => {
    console.log('err', err)
  })

}

const PORT = 8000
const server = http.createServer(serverHandle)
server.listen(PORT)
console.log('listen', PORT)

// module.exports = serverHandle

