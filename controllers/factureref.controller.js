const facturerefCtrl = {}
const mongoose = require("mongoose")
const Factureref =  require('../models/factureref')
const invoice =  require('../models/invoice')

facturerefCtrl.getFacturerefs = async (req, res ) => {
    const factureref = await Factureref.find()
    res.json(factureref)
}

facturerefCtrl.getFactureref = async (req, res ) => {
    const factureref = await Factureref.findOne({idbranchoffice : req.body.idbranchoffice})
    res.json(factureref)
}

facturerefCtrl.createFactureref = async (req, res ) => {
    var branchoffice = mongoose.Types.ObjectId(req.body.idbranchoffice)
    const factureref = new Factureref({
        numInicio: req.body.numInicio,
        numFin : req.body.numFin,
        idbranchoffice :branchoffice,
        status: true
    })
    await factureref.save()
     res.json({
         status: 'Reference facture registered'
    })
}

facturerefCtrl.updateFactureref = async (req, res ) => {
    const num = invoice.findOneAndUpdate().select("factnum")
    await factureref.save()
     res.json({
         status: 'Reference facture registered'
    })
}

module.exports = facturerefCtrl