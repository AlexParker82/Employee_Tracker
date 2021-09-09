const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");
require("dotenv").config();

mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
).then((connection) => {
    console.info("Connected to database.");
    const db = connection

    db.query("SELECT * FROM emp_role")
    .then((results) => {
        const table = cTable.getTable(results[0]);

        console.log(table);
    })
    .catch((exc) => console.error(exc));

}).catch((exc) => console.error(exc));
