var database = require("../database/config")

async function buscarKpiNota(usuario) {
    console.log("Cheguei no model de buscar kpi de nota media")
    var instrucaoSql = `
            SELECT TRUNCATE(AVG(nota), 1) nota_media FROM
            avaliacao WHERE fk_usuario = ${usuario};
        `;
    console.log("Executando a instrução SQL para buscar Kpi: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarTaxaConclusao(usuario) {
    console.log("Cheguei no model de buscar reviews da semana do GB")
    var instrucaoSql = `
            SELECT  TRUNCATE((SUM(status = 2) / (SUM(status = 1) + 
            SUM(status = 2)))* 100 , 1) as porcentagem FROM
            avaliacao WHERE fk_usuario = 1 AND status IN (1, 2);
        `;
    console.log("Executando a instrução SQL para buscar Kpi conclusão: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarReviewsGB(usuario) {
    console.log("Cheguei no model de buscar  reviews da semana do GB")
    var instrucaoSql = `
            SELECT 
         DAYOFWEEK(dataReview) AS diaNumero,
        COUNT(*) AS totalReviews
        FROM avaliacao
        WHERE fk_usuario = ${usuario}
        and review is not null
        AND dataReview >= CURDATE() - INTERVAL 6 DAY
        GROUP BY DAYOFWEEK(dataReview)
        ORDER BY DAYOFWEEK(dataReview);
        `;
    console.log("Executando a instrução SQL para dados do GB : \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarReviewsTotalGB(usuario) {
    console.log("Cheguei no model de buscar  reviews da semana do GB TOTAL")
    var instrucaoSql = `
            SELECT 
        COUNT(*) AS totalReviews
        FROM avaliacao
        WHERE fk_usuario = ${usuario}
        and review is not null
        AND dataReview >= CURDATE() - INTERVAL 6 DAY;
        `;
    console.log("Executando a instrução SQL para dados do GB Total: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarGenerosGD(usuario) {
    console.log("Cheguei no model de buscar os top generos do usuario")
    var instrucaoSql = `
        SELECT categoria, COUNT(*) AS total
        FROM jogo
        JOIN avaliacao ON id_jogo = fk_jogo
        WHERE fk_usuario = 12
        AND status IN (1,2)
        GROUP BY categoria
        ORDER BY total DESC;    
        `;
    console.log("Executando a instrução SQL para dados do os top generos do usuario : \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarKpiNota,
    buscarTaxaConclusao,
    buscarReviewsGB,
    buscarReviewsTotalGB,
    buscarGenerosGD
}