

function checkIfLoggedIn() {
	var username = localStorage.getItem("userLogin");
	if(username != "")
	{
		console.log("User exists" + username);

		document.getElementById("userLoginBar").innerHTML = username + " logged in";
		//document.getElementById("loginForm").style.display = "none";
	}
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