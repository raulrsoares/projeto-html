const listaDeLivrosDiv = document.getElementById("listaDeLivros");
const livrosData = [
	{
		id: 1,
		titulo: "Título do Livro 1",
		autor: "Autor A",
		genero: "ficcao",
		disponibilidade: "disponível",
		capa: "https://via.placeholder.com/100x150?text=Livro+1",
	},
	{
		id: 2,
		titulo: "Título do Livro 2",
		autor: "Autor B",
		genero: "romance",
		disponibilidade: "empréstimo",
		capa: "https://via.placeholder.com/100x150?text=Livro+2",
	},
	{
		id: 3,
		titulo: "Título do Livro 3",
		autor: "Autor C",
		genero: "suspense",
		disponibilidade: "disponível",
		capa: "https://via.placeholder.com/100x150?text=Livro+3",
	},
	{
		id: 4,
		titulo: "Título do Livro 4",
		autor: "Autor D",
		genero: "fantasia",
		disponibilidade: "reservado",
		capa: "https://via.placeholder.com/100x150?text=Livro+4",
	},
	{
		id: 5,
		titulo: "Título do Livro 5",
		autor: "Autor E",
		genero: "biografia",
		disponibilidade: "disponível",
		capa: "https://via.placeholder.com/100x150?text=Livro+5",
	},
];

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

	const botaoReserva = document.createElement("button");
	botaoReserva.classList.add("reserve");
	botaoReserva.textContent = "Reservar";
	botaoReserva.onclick = () => reservarLivro(livro.id);
	botaoReserva.style.display = livro.disponibilidade !== "disponível" ? "inline-block" : "none";
	botaoEmprestimo.style.display = livro.disponibilidade === "disponível" ? "inline-block" : "none";

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

function popularListaDeLivros() {
	livrosData.forEach((livro) => {
		const elementoLivro = criarElementoLivro(livro);
		listaDeLivrosDiv.appendChild(elementoLivro);
	});
}

popularListaDeLivros();

function emprestarLivro(livroId) {
	alert(`Livro ${livroId} solicitado para empréstimo! (Funcionalidade real precisaria de backend)`);
}

function reservarLivro(livroId) {
	alert(`Livro ${livroId} reservado! (Funcionalidade real precisaria de backend)`);
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

		if (matchesBusca && matchesGenero) {
			livro.style.display = "block";
		} else {
			livro.style.display = "none";
		}
	});
}
