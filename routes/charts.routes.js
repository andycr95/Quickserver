const express = require('express')
const router =  express.Router()

const chartsCtrl = require('../controllers/charts.controller')

router.get('/:id', chartsCtrl.getCharts)

module.exports = router

