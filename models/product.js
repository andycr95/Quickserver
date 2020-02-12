const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const productSchema = new  Schema
({
    name : String,
    idcategory : {type: Schema.Types.ObjectId, ref:'category'},
    price:  Number,
    img: String,
    description: String,
    idcompany : {type: Schema.Types.ObjectId, ref:'company'},
    status: { type: Boolean, default: true },
    created_at : { type : Date , default : Date.now() } ,
    updated_at : Date 
})
module.exports = mongoose.model('product', productSchema )
