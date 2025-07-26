const { StatusCodes } = require("http-status-codes")
const taskModel = require("../models/Task")
const { createTaskSchema, updateTaskSchema } = require("../validators/taskValidator");

// No taskService as it would just be a middleman, no added business logic for this simple functionality.

const getAllTasks = async (req, res) => {
  try {
    const { user_id } = req.user;
    const tasks = await taskModel.getTasksOrderedByPosition(user_id);
    res.status(StatusCodes.OK).json({ tasks });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to fetch tasks",
    });
  }
};

const createTask = async (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
  }

  try {
    const { user_id } = req.user;
    const { title, description } = req.body;

    if (!title) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Title is required",
      });
    }

    const task = await taskModel.createTask(user_id, title, description);
    res.status(StatusCodes.CREATED).json({ task });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to create task",
    });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: task_id } = req.params;
    const { user_id } = req.user;
    const task = await taskModel.getTaskByTaskId(user_id, task_id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Task not found",
      });
    }

    res.status(StatusCodes.OK).json({ task });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to fetch task",
    });
  }
};

const updateTask = async (req, res) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
  }

  try {
    const { id: task_id } = req.params;
    const { user_id } = req.user;
    const fields = req.body;

    if (Object.keys(fields).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "No fields to update",
      });
    }

    const updatedTask = await taskModel.updateTask(user_id, task_id, fields);

    if (!updatedTask) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Task not found",
      });
    }

    if ("position" in fields) {
      const { prev, next } = await taskModel.getPositionNeighbors(user_id, fields.position, task_id);
      let needsNormalization = false;

      const gapWithPrev = prev ? Math.abs(fields.position - prev.position) : Infinity;
      const gapWithNext = next ? Math.abs(fields.position - next.position) : Infinity;

      if ((gapWithPrev <= 1) || (gapWithNext <= 1)) {
        needsNormalization = true;
      }

      if (needsNormalization) {
        await taskModel.normalizePositions(user_id);
      }
    }

    res.status(StatusCodes.OK).json({ task: updatedTask });
  } catch (err) {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update task",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: task_id } = req.params;
    const { user_id } = req.user;
    const deleted = await taskModel.deleteTask(user_id, task_id);

    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Task not found or already deleted",
      });
    }

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete task",
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
