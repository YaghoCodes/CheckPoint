var database = require("../database/config")

async function buscarPlataformaPorId(plataforma){
    console.log("cheguei no model")
    plataforma = Number(plataforma)
    var instrucaoSql = `
            SELECT * FROM plataforma WHERE idPlataforma = ${plataforma};
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

async function InserirPlataformaBD(plataforma) {
    console.log("Cheguei no model de adcionar plataforma no BD")
    var instrucaoSql = `
            INSERT INTO plataforma (idPlataforma, nome) 
            VALUES(${plataforma.id}, '${plataforma.nome}')
        `;
        console.log("Executando a instrução SQL pra inserir a plataforma: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

module.exports = {
    buscarPlataformaPorId,
    InserirPlataformaBD
}