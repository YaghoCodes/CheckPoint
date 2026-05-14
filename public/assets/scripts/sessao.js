function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var n_usuario = document.getElementById("n_usuario");
    var c_usuario = document.getElementById("c_usuario");
    var w_usuario = document.getElementById("w_usuario");
    var profile_avatar = document.getElementById("profile-avatar");

    if (email != null && nome != null) {
        n_usuario.innerHTML = nome;
        c_usuario.innerHTML = nome[0].toUpperCase();
        w_usuario.innerHTML = nome + ".";
        profile_avatar.innerHTML = nome[0].toUpperCase();
    } else {
        window.location = "../login.html";
    }
}