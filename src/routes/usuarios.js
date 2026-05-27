var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

const auth = require("../autorizacao/auth");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/perfil/:idUsuario", function (req, res) {
    usuarioController.carregarDadosPerfil(req, res);
});

router.put("/perfil/editarDesc", auth, function (req, res) {
    usuarioController.editarDescricao(req, res);
});

router.get("/stats/:idUsuario", function (req, res) {
    usuarioController.carregarStatsPerfil(req, res);
});

module.exports = router;