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
  criado DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id_usuario)
) AUTO_INCREMENT = 1;

CREATE TABLE plataforma (
    idPlataforma INT PRIMARY KEY,
    nome VARCHAR(50)
);

CREATE TABLE jogo(
  id_jogos INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(20) NOT NULL,
  categoria2 VARCHAR(20) NULL,
  description VARCHAR(500) NOT NULL,
  lancamento DATE NOT NULL,
  developer VARCHAR(100) NOT NULL,
  plataforma VARCHAR(90) null,
  imagem VARCHAR(255) null,
  PRIMARY KEY (id_jogos)
);

CREATE TABLE avaliacao (
  fk_usuario INT NOT NULL,
  fk_jogos INT NOT NULL,
  status TINYINT NOT NULL DEFAULT 0, -- 0 = WishList 1 = Jogando 2 = Concluido
  review VARCHAR(255) NULL,
  nota INT NULL,
  fkPlataforma INT,


  PRIMARY KEY (fk_usuario, fk_jogos),
  FOREIGN KEY (fkPlataforma)
  REFERENCES plataforma(idPlataforma),
  CONSTRAINT fk_Avaliacoes_Usuario FOREIGN KEY (fk_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_Avaliacoes_Jogos FOREIGN KEY (fk_jogos) REFERENCES jogo (id_jogos),
  CONSTRAINT chk_nota CHECK (nota BETWEEN 0 AND 5)
);



select * from usuario;

select categoria from jogo
group by categoria;