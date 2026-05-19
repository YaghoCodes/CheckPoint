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

CREATE TABLE jogo(
  id_jogos INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  categoria VARCHAR(45) NOT NULL,
  description VARCHAR(500) NOT NULL,
  lancamento DATE NOT NULL,
  developer VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_jogos)
) AUTO_INCREMENT = 100;

CREATE TABLE avaliacao (
  fk_usuario INT NOT NULL,
  fk_jogos INT NOT NULL,
  status TINYINT NOT NULL DEFAULT 0, -- 
  review VARCHAR(255) NULL,
  nota INT NULL,
  PRIMARY KEY (fk_usuario, fk_jogos),
  CONSTRAINT fk_Avaliacoes_Usuario FOREIGN KEY (fk_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_Avaliacoes_Jogos FOREIGN KEY (fk_jogos) REFERENCES jogo (id_jogos),
  CONSTRAINT chk_nota CHECK (nota BETWEEN 0 AND 10)
);

INSERT INTO jogo (nome, categoria, description, lancamento, developer) VALUES
('The Legend of Zelda: Breath of the Wild', 'Aventura', 'Explore um vasto mundo aberto em Hyrule repleto de segredos, dungeons e inimigos desafiadores. Link deve recuperar suas memórias e derrotar Ganon para salvar o reino.', '2017-03-03', 'Nintendo'),
('The Witcher 3: Wild Hunt', 'RPG', 'Um épico RPG de mundo aberto onde Geralt de Rívia busca sua filha adotiva Ciri enquanto enfrenta escolhas morais complexas, criaturas perigosas e facções políticas em conflito.', '2015-05-19', 'CD Projekt Red'),
('Red Dead Redemption 2', 'Ação', 'Acompanhe Arthur Morgan, um fora-da-lei do velho oeste americano, enquanto navega pela lealdade, honra e sobrevivência em um mundo em declínio para a era moderna.', '2018-10-26', 'Rockstar Games'),
('God of War', 'Ação', 'Kratos, o antigo deus grego da guerra, embarca em uma jornada épica pela mitologia nórdica ao lado de seu filho Atreus, enfrentando deuses e monstros poderosos.', '2018-04-20', 'Santa Monica Studio'),
('Dark Souls III', 'RPG', 'Um desafiador RPG de ação em um mundo sombrio e interconectado, onde os mortos-vivos buscam a chama da vida enquanto enfrentam chefes brutais e inimigos implacáveis.', '2016-04-12', 'FromSoftware'),
('Minecraft', 'Sandbox', 'Construa, explore e sobreviva em mundos infinitos gerados proceduralmente. Com blocos como ferramenta principal, crie desde casas simples até construções monumentais em modo criativo ou sobrevivência.', '2011-11-18', 'Mojang'),
('Grand Theft Auto V', 'Ação', 'Três criminosos de personalidades distintas planejam elaborados heists em Los Santos. O jogo oferece uma história cinematográfica e um vasto mundo aberto repleto de atividades e missões.', '2013-09-17', 'Rockstar Games'),
('Hollow Knight', 'Metroidvania', 'Explore um vasto e misterioso reino subterrâneo habitado por insetos. Um cavaleiro silencioso desvenda os segredos de Hallownest enquanto enfrenta chefes desafiadores e navega por labirintos obscuros.', '2017-02-24', 'Team Cherry'),
('Sekiro: Shadows Die Twice', 'Ação', 'Um shinobi desfigurado busca vingança no Japão feudal sombrio. O combate exige precisão, paciência e domínio de deflexões para superar inimigos formidáveis e chefes implacáveis.', '2019-03-22', 'FromSoftware'),
('Cyberpunk 2077', 'RPG', 'Viva como V, um mercenário em Night City, uma megalópole futurista corrompida pela ganância e tecnologia. Escolhas narrativas profundas moldam o destino em um mundo distópico vibrante.', '2020-12-10', 'CD Projekt Red'),
('Elden Ring', 'RPG', 'Explore as vastas e perigosas Terras Intermédias em busca dos fragmentos do Anel Élfico. Um mundo aberto sombrio criado por Hidetaka Miyazaki e George R.R. Martin desafia cada passo.', '2022-02-25', 'FromSoftware'),
('Hades', 'Roguelike', 'Zagreus, filho de Hades, tenta escapar do submundo grego em cada tentativa. Cada run traz novas armas, bênçãos dos deuses olímpicos e revelações da história envolvente do protagonista.', '2020-09-17', 'Supergiant Games'),
('Stardew Valley', 'Simulação', 'Herde uma fazenda abandonada e reconstrua sua vida no campo. Plante culturas, crie animais, mine recursos, construa relacionamentos com os moradores e explore cavernas repletas de perigos.', '2016-02-26', 'ConcernedApe'),
('Doom Eternal', 'FPS', 'O Doom Slayer retorna para destruir hordas de demônios em combate frenético, brutal e incrivelmente rápido. Gerencie recursos constantemente para sobreviver em arenas desafiadoras e visualmente impressionantes.', '2020-03-20', 'id Software'),
('Persona 5 Royal', 'RPG', 'Adolescentes com poderes sobrenaturais formam os Phantom Thieves para combater adultos corruptos. Equilibre a vida escolar diurna com batalhas no mundo psíquico chamado Metaverse à noite.', '2019-10-31', 'Atlus'),
('Monster Hunter: World', 'Ação', 'Caçe criaturas colossais em ecossistemas vivos e interativos. Estude o comportamento de cada monstro, forje equipamentos com seus materiais e enfrente caçadas cada vez mais desafiadoras sozinho ou cooperativo.', '2018-01-26', 'Capcom'),
('Death Stranding', 'Ação', 'Sam Porter Bridges atravessa uma América pós-apocalíptica entregando cargas e reconectando comunidades isoladas. Uma reflexão profunda sobre conexão humana em um mundo devastado por criaturas sobrenaturais invisíveis.', '2019-11-08', 'Kojima Productions'),
('Bloodborne', 'RPG', 'Enfrente horrores lovecraftianos nas ruas sombrias de Yharnam. Um caçador busca respostas sobre uma praga misteriosa enquanto descobre segredos cósmicos perturbadores em combate agressivo e visceral.', '2015-03-24', 'FromSoftware'),
('Celeste', 'Plataforma', 'Madeline escala a lendária montanha Celeste enfrentando não apenas plataformas difíceis, mas também sua própria ansiedade e autoestima. Uma narrativa tocante embalada por gameplay preciso e desafiador.', '2018-01-25', 'Maddy Makes Games'),
('Among Us', 'Social', 'Tripulantes espaciais completam tarefas enquanto tentam identificar o impostor entre eles. O jogo de dedução social explodiu em popularidade com partidas cheias de traição, argumentação e diversão.', '2018-06-15', 'InnerSloth'),
('Fortnite', 'Battle Royale', 'Cem jogadores caem em uma ilha e disputam para ser o último sobrevivente. O jogo combina construção de estruturas, tiroteios frenéticos e constante encolhimento do mapa para forçar confrontos.', '2017-07-25', 'Epic Games'),
('Apex Legends', 'Battle Royale', 'Legends com habilidades únicas formam squads de três para competir em arenas dinâmicas. O sistema de respawn, ping e movimento fluido elevaram o padrão do gênero battle royale.', '2019-02-04', 'Respawn Entertainment'),
('Valorant', 'FPS', 'Agentes com habilidades especiais se enfrentam em rodadas táticas de 5v5. Combine o uso estratégico de habilidades com mira precisa para eliminar adversários e completar ou defender objetivos.', '2020-06-02', 'Riot Games'),
('League of Legends', 'MOBA', 'Dois times de cinco campeões com habilidades únicas batalham para destruir a base inimiga chamada Nexus. O MOBA mais jogado do mundo com centenas de personagens e meta em constante evolução.', '2009-10-27', 'Riot Games'),
('Overwatch 2', 'FPS', 'Heroes com habilidades únicas se enfrentam em modos baseados em objetivos. O shooter em equipe da Blizzard traz diversidade de estilos de jogo com personagens de ataque, suporte e tanque.', '2022-10-04', 'Blizzard Entertainment'),
('Resident Evil 4 Remake', 'Survival Horror', 'Leon S. Kennedy viaja à Europa rural para resgatar a filha do presidente sequestrada por uma seita religiosa. O remake moderniza o clássico com gráficos impressionantes e combate refinado.', '2023-03-24', 'Capcom'),
('Spider-Man 2', 'Ação', 'Peter Parker e Miles Morales enfrentam a ameaça devastadora de Venom pelas ruas de Nova York. O jogo expande o universo com duas histórias entrelaçadas e mecânicas de teia aprimoradas.', '2023-10-20', 'Insomniac Games'),
('Baldurs Gate 3', 'RPG', 'Um profundo RPG de turnos baseado em Dungeons and Dragons com liberdade criativa extraordinária. Cada escolha tem consequências reais em uma história épica sobre parasitas cerebrais e poderes sombrios.', '2023-08-03', 'Larian Studios'),
('Horizon Zero Dawn', 'RPG', 'Aloy, uma caçadora habilidosa, explora um mundo pós-apocalíptico dominado por máquinas animais. Desvende os mistérios de uma civilização perdida enquanto enfrenta tribos e criaturas mecânicas colossais.', '2017-02-28', 'Guerrilla Games'),
('Ghost of Tsushima', 'Ação', 'Jin Sakai, um samurai honrado, adapta seus métodos para defender a ilha de Tsushima contra a brutal invasão mongol. Explore paisagens deslumbrantes e escolha entre honra e eficácia no combate.', '2020-07-17', 'Sucker Punch Productions'),
('The Last of Us Part I', 'Aventura', 'Joel, um contrabandista endurecido, protege Ellie, uma adolescente imune ao fungo, atravessando uma América devastada pela pandemia em uma jornada emocionalmente devastadora sobre perda e amor.', '2013-06-14', 'Naughty Dog'),
('The Last of Us Part II', 'Aventura', 'Ellie embarca em uma brutal jornada de vingança em Seattle pós-apocalíptica enquanto explora temas complexos de trauma, moralidade e as consequências devastadoras do ódio e da violência.', '2020-06-19', 'Naughty Dog'),
('Uncharted 4', 'Aventura', 'Nathan Drake sai da aposentadoria para ajudar seu irmão a encontrar o lendário tesouro de Henry Avery. Uma aventura cinematográfica com tiroteiros, escaladas e reviravoltas emocionantes pelo mundo todo.', '2016-05-10', 'Naughty Dog'),
('Detroit Become Human', 'Aventura', 'Três androides ganham consciência em um Detroit futurista onde máquinas e humanos coexistem em tensão. Suas escolhas moldam completamente o destino dos personagens e o futuro da sociedade.', '2018-05-25', 'Quantic Dream'),
('Control', 'Ação', 'Jesse Faden assume o controle do Bureau of Control após um evento sobrenatural. Explore o brutalist Federal Bureau of Control cheio de mistérios, entidades paranormais e poderes telecinéticos devastadores.', '2019-08-27', 'Remedy Entertainment'),
('Disco Elysium', 'RPG', 'Um detetive sem memória investiga um assassinato em uma cidade portuária decadente. Um RPG único onde habilidades do protagonista se manifestam como vozes internas que influenciam cada conversa e decisão.', '2019-10-15', 'ZA/UM'),
('Outer Wilds', 'Aventura', 'Explore um sistema solar em constante loop de 22 minutos terminando em supernova. Um jogo de descoberta pura onde conhecimento acumulado entre as mortes é sua única ferramenta de progressão.', '2019-05-28', 'Mobius Digital'),
('Cuphead', 'Plataforma', 'Cuphead e Mugman devem derrotar chefes para pagar suas dívidas ao diabo. Arte inspirada em animações dos anos 30 envolve um gameplay extremamente desafiador de plataforma e atirador.', '2017-09-29', 'Studio MDHR'),
('Undertale', 'RPG', 'Um humano cai no submundo habitado por monstros e deve encontrar seu caminho de volta. Você pode completar o jogo sem matar ninguém, e cada escolha tem peso real na narrativa.', '2015-09-15', 'Toby Fox'),
('Terraria', 'Sandbox', 'Construa, explore e lute em um mundo 2D gerado proceduralmente cheio de biomas, dungeons e chefes. Com centenas de itens e atualizações constantes, oferece dezenas de horas de exploração e construção.', '2011-05-16', 'Re-Logic'),
('Subnautica', 'Survival', 'Sobreviva nas profundezas de um planeta oceânico alienígena após uma queda de nave. Construa bases subaquáticas, explore biomas únicos e desvende a história de uma civilização extinta enquanto procura resgate.', '2018-01-23', 'Unknown Worlds Entertainment'),
('No Mans Sky', 'Survival', 'Explore bilhões de planetas únicos gerados proceduralmente em uma galáxia vasta. Construa bases, troque com alienígenas e viaje entre estrelas em uma experiência de exploração espacial praticamente infinita.', '2016-08-09', 'Hello Games'),
('Divinity Original Sin 2', 'RPG', 'Um profundo RPG de turnos com liberdade criativa extraordinária. Jogue com até quatro amigos cooperativamente enquanto navega por uma história rica, combates táticos e um mundo que reage às suas escolhas.', '2017-09-14', 'Larian Studios'),
('Mass Effect Legendary Edition', 'RPG', 'A trilogia remasterizada do Comandante Shepard salvando a galáxia dos Reapers. Suas decisões em cada jogo se transferem para o próximo, criando uma jornada épica e personalizada ao longo de três capítulos.', '2021-05-14', 'BioWare'),
('Fallout 4', 'RPG', 'Sobreviva no Commonwealth, a Boston pós-nuclear devastada. Construa assentamentos, recrute companheiros e descubra o paradeiro de seu filho desaparecido enquanto navega por facções em conflito em um mundo aberto vasto.', '2015-11-10', 'Bethesda Game Studios'),
('Skyrim', 'RPG', 'O Dovahkiin, nascido com a voz dos dragões, enfrenta o dragão ancião Alduin nas montanhas geladas de Skyrim. Um dos RPGs mais influentes da história com liberdade e mundo imenso.', '2011-11-11', 'Bethesda Game Studios'),
('Portal 2', 'Puzzle', 'Resolva puzzles usando uma pistola que cria portais interligados em instalações da Aperture Science. Com modo cooperativo para dois jogadores e humor inteligente, é considerado um dos melhores puzzle games existentes.', '2011-04-19', 'Valve'),
('Half-Life Alyx', 'FPS', 'Uma experiência VR imersiva e obrigatória que expande o universo Half-Life. Alyx Vance combate os Combine em ambientes detalhados onde interação física com o mundo é parte central do gameplay.', '2020-03-23', 'Valve'),
('Bioshock Infinite', 'FPS', 'Booker DeWitt resgata a misteriosa Elizabeth da cidade flutuante de Columbia. Um FPS narrativamente rico que explora temas de fanatismo, excepcionalismo americano e viagem dimensional com reviravoltas surpreendentes.', '2013-03-26', 'Irrational Games'),
('Returnal', 'Roguelike', 'Selene, uma astronauta, fica presa em loop mortal num planeta alienígena hostil após crashar. Cada morte revela mais da narrativa fragmentada enquanto enfrenta chefes brutais em combate veloz e intenso.', '2021-04-30', 'Housemarque'),
('It Takes Two', 'Cooperativo', 'Um casal à beira do divórcio é magicamente encolhido e deve cooperar para voltar ao normal. Um jogo exclusivamente cooperativo que reinventa suas mecânicas a cada capítulo com criatividade e humor.', '2021-03-26', 'Hazelight Studios'),
('Sackboy A Big Adventure', 'Plataforma', 'Sackboy embarca em uma aventura colorida e encantadora para salvar Craftworld do vilão Vex. Com fases criativas, músicas licenciadas e modo cooperativo, é uma celebração vibrante do gênero plataforma 3D.', '2020-11-12', 'Sumo Digital'),
('FIFA 23', 'Esporte', 'A última edição da série FIFA traz times licenciados, jogadores reais e modos como Ultimate Team e Carreira. Com física aprimorada e hipermotion2, oferece a simulação de futebol mais realista da franquia.', '2022-09-30', 'EA Sports'),
('Street Fighter 6', 'Luta', 'O melhor capítulo da série com novos personagens, mecânica de Drive System e modo World Tour. Oferece profundidade competitiva para jogadores avançados e acessibilidade para iniciantes com controles modernos simplificados.', '2023-06-02', 'Capcom'),
('Mortal Kombat 1', 'Luta', 'Liu Kang recria o universo do zero em um novo Mortal Kombat brutal e violento. Com sistema de Kameos, gráficos impressionantes e história envolvente, redefine o futuro da icônica franquia de luta.', '2023-09-19', 'NetherRealm Studios');

select * from usuario;

select categoria from jogo
group by categoria;