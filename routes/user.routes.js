const express = require('express')
const router =  express.Router()

const userCtrl = require('../controllers/user.controller')

router.get('/', userCtrl.getUsers)
router.get('/todos', userCtrl.getUserbyMont)
router.get('/:id', userCtrl.getUser)
router.get('/email/:email', userCtrl.getUserByEmail)
router.get('/username/:userName', userCtrl.getUserByName)
router.post('/create', userCtrl.createUser)
router.put('/:id', userCtrl.updateUser)

module.exports = router