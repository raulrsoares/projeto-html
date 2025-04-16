function validarEmailEsqueciSenha() {
	const userEmail = document.getElementById("useremail").value;

	if (useremail == "") {
		alert("Todos os campos são obrigatórios");
		return;
	}
	if (userEmail == "admin@admin") {
		alert("Redefinição de senha enviado por email!");
		return;
		// com js avançado colocar lib para enviar email
		// no email link para pagina que vai "liberar" reset de senha
	}
}
