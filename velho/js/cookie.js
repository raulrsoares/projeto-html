const cookiePopup = document.getElementById("cookie-popup");
const acceptCookiesBtn = document.getElementById("accept-cookies");

if (!localStorage.getItem("cookiesAccepted")) {
	cookiePopup.style.display = "block";
}

acceptCookiesBtn.addEventListener("click", () => {
	localStorage.setItem("cookiesAccepted", "true");
	cookiePopup.style.display = "none";
});
