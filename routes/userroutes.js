const router = require('express').Router()
const usercontroller = require('../apis/user/usercontroller')

router.post('/user',usercontroller.register)
router.post('/getuser',usercontroller.getRegisteredData)
router.post('/updateOne',usercontroller.updateOne)
router.post('/deleteOne',usercontroller.deleteOne)

module.exports = router
