const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectId = schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10


const userSchema = new schema({
    userId: ObjectId,
    userName: { unique: true, type: String },
    password: { unique: true, type: String },
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
})
userSchema.pre('save', function (next) {
    console.log(this)
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err){
                return next(err)
            }
            this.password = hash
            next()
        })
    })
})


mongoose.model('User', userSchema)