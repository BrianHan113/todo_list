-- docker cp C:\Users\brian\Documents\code\todo_list\backend\src\data\schema.sql postgres-db:/docker-entrypoint-initdb.d/

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL, -- bcrypt hashes are 60 char
  dob DATE
);

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  position INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT unique_user_position UNIQUE (user_id, position),
  CHECK (position > 0)
);

CREATE INDEX idx_user_task ON tasks(user_id, task_id); -- for speeding up get, delete, update task for a user
CREATE INDEX idx_user_position ON tasks(user_id, position); -- for speeding up getTasksOrderedByPosition in Task model