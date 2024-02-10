const router = require('express').Router()
const categorycontroller = require('../apis/category/categorycontroller')

router.post('/user',categorycontroller.login)

module.exports = router