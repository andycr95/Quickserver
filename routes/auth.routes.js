const express = require('express')
const router =  express.Router()

const auth = require('../middlewares/auth')
const authCtrl = require('../controllers/auth.controller')
global.config = require('../in18')

router.post('/login', authCtrl.signIn)
router.get('/login/auth', auth.isAuth)
router.get('/login/islog', auth.isLogged)

module.exports = router