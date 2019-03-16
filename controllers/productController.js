const productModel = require("../models/productModel.js");

function getProducts(request, response) {

	productModel.getAllProducts(function(error, result) {
		//callback function
		//console.log("Test01" + answer);
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
	getProducts: getProducts
};