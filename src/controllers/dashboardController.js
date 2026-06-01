var dashboardModel = require('../models/dashboardModel');
var usuarioModel = require("../models/usuarioModel");

async function buscarKpis(req, res) {
    try {
        const usuario = req.params.idUsuario;

        const kpiJogados = await usuarioModel.buscarStatJogados(usuario);
        const kpiReviews = await usuarioModel.buscarStatReviews(usuario);
        const kpiNotaMedia = await dashboardModel.buscarKpiNota(usuario);
        const kpiTaxaConclusao = await dashboardModel.buscarTaxaConclusao(usuario);

        return res.status(200).json({
            jogados: kpiJogados[0]?.jogados || 0,
            reviews: kpiReviews[0]?.reviews || 0,
            nota_media: kpiNotaMedia[0]?.nota_media || 0,
            TaxaConclusao: kpiTaxaConclusao[0]?.porcentagem || 0
        });
    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar kpis dashboard"
        });
    }

}

async function buscarGB(req, res) {
    try {
        const usuario = req.params.idUsuario;

        const reviewsGB = await dashboardModel.buscarReviewsGB(usuario);
        const reviewsTotalGB = await dashboardModel.buscarReviewsTotalGB(usuario);

        const diasSemana = [0, 0, 0, 0, 0, 0, 0];

        reviewsGB.forEach(review => {
            diasSemana[review.diaNumero - 1] = review.totalReviews;
        });

        return res.status(200).json({
            grafico: diasSemana,
            totalReviews: reviewsTotalGB[0]?.totalReviews || 0
        });

    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar gráfico dashboard"
        });
    }
}

module.exports = {
    buscarKpis,
    buscarGB
};