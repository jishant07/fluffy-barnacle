var taskRouter = require('express').Router()
var taskController = require("../controllers/taskController")
const authMiddleware = require('../middlewares/authMiddleware')
taskRouter.use(authMiddleware)

taskRouter.route("/addTask").post(taskController.addTask)
taskRouter.route("/editTask").patch(taskController.editTask)
taskRouter.route("/deleteTask").delete(taskController.deleteTask)
taskRouter.route("/listTasks").get(taskController.listTasks)

module.exports = taskRouter