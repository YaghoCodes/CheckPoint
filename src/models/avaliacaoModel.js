var database = require("../database/config")

function converterStatus(status) {
    status = status.toLowerCase();

    if (status == "wishlist") {
        return 0;
    } else if (status == "jogando") {
        return 1;
    } else if (status == "concluido") {
        return 2;
    } else {
        return 3;
    }
}

async function buscarAvaliacao(usuario, jogo) {
    console.log("Cheguei no model de buscar avaliaçao no BD")
    var instrucaoSql = `
                SELECT * FROM avaliacao WHERE 
                fk_usuario = ${usuario} and fk_jogo = ${jogo}
            `;
    console.log("Executando a instrução SQL pra buscar a avaliação: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function atualizarStatus(usuario, jogo, status) {
    console.log("Cheguei no model de atualizar avaliação no BD")
    let statusBD = converterStatus(status);

    var instrucaoSql = `
                UPDATE avaliacao
                SET status = ${statusBD}
                WHERE fk_usuario = ${usuario}
                AND fk_jogo = ${jogo};
            `;
    console.log("Executando a instrução SQL pra atualizar a avaiação: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function inserirAvaliacao(usuario, jogo, status) {
    console.log("Cheguei no model de adcionar avaliação no BD")
    let statusBD = converterStatus(status);
    var instrucaoSql = `
                INSERT INTO avaliacao (fk_usuario, fk_jogo, status) 
                VALUES(${usuario}, ${jogo}, ${statusBD})
            `;
    console.log("Executando a instrução SQL pra inserir a avaliação: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function atualizarReview(usuario, jogo, nota, review) {
    console.log("Cheguei no model de atualizar a review do usuario");
    var instrucaoSql = `
            UPDATE avaliacao
            SET nota = ${nota},
            review = ${review ? `'${review.replace(/'/g, "''")}'` : null},
            dataReview = NOW()
            WHERE fk_usuario = ${usuario}
            AND fk_jogo = ${jogo};
            `;
    console.log("Executando a instrução SQL pra atualizar a review: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function calcularMedia(jogo) {
    console.log("Cheguei no model de calcular nota media do jogo");
    var instrucaoSql = `
            SELECT ROUND(AVG(nota), 1) AS media
            FROM avaliacao
            WHERE fk_jogo = ${jogo}
            AND nota IS NOT NULL;
            `;
    console.log("Executando a instrução SQL pra calcular nota media do jogo: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarReviews(jogo) {
    console.log("Cheguei no model de buscar as ultimas reviews da comunidade");
    var instrucaoSql = `
            SELECT u.id_usuario, u.username, a.review, a.nota, a.dataReview
            FROM avaliacao a
            JOIN usuario u ON a.fk_usuario = u.id_usuario
            WHERE a.fk_jogo = ${jogo} AND review IS NOT NULL
            ORDER BY a.dataReview DESC
            LIMIT 3;    
            `;
    console.log("Executando a instrução SQL pra buscar as ultimas reviews da comunidade: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarReviewsPerfil(Perfil) {
    console.log("Cheguei no model de buscar as ultimas reviews do Perfil");
    var instrucaoSql = `
            SELECT j.nome, a.review, a.nota, j.id_jogo
            FROM jogo j JOIN avaliacao a 
            ON j.id_jogo = a.fk_jogo AND a.fk_usuario = ${Perfil}
            AND review IS NOT NULL 
            ORDER BY a.dataReview DESC LIMIT  3;    
            `;
    console.log("Executando a instrução SQL pra buscar as ultimas reviews do Perfil: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarReviewsComunidade() {
    console.log("Cheguei no model de buscar as ultimas reviews da comunidade");
    var instrucaoSql = `
            SELECT j.nome, a.review, a.nota, j.id_jogo, u.username, u.id_usuario
            FROM jogo j JOIN avaliacao a 
            ON j.id_jogo = a.fk_jogo
            JOIN usuario u on a.fk_usuario = u.id_usuario
            AND review IS NOT NULL 
            ORDER BY a.dataReview DESC LIMIT  3;    
            `;
    console.log("Executando a instrução SQL pra buscar as ultimas reviews da comunidade: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    inserirAvaliacao,
    atualizarStatus,
    buscarAvaliacao,
    atualizarReview,
    calcularMedia,
    buscarReviews,
    buscarReviewsPerfil,
    buscarReviewsComunidade
}