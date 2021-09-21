require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");

const connParams = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};


// initializing app
const init = () => {


    `____________________________________________________________
    |                                                          |
    |     ______                 _                             |
    |    | _____|_ __ ___  _ __ | | ___  _   _  ___  ___       |
    |    |  _|  | '_  '_ \| '_ \| |/ _ \| | | |/ _ \/ _ \      |
    |    | |____| | | | | | |_) | | (_) | |_| |  __/  __/      |
    |    |______|_| |_| |_| .__/|_|\___/\___, |\___|\___|      |
    |                     |_|            |___/                 |
    |                                                          |
    |     __  __                                               |
    |    |  \/  | __ _ _ __   __ _  __ _  ___ _ __             |
    |    | |\/| |/ _' | '_ \ / _' |/ _' |/ _ \ '__|            |
    |    | |  | | (_) | | | | (_| | (_| |  __/ |               |
    |    |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|               |
    |                              |___/                       |
    |__________________________________________________________| `;

    initialPrompt();



};



//main menu inquirer prompts
const initialPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "main",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role"
            ]
        }
    ]).then((data) => {
        const { main } = data;

        switch (main) {
            case "View All Employees":
                viewEmployees();

                break;
            case "View All Departments":
                viewDepartments();

                break;
            case "View All Roles":
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
                updateRole();

                break;
            default:
                console.log("Select an option");
        };


    }).catch((err) => console.error(err));

};

const viewEmployees = () => {

    mysql.createConnection(connParams)
        .then((connection) => {

            const db = connection;

            db.query("SELECT * FROM employee JOIN emp_role ON employee.role_id = emp_role.id JOIN department ON emp_role.department_id = department.id;")
                .then((results) => {
                    console.table(results[0]);
                    initialPrompt();
                })
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));

};

const viewDepartments = () => {
    mysql.createConnection(connParams)
        .then((connection) => {

            const db = connection;

            db.query("SELECT * FROM department;")
                .then((results) => {
                    console.table(results[0]);
                    initialPrompt();
                })
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));


};

const viewRoles = () => {
    mysql.createConnection(connParams)
        .then((connection) => {

            const db = connection;

            db.query("SELECT * FROM emp_role JOIN department ON emp_role.department_id = department.id;")
                .then((results) => {
                    console.table(results[0]);
                    initialPrompt();
                })
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));


};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter employee first name:"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter employee last name:"
        },
        {
            type: "input",
            name: "roleId",
            message: "Enter employee role ID:"
        },
        {
            type: "input",
            name: "managerId",
            message: "Enter manager ID:"
        }

    ]).then((data) => {
        const { firstName, lastName, roleId, managerId } = data;

        mysql.createConnection(connParams)
            .then((connection) => {
                const db = connection;

                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${firstName}", "${lastName}", ${roleId}, ${managerId});`)
                    .then((results) => {
                        console.table(results[0]);
                        initialPrompt();

                    }).catch((err) => console.error(err));

            }).catch((err) => console.error(err));

    }).catch((err) => console.error(err));

};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Add department:"
        }
    ]).then((data) => {
        const { department } = data;

        mysql.createConnection(connParams)
        .then((connection) => {
            const db = connection;
            db.query(`INSERT INTO department (name) VALUES ("${department}");`)
            .then((results) => {
                console.table(results[0]);
                initialPrompt();
            }).catch((err) => console.error(err));
        }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));
};

const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Add role title:"
        },
        {
            type: "input",
            name: "salary",
            message: "Add role salary:"
        },
        {
            type: "input",
            name: "department_id",
            message: "Add department ID:"
        }
    ]).then((data) => {
        const { title, salary, department_id } = data;

        mysql.createConnection(connParams)
        .then((connection) => {
            const db = connection;
            db.query(`INSERT INTO emp_role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id});`)
            .then((results) => {
                console.table(results[0]);
                initialPrompt();
            }).catch((err) => console.error(err));
        }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));
};

const updateRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "emp_id",
            message: "What is the ID# of the employee you would like to update?"
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the role ID# you would like to change to:"
        }
    ]).then((data) => {
        const { emp_id, role_id } = data;

        mysql.createConnection(connParams)
        .then((connection) => {
            const db = connection;
            db.query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${emp_id};`)
            .then((results) => {
                if (!results) {
                    console.info("Enter a valid ID!");
                    return;
                }
                console.table(results[0]);
                initialPrompt();
            }).catch((err) => console.error(err));
        }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));

}


init();











