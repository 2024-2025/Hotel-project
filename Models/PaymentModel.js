const mongoose = require('mongoose')

const joi=require('joi')

const PaymentSchema = new mongoose.Schema({

    RoomID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ClientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    pay: {
        type: Number,
        required: true
    },
    increase: {
        type: String,
        required: false,
        default: "0"
    }

})


const PaymentModel = mongoose.model('payment', PaymentSchema)


const PaymentValidation = (PV) => {
    let paymentvalidation = joi.object({
        RoomID: joi.string().required(),
        ClientID: joi.string().required(),
        UserID: joi.string().required(),
        pay:joi.number().required(),
       
    })

    return paymentvalidation.validate(PV)
}

module.exports = {
    PaymentModel,
    PaymentValidation
}