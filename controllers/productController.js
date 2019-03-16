const productModel = require("../models/productModel.js");

function getProducts(request, response) {

	productModel.getAllProducts(function(error, result) {
		//callback function
		console.log("Test06");
		if (error || result == null) {
			console.log("ERROR " + error + " Result " + result + " Length: " + result.length);
			response.status(500).json({success: false, data: error});
		} else {
			console.log("RESULT ARE: " + result);
			
			//response.write(JSON.stringify(person));
			response.json(result);
		}
	});
	console.log("Test03");
}




module.exports = {
	getProducts: getProducts
};