/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-6-26
 * Time: 下午4:07
 * To change this template use File | Settings | File Templates.
 *
 *  简化 cookie 功能,
 *  基本的 cookie 操作: 读取，写入，删除
 *
 */
var CookieUtil = {

    /**
     * @param name : cookie 名称
     * @returns {null} : cookie 值
     */
    get: function (name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;
        if (cookieStart > -1){
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
                + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    /**
     * @param name 名称
     * @param value 值
     * @param expires 过期时间
     * @param path 有效路径,父路径不能访问子路径创建的cookie
     * @param domain 有效域
     * @param secure (boolean): 安全标志,指定后只有在用SSL连接的时候才发送服务器
     */
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },

    /**
     * @param name 名称
     * @param path 有效路径
     * @param domain 有效作用域
     * @param secure (true/boolean)
     */
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }
};

