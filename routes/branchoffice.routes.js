const express = require('express')
const router =  express.Router()

const branchofficeCtrl = require('../controllers/branchoffice.controller')

router.get('/', branchofficeCtrl.getBranchoffices)
router.get('/:id', branchofficeCtrl.getBranchoffice)
router.get('/company/:id', branchofficeCtrl.getBranchofficeByCompany)
router.post('/city', branchofficeCtrl.getBranchofficeByCity)
router.post('/', branchofficeCtrl.createBranchoffice)
router.put('/:id', branchofficeCtrl.updatePoint)
router.delete('/:id', branchofficeCtrl.deletePoint)

module.exports = router

