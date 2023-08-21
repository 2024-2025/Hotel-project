const express = require('express')

const router = express.Router();

const { ClientModel, ClientValidation } = require('../Models/ClientModel')

router.get('/', async (req, res) => {

  let GetClient = await ClientModel.find()
  res.send(GetClient)

})
router.get('/:id', async (req, res) => {

  let { id } = req.params;
  let GetClient = await ClientModel.findById(id)
  res.send(GetClient)

})

router.post('/', async (req, res) => {

  try {
    let { error } = ClientValidation(req.body)
    if (error) return res.send(error.message)
    let insert = new ClientModel(req.body)

    let total = insert.Quantity * insert.Price
    insert.Total = total



    const FindName = await ClientModel.findOne({ Name: req.body.Name })
    if (FindName) return res.send('hore loo diiwan geliye')
    let info = await insert.save()

    res.send({
      status: "Success",
      message: "SuccessFully inserted Data Client",
      info: info
    })

  } catch (error) {
    res.send(error.message)
  }
})

router.put('/:id', async (req, res) => {

  try {

    let { id } = req.params;
    let Update = await ClientModel.findByIdAndUpdate(id, req.body, { new: true })
    let total = Update.Quantity * Update.Price
    Update.Total = total
    let info=await Update.save()
    res.send({
      status: "Success",
      message: "SuccessFully Update Data Client",
      info:info
    })

  } catch (error) {

    res.send(error.message)

  }
})
router.delete('/:id', async (req, res) => {

  try {

    let { id } = req.params;
    let Remove = await ClientModel.findByIdAndDelete(id)
    if (!Remove) return res.send('')
    res.send({
      status: "Success",
      message: "SuccessFully Delete Data Client",
      info: Remove
    })

  } catch (error) {

    res.send(error.message)

  }
})

module.exports = router;