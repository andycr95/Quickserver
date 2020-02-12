const express = require('express')
const router =  express.Router()

const invoiceCtrl = require('../controllers/invoice.controller')

router.get('/', invoiceCtrl.getInvoices)
router.get('/:id', invoiceCtrl.getInvoice)
router.post('/', invoiceCtrl.createInvoice)

module.exports = router