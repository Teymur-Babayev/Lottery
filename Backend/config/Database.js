var mysql = require('mysql');

exports.DBconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lottery"
});

