

function getUser() {
		console.log("getUser called");

		var username = $("#userName").val();
		var password = $("#password").val();
		console.log("The user" +  username + password);

		$.get("/logInUser", {userName:username, password:password}, function(data) {
			console.log("DATA RETURNED: " + JSON.stringify(data));
			var x = data[0];
			console.log("Test01: " + x);
			
			$("#userLoginBar").append(data.username + " logged in");

		})

		/*If user is their, log in and hide log in form*/
		$("#loginForm").style.display = "none";
}