const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema
({
    roleName : String ,
    status : { type: Boolean, default: true }, 
    created_at : { type : Date , default : Date.now() },
    updated_at : Date
})
module.exports = mongoose.model('role', RoleSchema )
