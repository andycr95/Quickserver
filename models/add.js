const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const addSchema = new mongoose.Schema
({
    name : String,
    idcategory : {type: Schema.Types.ObjectId, ref:'category'},
    price:  Number,
    idcompany : {type: Schema.Types.ObjectId, ref:'company'},
    status: { type: Boolean, default: false },
    created_at : { type : Date , default : Date.now() } ,
    updated_at : Date 
})
module.exports = mongoose.model('add', addSchema )
