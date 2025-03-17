function validarCadastro() {
	const userFullName = document.getElementById("userfullname").value;
	const userEmail = document.getElementById("useremail").value;
	const password = document.getElementById("userpass").value;
	const passwordConfirm = document.getElementById("userpassconfirm").value;

	if (password != passwordConfirm) {
		alert("Senhas não conferem");
	}
	if (userFullName == "" || userEmail == "" || password == "" || passwordConfirm == "") {
		alert("Todos os campos são obrigatórios");
	}
	if (userFullName == "Admin" || userEmail == "admin@admin" || password == "admin" || passwordConfirm == "admin") {
		alert("Cadastro concluído com sucesso!");
		window.location.href = "login.html";
	}
}
