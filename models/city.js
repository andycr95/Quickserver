const mongoose = require('mongoose')

const citySchema = new mongoose.Schema
({
    name : String,
    status: { type: Boolean, default: true }
})
module.exports = mongoose.model('city', citySchema )
