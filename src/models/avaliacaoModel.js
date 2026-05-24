var database = require("../database/config")

function converterStatus(status){
    status = status.toLowerCase();

    if(status == "wishlist"){
        return 0;
    } else if(status == "jogando"){
        return 1;
    } else if (status == "concluido") {
        return 2;
    } else{
        return 3;
    }
}

async function buscarAvaliacao(usuario, jogo){
    console.log("Cheguei no model de buscar avaliaçao no BD")
        var instrucaoSql = `
                SELECT * FROM avaliacao WHERE 
                fk_usuario = ${usuario} and fk_jogo = ${jogo}
            `;
            console.log("Executando a instrução SQL pra buscar a avaliação: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
}

async function atualizarStatus(usuario, jogo, status){
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

async function inserirAvaliacao(usuario, jogo, status){
    console.log("Cheguei no model de adcionar avaliação no BD")
        let statusBD = converterStatus(status);
        var instrucaoSql = `
                INSERT INTO avaliacao (fk_usuario, fk_jogo, status) 
                VALUES(${usuario}, ${jogo}, ${statusBD})
            `;
            console.log("Executando a instrução SQL pra inserir a avaiação: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
}

module.exports = {
    inserirAvaliacao,
    atualizarStatus,
    buscarAvaliacao
}