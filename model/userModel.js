const { Schema, model } = require("mongoose");

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    otp:{
        type:String
    }
})

const User = model('User', userSchema)
module.exports = User