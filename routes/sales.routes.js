const express = require('express')
const router =  express.Router()

const salesCtrl = require('../controllers/sales.controller')

router.get('/', salesCtrl.getSales)
router.get('/all', salesCtrl.getAllSales)
router.get('/company/:id', salesCtrl.getSalebycompany)
router.post('/', salesCtrl.createSale)
router.delete('/:id', salesCtrl.deleteSale)
router.put('/:id', salesCtrl.updateSale)
module.exports = router