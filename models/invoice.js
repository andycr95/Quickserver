const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema
({
    iduser : {type:mongoose.Schema.Types.ObjectId, ref:'user'},
    num : Number,
    factnum : Number,
    idbranchoffice : {type:mongoose.Schema.Types.ObjectId, ref:'branchoffice'},
    created_at : { type : Date , default : Date.now() } ,
    status : Boolean,
})

module.exports = mongoose.model('invoice', orderSchema )
