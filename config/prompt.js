module.exports = {

    startPrompts: {
        type: "list",
        name: "task",
        message: "Select an option",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Close Appliction",
        ],
    },

    // Prompts for ADD
    addDepartment: {
        name: "Department",
        tpye: "input",
        message: "Enter department name",
    },

    addRole: (departmentChoices) => [
        {
            type: "input",
            name: "newRole",
            message: "Enter new role",
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Enter new role salary",
        },
        {
            type:"list",
            name: "deparmentId",
            message: "Select a deparment",
            choices: departmentChoices,
        },
    ],
    
    addEmployee: (departmentArray, roleArray, managerArray) => [
        {
            name: "firstName",
            type: "input",
            message:"Enter employees first name",
        },
        {
            name: "lastName",
            type: "input",
            messsage: "Enter employees last name",
        },
        {
            name: "department",
            type: "list",
            message: "Select employee's department",
            choices: departmentArray,
        },
        {
            name: "role",
            type: "list",
            message: "Select employee's role",
            choices: roleArray,
        },
        {
            name:"manager",
            type: "list",
            message: "Select employee's manager",
            choices: managerArray,
        },
    ],

}