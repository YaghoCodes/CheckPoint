var jogosModel = require('../models/jogosModel');

var api_key = process.env.API_KEY;

async function listar(req, res) {
    try {
        const resposta = await fetch(`https://api.rawg.io/api/games?key=${api_key}&page_size=30&ordering=-added`);
    
        const data = await resposta.json();


        const listaJogos = data.results.map(jog =>({
            id: jog.id,
            nome: jog.name,
            imagem: jog.background_image,
            genero: [
                jog.genres[0]?.name,
                jog.genres[1]?.name
            ]
        }));

        res.json(listaJogos);
        }
    catch (erro) {
    console.log("ERRO COMPLETO:", erro);
    res.status(500).json({
        erro: "Erro ao buscar Jogo"
    });
}
}

async function buscar(req, res) {
    try {

        const termo = req.query.nome;

        const resposta = await fetch(`https://api.rawg.io/api/games?key=${api_key}&search=${termo}&page_size=30&ordering=-added`);
    
        const data = await resposta.json();


        const listaJogos = data.results.map(jog =>({
            id: jog.id,
            nome: jog.name,
            imagem: jog.background_image,
            genero: [
                jog.genres[0]?.name,
                jog.genres[1]?.name
            ]
        }));

        res.json(listaJogos);
        }
    catch (erro) {
    console.log("ERRO COMPLETO:", erro);
    res.status(500).json({
        erro: "Erro ao buscar Jogo"
    });
}
}


module.exports = {
    listar,
    buscar
}