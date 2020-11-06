USE employee_db;

INSERT INTO departments (deptName)
VALUES ('Equipment Management'),('Legal'), ('Media Relations'), ('Finance'), ('PMO') ;

INSERT INTO roles (title, salary, department_id)
VALUES ('Equipment Manager', 100000, 1), ('Communications Specialist', 90000, 3), ('Accountant', 95000, 4), ('Secretary', 60000, 2), ('Project Manager', 100000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('Brian', 'Coaster', 1, null), ('Jim', 'Nal', 4, 2), ('Blake', 'Caulder', 3, null), ('Corie', 'Sayles', 2, 1), ('Sheheryar', 'Qamar', 2, 1);