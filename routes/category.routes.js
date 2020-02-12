const express = require('express')
const router =  express.Router()

const categoryCtrl = require('../controllers/category.controller')

router.get('/', categoryCtrl.getCategorys)
router.get('/:id', categoryCtrl.getCategory)
router.get('/type/:type', categoryCtrl.getCategoryType)
router.post('/create', categoryCtrl.createCategory)
router.post('/search', categoryCtrl.searchCategory)
router.put('/:id', categoryCtrl.updateCategory)
router.delete('/', categoryCtrl.deleteCategory)

module.exports = router