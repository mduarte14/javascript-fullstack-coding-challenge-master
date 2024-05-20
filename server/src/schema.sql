CREATE TABLE tasks (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(255) NOT NULL,
    "completed_at" TIMESTAMP NULL,
    "group" VARCHAR(255),
    "dependency_ids" INT[],
    CHECK (completed_at IS NULL OR completed_at > '1970-01-01')
);

INSERT INTO tasks (id, task, completed_at, "group", dependency_ids) VALUES
(1, 'Go to the bank', NULL, 'Purchases', '{}'),
(2, 'Buy hammer', NULL, 'Purchases', '{1}'),
(3, 'Buy wood', NULL, 'Purchases', '{1}'),
(4, 'Buy nails', NULL, 'Purchases', '{1}'),
(5, 'Buy paint', NULL, 'Purchases', '{1}'),
(6, 'Hammer nails into wood', NULL, 'Build Airplane', '{2,3,4}'),
(7, 'Paint wings', NULL, 'Build Airplane', '{5,6}'),
(8, 'Have a snack', NULL, 'Build Airplane', '{}'),
(9, 'Build a QGL server', '2021-08-04', 'Learn GQL', '{}');