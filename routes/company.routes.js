const express = require('express')
const router =  express.Router()

const companyCtrl = require('../controllers/company.controller')
const productCtrl = require('../controllers/product.controller')

router.get('/', companyCtrl.getCompanys)
router.get('/todos', companyCtrl.getCompanybyMont)
router.get('/:id', companyCtrl.getCompany)
router.get('/user/:id', companyCtrl.getCompanies)
router.get('/likes/:iduser', companyCtrl.getLikesCompany)
router.get('/like/:id', companyCtrl.getLikesByCompany)
router.put('/city/:idcity', companyCtrl.getCompanyByCity)
router.post('/search', companyCtrl.searchCompany)
router.post('/create', companyCtrl.createCompany)
router.put('/:id', companyCtrl.updateCompany)
router.delete('/:id', companyCtrl.deleteCompany)
router.post('/deslike', companyCtrl.DeslikeCompany)
router.post('/like', companyCtrl.LikeCompany)
router.get('/products/:id', productCtrl.getProductbycompany)

module.exports = router 