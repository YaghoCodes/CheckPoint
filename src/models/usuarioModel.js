var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id_usuario, username, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (username, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarDadosPerfil(usuario) {
    console.log("Cheguei no model de buscar as informações do usuario");
    var instrucaoSql = `
                SELECT username, email, aboutme, criado
                FROM usuario WHERE id_usuario = ${usuario};    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function editarDescricao(usuario, aboutme) {
    console.log("Cheguei no model de atualizar o aboutme dos usuarios");
    var instrucaoSql = `
                UPDATE usuario
                SET aboutme = ${`'${aboutme.replace(/'/g, "''")}'`}
                WHERE id_usuario = ${usuario}  
                `;
    console.log("Executando a instrução SQL pra atualizar o aboutme dos usuarios: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatJogados(usuario) {
    onsole.log("Cheguei no model de buscar as informações do usuario");
    var instrucaoSql = `
                SELECT count()
                FROM usuario WHERE id_usuario = ${usuario};    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatReviews(usuario) {
    onsole.log("Cheguei no model de buscar as informações do usuario");
    var instrucaoSql = `
                SELECT username, email, aboutme, criado
                FROM usuario WHERE id_usuario = ${usuario};    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatWishlist(usuario) {
    onsole.log("Cheguei no model de buscar as informações do usuario");
    var instrucaoSql = `
                SELECT username, email, aboutme, criado
                FROM usuario WHERE id_usuario = ${usuario};    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatTW(usuario) {
    onsole.log("Cheguei no model de buscar as informações do usuario");
    var instrucaoSql = `
                SELECT username, email, aboutme, criado
                FROM usuario WHERE id_usuario = ${usuario};    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatGenero(usuario) {
    onsole.log("Cheguei no model de buscar as informações do usuario");
    var instrucaoSql = `
                SELECT username, email, aboutme, criado
                FROM usuario WHERE id_usuario = ${usuario};    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatPlataforma(usuario) {
    onsole.log("Cheguei no model de buscar as informações do usuario");
    var instrucaoSql = `
                SELECT username, email, aboutme, criado
                FROM usuario WHERE id_usuario = ${usuario};    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarDadosPerfil,
    editarDescricao,
    buscarStatJogados,
    buscarStatReviews,
    buscarStatWishlist,
    buscarStatTW,
    buscarStatGenero,
    buscarStatPlataforma
};