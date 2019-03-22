
function checkIfLoggedInOnLoad() {
	$.get("/checkIfLoggedIn", function(data) {
			console.log("DATA RETURNED 02: " + JSON.stringify(data));
			
	});

	if(data) {
		document.getElementById("userLoginBar").innerHTML = username + " logged in";
		document.getElementById("loginForm").style.display = "none";
	}else {
		document.getElementById("loginForm").style.display = "block";
	}

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
			
			/*document.getElementById("userLoginBar").innerHTML = data.username + " logged in";

			//If user is their, log in and hide log in form
			document.getElementById("loginForm").style.display = "none";
			localStorage.setItem("userLogin", data.username);
			localStorage.setItem("userEmail", data.email);*/

		})

}

function addToCart(result01, id){
	for(var i in localStorage) {
	    console.log('Local Storage: ' + i + ' = ' + localStorage[i]);
	}	


	console.log("Add to cart called " + result01 + " " + id);
	var key = result01+"-"+id;

	if(localStorage.getItem(key) == null)
	{
		console.log("First");
	}
	else {
		console.log("Add more");
		localStorage.setItem(key,1);
	}
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


function getProducts() {

	$.get("/getProducts", function(data) {

		console.log("Back from sever: ");
		console.log(data);
		loadProductTable(data);
	})
}


function loadProducts() {

	document.getElementById("products").style.display = "block";
	document.getElementById("userCart").style.display = "none";
	document.getElementById("checkout").style.display = "none";

	getProducts();
}

function loadCart() {
	document.getElementById("products").style.display = "none";
	document.getElementById("userCart").style.display = "block";
	document.getElementById("checkout").style.display = "none";
}

function loadCheckout() {
	document.getElementById("products").style.display = "none";
	document.getElementById("userCart").style.display = "none";
	document.getElementById("checkout").style.display = "block";

}