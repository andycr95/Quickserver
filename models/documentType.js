const mongoose = require('mongoose')

const documentTypeSchema = new mongoose.Schema
({
    identifier: Number,
    typeDocument : String,
    estatus: Boolean
})
module.exports = mongoose.model('documentType', documentTypeSchema )
