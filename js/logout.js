function logout() {
	localStorage.removeItem("authorization");
	localStorage.removeItem("role");
	localStorage.removeItem("user_id");
	document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	window.location.href = "index.html";
}
