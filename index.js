var app = require('express')()
var cookieParser = require('cookie-parser')
var expressSession = require('express-session')
var mongoDBStore = require('connect-mongodb-session')(expressSession)
var globalModel = require('./models/globalModel')
var PORT = process.env.PORT || 3000;

var mongoStore = new mongoDBStore({
    uri : globalModel.MONGO_URI,
    databaseName : 'elRed',
    collection : "sessions"
})

app.use(cookieParser())
app.use(expressSession({
    secret: "07a617be1f3b266bc0c749956a982070",
    saveUninitialized:true,
    cookie: { maxAge: 30000 },
    resave: false,
    rolling : false,
    store : mongoStore
}));

app.listen(PORT , ()=>{console.log("Server Running @ " + PORT)})