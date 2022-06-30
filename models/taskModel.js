var taskModel = {}
var taskSchema  = require("../schemas/taskSchema")
var mongoose = require('mongoose')

taskModel.addTask = (body) =>{
    return new Promise((resolve, reject) =>{
        body.deadline = new Date(body.deadline)
        taskSchema.create({...body}).then(taskData =>{
            resolve(taskData['_doc'])
        }).catch(err =>{
            reject(err)
        })
    })
}

taskModel.editTask = (taskId,userId,editObject) =>{
    return new Promise((resolve, reject) =>{
        delete editObject.taskId
        taskSchema.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId(taskId),userId},
            {...editObject},
            {new : true}
        ).then(edit =>{
            resolve(edit)
        }).catch(err =>{
            reject(err)
        })
    })
}

taskModel.listTasks = (userId) =>{
    return new Promise((resolve, reject) =>{
        taskSchema.find({
            userId : userId
        }).then(tasks =>{
            resolve(tasks)
        }).catch(err =>{
            reject(err)
        })
    })
}

taskModel.deleteTask = (taskId, userId) =>{
    return new Promise((resolve, reject) =>{
        taskSchema.deleteOne(
            {
                _id:mongoose.Types.ObjectId(taskId), userId, 
            }
        ).then(deletedTask =>{
            resolve(deletedTask)
        }).catch(err =>{
            reject(err)
        })
    })
}

module.exports = taskModel