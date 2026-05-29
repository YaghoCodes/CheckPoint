var jogosModel = require('../models/jogosModel');

var api_key = process.env.API_KEY;

async function listar(req, res) {
    try {
        const resposta = await fetch(`https://api.rawg.io/api/games?key=${api_key}&page_size=30&ordering=-added`);

        const data = await resposta.json();


        const listaJogos = data.results.map(jog => ({
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


        const listaJogos = data.results.map(jog => ({
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

async function buscarId(req, res) {
    try {

        const termo = req.params.id;

        console.log("entrei no Controller");

        const jogoBD = await jogosModel.buscarPorId(termo);

        if (jogoBD.length > 0) {

            console.log("Achei o jogo no banco");

            const jogo = jogoBD[0];

            const jogoFormatado = {
                id: jogo.id_jogo,
                nome: jogo.nome,
                imagem: jogo.imagem,
                genero: [
                    jogo.categoria,
                    jogo.categoria2
                ],
                lancamento: jogo.lancamento,
                dev: {
                    nome: jogo.developer
                },
                desc: jogo.description,
                plat: {
                    id: jogo.fkPlataforma
                }
            };

            return res.json(jogoFormatado);
        } else {
            console.log("Nao achei o jogo no banco, buscando da api pra mostrar na pagina")

            const respostaAPI = await fetch(`https://api.rawg.io/api/games/${termo}?key=${api_key}`);

            const data = await respostaAPI.json();
            function tratandoDev(lista) {
                let menorDev = lista[0];
                for (dev in lista) {
                    if (lista[dev].id < menorDev.id) {
                        menorDev = lista[dev];
                    }
                }
                return {
                    id: menorDev.id,
                    nome: menorDev.name
                }
            }

            function tratandoPlataforma(lista) {
                const plataforma = lista[0].platform;

                return {
                    id: plataforma.id,
                    nome: plataforma.name
                };
            }

            function tratandoDesc(desc) {
                let descTratada = desc.replace(/\n/g, " ").split("Español")
                return descTratada[0]
            }

            const JogoUnico = {
                id: data.id,
                nome: data.name,
                imagem: data.background_image,
                genero: [
                    data.genres[0]?.name,
                    data.genres[1]?.name
                ],
                lancamento: data.released?.slice(0, 4) || null,
                dev: tratandoDev(data.developers),
                desc: tratandoDesc(data.description_raw),
                plat: tratandoPlataforma(data.platforms)
            };
            res.json(JogoUnico);

        }
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
    buscar,
    buscarId
}