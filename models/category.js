const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema
({
    name : String,
    type : String,
    status: { type: Boolean, default: true }
})
module.exports = mongoose.model('category', categorySchema )
