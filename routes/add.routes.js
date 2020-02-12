const express = require('express')
const router =  express.Router()

const addCtrl = require('../controllers/add.controller')

router.get('/', addCtrl.getAdds)
router.post('/', addCtrl.createAdd)
router.get('/category/:id', addCtrl.getAddbycategory)
router.get('/company/:id', addCtrl.getAddbycompany)
router.put('/:id', addCtrl.updateAdd)
router.delete('/:id', addCtrl.deleteAdd)

module.exports = router