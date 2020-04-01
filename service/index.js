const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const path = require('path')

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
    // ctx.body = indexData
    let filePath = path.join(__dirname, 'indexData.json')
    console.log(filePath)
    let res = await getFileData(filePath)
    ctx.body = res

    // let data = fs.readFileSync(filePath, 'utf8')
    // ctx.body = {
    //   code: 200,
    //   data: JSON.parse(data),
    //   msg:'成功',
    // }
  }
})

const getFileData = async function (filePath) {
  return new Promise((resovle, reject) => {
    fs.readFile(filePath, 'utf-8', function (err, data) {
      if (!err) {
        let res = {
          code: 200,
          data: JSON.parse(data),
          msg: '请求成功'
        }
        resovle(res)
      } else {
        console.log(err)
        let error = {
          code: 500,
          data: {},
          msg: '读取失败'
        }
        resovle(error)
      }
    })
  })
}

app.listen(3001, () => {
  console.log('[Server] starting at port 3000')
})
