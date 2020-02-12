const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const orderSchema = new Schema
({
    idInvoice : {type: Schema.Types.ObjectId, ref:'invoice'},
    idbranchoffice : {type: Schema.Types.ObjectId, ref:'branchOffice'},
    idUser : {type: Schema.Types.ObjectId, ref:'user'},
    products :  [{type: Schema.Types.ObjectId, ref:'product'}],
    adds :  [{type: Schema.Types.ObjectId, ref:'add'}],
    price: Number,
    company: String,
    status: Boolean,
    address: String,
    coment: String,
    where: String,
    created_at : { type : Date , default : Date.now() } ,
    updated_at : Date 
})

module.exports = mongoose.model('order', orderSchema )
