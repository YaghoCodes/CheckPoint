create database checkpoint;
use checkpoint;

CREATE TABLE usuario(
  id_usuario INT NOT NULL auto_increment,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  aboutme VARCHAR(255),
  criado DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id_usuario)
  );


CREATE TABLE jogos (
  id_jogos INT NOT NULL auto_increment,
  nome VARCHAR(45) NOT NULL,
  categoria VARCHAR(45) NOT NULL,
  description VARCHAR(255) NOT NULL,
  lancamento DATE NOT NULL,
  developer VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_jogos));



CREATE TABLE avaliacoes (
  fk_usuario INT NOT NULL,
  fk_jogos INT NOT NULL,
  status TINYINT NOT NULL DEFAULT 0, -- 0=quero jogar, 1=jogando, 2=concluído
  review VARCHAR(255) NULL,
  nota INT NULL,
  PRIMARY KEY (fk_usuario, fk_jogos),
  CONSTRAINT fk_Avaliacoes_Usuario FOREIGN KEY (fk_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_Avaliacoes_Jogos FOREIGN KEY (fk_jogos) REFERENCES jogos (id_jogos),
  CONSTRAINT chk_nota CHECK (nota BETWEEN 0 AND 10)
);