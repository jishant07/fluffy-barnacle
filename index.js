require('dotenv').config()
var app = require('express')()
var cookieParser = require('cookie-parser')
var expressSession = require('express-session')
var mongoDBStore = require('connect-mongodb-session')(expressSession)
var globalModel = require('./models/globalModel')
var bodyParser = require('body-parser')
var databaseModel = require("./models/databaseModel")
var PORT = process.env.PORT || 3000;

var mongoStore = new mongoDBStore({
    uri : process.env.MONGO_URI,
    databaseName : 'elRed',
    collection : "sessions"
})
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
    secret: "07a617be1f3b266bc0c749956a982070",
    saveUninitialized:true,
    cookie: { maxAge: 30000 * 200 },
    resave: false,
    rolling : false,
    store : mongoStore
}));

app.get("/checksession", (req,res) =>{
    res.json(req.session)
})
app.get("/",(req,res) =>{
    res.json({
        status : "success",
        message : "Server is Up"
    })
})
app.use("/auth", require("./routes/authRouter"))
app.use("/task", require("./routes/taskRouter"))

app.listen(PORT , ()=>{console.log("Server Running @ " + PORT)})