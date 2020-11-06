DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employees (
  
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL,
  -- PRIMARY KEY (id)
  
);



CREATE TABLE roles (
  
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INT default 0,
    
);



CREATE TABLE departments (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  deptName VARCHAR(30) NOT NULL,
);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;
