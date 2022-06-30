var dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const globalModel = require('../models/globalModel')

mongoose.connect(process.env.MONGO_URI).catch(err =>{
    console.log("MONGO DB CONNECTION ERROR.")
})
var db  = mongoose.connection

module.exports = db;