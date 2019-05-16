const Koa = require('koa');
const path = require('path');

//获取post请求体插件
const bodyParser = require('koa-bodyparser');
// const Utils = require('./utils');
// const db = require('./db');

//引入配置文件
const config = require('./config/default.js');

const koaStatic = require('koa-static');
const staticCache = require('koa-static-cache');

//引入跨域组件
var cors = require('koa2-cors');

const app = new Koa();
//允许跨域
app.use(cors());

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './static')
))
// 缓存
// app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
//     maxAge: 365 * 24 * 60 * 60
// }))
// app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
//     maxAge: 365 * 24 * 60 * 60
// }))

//使用bodyParser()获取post请求的参数
app.use(bodyParser());

//  路由
app.use(require('./router/route.js').routes());

app.listen(config.port);
console.log(`listening on port ${config.port}`);