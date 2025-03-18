function validarLogin() {
	const userEmail = document.getElementById("useremail").value;
	const password = document.getElementById("userpass").value;

	if (userEmail == "" || password == "") {
		alert("Todos os campos são obrigatórios");
		return;
	}
	if (userEmail == "admin@admin" && password == "admin") {
		console.log("Login efetuado com sucesso!");
		alert("Login efetuado com sucesso!");
		window.location.href = "perfil.html";
	} else {
		console.log("Email ou Senha Inválidos, digite novamente");
		alert("Email ou Senha Inválidos, digite novamente");
		return;
	}
}
