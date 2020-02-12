const express = require('express')
const router =  express.Router()

const hourCtrl = require('../controllers/hour.controller')

router.get('/', hourCtrl.getHours)
router.post('/', hourCtrl.createHour)

module.exports = router