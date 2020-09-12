var express = require("express");
var app = express();
var request = require("request");

app.get("/",function(req, res) {
	res.render("homePage.ejs");
})

app.get("/loggedIn",function(req,res) {
	res.render("loggedIn.ejs")
})

app.listen(8000, function() {
	console.log("Server successful");
})