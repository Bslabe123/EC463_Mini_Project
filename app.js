var express = require("express");
var app = express();
var request = require("request");
const path = require('path');
var bodyParser = require("body-parser");
var Datastore = require("nedb");
var fs = require("fs");

app.use(bodyParser.urlencoded({extended: true}));

var database = new Datastore("databse.db");
database.loadDatabase();

var currentUserID = "0";


app.get("/",function(req,res) {
	//When going to "main page", redirect to the login page
	res.redirect("/loginPage")
})

app.get("/loginPage",function(req, res) {
	//Go to the login page
	res.sendFile("./loggedOut.html",  { root: __dirname });
})

app.post("/addSensor", function(req, res) {
	//When the user wants to add a new sensor, check to see if that sensor already exists and how many 
	//sensors exist (there can be 4 at maximum) before adding that sensor
	var newSensor = req.body.sensorName.toLowerCase();
	var canAdd = false;
	var isThere = false;

	//Create a temperature array for this new sensor
	var currentTemperature = Math.floor(Math.random()*10)+70;
	var temperatureArray = [];
	for (var i = 0; i < 5; i++) {
		var change = Math.floor(Math.random()*10)+1;
		change *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		temperatureArray.push(currentTemperature+change);
	}

	//Create a humidity array  for this new sensor
	var currentHumidity = Math.floor(Math.random()*20)+50;
	var humidityArray = [];
	for (var i = 0; i < 5; i++) {
		var change = Math.floor(Math.random()*25)+1;
		change *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		humidityArray.push(currentHumidity+change);
	}

	//Search the database to see if adding a new sensor is allowable
	database.find({user: currentUserID}, function(err, docs) {
		console.log(docs);
		for (var i = 0; i < docs.length; i++) {
			if (docs[i].sensorName === newSensor) {
				isThere = true;
			}
		}
		if (docs.length === 4 || isThere === true) {
			console.log("This sensor can't be added.");
		} else {
			console.log("Sensor was succesfully added!");
			database.insert({user: currentUserID, sensorName: newSensor, temperatures: temperatureArray, humidities: humidityArray});
		}
		res.redirect("/loggedIn");
	});

})

app.post("/removeSensor", function(req, res) {

	//Attempt to remove a room that the user requested
	var removeSensor = req.body.sensorName.toLowerCase();
	database.remove({user: currentUserID, sensorName: removeSensor}, {}, function(err, numRemoved) {
		if (numRemoved === 1) {
			console.log("This sensor has been removed!")
		} else if (numRemoved === 0) {
			console.log("This sensor doesn't exist and can't be removed.");
		}
		res.redirect("/loggedIn");
	})
	
	
})

app.post("/register", function(req, res) {
	//When the user wants to view their data, log their current google user ID so that the correct data can be pulled from
	//the database whenever needed
	currentUserID=req.body.theName;
	res.redirect("/loggedIn");
})

app.get("/loggedIn",function(req,res) {
	res.sendFile("./loggedIn.html",  { root: __dirname });
})

app.get("/api", function(req, res) {
	//Get the data from the database and send it back to the client (loggedIn.html has a fetch function for this)
	database.find({user: currentUserID}, function(err, docs) {
		if (err)
		{
			res.end();
			return;
		}
		res.json(docs);
	});
})

app.listen(8000, function() {
	console.log("Server successful");
})