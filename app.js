var express = require("express");
var app = express();
var request = require("request");
const path = require('path');
var bodyParser = require("body-parser");
var userID = "0";
var fs = require("fs");

app.use(bodyParser.urlencoded({extended: true}));


//app.use(express.static(path.join(__dirname, 'views')));

app.get("/",function(req,res) {
	res.redirect("/loginPage")
})

app.get("/loginPage",function(req, res) {
	res.sendFile("C:/Users/Owner/Desktop/MiniProject/views/loggedOut.html");
})

app.post("/register", function(req, res) {
	console.log(req.body);
	var partialID = req.body.theName.substring(0,30);
	var obj = {
		table: []
	};
	obj.table.push({id: partialID, data: [["bedroom",1,2,3]]});
	var json = JSON.stringify(obj);
	fs.writeFile("./userData.json",json,function(err) {
	if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
	});
	res.redirect("/loggedIn");
})

app.get("/loggedIn",function(req,res) {
	res.sendFile("C:/Users/Owner/Desktop/MiniProject/views/loggedIn.html");
})

app.listen(8000, function() {
	console.log("Server successful");
})