

function checkIfLoggedInOnLoad() {
	var username = localStorage.getItem("userLogin");
	if(username != "")
	{
		console.log("User exists: " + username);

		document.getElementById("userLoginBar").innerHTML = username + " logged in";
		document.getElementById("loginForm").style.display = "none";
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
			
			document.getElementById("userLoginBar").innerHTML = data.username + " logged in";

			/*If user is their, log in and hide log in form*/
			document.getElementById("loginForm").style.display = "none";
			localStorage.setItem("userLogin", data.username);
			localStorage.setItem("userEmail", data.email);

		})

}

function loadProductTable(results) {
	console.log("loadProductTable");

	var table = document.getElementById("productTable");

	for (var i=tables.length-1; i>=0;i-=1)
   		if (tables[i]) tables[i].parentNode.removeChild(tables[i]);

	for(var i=0; i<results.length; i++) {
		var row = table.insertRow(0);
		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2= row.insertCell(2)
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);
		var cell5 = row.insertCell(5);

		var linktoart = "/artWorkImages/" + results[i].linktoart;

		cell0.innerHTML = results[i].name;
		cell1.innerHTML = results[i].description; 
		cell2.innerHTML = "<img src='" + linktoart + "' width='250' height='250'>";
		cell3.innerHTML = results[i].price;
		cell4.innerHTML = results[i].quantity; 
		cell5.innerHTML = "<button onclick='addToCart(results[i].name)'>+</button>"; 
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