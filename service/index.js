const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router();
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')

const user = require('./appApi/user.js')

// 首页静态数据
const indexData = require('./database/indexData') 

!(async () => {
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({ userName: 'lala2', password: '123456' })
    // oneUser.save().then(() => {
    //     console.log('插入成功')
    // })
})()

router.use('/user', user.routes())

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx) => {
    if (ctx.url === '/index/data' && ctx.method === 'GET') {
        ctx.body = indexData
    }
})


app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})