const inquirer = require("inquirer");
require("console.table");

const connection = require("./config/connection");
const prompt = require("./config/prompt");



// display message upon starting app
console.log( 'Hello and welcome to Employee Tracker! ' +
    'Engage with the prompts below to navigate through employee database');


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
                //connection.end();
                break;
        };
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
        startPrompts();
    });
};


function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(`\nROLES:\n`);
        // res.forEach((role) => {
        //     console.log(`ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`,);
        // });
        console.table(res);
        startPrompts();
    });
}


function viewEmployees() {
    var query = 
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
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


// ADD functions

function addDepartment() {
    inquirer.prompt(prompt.addDepartment).then(function (answer) {
        console.log("hello")
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.department, function (err, res) {
            if (err) throw err;
            console.log(
                `${answer.department.toUpperCase()} has been added!`
            );
            viewDepartments();
        });
    });
}


function addRole() {
    var query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if(err) throw err;
        
        const departmentChoices = res.map(({ id, name}) => ({
            value: id,
            name: `${id} ${name}`,
        }));
        inquirer
            .prompt(prompt.addRole(departmentChoices))
            .then(function (answer) {
                var query = `INSERT INTO role SET ?`;

                connection.query(
                    query,
                    {
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                        department_id: answer.departmentId,
                    },
                    function (err, res) {
                        if(err) throw err;
                        console.log("\n" + res.affectedRows + " role created");

                        viewRoles();
                    },
                );
            });
    });
}


const addEmployee = () => {

    let departmentArray = [];
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;

        res.forEach((element) => {
            departmentArray.push(`${element.id} ${element.name}`);
        });

        let roleArray = [];
        connection.query(`SELECT * FROM role`, (err, res) => {
            if (err) throw err;

            res.forEach((element) => {
                roleArray.push(`${element.id} ${element.title}`);
            });
        
        let managerArray = [];
        connection.query( `Select id, first_name, last_name FROM employee`,
        (err, res) => {
            if (err) throw err;
            res.forEach((element) => {
                managerArray.push(
                    `${element.id} ${element.first_name} ${element.last_name}`,
                );
            });

            inquirer.prompt(
                prompt.addEmployee(departmentArray, roleArray, managerArray),
            )
            .then((response) => {
                let roleReturn = parseInt(response.role);
                let managerReturn = parseInt(response.manager);
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: roleReturn,
                        manager_id: managerReturn,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log("\n" + res.affectedRows + "employee added");
                        viewEmployees();
                    },
                );
            });
          },
         );
       });
    });
};


// UPDATE function 

const updateEmployeeRole = () => {
    let employees = [];
    connection.query(`SELECT id, first_name, last_name FROM employee`,
    (err, res) => {
        if (err) throw err;
       
        res.forEach((element) => {
            employees.push(`${element.id} ${element.first_name} ${element.last_name}`
            );
        });

        let job = [];
        connection.query(`SELECT id, title FROM role`, (err, res) => {
            if (err) throw err;

            res.forEach((element) => {
                job.push(`${element.id} ${element.title}`);
            });

            inquirer.prompt(prompt.updateRole(employees, job)).then((response) => {
                let idReturn = parseInt(response.role_id);
                let roleReturn = parseInt(response.employee_id);
                connection.query(`UPDATE employee SET role_id = ${roleReturn} WHERE id = ${idReturn}`,
                (err, res) => {
                    if (err) throw err;

                    console.log("\n" + "\n" + res.affectedRows + " Employee role updated",);
                    startPrompts();
                },
                );
            });
        });
      },   
    );
};

connection.connect(function (err) {
    if (err) throw err;
    startPrompts();
});

