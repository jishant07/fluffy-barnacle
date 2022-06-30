const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Date, Task : String,  Status : Completed / Incomplete

var taskSchema = new Schema({
    userId : {
        type : mongoose.Schema.ObjectId, 
        ref : "User",
        required : true
    },
    timestamp : {
        type : Date,
        default : () => Date.now()
    },
    date : {
        type : Date,
        required : true
    },
    taskString : {
        type : String, 
        required : true
    },
    status : {
        type : String,
        required : true,
        enum: {
            values : ['Complete', 'In-Complete'],
            message : '{VALUE} not supported' 
        },
    }
})


module.exports = mongoose.model("Task", taskSchema)