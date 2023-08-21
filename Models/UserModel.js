const mongoose = require('mongoose')

const joi = require('joi')

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: false,
        default: "Active",
        enum: ["Active", "Blocked", "Pending"],

    },
    Role: {
        type: String,
        required: false,
        default: "User",
        enum: ["User", "Admin"]
    },

    Date: {
        type: Date,
        required: false,
        default: new Date
    },
    Profile: {
        type: String,
        required: true
    }

})


const UserModel = mongoose.model('user', UserSchema)


const UserValidation = (UV) => {

    let uservalidation = joi.object({
        UserName: joi.string().required(),
        Email: joi.string().required().email(),
        Password: joi.string().required(),
       
    })

    return uservalidation.validate(UV)
}

module.exports = {
    UserValidation,
    UserModel
}