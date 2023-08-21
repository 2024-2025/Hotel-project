const mongoose = require('mongoose');


const joi =require('joi');

const RoomSchema = new mongoose.Schema({

    RoomName: {
        type: String,
        required: true,

    },
    RoomType: {

        type: String,
        required: true,
        default: "Single",
        enum: ["Single", "Double"]
    },
    RoomStatus: {
        type: String,
        required: false,
        default: "Active",
        enum: ["Active", "UnActive"]
    },

    RoomDate: {
        type: Date,
        default: new Date,
        required: false
    }
})


const RoomModel = mongoose.model('room', RoomSchema);

const RoomValidation = (RV) => {
    let roomvalidation = joi.object({

        RoomName: joi.string().required(),
        RoomType: joi.string().required(),

    })
    return roomvalidation.validate(RV)

}
module.exports = { RoomModel ,RoomValidation}