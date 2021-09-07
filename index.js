const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

mysql.createConnection(
    {
        host: '',
        user: '',
        password: '',
        database: ''
    }
).then((connection) => {
    console.info('Connected to database.');
    const db = connection

    db.query()
})