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
    console.log("Cheguei no model de buscar as informações do usuari, jogando");
    var instrucaoSql = `
                SELECT count(*) jogados FROM avaliacao WHERE fk_usuario = ${usuario} AND status = 1;    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario, jogando: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatReviews(usuario) {
    console.log("Cheguei no model de buscar as informações do usuario, Reviews");
    var instrucaoSql = `
                SELECT count(*) reviews FROM avaliacao WHERE fk_usuario = ${usuario} AND review IS NOT NULL;    
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario, Reviews: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatWishlist(usuario) {
    console.log("Cheguei no model de buscar as informações do usuario, Wishlist");
    var instrucaoSql = `
                SELECT count(*) wishlist FROM avaliacao WHERE fk_usuario = ${usuario} AND status = 0;       
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario, Wishlist: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatTW(usuario) {
    console.log("Cheguei no model de buscar as informações do usuario, this week");
    var instrucaoSql = `
                SELECT count(*) estaSemana FROM avaliacao WHERE fk_usuario = ${usuario} 
                AND dataReview > current_date() - INTERVAL 7 DAY
                AND status = 2;   
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario, this week: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatGenero(usuario) {
    console.log("Cheguei no model de buscar as informações do usuario, genero");
    var instrucaoSql = `
                SELECT j.categoria
                from jogo j
                join avaliacao a
	                ON j.id_jogo = a.fk_jogo
                WHERE a.fk_usuario = ${usuario}
                GROUP BY j.categoria
                ORDER BY COUNT(*) DESC
                LIMIT 1;
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario, genero: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarStatPlataforma(usuario) {
    console.log("Cheguei no model de buscar as informações do usuario, plataforma");
    var instrucaoSql = `
                SELECT p.nome
                FROM avaliacao a
                JOIN jogo j 
                    ON j.id_jogo = a.fk_jogo
                JOIN plataforma p 
                    ON p.idPlataforma = j.fkPlataforma
                WHERE a.fk_usuario = ${usuario}
                GROUP BY p.idPlataforma, p.nome
                ORDER BY COUNT(*) DESC LIMIT 1;
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario, plataforma: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarJogoPerfil(usuario) {
    console.log("Cheguei no model de buscar as informações do usuario, jogo");
    var instrucaoSql = `
                SELECT j.id_jogo, j.nome, j.categoria,
                j.categoria2, j.imagem, TIMESTAMPDIFF(DAY, a.dataReview, NOW()) AS dias
                FROM jogo j JOIN avaliacao a ON j.id_jogo = a.fk_jogo
                WHERE a.fk_usuario = ${usuario} and a.status = 1 ORDER BY a.dataReview DESC LIMIT 1;
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario, jogo: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarWishlist(usuario) {
    console.log("Cheguei no model de buscar as informações do usuario, wishlist");
    var instrucaoSql = `
                SELECT j.id_jogo, j.nome, j.categoria,
                j.categoria2 FROM jogo j JOIN avaliacao a ON j.id_jogo = a.fk_jogo
                WHERE a.fk_usuario = ${usuario} and a.status = 0 ORDER BY a.dataReview LIMIT 5;
                `;
    console.log("Executando a instrução SQL pra buscar as informações do usuario, wishlist: \n" + instrucaoSql);
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
    buscarStatPlataforma,
    buscarJogoPerfil,
    buscarWishlist
};