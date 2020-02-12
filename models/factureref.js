const mongoose = require('mongoose')

const facturerefSchema = new mongoose.Schema
({
    numInicio: Number,
    numFin : Number,
    idbranchoffice : {type: mongoose.Schema.Types.ObjectId, ref:'branchoffice'},
    status: Boolean
})
module.exports = mongoose.model('factureref', facturerefSchema )
