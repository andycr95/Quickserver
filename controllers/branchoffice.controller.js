const branchofficeCtrl = {}
const Branchoffice = require('../models/branchOffice')
const City = require('../models/city')
const mongoose = require("mongoose");

branchofficeCtrl.getBranchoffices = async (req, res) => {
    const branchoffice = await Branchoffice.find()
    res.json({ branchoffice })
}

branchofficeCtrl.getBranchofficeByCity = async (req, res) => {
    const city = await City.findById(req.body.city)
    const branchoffice = await Branchoffice.findOne({ idcompany: req.body.company }, { name: city.name }, { status: true })
    res.json(branchoffice)
}

branchofficeCtrl.getBranchofficeByCompany = async (req, res) => {
    const branchoffice = await Branchoffice.find({ idcompany: req.params.id, status: true })
    res.json({
        status: true,
        branchoffice
    })
}

branchofficeCtrl.getBranchoffice = async (req, res) => {
    const branchoffice = await Branchoffice.findById(req.params.id)
    res.json(branchoffice)
}

branchofficeCtrl.createBranchoffice = async (req, res) => {
    const idcompany = req.body.company._id
    const branchoffice = new Branchoffice({
        idcompany: mongoose.Types.ObjectId(idcompany),
        name: req.body.point.name,
        address: req.body.point.address,
        status: true,
    })
    await branchoffice.save()
    res.json({
        status: true
    })
}

branchofficeCtrl.updatePoint = async (req, res) => {
    const { id } = req.params
    const point = {
        name: req.body.name,
        idcompany: mongoose.Types.ObjectId(req.body.idcompany),
        address: req.body.address,
        updated_at: new Date()
    }
    await Branchoffice.findByIdAndUpdate(id, { $set: point }, { new: true })
    res.json({
        status: 'Point updated'
    })
}

branchofficeCtrl.deletePoint = async (req, res) => {
    const point = {
        status: false
    }
    await Branchoffice.findByIdAndUpdate(req.params.id, { $set: point })
    res.json({
        status: 'Point removed'
    })
}


module.exports = branchofficeCtrl