const express = require('express')
const router =  express.Router()

const facturerefCtrl = require('../controllers/factureref.controller')

router.get('/', facturerefCtrl.getFacturerefs)
router.get('/:id', facturerefCtrl.getFactureref)
router.post('/', facturerefCtrl.createFactureref)

module.exports = router