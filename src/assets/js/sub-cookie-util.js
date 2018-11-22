/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-6-26
 * Time: 下午5:15
 * To change this template use File | Settings | File Templates.
 *
 * 子 cookie 操作
 */

var SubCookieUtil = {
    /**
     * 获取单个子cookie
     * @param name
     * @param subName
     * @returns {*}
     */
    get: function (name, subName){
        var subCookies = this.getAll(name);
        if (subCookies){
            return subCookies[subName];
        } else {
            return null;
        }
    },

    /**
     * 获取所有子cookie
     * @param name
     * @returns {*}
     */
    getAll: function(name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            i,
            parts,
            result = {};

        if (cookieStart > -1){
            cookieEnd = document.cookie.indexOf(";", cookieStart)
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);

            if (cookieValue.length > 0){
                subCookies = cookieValue.split("&");

                for (i=0, len=subCookies.length; i < len; i++){
                    parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }

                return result;
            }
        }

        return null;
    },

    /**
     * 设置子cookie
     * @param name :cookie名称
     * @param subName : 子cookie名称
     * @param value:    子cookie值
     * @param expires : 可选的cookie失效日期或时间的Date对象
     * @param path:     可选的cookie路径
     * @param domain:   可选的cookie作用域
     * @param secure:   可选的cookie布尔secure标志
     */
    set: function (name, subName, value, expires, path, domain, secure) {

        var subcookies = this.getAll(name) || {};
        subcookies[subName] = value;
        this.setAll(name, subcookies, expires, path, domain, secure);

    },

    setAll: function(name, subcookies, expires, path, domain, secure){

        var cookieText = encodeURIComponent(name) + "=",
            subcookieParts = new Array(),
            subName;

        for (subName in subcookies){
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)){
                subcookieParts.push(encodeURIComponent(subName) + "="
                    + encodeURIComponent(subcookies[subName]));
            }
        }

        if (subcookieParts.length > 0){
            cookieText += subcookieParts.join("&");

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
        } else {
            cookieText += "; expires=" + (new Date(0)).toGMTString();
        }

        document.cookie = cookieText;

    },

    unset: function (name, subName, path, domain, secure){
        var subcookies = this.getAll(name);
        if (subcookies){
            delete subcookies[subName];
            this.setAll(name, subcookies, null, path, domain, secure);
        }
    },

    unsetAll: function(name, path, domain, secure){
        this.setAll(name, null, new Date(0), path, domain, secure);
    }

};

