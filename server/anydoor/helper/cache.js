const {cache} = require('../config/defaultConfig')

function refreshRes(stats, res) {
  const { maxAge, expires, cacheControl, etag, lastModified } = cache;

  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString()); // ms
  }

  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`); // s
  }

  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString());
  }

  if (etag) {
    // res.setHeader('ETag', `${stats.mtime.getTime()}`);
    // 使用时间戳 做 ETag值，因为懒
  }
// 关于Date对象的坑 实在太多 
}

module.exports = function isFresh(stats, req, res) {
  refreshRes(stats, res);
  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];

  if (!lastModified && !etag) { // frist
    return false;
  }

  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false;
  }

  if (etag && etag !== res.getHeader('ETag')) {
    return false;
  }

  return true;
};