function acceptCookies() {
	document.querySelector(".cookie-popup").style.display = "none";
	console.log("Não implementado utilidades para os cookies");
}

function buscarLivros() {
	const termoBusca = document.getElementById("busca").value.toLowerCase();
	const livros = document.querySelectorAll(".book-item");

	livros.forEach((livro) => {
		const titulo = livro.querySelector("h3").textContent.toLowerCase();
		const autor = livro.querySelector("p").textContent.toLowerCase();
		if (titulo.includes(termoBusca) || autor.includes(termoBusca)) {
			livro.style.display = "block";
		} else {
			livro.style.display = "none";
		}
	});
}

function temperaturaLocal() {
	const userId = sessionStorage.getItem("user_id");
	const API = "http://localhost:3000/api"; // Mantenha sua constante API

	if (userId) {
		fetch(`${API}/customers/read/${userId}`)
			.then((response) => {
				if (!response.ok) {
					console.error(`Erro ao buscar dados do usuário ${userId}: ${response.status}`);
					return;
				}
				return response.json();
			})
			.then((data) => {
				console.log("Dados do usuário:", data);
				if (data.cep) {
					const marquee = document.createElement("marquee");
					marquee.textContent = data.emprestimo.titulo;
					const algumContainer = document.getElementsByTagName("nav");
					algumContainer.appendChild(marquee);
				} else {
					console.log("Título do empréstimo não encontrado nos dados do usuário.");
				}
			})
			.catch((error) => {
				console.error("Erro na requisição para ler usuário:", error);
			});
	} else {
		console.log("user_id não encontrado no sessionStorage. Nenhuma ação tomada.");
	}
}

temperaturaLocal();
