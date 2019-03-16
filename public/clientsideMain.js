

function checkIfLoggedIn() {
	var username = localStorage.getItem("userLogin");
	if(username != "")
	{
		console.log("User exists" + username);

		$("#userLoginBar").append(username + " logged in");
		document.getElementById("loginForm").style.display = "none";
	}
}

function removeSessionVar() {
	localStorage.clear();
}


function getUser() {
		console.log("getUser called");

		var username = $("#userName").val();
		var password = $("#password").val();
		console.log("The user" +  username + password);

		$.get("/logInUser", {userName:username, password:password}, function(data) {
			console.log("DATA RETURNED: " + JSON.stringify(data));
			
			$("#userLoginBar").append(data.username + " logged in");

			/*If user is their, log in and hide log in form*/
			document.getElementById("loginForm").style.display = "none";
			localStorage.setItem("userLogin", data.username);
			localStorage.setItem("userEmail", data.email);

		})

}