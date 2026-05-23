var express = require("express");
var router = express.Router();

var avaliacaoController = require('../controllers/avaliacaoController');

router.post('/adicionar', function (req, res) {
    avaliacaoController.atualizarStatus(req, res);
});










module.exports = router;