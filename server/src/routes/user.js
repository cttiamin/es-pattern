const {login}  = require('../controllers/user')
const { SuccessModel, ErrorModel } = require('../models/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password} = req.body
    // console.log(username, password, req.body)
    const result = login(username, password)
    // if (result) {
    //   return new SuccessModel()
    // }
    // return new ErrorModel()
    return result.then(data => {
      if (data.username) {
          // 设置 session
          req.session.username = data.username
          req.session.realname = data.realname
          // 同步到 redis
          set(req.sessionId, req.session)

          return new SuccessModel()
      }
      return new ErrorModel('登录失败')
  })
  }

  // // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
    // if (req.cookie.username) {
        return Promise.resolve(
            new SuccessModel({
                session: req.session
                // cookie: req.cookie
            })
        )
    }
    return Promise.resolve(
        new ErrorModel('User not login')
    )
  }
}

module.exports = handleUserRouter