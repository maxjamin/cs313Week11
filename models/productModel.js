const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

function getAllProducts(callback) {
	console.log("Getting all Artwork from dataBase");

	var sql = "SELECT * FROM Artwork";

	pool.query(sql, function(err, result) {
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
	getAllProducts: getAllProducts
};




