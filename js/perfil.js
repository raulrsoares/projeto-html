const profileInfoDiv = document.getElementById("profileInfo");
const userNameView = document.getElementById("user-name-view");
const userEmailView = document.getElementById("user-email-view");
const userNameEdit = document.getElementById("user-name-edit");
const userEmailEdit = document.getElementById("user-email-edit");
const currentPasswordEdit = document.getElementById("current-password-edit");
const newPasswordEdit = document.getElementById("new-password-edit");
const confirmNewPasswordEdit = document.getElementById("confirm-new-password-edit");
const userLastNameEdit = document.getElementById("user-lastname-edit");
const lastNameError = document.getElementById("lastname-error");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const currentPasswordError = document.getElementById("current-password-error");
const newPasswordError = document.getElementById("new-password-error");
const confirmNewPasswordError = document.getElementById("confirm-new-password-error");

let originalUserData = {};

function logout() {
	localStorage.removeItem("authorization");
	localStorage.removeItem("role");
	localStorage.removeItem("user_id");
	window.location.href = "index.html";
}

const API = "https://projeto-html-api.vercel.app/api";

async function buscarDadosDoUsuario() {
	try {
		const response = await fetch(`${API}/customers/read/${localStorage.getItem("user_id")}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("authToken"),
			},
		});

		if (!response.ok) {
			if (response.status === 401) {
				alert("Sessão expirada. Faça login novamente.");
				logout();
			}
			throw new Error("Erro ao buscar dados do usuário.");
		}

		const data = await response.json();
		return data.customer;
	} catch (error) {
		console.error("Erro ao buscar dados:", error);
		alert("Erro ao buscar dados do usuário. Tente novamente mais tarde.");
	}
}

async function exibirDadosDoUsuario() {
	originalUserData = await buscarDadosDoUsuario();

	userNameView.textContent = originalUserData.name + " " + originalUserData.lastName;
	userNameEdit.value = originalUserData.name;
	userLastNameEdit.value = originalUserData.lastName;
	userEmailView.textContent = originalUserData.email;
	userEmailEdit.value = originalUserData.email;

	document.getElementById("registration-date").textContent = formatarData(originalUserData.created_at);
	document.getElementById("current-loans").textContent = originalUserData.emprestimosAtuais ?? 1;
	document.getElementById("active-reservations").textContent = originalUserData.reservasAtivas ?? 1;
}

function formatarData(dataString) {
	const data = new Date(dataString);
	const dia = String(data.getDate()).padStart(2, "0");
	const mes = String(data.getMonth() + 1).padStart(2, "0");
	const ano = data.getFullYear();
	return `${dia}/${mes}/${ano}`;
}

function toggleEditMode() {
	const isEditing = profileInfoDiv.classList.toggle("editing");
	clearErrors();
	currentPasswordEdit.value = "";
	newPasswordEdit.value = "";
	confirmNewPasswordEdit.value = "";
	const lastnameWrapper = document.getElementById("lastname-wrapper");
	lastnameWrapper.style.display = isEditing ? "flex" : "none";
}

function clearErrors() {
	nameError.textContent = "";
	lastNameError.textContent = "";
	emailError.textContent = "";
	currentPasswordError.textContent = "";
	newPasswordError.textContent = "";
	confirmNewPasswordError.textContent = "";
}

function validarCampos() {
	clearErrors();

	let isValid = true;

	const name = userNameEdit.value.trim();
	const lastName = userLastNameEdit.value.trim();
	const email = userEmailEdit.value.trim();
	const currentPassword = currentPasswordEdit.value;
	const newPassword = newPasswordEdit.value;
	const confirmNewPassword = confirmNewPasswordEdit.value;

	if (!name) {
		nameError.textContent = "O nome é obrigatório.";
		isValid = false;
	}
	if (!lastName) {
		lastNameError.textContent = "O sobrenome é obrigatório.";
		isValid = false;
	}
	if (!email) {
		emailError.textContent = "O e-mail é obrigatório.";
		isValid = false;
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		emailError.textContent = "E-mail inválido.";
		isValid = false;
	}

	if (newPassword || confirmNewPassword) {
		if (!currentPassword) {
			currentPasswordError.textContent = "A senha atual é obrigatória para alterar a senha.";
			isValid = false;
		}
		if (newPassword.length < 6) {
			newPasswordError.textContent = "A nova senha deve ter no mínimo 6 caracteres.";
			isValid = false;
		}
		if (newPassword !== confirmNewPassword) {
			confirmNewPasswordError.textContent = "As senhas não coincidem.";
			isValid = false;
		}
	}

	return isValid;
}

async function salvarPerfil() {
	if (!validarCampos()) return;

	const name = userNameEdit.value.trim();
	const lastName = userLastNameEdit.value.trim();
	const email = userEmailEdit.value.trim();
	const currentPassword = currentPasswordEdit.value;
	const newPassword = newPasswordEdit.value;

	const hasChanges =
		name !== originalUserData.name || lastName !== originalUserData.lastName || email !== originalUserData.email || newPassword !== "";

	if (!hasChanges) {
		alert("Nenhuma alteração detectada para salvar.");
		return;
	}

	const dadosParaEnviar = {
		name,
		lastName,
		email,
	};

	if (newPassword) {
		dadosParaEnviar.password = newPassword;
	}

	console.log("Enviando:", dadosParaEnviar);

	try {
		const response = await fetch(`${API}/customers/update/${localStorage.getItem("user_id")}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("authorization"),
			},
			body: JSON.stringify(dadosParaEnviar),
		});

		if (!response.ok) {
			const errorData = await response.json();
			alert("Erro ao salvar perfil: " + (errorData.message || "Erro desconhecido."));
			return;
		}

		alert("Perfil atualizado com sucesso!");
		originalUserData.name = name;
		originalUserData.lastName = lastName;
		originalUserData.email = email;
		userNameView.textContent = name + " " + lastName;
		userEmailView.textContent = email;
		toggleEditMode();
	} catch (error) {
		console.error("Erro de rede ou servidor:", error);
		alert("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
	}
}

function cancelarEdicao() {
	userNameEdit.value = originalUserData.name;
	userLastNameEdit.value = originalUserData.lastName;
	userEmailEdit.value = originalUserData.email;
	currentPasswordEdit.value = "";
	newPasswordEdit.value = "";
	confirmNewPasswordEdit.value = "";
	clearErrors();
	toggleEditMode();
}

window.onload = exibirDadosDoUsuario;
