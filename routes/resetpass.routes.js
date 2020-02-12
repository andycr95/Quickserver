const express = require('express')
const router =  express.Router()

const resetpassCtrl = require('../controllers/resetpass.controller')


router.get('/:email', resetpassCtrl.getUserByEmail);



module.exports = router