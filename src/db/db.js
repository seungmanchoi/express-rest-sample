var mysql = require('mysql');

require('dotenv').config();

var HOST = process.env.DB_HOST;
var USER = process.env.DB_USER;
var PASSWORD = process.env.DB_PASSWORD;
var DATABASE = process.env.DATABASE;

var getMySQLConnection = function () {
	var connection = mysql.createConnection({
		host     : HOST,
		user     : USER,
		password : PASSWORD,
		database : DATABASE
	});
	
	return connection;
};

module.exports = getMySQLConnection;
