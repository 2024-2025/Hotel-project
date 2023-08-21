const mongoose = require('mongoose');

const joi = require('joi')

const ClientSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    Address: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: false,
        default: new Date
    }
    ,
    Price: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        required: false,
        default: "0"

    },
    Status:{
        type:String,
        required:false,
        default:"Unpaid",
        enum:["Unpaid","PercialPaid","FullPaid"]
    }
})


const ClientModel = mongoose.model('client', ClientSchema)


const ClientValidation = (CV) => {

    let clientvalidation = joi.object({
        Name: joi.string().required(),
        Phone: joi.number().required(),
        Gender: joi.string().required(),
        Address: joi.string().required(),
        Price: joi.number().required(),
        Quantity: joi.number().required()
        
    })

    return clientvalidation.validate(CV)
}

module.exports = {
    ClientValidation,
    ClientModel
}