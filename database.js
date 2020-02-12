const mongoose = require('mongoose')

const config = require('./config')

mongoose.connect(config.Urldb, { useNewUrlParser: true ,  useCreateIndex: true, })
 .then(db => console.log("Connect to DB"))
 .catch(err => console.log(err))

 module.exports = mongoose

 