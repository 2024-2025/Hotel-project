const express = require('express')

const router = express.Router()

const joi=require('joi')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const { UserModel } = require('../Models/UserModel')

router.post('/', async (req, res) => {

    try {

        let {error}=LoginValidation(req.body)
        if(error) return res.send(error.message)

        const UserData = await UserModel.findOne({ Email: req.body.Email })
        if (!UserData) return res.send('incorrect Email or Password')
        const checkpass = await bcrypt.compare(req.body.Password, UserData.Password)
        if (!checkpass) return res.send('incorrect Email or Password')


        const token = jwt.sign({
            UserName: UserData.UserName,
            id: UserData._id

        }, 'token',
            {
                expiresIn: 60
            }
        )

        // if (UserData.Role == "user") {
        //     res.send('welcome')
        //     return
        // }


        res.header("token", token).json({
            status: "Success",
            message: "Successfully Login In",
            token: token,
            Role: UserData.Role

        })




    } catch (error) {

        res.send(error.message)

    }
})


const LoginValidation = (LV) => {

    let loginvalidation=joi.object({
        Email:joi.string().email(),
        Password:joi.string().required()
    })

    return loginvalidation.validate(LV)
}

module.exports = router;