var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/kpi/:idUsuario", function (req, res) {
    dashboardController.buscarKpis(req, res);
});

router.get("/graficoBarra/:idUsuario", function (req, res) {
    dashboardController.buscarGB(req, res);
});


module.exports = router;