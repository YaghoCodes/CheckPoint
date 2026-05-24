var avaliacaoModel = require('../models/avaliacaoModel');
var jogosModel = require('../models/jogosModel');
var plataformaModel = require('../models/plataformaModel');

async function atualizarStatus(req, res) {

    try {
        const usuario = req.body.usuario;
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

module.exports = {
    atualizarStatus
};