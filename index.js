const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
require("dotenv").config();

mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
).then((connection) => {
    console.info('Connected to database.');
    const db = connection

    db.query("SELECT * FROM emp_role")
    .then((results) => console.log(results))
    .catch((exc) => console.error(exc));

}).catch((exc) => console.error(exc));