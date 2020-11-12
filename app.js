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
  begin();
});


//Questions//
function begin() {
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
          viewEmps();
          break;
        case "View Departments":
          viewDept();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Add Department":
          addDept();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;
        default:
          quit();
      }
    });
}


//Functions

function viewEmps() {
  // select from the db
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });

}

function viewDept() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });

}

function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });

}

function addEmp() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err
    console.table(res);

    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the employee?",
          name: "empFirstName"
        },
        {
          type: "input",
          message: "What's the last name of the employee?",
          name: "empLastName"
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


        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.empFirstName, answer.empLastName, answer.roleID, answer.managerID], function (err, res) {
          if (err) throw err;
          console.table(res);
          begin();
        })
      });
  });
}

function addDept() {
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
        begin();
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
          name: "salary"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "deptID"
        }
      ])
      .then(function (answer) {


        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salary, answer.deptID], function (err, res) {
          if (err) throw err;
          console.table(res);
          begin();
        })
      });
  });
}


function updateEmpRole() {
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
          begin();
        })
      });
  });
}


function quit() {
  connection.end();
  process.exit();
}