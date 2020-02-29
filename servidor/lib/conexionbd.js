var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: '33060',
  user: 'root',
  password: 'acamica-mysql',
  database: 'peliculas',
});

module.exports = connection;

