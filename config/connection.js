const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "Alk617!!!",
    database: 'employeedb',
});

connection.connect(function (err) {
    if (err) throw err;
});


module.exports = connection;