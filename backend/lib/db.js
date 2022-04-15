
var mysql = require('mysql');

var dbConn = mysql.createPool({
	host:'localhost',
	user:'fooduser',
	password:'foodpass',
	database:'food4u',
  acquireTimeout: 1000,
  connectionLimit: 100
});
dbConn.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Time to bake!');
	}
});

module.exports  = dbConn;
  