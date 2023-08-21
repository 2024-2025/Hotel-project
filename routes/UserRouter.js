const express = require('express');
var path = require('path');

const router = express.Router();

const bcrypt = require('bcrypt')

const { UserModel, UserValidation } = require('../Models/UserModel');
const multer = require('multer');


router.get('/', async (req, res) => {

    let GetUser = await UserModel.find()
    res.send(GetUser)
})
router.get('/:id', async (req, res) => {

    let { id } = req.params;
    let GetUser = await UserModel.findById(id)
    res.send(GetUser)
})

const Storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {

        let filevalidation = file.fieldname + "_" + Date.now() + path.extname(file.originalname)


        cb(null, filevalidation)
    }




})

const Upload = multer({
    storage: Storage
}).single('Profile')

router.post('/', Upload, async (req, res) => {

    try {


        let { error } = UserValidation(req.body)
        if (error) return res.send(error.message)

        const Insert = new UserModel((req.body))

        let salt = await bcrypt.genSalt(10)

        Insert.Password = await bcrypt.hash(req.body.Password, salt)

        if (req.file) {
            Insert.Profile = req.file.filename
        }

        const Email = await UserModel.findOne({ Email: req.body.Email })

        if (Email) return res.send('Email Already Exist')



        let info = await Insert.save()

        res.send({
            status: "Success",
            message: "Successfully Inserted Data User",
            info: info
        })

    } catch (error) {

        res.send(error.message)

    }
})

router.put('/:id', Upload, async (req, res) => {

    try {
        let { id } = req.params;

        let Update = await UserModel.findByIdAndUpdate(id, {

            Email: req.body.Email,
            Password: req.body.Password,
            UserName: req.body.UserName,
            Role: req.body.Role,
            Status: req.body.Status,
        }, { new: true })

        let info = await Update.save()

        if (req.file) {
            info.Profile = req.file.filename
        }
        res.send({
            status: "Success",
            message: "Successfully Update Data User",
            info: info
        })

    } catch (error) {

        res.send(error.message)

    }

})
router.delete('/:id', async (req, res) => {

    try {
        let { id } = req.params;

        let Update = await UserModel.findByIdAndDelete(id)
        if (!Update) return res.send('')

        res.send({
            status: "Success",
            message: "Successfully Update Data User",
            info: Update
        })

    } catch (error) {

        res.send(error.message)

    }

})


module.exports = router;