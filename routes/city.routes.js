const express = require('express')
const router =  express.Router()

const cityCtrl = require('../controllers/city.controller')

router.get('/', cityCtrl.getCitys)
router.get('/all', cityCtrl.getAllCitys)
router.get('/:id', cityCtrl.getCity)
router.post('/create', cityCtrl.createCity)
router.post('/search', cityCtrl.searchCity)
router.put('/:id', cityCtrl.updateCity)
router.delete('/', cityCtrl.deleteCity)

module.exports = router