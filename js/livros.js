const listaDeLivrosDiv = document.getElementById("listaDeLivros");
const livrosData = [
	{
		id: 1,
		titulo: "Vermelho, branco e sangue azul (Edição de colecionador)",
		autor: "Casey McQuiston",
		genero: "romance",
		disponibilidade: "disponível",
		capa: "https://m.media-amazon.com/images/I/51qbUhxsmgL._SY445_SX342_.jpg",
	},
	{
		id: 2,
		titulo: "O diário de Anne Frank",
		autor: "Anne Frank",
		genero: "biografia",
		disponibilidade: "empréstimo",
		capa: "https://m.media-amazon.com/images/I/513-4wHWI0L._SY425_.jpg",
	},
	{
		id: 3,
		titulo: "Código Limpo: Habilidades Práticas do Agile Software",
		autor: "Robert C. Martin",
		genero: "educacao",
		disponibilidade: "disponível",
		capa: "https://m.media-amazon.com/images/I/41aHzYSXZkL._SY445_SX342_.jpg",
	},
	{
		id: 4,
		titulo: "Ninguém sai vivo daqui",
		autor: "Mark Miller",
		genero: "suspense",
		disponibilidade: "reservado",
		capa: "https://m.media-amazon.com/images/I/81dOuTUXbIL._SY466_.jpg",
	},
	{
		id: 5,
		titulo: "Ninguém vai te ouvir gritar",
		autor: "Mark Miller",
		genero: "suspense",
		disponibilidade: "disponível",
		capa: "https://m.media-amazon.com/images/I/81Jz5PrvZFL._SY466_.jpg",
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
