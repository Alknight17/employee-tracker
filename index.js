const inquirer = require("inquirer");
const table = require("console.table");

const connection = require("./config/connection");
const prompt = require("./config/prompt");


// display message upon starting app
console.log( 'Hello and welcome to Employee Tracker! ' +
    'Engage with the prompts below to navigate through employee database')


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
                break
        }
    });
}
