const pool = require('../config/db')

const getTasksOrderedByPosition = async (user_id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY position;",
      [user_id]
    )
    return result.rows
  } catch (err) {
    console.error("Error getting tasks:", err)
    throw err
  }
}

const getTaskByTaskId = async (user_id, task_id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 AND task_id = $2;",
      [user_id, task_id]
    )
    return result.rows[0]
  } catch (err) {
    console.error("Error getting task:", err)
    throw err
  }
}

const createTask = async (user_id, title, description) => {
  try {

    const minResult = await pool.query(
      "SELECT MIN(position) AS min_pos FROM tasks WHERE user_id = $1",
      [user_id]
    )

    const minPos = minResult.rows[0].min_pos
    const newPos = (minPos !== null ? minPos : 0) - 100

    const result = await pool.query(
      "INSERT INTO tasks (user_id, title, description, position) VALUES ($1, $2, $3, $4) RETURNING *;",
      [user_id, title, description, newPos]
    )

    return result.rows[0]
  } catch (err) {
    console.error("Error creating task:", err)
    throw err
  }
}

const updateTask = async (user_id, task_id, fields) => {
  const keys = Object.keys(fields)
  const values = Object.values(fields)
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ')
  try {
    const result = await pool.query(
      `UPDATE tasks SET ${setClause} WHERE user_id = $${values.length + 1} AND task_id = $${values.length + 2} RETURNING *;`,
      [...values, user_id, task_id]
    )
    return result.rows[0]
  } catch (err) {
    console.error("Error updating task:", err)
    throw err
  }
}

const deleteTask = async (user_id, task_id) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE user_id = $1 AND task_id = $2 RETURNING *;",
      [user_id, task_id]
    )
    return result.rows[0] || null;
  } catch (err) {
    console.error("Error deleting task:", err)
    throw err
  }
}

const normalizePositions = async (user_id) => {
  try {
    await pool.query(
      `WITH ordered AS (
        SELECT task_id, ROW_NUMBER() OVER (ORDER BY position ASC) AS rn
        FROM tasks
        WHERE user_id = $1
      )
      UPDATE tasks
      SET position = ordered.rn * 100
      FROM ordered
      WHERE tasks.task_id = ordered.task_id;`,
      [user_id]
    );
  } catch (err) {
    console.error("Error normalizing task positions:", err);
    throw err;
  }
};

const getPositionNeighbors = async (user_id, position, task_id) => {
  try {
    const params = [user_id, position, task_id];

    const prevQuery = `
      SELECT * FROM tasks
      WHERE user_id = $1 AND position < $2 AND task_id != $3
      ORDER BY position DESC
      LIMIT 1
    `;

    const nextQuery = `
      SELECT * FROM tasks
      WHERE user_id = $1 AND position > $2 AND task_id != $3
      ORDER BY position ASC
      LIMIT 1
    `;

    const [prevResult, nextResult] = await Promise.all([
      pool.query(prevQuery, params),
      pool.query(nextQuery, params),
    ]);

    return {
      prev: prevResult.rows[0] || null,
      next: nextResult.rows[0] || null,
    };
  } catch (err) {
    console.error("Error getting position neighbors:", err);
    throw err;
  }
}

module.exports = {
  getTasksOrderedByPosition,
  getTaskByTaskId,
  createTask,
  updateTask,
  deleteTask,
  normalizePositions,
  getPositionNeighbors
}
