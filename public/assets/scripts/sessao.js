function plotarNavbar() {
    var colocarBotaoPerfil = document.getElementById("colocarBotaoPerfil");

    colocarBotaoPerfil.innerHTML = ` <a class="profile-btn" aria-label="Meu perfil" href="perfil.html?id=${sessionStorage.ID_USUARIO}">
                <div class="profile-avatar" id="c_usuario">U</div>
                <span class="profile-name" id="n_usuario">username</span>
            </a>`
}

function validarSessaoPerfil() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    if (!(email != null && nome != null)) {
        window.location = "../login.html";
    } else {
        n_usuario.innerHTML = nome;
        c_usuario.innerHTML = nome[0].toUpperCase();
    }
}

function validarSessaoHome() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var n_usuario = document.getElementById("n_usuario");
    var c_usuario = document.getElementById("c_usuario");
    var w_usuario = document.getElementById("w_usuario");

    if (email != null && nome != null) {
        n_usuario.innerHTML = nome;
        c_usuario.innerHTML = nome[0].toUpperCase();
        w_usuario.innerHTML = nome + ".";
    } else {
        window.location = "../login.html";
    }
}

function validarSessaoCatalogo() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var n_usuario = document.getElementById("n_usuario");
    var c_usuario = document.getElementById("c_usuario");

    if (email != null && nome != null) {
        n_usuario.innerHTML = nome;
        c_usuario.innerHTML = nome[0].toUpperCase();
    } else {
        window.location = "../login.html";
    }
}

function miniMensagem(msg) {
    const div = document.createElement("div");
    div.innerText = msg;
    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.right = "20px";
    div.style.background = "#222";
    div.style.color = "#fff";
    div.style.padding = "10px";
    div.style.borderRadius = "8px";

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 3000);
}

function validarToken() {

    const token = sessionStorage.TOKEN;

    if (!token) {

        window.location = "index.html";

        return;
    }

    try {
        const descompactado = JSON.parse(atob(token.split(".")[1]));
        const expiracao = descompactado.exp * 1000;
        if (Date.now() >= expiracao) {
            sessionStorage.clear();
            window.location = "index.html";
            return;
        }
        if (
            Number(sessionStorage.ID_USUARIO) !== descompactado.id ||
            sessionStorage.NOME_USUARIO !== descompactado.username ||
            sessionStorage.EMAIL_USUARIO !== descompactado.email
        ) {
            sessionStorage.clear();
            window.location = "index.html";
            return;
        }
    } catch (erro) {
        sessionStorage.clear();
        window.location = "index.html";
    }
}