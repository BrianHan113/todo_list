-- docker cp C:\Users\brian\Documents\code\todo_list\backend\src\data\seed.sql postgres-db:/docker-entrypoint-initdb.d/

-- Clear existing data
TRUNCATE TABLE tasks, users RESTART IDENTITY CASCADE;

-- Seed users
INSERT INTO users (username, password, dob) VALUES
('alice', '$2a$12$pFGfXtqXh3fwQMYfzVm/eOcjEM.T2fWE.zH2ZElwjAWklc2O9rA/y', '1990-05-15'),
('bob', '$2a$12$Z9F5p4rsGie00aKUX2iuf.9T50xbOiPSsBrqmM.t03LL1ncsG586W', '1985-11-22'),
('charlie', '$2a$12$OXGRUs7WkItnd7UNcbv25uFjQMwOLlIV5/IKMkxQp9J8NPcUJ3ViK', '1995-03-08');

-- Seed tasks for alice (user_id 1)
INSERT INTO tasks (user_id, title, description, position) VALUES
(1, 'Buy groceries', 'Milk, eggs, bread, and fruits', 1),
(1, 'Finish project', 'Complete the API documentation', 2),
(1, 'Call mom', 'Wish her happy birthday', 3);

-- Seed tasks for bob (user_id 2)
INSERT INTO tasks (user_id, title, description, position) VALUES
(2, 'Morning run', '5k around the park', 1),
(2, 'Read book', 'Chapter 5 of Clean Code', 2);

-- Seed tasks for charlie (user_id 3)
INSERT INTO tasks (user_id, title, position) VALUES
(3, 'Set up meeting', 1),
(3, 'Review PRs', 2);