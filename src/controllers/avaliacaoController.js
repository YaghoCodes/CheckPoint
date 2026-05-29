var avaliacaoModel = require('../models/avaliacaoModel');
var jogosModel = require('../models/jogosModel');
var plataformaModel = require('../models/plataformaModel');

async function atualizarStatus(req, res) {

    try {
        const usuario = req.user.id;
        const jogo = req.body.jogo;
        const status = req.body.status;

        console.log("entrei no Controller Avaliação");

        const jogoExiste = await jogosModel.buscarPorId(jogo.id);

        if (jogoExiste.length === 0) {
            console.log("Jogo não existe no BD, iniciando inserção...");

            const plataformaExiste = await plataformaModel.buscarPlataformaPorId(jogo.plat.id);

            if (plataformaExiste.length === 0) {
                console.log("Plataforma não existe, inserindo...");
                await plataformaModel.InserirPlataformaBD(jogo.plat);
            }

            console.log("Inserindo jogo...");
            await jogosModel.InserirJogoBD(jogo);
        }
        console.log("Buscando avaliação")
        const avaliacaoExiste = await avaliacaoModel.buscarAvaliacao(usuario, jogo.id);

        if (avaliacaoExiste.length === 0) {
            console.log("inserindo nova avaliação")
            await avaliacaoModel.inserirAvaliacao(usuario, jogo.id, status);
        } else {
            console.log("atualizando avaliacão")
            await avaliacaoModel.atualizarStatus(usuario, jogo.id, status);
        }

        return res.status(200).json({
            mensagem: "Status atualizado com sucesso"
        });

    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro ao atualizar status"
        });
    }
}

async function fazerReview(req, res) {
    try {
        const usuario = req.user.id;
        const jogo = req.body.jogo;
        const nota = req.body.nota;
        const review = req.body.review;

        console.log("entrei no Controller review");

        if (!nota || nota < 1 || nota > 5) {
            return res.status(400).json({
                erro: "Nota inválida"
            });
        }

        await avaliacaoModel.atualizarReview(usuario, jogo, nota, review);

        return res.status(200).json({
            mensagem: "review publicada com sucesso"
        });
    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro publicar Review"
        });
    }
}

async function buscarRelacaoUsuario(req, res) {

    try {
        const usuario = req.user.id;
        const jogo = req.params.idJogo;
        console.log("entrei no Controller pra buscar relaçao de jogador e jogo");
        const jogoExiste = await jogosModel.buscarPorId(jogo);

        if (jogoExiste.length === 0) {
            console.log("Jogo nao existe no BD, logo, nao ia ter relaçao")
            return res.status(404).json({
                mensagem: "Jogo nao existe ainda no BD"
            })
        }
        const relacaoExiste = await avaliacaoModel.buscarAvaliacao(usuario, jogo);

        if (relacaoExiste.length === 0) {

            return res.status(404).json({
                erro: "Usuário ainda não avaliou esse jogo"
            });
        }
        return res.status(200).json(relacaoExiste[0]);
    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar relação"
        });
    }
}

async function buscarMedia(req, res) {
    try {
        const jogo = req.params.idJogo;

        console.log("Entrei no controller pra procurar media")

        const media = await avaliacaoModel.calcularMedia(jogo)

        return res.status(200).json(media[0])
    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar media das notas"
        });
    }
}

async function buscarReviews(req, res) {
    try {
        const jogo = req.params.idJogo;
        console.log("entrei no Controller pra buscar Reviews da comunidade");
        const jogoExiste = await jogosModel.buscarPorId(jogo);

        if (jogoExiste.length === 0) {
            console.log("Jogo nao existe no BD, logo, nao ia ter reviews")
            return res.status(404).json({
                mensagem: "Jogo nao existe ainda no BD"
            })
        }

        const reviewsComunidade = await avaliacaoModel.buscarReviews(jogo);

        return res.status(200).json(reviewsComunidade);


    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar reviews da comunidade"
        });
    }
}

async function buscarReviewsPerfil(req, res) {
    try {
        const perfil = req.params.idPerfil;
        console.log("entrei no Controller pra buscar Reviews da Perfil");

        const reviewsPerfil = await avaliacaoModel.buscarReviewsPerfil(perfil);

        return res.status(200).json(reviewsPerfil);


    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar reviews do perfil"
        });
    }
}

async function buscarReviewComunidade(req, res) {
    try {
        console.log("entrei no Controller pra buscar Reviews da comunidade da home");

        const reviewsPerfil = await avaliacaoModel.buscarReviewsComunidade();

        return res.status(200).json(reviewsPerfil);

    } catch (error) {
        console.log("Erro no controller:", error);

        return res.status(500).json({
            erro: "Erro buscar reviews da comunidade  da home"
        });
    }
}

module.exports = {
    atualizarStatus,
    fazerReview,
    buscarRelacaoUsuario,
    buscarMedia,
    buscarReviews,
    buscarReviewsPerfil,
    buscarReviewComunidade
};