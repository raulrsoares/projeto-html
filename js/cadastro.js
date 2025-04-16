function validarCadastro() {
	const nome = document.getElementById("userfullname").value;
	const email = document.getElementById("useremail").value;
	const senha = document.getElementById("userpass").value;
	const confirmarSenha = document.getElementById("userpassconfirm").value;

	if (!nome || !email || !senha || !confirmarSenha) {
		alert("Por favor, preencha todos os campos.");
		return;
	}

	if (senha !== confirmarSenha) {
		alert("As senhas não coincidem.");
		return;
	}

	if (nome === "Admin" && email === "admin@admin" && senha === "admin") {
		alert("Cadastro bem-sucedido! Redirecionando para a tela de login...");
		window.location.href = "login.html";
	} else {
		alert("Cadastro realizado com sucesso! Redirecionando para a tela de login...");
		window.location.href = "login.html";
	}
}
