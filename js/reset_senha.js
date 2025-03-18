function validarResetSenha() {
	const password = document.getElementById("userpass").value;
	const passwordConfirm = document.getElementById("userpassconfirm").value;

	if (password != passwordConfirm) {
		alert("Senhas não conferem");
		return;
	}
	if (password == "" || passwordConfirm == "") {
		alert("Todos os campos são obrigatórios");
		return;
	}
	if (password == "admin" || passwordConfirm == "admin") {
		alert("Senha redefinida com sucesso!");
		window.location.href = "login.html";
	}
}
