const hourCtrl = {}

const mongoose = require("mongoose")

const Hour =  require('../models/hour')

hourCtrl.getHours = async (req, res ) => {
    const hour = await Hour.find()
    res.json(hour)
}

hourCtrl.getHourbycompany = async (req, res ) => {
    const hours = await Hour.find({idcompany:req.params.id})
    res.json({
        status:true,
        hours
    })
}


hourCtrl.createHour = async (req, res ) => {
        const sale = new Hour({
            hourinit : req.body.hourinit
        })
        await sale.save() 
        res.json({
            status: 'Hora registrada'
        })
}



module.exports = hourCtrl