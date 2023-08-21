const express = require('express')

const router = express.Router();

const {RoomModel,RoomValidation} = require('../Models/RoomModel')

router.get('/', async (req, res) => {

  const GetRoom = await RoomModel.find()

  res.send(GetRoom)


})
router.get('/:key', async (req, res) => {
  let { key } = req.params;


  const GetRoom = await RoomModel.findById(key)


  res.send(GetRoom)


})
router.post('/', async (req, res) => {

  try {

    let {error}=RoomValidation(req.body)
    if(error) return res.send(error.message)
    const GetRoom  = new RoomModel(req.body);

    const Room = await RoomModel.findOne({ RoomName: req.body.RoomName })


    if (Room) return res.send('Hore ayaa loo Diiwan Geliye')



    let info = await GetRoom.save()
    res.send({
      status: "Success",
      message: "Successfully Inserted Data Room",
      info: info
    })



  } catch (error) {

    res.send(error.message)

  }

})


router.put('/:id', async (req, res) => {


  try {
    let { id } = req.params;

    let Update = await RoomModel.findByIdAndUpdate(id, req.body, { new: true });


    res.send({
      status: "Success",
      message: "Successfully Update Data Room",
      info: Update
    })
  } catch (error) {

    res.send(error.message)

  }
})
router.delete('/:id', async (req, res) => {


  try {
    let { id } = req.params;

    let Update = await RoomModel.findByIdAndDelete(id);
    if (!Update) return res.send('')


    res.send({
      status: "Success",
      message: "Successfully Delete Data Room",
      info: Update
    })
  } catch (error) {

    res.send(error.message)

  }
})



module.exports = router;