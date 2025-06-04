const API = "http://localhost:3000/api";

function obterIdDoLivroDaQuery() {
	const urlSearchParams = new URLSearchParams(window.location.search);
	return urlSearchParams.get("id");
}

const livroId = obterIdDoLivroDaQuery();

if (livroId) {
	console.log("ID do livro da URL:", livroId);
	buscarDetalhesDoLivro(livroId);
} else {
	console.error("ID do livro não encontrado na URL.");
	document.querySelector(".container").innerHTML = '<p class="error">Livro não encontrado.</p>';
}

async function buscarDetalhesDoLivro(id) {
	const apiUrl = `${API}/books/read/${id}`;
	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error(`Erro na requisição: ${response.status}`);
		}
		const detalhes = await response.json();
		exibirDetalhesDoLivro(detalhes);
	} catch (error) {
		console.error("Erro ao buscar detalhes do livro:", error);
		document.querySelector(".container").innerHTML = '<p class="error">Erro ao carregar os detalhes do livro.</p>';
	}
}

function exibirDetalhesDoLivro(detalhes) {
	document.getElementById("book-image").src = detalhes.book.capa || "https://via.placeholder.com/200x300?text=Capa+Indisponível";
	document.getElementById("book-title").textContent = detalhes.book.titulo || "Título Indisponível";
	document.getElementById("book-author").textContent = detalhes.book.autor || "Autor Desconhecido";
	document.getElementById("book-year").textContent = detalhes.book.ano || "Ano Desconhecido";
	document.getElementById("book-genre").textContent = detalhes.book.genero || "Gênero Desconhecido";

	const disponibilidadeSpan = document.getElementById("book-availability");
	const disponibilidade = detalhes.book.disponibilidade ? detalhes.book.disponibilidade.toLowerCase() : "indisponível";
	disponibilidadeSpan.textContent =
		disponibilidade === "disponível" ? "Disponível" : disponibilidade === "empréstimo" ? "Em Empréstimo" : "Reservado";
	disponibilidadeSpan.className = `availability ${disponibilidade}`;

	document.getElementById("book-description").textContent = detalhes.book.sinopse || "Sinopse não disponível.";

	const botaoEmprestimo = document.querySelector(".book-actions .borrow");
	const botaoReserva = document.querySelector(".book-actions .reserve");

	if (disponibilidade === "disponível") {
		botaoEmprestimo.style.display = "inline-block";
		botaoReserva.style.display = "none";
	} else {
		botaoEmprestimo.style.display = "none";
		botaoReserva.style.display = "inline-block";
	}
}

async function emprestarLivro() {
	const id = obterIdDoLivroDaQuery();
	if (!id) {
		alert("ID do livro não encontrado.");
		return;
	}

	const token = localStorage.getItem("authorization");
	if (!token) {
		alert("Você precisa estar autenticado para realizar esta ação.");
		window.location.href = "login.html";
		return;
	}

	const apiUrl = `${API}/books/update/${id}`;
	const novoStatus = { disponibilidade: "empréstimo" };

	try {
		const response = await fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(novoStatus),
		});

		if (!response.ok) {
			throw new Error(`Erro na requisição: ${response.status}`);
		}

		alert("Livro emprestado com sucesso!");
		buscarDetalhesDoLivro(id); // Atualiza a interface com o novo status
	} catch (error) {
		console.error("Erro ao emprestar o livro:", error);
		alert("Erro ao tentar emprestar o livro.");
	}
}

function reservarLivro() {
	alert("Livro reservado! (Funcionalidade real precisaria de backend)");
}

function adicionarAosFavoritos() {
	alert("Livro adicionado aos seus favoritos! (Funcionalidade real precisaria de backend)");
}
