

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

function getProducts() {

	$.get("/getProducts", function(data) {

		console.log("Back from sever: ");
		console.log(data);
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