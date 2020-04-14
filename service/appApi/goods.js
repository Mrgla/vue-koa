const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

router.get('/insertAllGoodsInfo', async (ctx) => {
    let filePath = path.join(__dirname, '../json/newGoods.json')
    console.log(filePath)
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err) {
            data = JSON.parse(data)
            let saveCount = 0
            const Goods = mongoose.model('Goods')
            data.map((value, key) => {
                // console.log(value)
                let newGoods = new Goods(value)
                newGoods.save().then(() => {
                    saveCount++;
                }).catch(error => {
                    console.log('失败：' + error)
                })
            })
            console.log('插入成功', saveCount)

        } else {
            console.log(err)
        }

    })
    ctx.body = "开始导入数据"
})

router.get('/insertAllCategory', async (ctx) => {
    let filePath = path.join(__dirname, '../json/category.json')
    console.log(filePath)

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data)
            let saveCount = 0
            const Category = mongoose.model('Category')

            data.RECORDS.map((value, index) => {
                let newCategory = new Category(value)
                newCategory.save().then(() => {
                    saveCount++
                }).catch(error => {
                    console.log('失败：' + error)
                })
            })
            console.log('成功' + saveCount)

        } else {
            console.log(err)
        }
    })
    ctx.body = "开始导入数据"
})

router.get('/insertAllCategorySub', async (ctx) => {
    let filePath = path.join(__dirname, '../json/category_sub.json')
    console.log(filePath)

    fs.readFile(filePath, 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('成功插入' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })
    })

    ctx.body = "开始导入数据"
})


router.get('/getDetailGoodsInfo', async (ctx) => {
    let goodsId = ctx.query.goodsId
    console.log('goodsId', goodsId)
    if (goodsId) {
        const Goods = mongoose.model('Goods')
        try {
            let res = await Goods.findOne({ ID: goodsId }).exec()
            ctx.body = {
                code: 200,
                data: res || {},
                msg: '查询成功'
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                code: 400,
                data: {},
                msg: '查询失败'
            }
        }
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: '参数不能为空'
        }
    }

})

// 获取大类
router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category')
        let res = await Category.find().exec()
        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: res
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code: 500,
            msg: '查询失败',
            data: {}
        }
    }
})
// 获取小类
router.get('/getCategorySubList', async (ctx) => {
    let categoryId = ctx.query.categoryId
    console.log('categoryId', categoryId)
    try {
        const CategorySub = mongoose.model('CategorySub')
        let res = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: res
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code: 500,
            msg: '查询失败'
        }
    }
})

router.get('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        let SUB_ID = ctx.query.categorySubId
        // let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'

        let page = ctx.query.page || 1
        let pageSize = ctx.query.pageSize || 10 //每页显示数量
        let startIndex = (page - 1) * pageSize

        const Goods = mongoose.model('Goods')
        let result = await Goods.find({ SUB_ID: SUB_ID })
            .skip(startIndex).limit(pageSize).exec() 
        ctx.body = { code: 200, data: result, msg: '查询成功' }
    } catch (err) {
        console.log(err)
        ctx.body = { code: 500, msg: '查询失败' }
    }

})

module.exports = router