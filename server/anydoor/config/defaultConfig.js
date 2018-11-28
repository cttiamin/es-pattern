module.exports = {
  hostname: '127.0.0.1',
  port: 4210,
  root: process.cwd(),  // 启动时路径
  // gzip 压缩扩展
  compress: /\.(html|js|css|md)/,
  // 
  cache: {
    maxAge: 600,  // 10分钟
    expires: true,
    cacheControl: true,
    etag: true,
    lastModified: true
  }
}