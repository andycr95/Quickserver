const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const salesSchema = new  Schema
({
    name : String,
    price:  Number,
    img: String,
    description: String,
    idcompany : {type: Schema.Types.ObjectId, ref:'company'},
    status: { type: Boolean, default: true },
    created_at : { type : Date , default : Date.now() } ,
    updated_at : Date 
})
module.exports = mongoose.model('sale', salesSchema )
