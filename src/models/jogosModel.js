var database = require("../database/config")

async function buscarPorId(jogo) {
    console.log("cheguei no model")
    jogo = Number(jogo)
    var instrucaoSql = `
            SELECT * FROM jogo WHERE id_jogo = ${jogo};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function InserirJogoBD(jogo) {
    console.log("Cheguei no model de adcionar jogo no BD")
    console.log(jogo)
    var instrucaoSql = `
            INSERT INTO jogo (id_jogo, nome, categoria, categoria2, description,
            lancamento, developer, fkPlataforma, imagem) 
            VALUES( ${jogo.id},'${jogo.nome}',${jogo.genero?.[0] ? `'${jogo.genero[0]}'` : null},
            ${jogo.genero?.[1] ? `'${jogo.genero[1]}'` : null},
            '${(jogo.desc || '').replace(/'/g, "''")}',${jogo.lancamento ? `'${jogo.lancamento}'` : 'NULL'},'${jogo.dev.nome}',${jogo.plat.id},'${jogo.imagem}')
        `;
    console.log("Executando a instrução SQL pra inserir o jogo: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    buscarPorId,
    InserirJogoBD
}