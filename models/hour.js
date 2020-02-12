const mongoose = require('mongoose')

const hourSchema = new mongoose.Schema
({
    hourinit : Number
})
module.exports = mongoose.model('hour', hourSchema )
