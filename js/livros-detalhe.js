// Função para obter o ID do livro da URL
function obterIdDoLivroDaUrl() {
	const pathSegments = window.location.pathname.split("/");
	const idIndex = pathSegments.indexOf("livro") + 1;
	if (idIndex > 0 && idIndex < pathSegments.length) {
		return pathSegments[idIndex];
	}
	return null;
}

const livroId = obterIdDoLivroDaUrl();

if (livroId) {
	console.log("ID do livro da URL:", livroId);
	buscarDetalhesDoLivro(livroId);
} else {
	console.error("ID do livro não encontrado na URL.");
	document.querySelector(".container").innerHTML = '<p class="error">Livro não encontrado.</p>';
}

async function buscarDetalhesDoLivro(id) {
	const apiUrl = `/api/livros/${id}`;
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
	document.getElementById("book-image").src = detalhes.capa || "https://via.placeholder.com/200x300?text=Capa+Indisponível";
	document.getElementById("book-title").textContent = detalhes.titulo || "Título Indisponível";
	document.getElementById("book-author").textContent = detalhes.autor || "Autor Desconhecido";
	document.getElementById("book-year").textContent = detalhes.ano || "Ano Desconhecido";
	document.getElementById("book-genre").textContent = detalhes.genero || "Gênero Desconhecido";

	const disponibilidadeSpan = document.getElementById("book-availability");
	const disponibilidade = detalhes.disponibilidade ? detalhes.disponibilidade.toLowerCase() : "indisponível";
	disponibilidadeSpan.textContent =
		disponibilidade === "disponível" ? "Disponível" : disponibilidade === "empréstimo" ? "Em Empréstimo" : "Reservado";
	disponibilidadeSpan.className = `availability ${disponibilidade}`;

	document.getElementById("book-description").textContent = detalhes.sinopse || "Sinopse não disponível.";

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

function emprestarLivro() {
	alert("Livro solicitado para empréstimo! (Funcionalidade real precisaria de backend)");
}

function reservarLivro() {
	alert("Livro reservado! (Funcionalidade real precisaria de backend)");
}

function adicionarAosFavoritos() {
	alert("Livro adicionado aos seus favoritos! (Funcionalidade real precisaria de backend)");
}
