const express = require('express')
const router =  express.Router()

const orderCtrl = require('../controllers/order.controller')

router.get('/', orderCtrl.getOrders)
router.get('/:id', orderCtrl.getOrdersByUser)
router.get('/branch/:id', orderCtrl.getOrdersByBranch)
router.get('/branch/product/:id', orderCtrl.getProductsOrder)
router.post('/', orderCtrl.createOrder)
router.put('/:id', orderCtrl.updateOrder)
router.get('/company/:company', orderCtrl.getOrdersByCompany)
router.get('/branchs/:id', orderCtrl.getOrdersByBranchs)

module.exports = router