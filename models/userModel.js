const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


function getPersonFromDb(id, password, callback) {
	console.log("Getting person from DB with : " + id);

	var sql = "SELECT user_id, email, username FROM Customer WHERE username = $1::varchar AND login = $2::varchar";
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
	getPersonFromDb: getPersonFromDb
};