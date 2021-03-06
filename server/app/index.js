const Koa = require('koa');
// const koaBody = require('koa-body');
const bodyparser = require('koa-bodyparser')
const parameter = require('koa-parameter');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const path = require('path');
const app = new Koa();
const routing = require('./routes');
const mongoose = require('mongoose');
const {connectionStr} = require('./config')
mongoose.connect(connectionStr, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Mongodb 连接成功！'))
mongoose.connection.on('error', console.error)

app.use(koaStatic(path.join(__dirname, 'public')));

app.use(error({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

// app.use(koaBody({
//   multipart: true,
//   formidable: {
//     uploadDir: path.join(__dirname, '/public/uploads'),
//     keepExtensions: true,
//   },
// }));
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(parameter(app));
routing(app);

app.listen(3000, () => console.log('程序启动在 3000 端口了'));

