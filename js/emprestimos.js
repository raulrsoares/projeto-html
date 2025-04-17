console.error("Funções dessa pagina não implementadas na API");

const loanList = document.getElementById("loanList");

const meusEmprestimos = [
	{
		id: 1,
		titulo: "Ninguém vai te ouvir gritar",
		autor: "Mark Miller",
		genero: "suspense",
		disponibilidade: "disponível",
		dataDevolucao: "2025-04-15",
		dataEmprestimo: "2025-04-01",
		capa: "https://m.media-amazon.com/images/I/81Jz5PrvZFL._SY466_.jpg",
	},
];

function criarItemEmprestimo(emprestimo) {
	const listItem = document.createElement("li");
	listItem.classList.add("loan-item");

	const imgCapa = document.createElement("img");
	imgCapa.src = emprestimo.capa;
	imgCapa.alt = `Capa de ${emprestimo.titulo}`;

	const detalhesDiv = document.createElement("div");
	detalhesDiv.classList.add("loan-details");

	const h3Titulo = document.createElement("h3");
	h3Titulo.textContent = emprestimo.titulo;

	const pAutor = document.createElement("p");
	pAutor.textContent = `Autor: ${emprestimo.autor}`;

	const pEmprestimo = document.createElement("p");
	pEmprestimo.textContent = `Emprestado em: ${formatarData(emprestimo.dataEmprestimo)}`;

	const pDevolucao = document.createElement("p");
	pDevolucao.classList.add("due-date");
	pDevolucao.textContent = `Devolver até: ${formatarData(emprestimo.dataDevolucao)}`;

	detalhesDiv.appendChild(h3Titulo);
	detalhesDiv.appendChild(pAutor);
	detalhesDiv.appendChild(pEmprestimo);
	detalhesDiv.appendChild(pDevolucao);

	const acoesDiv = document.createElement("div");
	acoesDiv.classList.add("loan-actions");

	const devolverButton = document.createElement("button");
	devolverButton.classList.add("return-button");
	devolverButton.textContent = "Devolver";
	devolverButton.onclick = () => devolverLivro(emprestimo.id);

	const avaliarButton = document.createElement("button");
	avaliarButton.classList.add("evaluate-button");
	avaliarButton.textContent = "Avaliar";
	avaliarButton.onclick = () => avaliarLivro(emprestimo.id);

	acoesDiv.appendChild(devolverButton);
	acoesDiv.appendChild(avaliarButton);

	listItem.appendChild(imgCapa);
	listItem.appendChild(detalhesDiv);
	listItem.appendChild(acoesDiv);

	return listItem;
}

function formatarData(dataString) {
	const data = new Date(dataString);
	const dia = String(data.getDate()).padStart(2, "0");
	const mes = String(data.getMonth() + 1).padStart(2, "0");
	const ano = data.getFullYear();
	return `${dia}/${mes}/${ano}`;
}

function devolverLivro(emprestimoId) {
	alert(`Livro com ID de empréstimo ${emprestimoId} marcado para devolução! (Funcionalidade real precisaria de backend)`);
	// Aqui você implementaria a lógica para iniciar o processo de devolução no backend
}

function avaliarLivro(emprestimoId) {
	alert(`Redirecionando para a tela de avaliação do livro (ID do empréstimo: ${emprestimoId})! (Funcionalidade real precisaria de outra página)`);
}

if (meusEmprestimos.length > 0) {
	loanList.innerHTML = "";
	meusEmprestimos.forEach((emprestimo) => {
		const itemEmprestimo = criarItemEmprestimo(emprestimo);
		loanList.appendChild(itemEmprestimo);
	});
}
