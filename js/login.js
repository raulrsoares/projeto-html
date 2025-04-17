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

	const API = "http://localhost:3000/api";

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
			sessionStorage.setItem("authorization", data.authorization);
			sessionStorage.setItem("role", data.role);
			window.location.href = "livros.html";
		})
		.catch((error) => {
			console.error("Erro ao autenticar:", error);
			alert(`Erro ao autenticar: ${error.message || "Erro desconhecido"}`);
		});
}
