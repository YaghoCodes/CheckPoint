drop database if exists checkpoint;
CREATE DATABASE if not exists checkpoint;
USE checkpoint;

drop table if exists usuario;
drop table if exists jogo;
drop table if exists avaliacao;

CREATE TABLE usuario(
  id_usuario INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  aboutme VARCHAR(255),
  criado YEAR DEFAULT (YEAR(CURRENT_DATE)),
  PRIMARY KEY (id_usuario)
) AUTO_INCREMENT = 1;


CREATE TABLE plataforma (
    idPlataforma INT PRIMARY KEY,
    nome VARCHAR(50)
);

CREATE TABLE jogo(
  id_jogo INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(20) NOT NULL,
  categoria2 VARCHAR(20) NULL,
  description TEXT NOT NULL,
  lancamento YEAR NULL,
  developer VARCHAR(100) NOT NULL,
  fkPlataforma int null,
  imagem VARCHAR(255) null,
  PRIMARY KEY (id_jogo),
  FOREIGN KEY (fkPlataforma)
  REFERENCES plataforma(idPlataforma)
);

CREATE TABLE avaliacao (
  fk_usuario INT NOT NULL,
  fk_jogo INT NOT NULL,
  status TINYINT NOT NULL DEFAULT 0, -- 0 = WishList 1 = Jogando 2 = Concluido 3 = nada --
  review TEXT NULL,
  nota INT NULL,
  dataReview DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (fk_usuario, fk_jogo),
  CONSTRAINT fk_Avaliacoes_Usuario FOREIGN KEY (fk_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_Avaliacoes_Jogos FOREIGN KEY (fk_jogo) REFERENCES jogo (id_jogo),
  CONSTRAINT chk_nota CHECK (nota BETWEEN 0 AND 5)
);


INSERT INTO avaliacao
(fk_usuario, fk_jogo, status, review, nota, dataReview)
VALUES

-- ================= USER 10 =================

(10, 278, 2, 'Uma das melhores histórias que já joguei.', 5, NOW() - INTERVAL 1 DAY),
(10, 422, 1, 'Combate muito divertido.', 4, NOW() - INTERVAL 2 DAY),
(10, 766, 2, 'Trilha sonora absurda.', 5, NOW() - INTERVAL 2 DAY),
(10, 906, 0, NULL, NULL, NOW() - INTERVAL 3 DAY),
(10, 1030, 2, 'Final incrível.', 5, NOW() - INTERVAL 3 DAY),
(10, 1742, 1, 'Ainda aprendendo as mecânicas.', 4, NOW() - INTERVAL 4 DAY),
(10, 1758, 2, 'Muito repetitivo em alguns momentos.', 3, NOW() - INTERVAL 5 DAY),
(10, 3272, 0, NULL, NULL, NOW() - INTERVAL 5 DAY),
(10, 3287, 2, 'Excelente gameplay.', 5, NOW() - INTERVAL 6 DAY),
(10, 3328, 1, 'Muito bom até agora.', 4, NOW() - INTERVAL 6 DAY),
(10, 3498, 2, 'Viciante demais.', 5, NOW() - INTERVAL 7 DAY),
(10, 3939, 1, NULL, NULL, NOW() - INTERVAL 1 DAY),
(10, 4200, 2, 'Achei a campanha curta.', 3, NOW() - INTERVAL 2 DAY),
(10, 4291, 0, NULL, NULL, NOW() - INTERVAL 2 DAY),

-- ================= USER 11 =================

(11, 4459, 2, 'Ambientação perfeita.', 5, NOW() - INTERVAL 1 DAY),
(11, 5286, 1, 'Difícil mas recompensador.', 5, NOW() - INTERVAL 2 DAY),
(11, 5679, 2, 'Muito divertido com amigos.', 4, NOW() - INTERVAL 3 DAY),
(11, 7689, 0, NULL, NULL, NOW() - INTERVAL 3 DAY),
(11, 11859, 2, 'Melhor indie que joguei esse ano.', 5, NOW() - INTERVAL 4 DAY),
(11, 12020, 1, 'Gameplay excelente.', 4, NOW() - INTERVAL 5 DAY),
(11, 12533, 2, 'História emocionante.', 5, NOW() - INTERVAL 6 DAY),
(11, 13537, 0, NULL, NULL, NOW() - INTERVAL 7 DAY),

-- ================= USER 12 =================

(12, 13820, 2, 'Arte linda demais.', 5, NOW() - INTERVAL 1 DAY),
(12, 29028, 1, 'Muito conteúdo.', 4, NOW() - INTERVAL 1 DAY),
(12, 30057, 2, 'Não consegui parar de jogar.', 5, NOW() - INTERVAL 2 DAY),
(12, 58764, 1, 'Curva de aprendizado alta.', 4, NOW() - INTERVAL 3 DAY),
(12, 331902, 2, 'Experiência cinematográfica.', 5, NOW() - INTERVAL 4 DAY),
(12, 415171, 0, NULL, NULL, NOW() - INTERVAL 5 DAY),
(12, 564757, 2, 'Muito divertido.', 4, NOW() - INTERVAL 6 DAY),

-- ================= USER 13 =================

(13, 28, 1, 'Ótimo multiplayer.', 4, NOW() - INTERVAL 1 DAY),
(13, 32, 2, 'Campanha sensacional.', 5, NOW() - INTERVAL 2 DAY),
(13, 278, 2, 'Envelheceu muito bem.', 4, NOW() - INTERVAL 3 DAY),
(13, 422, 0, NULL, NULL, NOW() - INTERVAL 4 DAY),
(13, 766, 1, 'Muito difícil.', 3, NOW() - INTERVAL 5 DAY),
(13, 906, 2, 'Gameplay incrível.', 5, NOW() - INTERVAL 6 DAY),

-- ================= USER 14 =================

(14, 1030, 2, 'Nintendo nunca decepciona.', 5, NOW() - INTERVAL 1 DAY),
(14, 1742, 1, 'Visual maravilhoso.', 4, NOW() - INTERVAL 2 DAY),
(14, 1758, 0, NULL, NULL, NOW() - INTERVAL 3 DAY),
(14, 3272, 2, 'Muito criativo.', 5, NOW() - INTERVAL 4 DAY),
(14, 3287, 1, 'Gostando bastante.', 4, NOW() - INTERVAL 5 DAY),
(14, 3328, 2, 'Excelente jogo.', 5, NOW() - INTERVAL 6 DAY);

