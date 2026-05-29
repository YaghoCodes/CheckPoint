var express = require("express");
var router = express.Router();

var avaliacaoController = require('../controllers/avaliacaoController');

const auth = require("../autorizacao/auth");

router.post('/adicionar', auth, function (req, res) {
    avaliacaoController.atualizarStatus(req, res);
});

router.post('/review', auth, function (req, res) {
    avaliacaoController.fazerReview(req, res);
});

router.get('/usuario-jogo/:idJogo', auth, function (req, res) {
    avaliacaoController.buscarRelacaoUsuario(req, res);
});

router.get('/media/:idJogo', function (req, res) {
    avaliacaoController.buscarMedia(req, res);
});

router.get('/reviewComunidade/:idJogo', function (req, res) {
    avaliacaoController.buscarReviews(req, res);
});

router.get('/reviewPerfil/:idPerfil', function (req, res) {
    avaliacaoController.buscarReviewsPerfil(req, res);
});

router.get('/reviewComunidadeGeral', function (req, res) {
    avaliacaoController.buscarReviewComunidade(req, res);
});


module.exports = router;