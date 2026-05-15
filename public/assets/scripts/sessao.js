function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var n_usuario = document.getElementById("n_usuario");
    var c_usuario = document.getElementById("c_usuario");
    var w_usuario = document.getElementById("w_usuario");
    var profile_avatar = document.getElementById("profile-avatar");
    var comentario_icone1 = document.getElementById("comentario-icone1");
    var comentario_icone2 = document.getElementById("comentario-icone2");
    var comentario_icone3 = document.getElementById("comentario-icone3");

    if (email != null && nome != null) {
        n_usuario.innerHTML = nome;
        c_usuario.innerHTML = nome[0].toUpperCase();
        w_usuario.innerHTML = nome + ".";
        profile_avatar.innerHTML = nome[0].toUpperCase();
        comentario_icone1.innerHTML = nome[0].toUpperCase();
        comentario_icone2.innerHTML = nome[0].toUpperCase();
        comentario_icone3.innerHTML = nome[0].toUpperCase();
    } else {
        window.location = "../login.html";
    }
}