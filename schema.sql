DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employees (
  
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT default 0,
  manager_id INT NULL,
  -- PRIMARY KEY (id)
  
);

SELECT * FROM employees;

CREATE TABLE roles (
  
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  role_id INT default 0,
  manager_id INT NULL,
  -- PRIMARY KEY (id)
  
);

SELECT * FROM roles;

CREATE TABLE departments (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  deptName VARCHAR(30) NOT NULL,
);

SELECT * FROM departments;