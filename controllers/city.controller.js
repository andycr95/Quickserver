const cityCtrl = {}

const City = require('../models/city')

cityCtrl.getCitys = async (req, res) => {
    const city = await City.find({ status: true })
    res.status(200).send({ city, status: true })
}


cityCtrl.getAllCitys = async (req, res) => {
    const city = await City.find({ status: true })
    res.status(200).send({ city, status: true })
}


cityCtrl.getCity = async (req, res) => {
    const city = await City.findById(req.params.id)
    res.json(city)
}

cityCtrl.searchCity = async (req, res) => {
    const city = await City.find({ 'name': { $regex: '.*' + req.body.name + '.*' } })
    if (city) {
        res.json(city)
    }
    else {
        res.json({
            status: 'Ciudad no encontrada'
        })
    }
}

cityCtrl.createCity = async (req, res) => {
    const city = new City({
        idcity: req.body.idcity,
        name: req.body.name
    })
    await city.save()
    res.json({
        status: 'Ciudad registrada'
    })
}

cityCtrl.updateCity = async (req, res) => {
    const { id } = req.params
    const city = {
        name: req.body.name
    }
    await City.findByIdAndUpdate(id, { $set: city }, { new: true })
    res.json({
        status: 'Ciudad actualizada'
    })
}

cityCtrl.deleteCity = async (req, res) => {
    const city = {
        status: false
    }
    console.log(req.params.id, "  ", city)

    await City.findByIdAndUpdate(req.params.id, { $set: city }, { new: true })
    res.json({
        status: 'Ciudad eliminada'
    })
}

module.exports = cityCtrl