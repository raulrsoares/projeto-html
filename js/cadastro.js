function buscarEnderecoPorCep() {
	const cep = document.getElementById("cep").value.trim();

	if (cep.length !== 8) {
		alert("CEP invalido deve conter 8 numeros");
		return;
	}

	const url = `https://viacep.com.br/ws/${cep}/json/`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.erro) {
				alert("CEP não encontrado");
				document.getElementById("endereco").value = "";
				document.getElementById("bairro").value = "";
				document.getElementById("estado").value = "";
			} else {
				const { logradouro, bairro, localidade, uf } = data;
				document.getElementById("endereco").value = logradouro;
				document.getElementById("bairro").value = bairro;
				document.getElementById("estado").value = `${localidade} - ${uf}`;
			}
		})
		.catch((erro) => {
			console.log("Erro ao buscar CEP", erro);
			alert("Erro ao buscar CEP");
		});
}

function validarCadastro() {
	const nome = document.getElementById("username").value;
	const lastName = document.getElementById("userlastname").value;
	const email = document.getElementById("useremail").value;
	const senha = document.getElementById("userpass").value;
	const confirmarSenha = document.getElementById("userpassconfirm").value;
	//
	const cep = document.getElementById("cep").value;
	const endereco = document.getElementById("endereco").value;
	const bairro = document.getElementById("bairro").value;
	const estado = document.getElementById("estado").value;
	const numero = document.getElementById("numero").value;

	if (!nome || !lastName || !email || !senha || !confirmarSenha || !cep || !endereco || !bairro || !estado || !numero) {
		alert("Por favor, preencha todos os campos.");
		return;
	}

	if (senha !== confirmarSenha) {
		alert("As senhas não coincidem.");
		return;
	}

	const body = {
		name: nome,
		lastName: lastName,
		email,
		cep,
		endereco,
		bairro,
		estado,
		numero: Number(numero),
		password: senha,
	};

	const API = "http://localhost:3000/api";

	fetch(`${API}/customers/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Usuário criado com sucesso:", data);
			window.location.href = "login.html";
		})
		.catch((error) => {
			console.error("Erro ao criar usuário:", error);
			alert(`Erro ao criar usuário: ${error.message || "Erro desconhecido"}`);
		});
}
