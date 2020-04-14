const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectId = schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10


const userSchema = new schema({
    userId: ObjectId,
    userName: { unique: true, type: String },
    password: {type: String },
    createAt: { type: Date, default: new Date().getTime() },
    lastLoginAt: { type: Date, default: new Date().getTime() }
}, {
    collection: 'users'
})

userSchema.pre('save', function (next) {
    console.log(this)
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            this.password = hash
            next()
        })
    })
})

userSchema.methods = {
    /**
     * @description: 
     * @param {_password} 客户端密码
     * @param {password} 数据库密码
     * @return: 匹配密码状态
     */
    comparePassword: (_password, password) => {
        return new Promise((resovle, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) {
                    resovle(isMatch)
                }
                reject(err)
            })
        })
    }
}

mongoose.model('User', userSchema)