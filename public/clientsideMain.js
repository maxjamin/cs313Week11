

function checkIfLoggedIn() {
	var email = localStorage.getItem("powerFull");
	if(email != "")
	{
		console.log("User exists");

		//$("#userLoginBar").append(data.username + " logged in");
		document.getElementById("loginForm").style.display = "none";
	}
}

function getUser() {
		console.log("getUser called");

		var username = $("#userName").val();
		var password = $("#password").val();
		var x;
		console.log("The user" +  username + password);

		$.get("/logInUser", {userName:username, password:password}, function(data) {
			console.log("DATA RETURNED: " + JSON.stringify(data));
			x = data;
			console.log("Test01: " + x);
			
			$("#userLoginBar").append(data.username + " logged in");

			/*If user is their, log in and hide log in form*/
			document.getElementById("loginForm").style.display = "none";
			localStorage.setItem(data.username,data.email);

		})

}