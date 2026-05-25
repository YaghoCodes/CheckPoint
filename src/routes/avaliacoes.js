var express = require("express");
var router = express.Router();

var avaliacaoController = require('../controllers/avaliacaoController');

router.post('/adicionar', function (req, res) {
    avaliacaoController.atualizarStatus(req, res);
});

router.post('/review', function (req, res) {
    avaliacaoController.fazerReview(req, res);
});

router.get('/usuario-jogo/:idUsuario/:idJogo', function (req, res) {
    avaliacaoController.buscarRelacaoUsuario(req, res);
});

router.get('/media/:idJogo', function (req, res) {
    avaliacaoController.buscarMedia(req, res);
});

router.get('/reviewComunidade/:idJogo', function (req, res) {
    avaliacaoController.buscarReviews(req, res);
});



module.exports = router;