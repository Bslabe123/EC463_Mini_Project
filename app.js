var express = require("express");
var app = express();
var request = require("request");
const path = require('path');

//app.use(express.static(path.join(__dirname, 'views')));

app.get("/",function(req,res) {
	res.redirect("/loginPage")
})

app.get("/loginPage",function(req, res) {
	res.sendFile("C:/Users/Owner/Desktop/MiniProject/views/loggedOut.html");
})


app.get("/loggedIn",function(req,res) {
	res.sendFile("C:/Users/Owner/Desktop/MiniProject/views/loggedIn.html");
})

app.listen(8000, function() {
	console.log("Server successful");
})