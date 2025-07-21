const pool = require('../config/db')

module.exports = {
  getTasksOrderedByPosition,
  getTaskByTaskId,
  updateTask,
  deleteTask,
  createTask
}