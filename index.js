const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");
require("dotenv").config();

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

        console.log(main);

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

                break;
            case "Add Department":

                break;
            case "Add Role":

                break;
            case "Update Employee Role":

                break;
            default:
                console.log("Select and option");
        };

    }).catch((err) => console.error(err));
};



const viewEmployees = () => {

    mysql.createConnection(connParams)
        .then((connection) => {

            const db = connection

            db.query("SELECT first_name, last_name FROM employee JOIN emp_role ON employee.role_id = emp_role.id;")
                .then((results) => {
                    console.table(results[0]);
                    initialPrompt();
                })
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));

};

const viewDepartments = () => {

    db.query("SELECT ")
}

init();







