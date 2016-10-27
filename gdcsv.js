var mysql = require('mysql');
var source = {

	localhost: {
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: 'B00tC@mp',
		database: 'nezibo'
	},

	nezibo: {
		port: 3306,
		host: '173.63.153.24',
		user: 'root',
		password: '4sDa54324rsdfaaasdsDFsdf',
		database: 'localeze'
	}

}

var connection = mysql.createConnection(source.localhost);



connection.connect(function(err) {
	if (err) {
		console.log('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);''
});

connection.query("SELECT count(*) as count FROM baserecords where streetname != ''", function(err, res){
	if (err) throw err;
	var counts = res[0].count;
	console.log(counts, ' total records to process.');
	console.log("Total number of files required: " + Math.ceil(counts / 49000));
	connection.end();
	console.log('connection closed...goodbye');
});


