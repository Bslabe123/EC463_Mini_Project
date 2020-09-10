var user;

document.querySelector("#signOut").addEventListener("click",function() {
 	document.querySelector("#LoggedInContent").style.display = "none";
	document.querySelector("#LoggedOutContent").style.display = "block";
})

function onSignIn(googleUser) {
	alert('You have signed in');
	user = googleUser.getBasicProfile();
	document.querySelector("#targetName").textContent = user.Ad;
	document.querySelector("#LoggedInContent").style.display = "block";
	document.querySelector("#LoggedOutContent").style.display = "none";
}