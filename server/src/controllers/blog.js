const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
      sql += `and author='${author}' `
  }
  if (keyword) {
      sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  // 返回 promise
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
      return rows[0]
  })
  // return {
  //   id: 2,
  //   title: 'titleB',
  //   content: 'contb'
  // }
}
const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content author 属性
  const title = xss(blogData.title)
  // console.log('title is', title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `
  // console.log(sql)
  return exec(sql).then(insertData => {
    // console.log('insertData is ', insertData)
    return {
      id: insertData.insertId
    }
  })
}
const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性

    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    return exec(sql).then(updateData => {
        // console.log('updateData is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
  // return true
}
const delBlog = (id, author) => {
  // id 就是要删除的 id
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  console.log(sql)
  return exec(sql).then(delData => {
      // console.log('delData is ', delData)
      if (delData.affectedRows > 0) {
          return true
      }
      return false
  })
  // return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}