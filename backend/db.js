const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@prema180805",
    database: "ecommerce"
});

module.exports = connection;