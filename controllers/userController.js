const userModel = require("../models/userModel.js");

function getPerson(request, response) {
	// First get the person's id
	var id = request.query.userName;
	var pssword = request.query.password;
	var answer = 68;

	userModel.getPersonFromDb(id, pssword, function(error, result) {
		//callback function
		console.log("Test01" + answer);
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			
			//response.write(JSON.stringify(person));
			response.json(person);
		}
	});
	console.log("Test03");
}

















module.exports = {
	getPerson: getPerson
};