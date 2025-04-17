function validarLogin() {
	const userEmail = document.getElementById("useremail").value;
	const password = document.getElementById("userpass").value;

	if (!userEmail || !password) {
		alert("Todos os campos são obrigatórios");
		return;
	}

	const body = {
		email: userEmail,
		senha: password,
	};

	const API = "https://projeto-html-api.vercel.app/api";

	fetch(`${API}/auth`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Usuário autenticado com sucesso:", data);
			localStorage.setItem("authorization", data.authorization);
			localStorage.setItem("role", data.role);
			localStorage.setItem("user_id", data.id);
			window.location.href = "livros.html";
		})
		.catch((error) => {
			console.error("Erro ao autenticar:", error);
			alert(`Erro ao autenticar: ${error.message || "Erro desconhecido"}`);
		});
}
