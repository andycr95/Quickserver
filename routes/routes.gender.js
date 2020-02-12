const express = require('express')
const router =  express.Router()

const genderCtrl = require('../controllers/gender.controller')

router.get('/', genderCtrl.getGenders)
module.exports = router