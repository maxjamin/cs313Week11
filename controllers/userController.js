const userModel = require("../models/userModel.js");

const express = require('express')
var session = require('express-session');
var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

function getPerson(request, response) {
	// First get the person's id
	var id = request.query.userName;
	var pssword = request.query.password;
	var answer = 68;
	var sn;

	userModel.getPersonFromDb(id, pssword, function(error, result) {
		//callback function
		console.log("Test01" + answer);
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			
			sn = request.session;
			sn.username = request.username;

			console.log("Session " + request.session);

			response.json(person);
		}
	});
	console.log("Test03");
}

















module.exports = {
	getPerson: getPerson
};