const express = require('express')
const router =  express.Router()

const productCtrl = require('../controllers/product.controller')

router.get('/', productCtrl.getProducts)
router.get('/:id', productCtrl.getProduct)
router.get('/company/:id', productCtrl.getProductbycompany)
router.get('/category/:id', productCtrl.getProductbycategory)
router.put('/categorys/:name', productCtrl.getProductbycategorys)
router.post('/create', productCtrl.createProduct)
router.post('/search', productCtrl.searchProduct)
router.put('/:id', productCtrl.updateProduct)
router.delete('/:id', productCtrl.deleteProduct)

module.exports = router