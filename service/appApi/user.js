const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.post('/login', async (ctx) => {
    let params = ctx.request.body
    if (!params.userName || !params.password) {
        ctx.body = {
            code: 400,
            msg: (!params.userName ? '用户名' : "密码") + '不能为空'
        }
        return
    }

    let userName = params.userName
    let password = params.password
    //引入User的model
    const User = mongoose.model('User')

    await User.findOne({ userName: userName }).exec().then(async (res) => {
        console.log(res)
        let newUser = new User()
        await newUser.comparePassword(password, res.password)
            .then(isMatch => {
                if (isMatch) {
                    let userInfo = JSON.parse(JSON.stringify(res))
                    delete(userInfo.password)
                    ctx.body = {
                        code: 200,
                        data: {
                            userInfo: userInfo
                        },
                        msg: '登录成功'
                    }
                } else {
                    ctx.body = {
                        code: 400,
                        msg: '密码错误'
                    }
                }
            }).catch(error => {
                ctx.body = {
                    code: 500,
                    msg: error
                }
            })
    }).catch(error => {
        ctx.body = {
            code: 400,
            msg: '用户不存在'
        }
    })

})

router.post('/register', async (ctx) => {
    let params = ctx.request.body
    if (!params.userName || !params.password) {
        ctx.body = {
            code: 400,
            msg: (!params.userName ? '用户名' : "密码") + '不能为空'
        }
        return
    }

    const User = mongoose.model('User')
    let newUser = new User(params)

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            msg: '注册成功'
        }
    }).catch(error => {
        //失败返回code=500，并返回错误信息
        console.log(error)
        if (error.code == 11000) {
            ctx.body = {
                code: 500,
                msg: '用户已存在'
            }
            return
        }
        ctx.body = {
            code: 500,
            msg: '注册失败'
        }
    })
})

module.exports = router