const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    // console.log(username, password)
    // 过滤 sql 注入
    username = escape(username)
    // 生成加密密码
    password = genPassword(password)
    password = escape(password)
    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
    // console.log('sql is', sql, username, password)
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
    // if (username === 'admin' && password === '123456') {
    //     return true
    // }
    // return false
}

module.exports = {
    login
}