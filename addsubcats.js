var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Nightmare = require('nightmare');
//require('nightmare-upload')(Nightmare);
//var nightmare = Nightmare();
Nightmare.action('upload', function(done){
	this.evaluate_now(function(){
		var filePath = 'C:\ProgramData\MySQL\MySQL Server 5.7\Uploads\customquery_new_format_800.2-32001.csv';
	})
})
//var Nightmare = require('nightmare');       
var nightmare = Nightmare({openDevTools: {
    mode: 'detach',
  },
  show: true, 
  timout: 2000 });
var request = require('request');
var url = "http://nezibo.com/index.php/admin/sitepage/settings/sitepagecategories";
var url2new = "http://nezibo.com/index.php/admin/sitepage/importlisting/import"
//var importurl = 
//var url2 = "https://skyjacker.com/s?=";
var cheerio = require('cheerio');
var app = express();
var PORT = process.env.PORT||8118;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// LISTENER
app.listen(PORT, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get('/nezibo/:id/:subcat', function(req, res){
	request(url, function(error, response, html){
		var $ = cheerio.load(html,{
			normalizeWhitespace:true
		});
		if (error) throw error;
		var catid = req.params.id;
		var catname = req.params.subcat.replace('%20',' ');
		nightmare
		.goto(url)
		.click('#cat_'+ catid +' > .sitepage_add_new_cat > a')
		.type('#cat_new', catname)
		.then(function(result){
			res.send("Category Created");
		})
		.catch(function(error){
			res.send(error);
		})
	});
});

app.get('/nezibo/import/', function(req, res){
		request(url2new, function(error, response, html){
		var $ = cheerio.load(html,{
			normalizeWhitespace:true
		});
		if (error) throw error;
		var import_button_id = $('#filename');
		//var catname = req.params.subcat.replace('%20',' ');
		nightmare
		.goto(url2new)
		//.upload(import_button_id,)
		.click('#filename')
		.then(function(result){
			res.send("Page Found");
			console.log("Made it to the page...");
		})
		.catch(function(error){
			res.send(error);
		})
	});
})

