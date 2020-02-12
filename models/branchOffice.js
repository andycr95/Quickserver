const mongoose = require('mongoose')

const branchofficeSchema = new mongoose.Schema
({
    idcompany : {type:mongoose.Schema.Types.ObjectId, ref:'company'} ,
    name : String,
    address: String,
    status: Boolean,
})
module.exports = mongoose.model('branchoffice', branchofficeSchema )
