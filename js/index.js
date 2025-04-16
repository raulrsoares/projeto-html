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
