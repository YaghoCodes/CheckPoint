var usuarioModel = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        const usuario = resultadoAutenticar[0];

                        const token = jwt.sign(
                            {
                                id: usuario.id_usuario,
                                username: usuario.username,
                                email: usuario.email
                            },
                            process.env.JWT_SECRET,
                            { expiresIn: "2h" }
                        );

                        res.json({
                            token,
                            usuario: {
                                id: usuario.id_usuario,
                                username: usuario.username,
                                email: usuario.email
                            }
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

async function carregarDadosPerfil(req, res) {
    try {
        const usuario = req.params.idUsuario;
        const dadosUsuario = await usuarioModel.buscarDadosPerfil(usuario);

        return res.status(200).json(dadosUsuario[0]);
    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar perfil do usuario"
        });
    }

}

async function editarDescricao(req, res) {
    try {
        const idUsuario = req.user.id;
        const aboutme = req.body.aboutme;

        if (!aboutme) {
            return res.status(400).json({
                erro: "Descrição não pode ser vazia"
            });
        }
        await usuarioModel.editarDescricao(idUsuario, aboutme);
        return res.status(200).json({
            mensagem: "Descrição atualizada com sucesso"
        });

    } catch (error) {
        console.log("Erro ao editar descrição:", error);

        return res.status(500).json({
            erro: "Erro ao atualizar descrição"
        });
    }
}

async function carregarStatsPerfil(req, res) {
    try {
        const usuario = req.params.idUsuario;
        const statJogados = await usuarioModel.buscarStatJogados(usuario);
        const statReviews = await usuarioModel.buscarStatReviews(usuario);
        const statWishlist = await usuarioModel.buscarStatWishlist(usuario);
        const statTW = await usuarioModel.buscarStatTW(usuario);
        const statGenero = await usuarioModel.buscarStatGenero(usuario);
        const statPlataforma = await usuarioModel.buscarStatPlataforma(usuario);


        return res.status(200).json({
            jogados: statJogados[0]?.jogados || 0,
            reviews: statReviews[0]?.reviews || 0,
            wishlist: statWishlist[0]?.wishlist || 0,
            estaSemana: statTW[0]?.estaSemana || 0,
            genero: statGenero[0]?.categoria || "Nenhum jogo com genero avaliado",
            plataforma: statPlataforma[0]?.nome || "Nenhum jogo com plataforma avaliada"
        });
    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar stats perfil do usuario"
        });
    }

}

async function carregarJogoPerfil(req, res) {
    try {
        const usuario = req.params.idUsuario;
        const jogoPerfil = await usuarioModel.buscarJogoPerfil(usuario);

        return res.status(200).json({
            idJogo: jogoPerfil[0].id_jogo,
            nomeJogo: jogoPerfil[0].nome,
            categoria: [jogoPerfil[0].categoria ? jogoPerfil[0].categoria : "Sem Categoria",
            jogoPerfil[0].categoria2 ? jogoPerfil[0].categoria2 : null],
            imagem: jogoPerfil[0].imagem,
            dias: jogoPerfil[0].dias
            
        });
    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar jogo perfil do usuario"
        });
    }
}

async function carregarWishlist(req, res) {
    try {
        console.log("entrei no controller de WISHLIST");

        const usuario = req.params.idUsuario;

        const wishlist = await usuarioModel.buscarWishlist(usuario);

        const jogos = wishlist.map(jogo => ({
            idJogo: jogo.id_jogo,
            nomeJogo: jogo.nome,
            categoria: [
                jogo.categoria ? jogo.categoria : "Sem Categoria",
                jogo.categoria2 ? jogo.categoria2 : null
            ].filter(Boolean)
        }));

        return res.status(200).json(jogos);

    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar wishlist do usuario"
        });
    }
}
module.exports = {
    autenticar,
    cadastrar,
    carregarDadosPerfil,
    editarDescricao,
    carregarStatsPerfil,
    carregarJogoPerfil,
    carregarWishlist
}