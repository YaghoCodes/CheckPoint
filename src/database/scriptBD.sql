drop database checkpoint;
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



desc jogo;


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

select * from avaliacao;

select count(*) from avaliacao where fk_usuario = 1 and status = 1;

select count(*) from avaliacao where fk_usuario = 1 
and dataReview > current_date() - INTERVAL 7 DAY
and status = 2;

SELECT j.categoria
from jogo j
join avaliacao a
	ON j.id_jogo = a.fk_jogo
WHERE a.fk_usuario = 2
GROUP BY j.categoria
ORDER BY COUNT(*) DESC
LIMIT 1;

select * from plataforma;

SELECT p.nome
FROM avaliacao a
JOIN jogo j 
    ON j.id_jogo = a.fk_jogo
JOIN plataforma p 
    ON p.idPlataforma = j.fkPlataforma
WHERE a.fk_usuario = 1
GROUP BY p.idPlataforma, p.nome
ORDER BY COUNT(*) DESC
LIMIT 1;

SELECT j.id_jogo, j.nome, j.categoria,
j.categoria2, j.imagem, TIMESTAMPDIFF(DAY, a.dataReview, NOW()) AS dias
FROM jogo j JOIN avaliacao a ON j.id_jogo = a.fk_jogo
WHERE a.fk_usuario = 1 and a.status = 1 ORDER BY a.dataReview DESC;

select current_date() - 7;