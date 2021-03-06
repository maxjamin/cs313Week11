
function checkIfLoggedInOnLoad() {
	$.get("/checkIfLoggedIn", function(data) {
		console.log("DATA RETURNED 02: " + data);
			
		if(data) {
			document.getElementById("userLoginBar").innerHTML =  " logged in";
			document.getElementById("loginForm").style.display = "none";
		}else {
			document.getElementById("loginForm").style.display = "block";
		}	
	});

	document.getElementById("products").style.display = "none";
	document.getElementById("userCart").style.display = "none";
	document.getElementById("checkout").style.display = "none";
}


function getUser() {
		console.log("getUser called");

		var username = $("#userName").val();
		var password = $("#password").val();
		console.log("The user" +  username + password);
		
		$.get("/logInUser", {userName:username, password:password}, function(data) {
			console.log("DATA RETURNED: " + JSON.stringify(data));
			

			document.getElementById("userLoginBar").innerHTML = " logged in";
			document.getElementById("loginForm").style.display = "none";

		})

}

function addToCart(result01, id){

	console.log("add to cart " + result01 + " " + id);

	$.get("/addToCart", {result01:result01, id:id} ,function(data) {
		console.log("Data returned" + JSON.stringify(data));

	})
}

function removeFromCart(amount, id) {
	console.log("remove from cart " + amount + " - " + id);

	$.get("/removeFromCart", {id:id, amount:amount} ,function(data) {
		console.log("Data returned" + JSON.stringify(data));

	})
}

function loadProductTable(results) {
	console.log("loadProductTable");
	$("#productTable tr").remove();

	var table = document.getElementById("productTable");

	for(var i=0; i<results.length; i++) {
		var linktoart = "/artWorkImages/" + results[i].linktoart;
		var name = results[i].name;
		var id = results[i].artwork_id;

		var product = [results[i].name, results[i].description, 
		"<img src='" + linktoart + "' width='250' height='250'>",
		results[i].price, results[i].quantity, "<button onclick='addToCart(\""+ name +"\", \""+id+"\")'>+</button>"];
		var prod = table.insertRow(i);

		//Add items to the row.
		for(var k=0; k<6; k++) {
			var one = prod.insertCell(k);
			one.innerHTML = product[k];

		}
	}

	var title = ["Name", "Description", "Image", "Amount", "Qt:", "Add to Cart"]; 
	var row = table.insertRow(0);
	for(var i=0; i<6; i++) {
		var one = row.insertCell(i)
		one.innerHTML = title[i];
	}


}

function loadCartTable(products, productsOnCart) {
	console.log("Starting loadCartTable...");
	if(products || productsOnCart) {
		console.log("They exist " + products[0].artwork_id);

		$("#cartTable tr").remove();
		var table = document.getElementById("cartTable");

		for(var i=1; i<productsOnCart.amountOfObjectToCart.length; i++) {

			if(productsOnCart.amountOfObjectToCart[i] != null) {

				var idForArtwork;
				for(var j=0;j<products.length;j++)
				{
					if(productsOnCart.objectToCart[i] == products[j].name &&
						products[j].artwork_id == i) {
						idForArtwork = products[j].artwork_id;
					}
				}
				console.log("ID is " + idForArtwork);

				var product = [productsOnCart.objectToCart[i], 
				productsOnCart.amountOfObjectToCart[i],
				"<button onclick='removeFromCart(\""+ productsOnCart.amountOfObjectToCart[i] +"\" , \""+idForArtwork+"\")'>-</button>" ];
				var prod = table.insertRow(0);

				//Add items to the row.
				for(var k=0; k<3; k++) {
					var one = prod.insertCell(k);
					one.innerHTML = product[k];

				}
			}
		}

		var title = ["Name", "Qt:", "Remove"]; 
		var row = table.insertRow(0);
		for(var i=0; i<3; i++) {
			var one = row.insertCell(i)
			one.innerHTML = title[i];
		}
		}
}

function getProducts() {

	$.get("/getProducts", function(data) {

		console.log("Back from sever: ");
		console.log(data);
		loadProductTable(data);
	})
}

function getProductsForCart() {

	$.get("/getProducts", function(data) {

		console.log("Back from sever Cart: ");
		console.log(data);

		$.get("/getProductsFromCart", function(data01) {
			console.log("session cart var: ");
			console.log(data01);
			loadCartTable(data, data01);
		})
	})

}

function logOut() {
	$.get("/logOut", function(data) {

		console.log("Back from sever: ");
		console.log(data);
		
	})
	document.getElementById("userLoginBar").innerHTML = "";
	document.getElementById("loginForm").style.display = "block";
	document.getElementById("products").style.display = "none";
	document.getElementById("userCart").style.display = "none";
	document.getElementById("checkout").style.display = "none";
}


function loadProducts() {
	$.get("/checkIfLoggedIn", function(data) {
		console.log("DATA RETURNED 02: " + data);
			
		if(data) {
			document.getElementById("products").style.display = "block";
			document.getElementById("userCart").style.display = "none";
			document.getElementById("checkout").style.display = "none";

			getProducts();
		}
	});
}

function loadCart() {

	$.get("/checkIfLoggedIn", function(data) {
		console.log("DATA RETURNED 02: " + data);
			
		if(data) {
		document.getElementById("products").style.display = "none";
		document.getElementById("userCart").style.display = "block";
		document.getElementById("checkout").style.display = "none";

		getProductsForCart();
		}
	});
}

function loadCheckout() {
	$.get("/checkIfLoggedIn", function(data) {
		console.log("DATA RETURNED 02: " + data);
			
	if(data) {
		document.getElementById("products").style.display = "none";
		document.getElementById("userCart").style.display = "none";
		document.getElementById("checkout").style.display = "block";
	}
	});
}

