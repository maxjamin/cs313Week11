

function getUser() {
		console.log("getUser called");

		var username = $("#userName").val();
		var password = $("#password").val();
		console.log("The user" +  username + password);

		$.get("/logInUser", {userName:username, password:password}, function(data) {
			console.log("DATA RETURNED: " + data);

		})

		/*If user is their, log in and hide log in form*/
		document.getElementById("loginForm").style.display = "none";
		document.getElementById("demo").innerHTML = data.username;
}