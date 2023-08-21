const express = require('express')

const { PaymentModel, PaymentValidation } = require('../Models/PaymentModel')
const { ClientModel } = require('../Models/ClientModel')
const { RoomModel } = require('../Models/RoomModel')
const { UserModel } = require('../Models/UserModel')


const router = express.Router()

router.get('/', async (req, res) => {
    let finds = await PaymentModel.find().populate({
        path: "ClientID",
        model: 'client',
        select: "-_id Name Phone"
    }).populate({
        path: "UserID",
        model: 'user',
        select: "-_id Email UserName "
    }).populate({
        path: "RoomID",
        model: 'room',
        select: "-_id RoomName RoomType "
    })
    res.send(finds)
})


router.post('/', async (req, res) => {


    try {
        let {error}=PaymentValidation(req.body)
        if(error) return res.send(error.message)

        let Insert = new PaymentModel(req.body)


        const ClientData = await ClientModel.findOne({ _id: req.body.ClientID })
        const UserData = await UserModel.findOne({ _id: req.body.UserID })
        const RoomData = await RoomModel.findOne({ _id: req.body.RoomID })

        if (!ClientData) return res.send('ClientData lama Helin')
        if (!UserData) return res.send('UserData lama Helin')
        if (!RoomData) return res.send('RoomData lama Helin')

        let CurrencyTotal = ClientData.Total - Insert.pay

        if (Insert.pay > ClientData.Total) {
            res.send('lacagta laga rabo waa' + "  " + ClientData.Total)

            return
        }

        let currencyStatus = ''

        if (CurrencyTotal) {
            currencyStatus = "Percial"
        }
        if (CurrencyTotal == "0") {
            currencyStatus = "FullPaid"

        }

        if (Insert.pay < 1) {
            res.send('')
            return
        }


        let infos = await ClientModel.findByIdAndUpdate(req.body.ClientID, {
            Total: CurrencyTotal,
            Status: currencyStatus
        }, { new: true })



        let info = await Insert.save()

        res.send({
            status: "Success",
            message: "Successfully Payments Data ",
            info: infos
        })
    } catch (error) {

        res.send(error.message)

    }


})



module.exports = router;