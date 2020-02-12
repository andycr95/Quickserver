const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema
({
    idcompany :{type:mongoose.Schema.Types.ObjectId, ref:'companys'},
    iduser :{type:mongoose.Schema.Types.ObjectId, ref:'users'},
})
module.exports = mongoose.model('like', likeSchema )
