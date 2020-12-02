USE employee_tracker;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'), 
    ('Finance'),
    ('Planning'),
    ('Opration');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 160000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 100000, 3),
    ('Accountant', 85000, 3),
    ('Planning Manager', 150000, 4),
    ('Planner', 90000, 4),
    ('Opration Head', 135000, 5),
    ('Opration Engineer', 120000, 5);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Cristina', 'Frost', 1, NULL),
    ('Scott', 'Comroe', 2, 1),
    ('Amy', 'Rodgers', 3, NULL),
    ('Kelly', 'Green', 4, 3),
    ('Vishal', 'Soni', 5, NULL),
    ('Mary', 'Ryan', 6, 5),
    ('James', 'Lords', 7, NULL),
    ('Tina', 'Brody', 8, 7),
    ('Kelly', 'Rodds', 9, Null),
    ('Sienna', 'Rice', 10, 9);