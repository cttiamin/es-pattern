const http = require('http')
const chalk = require('chalk')
const path = require('path')
// const fs = require('fs')
// const promisify = require('util').promisify
// const stat = promisify(fs.stat)
// const readdir = promisify(fs.readdir);
const conf = require('./config/defaultConfig')
const route = require('./helper/route')

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
    // console.log(this.conf)
  }
  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url);
      route(req, res, filePath, this.conf)
      // fs.stat(filePath, (err, stats) => {
      //   if(err) {
      //     return;
      //   }
      // });
    });
    
    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}: ${this.conf.port}`
      console.info(`Server started at ${chalk.green(addr)}`)
    })
  }
}

module.exports = Server;

