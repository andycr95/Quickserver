const moongose = require('mongoose')
const Submenu = require('../models/submenu')
const MenuSchema = new mongoose.Schema
({
    menuName : String ,
    action : String ,
    icon : String ,
    status : Boolean , default: true,
    children : Boolean ,
    order : Number ,
    submenu : [{type:mongoose.Schema.Types.ObjectId, ref: Submenu }] ,
    created_at : { type : Date , default : Date.now() } ,
    updated_at    :  Date 
})
exports.module = mongoose.model('Menu', MenuSchema )