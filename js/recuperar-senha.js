function validarEmailEsqueciSenha() {
	const email = document.getElementById("useremail").value;

	if (!email) {
		alert("Por favor, digite seu e-mail.");
		return;
	}

	if (email === "admin@admin") {
		alert("Um link para redefinir sua senha foi enviado para o seu e-mail.");
	} else {
		alert("Se este e-mail estiver cadastrado, um link para redefinir sua senha será enviado.");
	}
}
