const mongoose = require('mongoose')
const globalModel = require('../models/globalModel')

mongoose.connect(globalModel.MONGO_URI).catch(err =>{
    console.log("MONGO DB CONNECTION ERROR.")
})
var db  = mongoose.connection

module.exports = db;