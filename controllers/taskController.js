var taskController = {}
var taskModel = require("../models/taskModel")
var globalModel = require("../models/globalModel")

taskController.addTask = (req,res) =>{
    req.body.userId = req.session.userId
    taskModel.addTask(req.body).then(task =>{
        res.json(globalModel.success(task))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

taskController.editTask = (req,res) =>{
    taskModel.editTask(req.body.taskId, req.session.userId, req.body).then(editedTask =>{
        res.json(globalModel.success(editedTask))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

taskController.listTasks = (req,res) =>{
    taskModel.listTasks(req.session.userId).then(taskList =>{
        res.json(globalModel.success(taskList))
    }).catch(err =>{
        console.log("LIST TASK ERROR", err)
        res.json(globalModel.failure(err))
    })
}

taskController.deleteTask = (req,res) =>{
    taskModel.deleteTask(req.body.taskId, req.session.userId).then(deleteObject =>{
        res.json(globalModel.success(deleteObject))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

module.exports = taskController