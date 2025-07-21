const { StatusCodes } = require("http-status-codes")
const taskService = require("../services/taskService")




module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
