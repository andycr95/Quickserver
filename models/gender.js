const mongoose = require('mongoose')

const genderSchema = new mongoose.Schema
({
    idgender: Number,
    gender : String,
    status: Boolean
})
module.exports = mongoose.model('genders', genderSchema )
