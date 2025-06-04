console.error("Nem todas as funções dessa página não implementadas na API");

const listaDeLivrosDiv = document.getElementById("listaDeLivros");
const API = "http://localhost:3000/api";

fetch(`${API}/books/read/all`, {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
})
	.then((response) => response.json())
	.then((data) => {
		if (Array.isArray(data)) {
			popularListaDeLivros(data);
		} else {
			console.error("Dados inesperados da API:", data);
			alert("Erro: dados inválidos retornados da API.");
		}
	})
	.catch((error) => {
		console.error("Erro ao autenticar:", error);
		alert(`Erro ao autenticar: ${error.message || "Erro desconhecido"}`);
	});

function criarElementoLivro(livro) {
	const divLivro = document.createElement("div");
	divLivro.classList.add("book-item");
	divLivro.dataset.genero = livro.genero;

	const imgCapa = document.createElement("img");
	imgCapa.src = livro.capa;
	imgCapa.alt = `Capa do Livro ${livro.titulo}`;

	const h3Titulo = document.createElement("h3");
	h3Titulo.textContent = livro.titulo;

	const pAutor = document.createElement("p");
	pAutor.textContent = `Autor: ${livro.autor}`;

	const pDisponibilidade = document.createElement("p");
	pDisponibilidade.classList.add("availability", livro.disponibilidade);
	pDisponibilidade.textContent =
		livro.disponibilidade === "disponível" ? "Disponível" : livro.disponibilidade === "empréstimo" ? "Em Empréstimo" : "Reservado";

	const divAcoes = document.createElement("div");
	divAcoes.classList.add("book-actions");

	const linkDetalhes = document.createElement("a");
	linkDetalhes.href = `livros-detalhe.html?id=${livro.id}`;
	linkDetalhes.textContent = "Ver Detalhes";

	const botaoEmprestimo = document.createElement("button");
	botaoEmprestimo.classList.add("borrow");
	botaoEmprestimo.textContent = "Emprestar";
	botaoEmprestimo.onclick = () => emprestarLivro(livro.id);
	botaoEmprestimo.style.display = livro.disponibilidade === "disponível" ? "inline-block" : "none";

	const botaoReserva = document.createElement("button");
	botaoReserva.classList.add("reserve");
	botaoReserva.textContent = "Reservar";
	botaoReserva.onclick = () => reservarLivro(livro.id);
	botaoReserva.style.display = livro.disponibilidade !== "disponível" ? "inline-block" : "none";

	divAcoes.appendChild(linkDetalhes);
	divAcoes.appendChild(botaoEmprestimo);
	divAcoes.appendChild(botaoReserva);

	divLivro.appendChild(imgCapa);
	divLivro.appendChild(h3Titulo);
	divLivro.appendChild(pAutor);
	divLivro.appendChild(pDisponibilidade);
	divLivro.appendChild(divAcoes);

	return divLivro;
}

function popularListaDeLivros(livros) {
	listaDeLivrosDiv.innerHTML = ""; // limpa antes de adicionar
	livros.forEach((livro) => {
		const elementoLivro = criarElementoLivro(livro);
		listaDeLivrosDiv.appendChild(elementoLivro);
	});
}

function emprestarLivro(livroId) {
	alert(`Livro ${livroId} solicitado para empréstimo! (Funcionalidade não implementada)`);
}
async function emprestarLivro(livroId) {
	if (!livroId) {
		alert("ID do livro não encontrado.");
		return;
	}

	const token = localStorage.getItem("authorization");
	if (!token) {
		alert("Você precisa estar autenticado para realizar esta ação.");
		window.location.href = "login.html";
		return;
	}

	const apiUrl = `${API}/books/update/${livroId}`;
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
		window.location.href = "livros.html";
	} catch (error) {
		console.error("Erro ao emprestar o livro:", error);
		alert("Erro ao tentar emprestar o livro.");
	}
}

function reservarLivro(livroId) {
	alert(`Livro ${livroId} reservado! (Funcionalidade não implementada)`);
}

function filtrarLivros() {
	const termoBusca = document.getElementById("busca").value.toLowerCase();
	const filtroGenero = document.getElementById("filtroGenero").value;
	const livros = document.querySelectorAll(".book-item");

	livros.forEach((livro) => {
		const titulo = livro.querySelector("h3").textContent.toLowerCase();
		const autor = livro.querySelector("p").textContent.toLowerCase();
		const generoLivro = livro.dataset.genero;
		const matchesBusca = titulo.includes(termoBusca) || autor.includes(termoBusca);
		const matchesGenero = filtroGenero === "" || generoLivro === filtroGenero;

		livro.style.display = matchesBusca && matchesGenero ? "block" : "none";
	});
}
