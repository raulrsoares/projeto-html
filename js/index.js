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
	const userId = localStorage.getItem("user_id");
	const API = "https://projeto-html-api.vercel.app/api";

	if (userId) {
		fetch(`${API}/temperatura/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("authorization"),
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.error(`Erro ao buscar dados do usuário ${userId}: ${response.status}`);
					return;
				}
				return response.json();
			})
			.then((data) => {
				const dataAPI = data.data;
				const { location, description, temp, humidity, wind_spd } = dataAPI;
				const marqueeText = `Em ${location}, esta com ${description}, temperatura de ${temp}°C, humidade do ar está ${humidity}%, velocidade do vento ${wind_spd}m/s`;
				console.log(marqueeText);
				const marquee = document.createElement("marquee");
				marquee.textContent = marqueeText;
				const navElement = document.getElementById("navegacaoBase");
				if (navElement) {
					const pai = navElement.parentNode;
					if (pai) {
						pai.insertBefore(marquee, navElement.nextSibling);
					}
				}
			})
			.catch((error) => {
				console.error("Erro na requisição para ler usuário:", error);
			});
	} else {
		return;
	}
}

temperaturaLocal();
