var mysql = require('mysql');
//var queryStr = require('./query');
var source = {

	localhost: {
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: 'B00tC@mp',
		database: 'nezibo', 
		multipleStatements: 'true'
	},

	nezibo: {
		port: 3306,
		host: '173.63.153.24',
		user: 'root',
		password: '4sDa54324rsdfaaasdsDFsdf',
		database: 'localeze', 
		multipleStatements: 'true'
	}

}

//var offset = 0;


var connection = mysql.createConnection(source.localhost);

var offsetStr = 0;

//queryStr = mysql.format(queryStr,offsetStr);

queryStr = "Select pid from baserecords where streetname != ''";

connection.connect(function(err) {
	if (err) {
		console.log('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);''
});
//console.log(queryStr);
connection.query(queryStr, function(err, res, fields){
	console.log(queryStr);
	if (err) throw err;
	//var counts = res[0].count;

	console.log('Results: ' + '\n' + res);
	//console.log("Total number of files required: " + Math.ceil(counts / 49000));
	connection.end();
	console.log('connection closed...goodbye');
});


