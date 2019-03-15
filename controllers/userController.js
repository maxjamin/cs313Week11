const userController = require(".../modules/userModel.js")

function getPerson(request, response) {
	// First get the person's id
	var id = request.query.userName;
	var pssword = request.query.password;
	var answer = 68;

	getPersonFromDb(id, pssword, function(error, result) {
		//callback function
		console.log("Test01" + answer);
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			
			//response.write(JSON.stringify(person));
			response.send(JSON.stringify(person));
		}
	});
	console.log("Test03");
}

module.exports = {
	getPerson: getPerson
};