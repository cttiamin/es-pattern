
const { getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
  } = require('../controllers/blog')
const { SuccessModel, ErrorModel } = require('../models/resModel')

var handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // console.log('method:', method, req.path)

  // 获取列表
  if(method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData, 'success')
    }).catch(err => {
      console.log('err', err)
    })
  }
  // 获取详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const detail = getDetail(id)
    // return new SuccessModel(detail, 'detail success')
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 新建一篇
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body)
    // return new SuccessModel(data, 'new success')
    const result = newBlog(req.body)
    return result.then(data => {
        return new SuccessModel(data)
    })
  }
  // 更新一篇
  if (method === 'POST' && req.path === '/api/blog/update') {
    // const result = updateBlog(req.body)
    // if (result) {
    //   return new SuccessModel(result, 'update success')
    // } else {
    //   return new ErrorModel('update error')
    // }
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }
  // 删除一篇
  if (method === 'POST' && req.path === '/api/blog/del') {

    const result = delBlog(id, req.query.author)
    return result.then(val => {
      if (val) {
          return new SuccessModel()
      } else {
          return new ErrorModel('删除博客失败')
      }
    })
    // if (result) {
    //   return new SuccessModel(result, 'del success')
    // } else {
    //   return new ErrorModel('del error')
    // }
  }
}

module.exports = handleBlogRouter