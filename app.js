//Dependencies 
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "practice123",
  database: "employeedb_db"
});


//Connect and prompt with questions.//
connection.connect(function (err) {
  if (err) throw err
  console.log("Connected as Id" + connection.threadId)
  startScreen();
});


//Questions//
function startScreen() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then(function (result) {
      //Return option selected.
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Departments":
          viewDepartment();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        default:
          quit();
      }
    });
}


//All of the corresponding functions found below

function viewEmployees() {
  // select from the db
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

function viewDepartment() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

function addEmployee() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err
    console.table(res);

    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the employee?",
          name: "eeFirstName"
        },
        {
          type: "input",
          message: "What's the last name of the employee?",
          name: "eeLastName"
        },
        {
          type: "input",
          message: "What is the employee's role id number?",
          name: "roleID"
        },
        {
          type: "input",
          message: "What is the manager id number?",
          name: "managerID"
        }
      ])
      .then(function (answer) {


        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function (err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        })
      });
  });
}

function addDepartment() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err
    console.table(res);

    inquirer.prompt({

      type: "input",
      message: "What is the name of the department?",
      name: "deptName"

    }).then(function (answer) {



      connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()
      })
    });
  });
}


function addRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err
    console.table(res);
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the name of the role?",
          name: "roleName"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "deptID"
        }
      ])
      .then(function (answer) {


        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        })
      });
  });
}


function updateEmployeeRole() {
  connection.query("SELECT employee.id, employee.first_name, role.title, employee.role_id FROM employee JOIN role ON employee.role_id = role.id;", function (err, res) {
    if (err) throw err
    console.table(res);

    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "employeeUpdating"
        },

        {
          type: "input",
          message: "What do you want to update to?",
          name: "updatedRole"
        }
      ])
      .then(function (answer) {
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updatedRole, answer.employeeUpdating], function (err, res) {
          if (err) throw err;
          console.table(answer);
          startScreen();
        })
      });
  });
}


function quit() {
  connection.end();
  process.exit();
}