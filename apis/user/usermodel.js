const mongoose = require('mongoose')

const modelSchema = mongoose.Schema({
    name:{type:String, default:''},
    email:{type:String, default:''},
    phone:{type:Number, default:0},
    password:{type:String, default:''},
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('user',modelSchema)