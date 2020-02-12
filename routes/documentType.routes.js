const express = require('express')
const router =  express.Router()

const documentTypeCtrl = require('../controllers/documentType.controller')

router.get('/', documentTypeCtrl.getDocuments)
module.exports = router