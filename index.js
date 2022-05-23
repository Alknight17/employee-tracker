const inquirer = require("inquirer");
const table = require("console.table");

const connection = require("./config/connection");
const prompt = require("./config/prompt");
require("console.table");


// display message upon starting app
console.log( 'Hello and welcome to Employee Tracker! ' +
    'Engage with the prompts below to navigate through employee database');


startPrompts();
// main prompt showing all tables that can be viewed 
function startPrompts() {
    inquirer.prompt(prompt.startPrompts).then(function ({ task }) {
        switch (task) {
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Close Application":
                console.log('Thank you, goodbye');
                connection.end();
                break;
        }
    });
};


// VIEW functions

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if(err) throw err;
        console.log(`\nDEPARTMENTS:\n`);
        res.forEach((department) => {
            console.log(`ID: ${department.id} | ${department.name} Department`);
        });
        firstPrompt();
    });
};


function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(`\nROLES:\n`);
        res.forEach((role) => {
            console.log(`ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`,);
        });
        startPrompts();
    });
}


function viewEmployees() {
    var query = 
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id
    `;

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        startPrompts();
    });
};