const mongoose = require('mongoose')

const companySchema = new mongoose.Schema
    ({
        name: String,
        nit: String,
        businessname: String,
        delivery: String,
        img: String,
        horaryinit: String,
        horaryend: String,
        idcity: { type: mongoose.Schema.Types.ObjectId, ref: 'cities' },
        iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        status: { type: Boolean, default: true },
        like: { type: Boolean, default: true }
    })

module.exports = mongoose.model('company', companySchema)