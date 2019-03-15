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


function getPersonFromDb(id, password, callback) {
	console.log("Getting person from DB with : " + id);

	var sql = "SELECT * FROM Customer WHERE username = $1::varchar AND login = $2::varchar";
	var params = [id, password];

	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
		
	});

}




module.exports = {
	getPerson: getPerson
	getPersonFromDb: getPersonFromDb
}