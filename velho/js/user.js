function usuarioLogado() {
	const usuarioLogado = false; // Alterar para `true` se o usuário estiver autenticado

	if (usuarioLogado) {
		document.getElementById("perfil-link").style.display = "inline-block";
	}
}
