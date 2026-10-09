// Boatos reais, todos desmentidos por agências de checagem. Cada item aponta
// para a checagem original e usa a imagem publicada pela própria agência
// (o print do boato ou o documento que o desmente), exibida direto da fonte.
//
// Para incluir um boato novo: só entra com checagem publicada (url) e imagem
// tirada da própria matéria. Confira se o link abre antes de commitar.

export const AGENCIES = {
  aosfatos: { name: 'Aos Fatos', site: 'aosfatos.org' },
  comprova: { name: 'Projeto Comprova', site: 'projetocomprova.com.br' },
};

export const CHECAGENS = [
  // Eleição 2026 — boatos checados entre o 1º turno (4/10) e o 2º turno (25/10).
  {
    id: 'pcc-cv-2026',
    year: 2026,
    claim: 'PCC e CV declaram apoio a Lula no 2º turno',
    verdict: 'Falso',
    fact: 'Não há registro disso. O MP-RJ e uma fonte das investigações no MP-SP negaram.',
    summary:
      'Não há registro de que PCC, CV ou seus líderes tenham orientado voto em Lula. O MP-RJ disse não ter nenhuma informação nesse sentido, e uma fonte das investigações sobre o PCC no MP-SP negou a história. O boato repete uma narrativa antiga que tenta ligar Lula ao crime organizado.',
    agency: 'aosfatos',
    title: 'É falso que PCC e CV declararam apoio a Lula',
    url: 'https://www.aosfatos.org/noticias/pcc-comando-vermelho-apoio-lula-falso/',
    date: '2026-10-09',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2026/10/09/09.10Fake_Lula',
      width: 954, height: 1192,
      caption: 'Post que circulou no Instagram, com ao menos 75 mil curtidas',
    },
  },
  {
    id: 'bolsa-familia-2026',
    year: 2026,
    claim: 'Governo Lula avalia acabar com o Bolsa Família',
    verdict: 'Falso',
    fact: 'O vídeo usado é de abril de 2025 e não fala em acabar com o programa.',
    summary:
      'Os posts usam uma reportagem da CNN Brasil de abril de 2025 que em nenhum momento fala em extinguir o benefício. A reportagem tratava o Bolsa Família como uma fase de transição, para que as famílias deixem de depender dele.',
    agency: 'aosfatos',
    title: 'É falso que governo Lula avalia extinguir Bolsa Família',
    url: 'https://www.aosfatos.org/noticias/governo-lula-extinguir-bolsa-familia/',
    date: '2026-10-09',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2026/10/09/8-10-2026_bolsa_familia.png',
      width: 467, height: 719,
      caption: 'Post que usa trecho antigo da CNN Brasil fora de contexto',
    },
  },
  {
    id: 'g1-montagem-2026',
    year: 2026,
    claim: 'g1 publicou frase de Lula com apologia à pedofilia',
    verdict: 'Falso',
    fact: 'O g1 nunca publicou isso, e não há registro de que Lula tenha dito a frase.',
    summary:
      'O g1 nunca publicou essa notícia, e não há registro na imprensa nem nos canais da Presidência de que Lula tenha dito a frase. A montagem tem design diferente do site e usa uma foto tirada um ano depois da data que aparece nela.',
    agency: 'aosfatos',
    title: 'Montagem simula ‘g1’ para difundir declaração falsa que associa Lula à pedofilia',
    url: 'https://www.aosfatos.org/noticias/montagem-g1-declaracao-falsa-lula-pedofilia/',
    date: '2026-10-08',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2026/10/08/lula-ped-1.png',
      width: 1290, height: 1860,
      caption: 'Página real do g1 (acima) e a montagem riscada pelo Aos Fatos (abaixo)',
      sensitive: true,
    },
  },
  {
    id: 'urna-rn-2026',
    year: 2026,
    claim: 'Vídeo mostra urna sendo trocada por outra já com votos para Lula',
    verdict: 'Falso',
    fact: 'A urna deu defeito na tela e foi trocada pela de reserva, sem mexer nos votos.',
    summary:
      'Uma urna em Parnamirim (RN) teve falha na tela e foi substituída por uma urna de contingência, como mandam as regras da Justiça Eleitoral. Segundo o TRE-RN, não houve perda, alteração nem direcionamento de votos.',
    agency: 'aosfatos',
    title: 'É falso que vídeo mostra urna sendo trocada por outra com votos para Lula no RN',
    url: 'https://www.aosfatos.org/noticias/urna-trocada-votos-lula-rn/',
    date: '2026-10-08',
    // Sem imagem: o vídeo original mostra o rosto de mesárias.
  },
  {
    id: 'faltou-tse-2026',
    year: 2026,
    claim: 'Aviso “faltou” no site do TSE prova que seu voto não foi contado',
    verdict: 'Falso',
    fact: 'Era o aviso padrão enquanto o TSE processava os dados. Agora aparece “em processamento”.',
    summary:
      'O site do TSE mostrou “faltou” para todos os eleitores, inclusive quem votou, enquanto processava os dados de comparecimento do 1º turno. Na noite de 6/10 o tribunal trocou o aviso por “em processamento”. Nenhum voto foi invalidado.',
    agency: 'aosfatos',
    title: 'É falso que aviso ‘faltou’ no site do TSE indica que voto não foi computado',
    url: 'https://www.aosfatos.org/noticias/aviso-faltou-tse-voto-computado/',
    date: '2026-10-07',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2026/10/07/mensagem.webp',
      width: 845, height: 409,
      caption: 'O aviso real no site do TSE depois da correção: “em processamento”',
    },
  },
  {
    id: 'percentual-flavio-2026',
    year: 2026,
    claim: 'Percentual de Flávio caiu durante a apuração: é fraude',
    verdict: 'Falso',
    fact: 'Percentual é fatia do total: pode cair mesmo com mais votos. É matemática, não fraude.',
    summary:
      'Entre duas parciais da apuração, o percentual de Flávio caiu de 51,07% para 50,94%, mesmo com mais votos recebidos. Não há contradição: a porcentagem depende de quanto os votos novos representam no total apurado até ali.',
    agency: 'aosfatos',
    title: 'Queda no percentual de Flávio durante apuração não é indício de fraude',
    url: 'https://www.aosfatos.org/noticias/queda-percentual-flavio-apuracao-fraude/',
    date: '2026-10-07',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2026/10/07/6-10-2026_porcentagem-1.png',
      width: 397, height: 610,
      caption: 'Vídeo que circulou no Facebook (rosto borrado pelo Aos Fatos)',
    },
  },
  {
    id: 'nordestinos-2026',
    year: 2026,
    claim: 'Lula disse que só ganhou porque o nordestino é analfabeto',
    verdict: 'Falso',
    fact: 'Lula estava citando uma fala de Bolsonaro. As outras duas frases foram manipuladas ou inventadas.',
    summary:
      'Das três frases do card, uma foi tirada de contexto: Lula repetia uma fala de Bolsonaro, que em 2022 associou a vitória do PT no Nordeste ao analfabetismo. Outra foi manipulada e a terceira foi inventada. A Secom desmentiu.',
    agency: 'aosfatos',
    title: 'Posts distorcem e inventam falas de Lula sobre nordestinos',
    url: 'https://www.aosfatos.org/noticias/falas-lula-nordestinos/',
    date: '2026-10-07',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2026/10/07/06.10Lula_nordeste',
      width: 852, height: 1432,
      caption: 'Card com as três frases atribuídas a Lula',
    },
  },
  {
    id: 'pix-cpmf',
    year: 2022,
    claim: 'Lula vai taxar o Pix e congelar a poupança',
    verdict: 'Falso',
    fact: 'O print cortou um texto que dizia o contrário: Lula não tinha nenhum desses planos.',
    summary:
      'O print corta o começo e o fim de um texto da CNN Brasil que era uma checagem do Comprova desmentindo esses planos. Lula não tinha proposta de CPMF sobre o Pix, de congelar a poupança nem de moeda única com Argentina e Venezuela.',
    agency: 'aosfatos',
    title: 'CNN não noticiou que Lula tem planos de taxar Pix e congelar poupanças',
    url: 'https://www.aosfatos.org/noticias/falso-lula-taxar-pix-congelar-poupanca/',
    date: '2022-11-02',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2022/11/02/02112022_cnn_lula_taxar_pix_criar_cpmf.png',
      width: 960, height: 1200,
      caption: 'Print cortado de um texto da CNN Brasil',
    },
  },

  // Arquivo: boatos de 2018 a 2023.
  {
    id: 'mamadeira',
    year: 2018,
    claim: 'PT distribui mamadeiras eróticas em creches',
    verdict: 'Falso',
    fact: 'Nenhuma creche recebeu isso. O objeto é vendido em sex shop, e PT e MEC negaram.',
    summary:
      'O vídeo não dizia em que creche, cidade ou estado a distribuição teria acontecido. O objeto existe, mas é vendido em sex shops. PT, campanha de Haddad e MEC negaram.',
    agency: 'aosfatos',
    title: '‘Mamadeiras eróticas’ não foram distribuídas em creches pelo PT',
    url: 'https://www.aosfatos.org/noticias/mamadeiras-eroticas-nao-foram-distribuidas-em-creches-pelo-pt/',
    date: '2018-09-28',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2018/09/28/mamadeira.jpg',
      width: 1014, height: 612,
      caption: 'Print do vídeo no Facebook, com 92 mil compartilhamentos',
      sensitive: true,
    },
  },
  {
    id: 'kit-gay',
    year: 2018,
    claim: 'Haddad é o criador do kit gay para crianças de 6 anos',
    verdict: 'Falso',
    fact: 'O material era para adolescentes, nunca chegou às escolas e foi vetado por Dilma.',
    summary:
      'O material é o projeto Escola sem Homofobia, de 2011, pensado para adolescentes, e não para crianças de 6 anos. Ele nunca chegou às escolas: foi vetado pela então presidente Dilma Rousseff.',
    agency: 'aosfatos',
    title: 'É falso que Haddad criou ‘kit gay’ para crianças de seis anos',
    url: 'https://www.aosfatos.org/noticias/e-falso-que-haddad-criou-kit-gay-para-criancas-de-seis-anos/',
    date: '2018-10-10',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2018/10/10/haddadhomofobia2.jpg',
      width: 715, height: 1079,
      caption: 'Corrente de WhatsApp que circulou no 2º turno',
    },
  },
  {
    id: 'livro-haddad',
    year: 2018,
    claim: 'Haddad escreveu livro que defende sexo entre pais e filhos',
    verdict: 'Falso',
    fact: 'O livro não fala em incesto. Olavo de Carvalho, que espalhou, apagou o post.',
    summary:
      'O livro “Em defesa do socialismo” (1998) não fala em incesto. O boato partiu de um post de Olavo de Carvalho, que depois se corrigiu e apagou a publicação, mas a mentira já corria no WhatsApp e no Facebook.',
    agency: 'aosfatos',
    title: 'É falso que Fernando Haddad defendeu em livro sexo entre pais e filhos',
    url: 'https://www.aosfatos.org/noticias/e-falso-que-fernando-haddad-defendeu-em-livro-sexo-entre-pais-e-filhos/',
    date: '2018-10-15',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2018/10/15/haddadlivrofalso.jpg',
      width: 1023, height: 566,
      caption: 'Montagem que circulou no Facebook',
    },
  },
  {
    id: 'boletim-9909',
    year: 2018,
    claim: 'Boletim de urna mostra 9.909 votos para Haddad numa seção com 777 eleitores',
    verdict: 'Falso',
    fact: 'No boletim verdadeiro, Haddad teve 9 votos. A imagem foi adulterada.',
    summary:
      'É uma montagem de 2018 que voltou a circular em 2022. O boletim verdadeiro, de uma seção em Nagoya (Japão), registra 9 votos para Haddad e 372 para Bolsonaro. O TSE confirmou que a imagem foi adulterada.',
    agency: 'comprova',
    title: 'Montagem de 2018 volta a circular para atacar sistema eletrônico de votação',
    url: 'https://projetocomprova.com.br/publica%C3%A7%C3%B5es/montagem-de-2018-volta-a-circular-para-atacar-sistema-eletronico-de-votacao/',
    date: '2022-07-19',
    image: {
      src: 'https://projetocomprova.com.br/wp-content/uploads/2022/07/origiginal-768x1024.jpg',
      width: 768, height: 1024,
      caption: 'O boletim original, que desmente a montagem: Haddad teve 0009 votos',
    },
  },
  {
    id: 'chip-5g',
    year: 2020,
    claim: 'Vacina chinesa contra Covid tem nanochip para rastrear você pelo 5G',
    verdict: 'Falso',
    fact: 'Vacina não tem chip. Nem caberia: um chip assim não passaria pela agulha.',
    summary:
      'O Instituto Butantan e especialistas negam. Um chip com 5G e localização precisaria de energia, seria visível no líquido da vacina e não passaria pela agulha da seringa.',
    agency: 'aosfatos',
    title: 'Vacinas testadas contra Covid-19 não usam nanochip para rastrear pessoas pelo 5G',
    url: 'https://www.aosfatos.org/noticias/vacinas-testadas-contra-covid-19-nao-usam-nanochip-para-rastrear-pessoas-pelo-5g/',
    date: '2020-08-06',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2020/08/06/card_vejaaqui_chip_vacina.jpg',
      width: 960, height: 540,
      caption: 'Post que circulou no Facebook',
    },
  },
  {
    id: 'caixoes-vazios',
    year: 2020,
    claim: 'Governos enterram caixões vazios para inflar mortes por Covid',
    verdict: 'Falso',
    fact: 'As fotos são de 2017, de uma investigação sobre fraude em São Carlos (SP).',
    summary:
      'As fotos de caixões vazios desenterrados são de 2017, de uma investigação sobre fraude em São Carlos (SP). Outras versões usam cenas de enterros reais de vítimas da doença.',
    agency: 'aosfatos',
    title: 'Imagens de caixões vazios não mostram fraude no número de casos da Covid-19',
    url: 'https://www.aosfatos.org/noticias/foto-que-mostra-caixao-vazio-desenterrado-e-de-2017-e-foi-tirada-em-sao-paulo-nao-no-amazonas/',
    date: '2020-04-30',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2020/05/02/caixoes-vazios-imagem-3.jpg',
      width: 960, height: 540,
      caption: 'Post com fotos tiradas de outro contexto',
    },
  },
  {
    id: 'cloroquina',
    year: 2020,
    claim: 'Cloroquina, ivermectina e azitromicina curam a Covid',
    verdict: 'Falso',
    fact: 'Nenhum desses remédios funcionou contra a Covid nos estudos científicos sérios.',
    summary:
      'Nenhum desses remédios teve eficácia comprovada contra a Covid nos estudos científicos mais robustos.',
    agency: 'aosfatos',
    title: 'Não é verdade que cloroquina, azitromicina, ivermectina, zinco e vitamina C curam Covid-19',
    url: 'https://www.aosfatos.org/noticias/nao-e-verdade-que-cloroquina-azitromicina-ivermectina-zinco-e-vitamina-c-curam-covid-19/',
    date: '2021-04-29',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2021/04/29/vejaqui__falso_cloroquina_azitromicina_ivermectina_zinco_vitac_curam_covid.jpg',
      width: 960, height: 540,
      caption: 'Corrente de maio de 2020',
    },
  },
  {
    id: 'vacina-dna',
    year: 2020,
    claim: 'Vacina de RNA contra Covid altera o seu DNA',
    verdict: 'Falso',
    fact: 'A vacina de RNA não entra no núcleo da célula, que é onde fica o DNA.',
    summary:
      'A vacina de RNA ensina a célula a produzir uma proteína do vírus e não entra no núcleo, onde fica o DNA. Ela não altera o código genético nem transforma ninguém em “quimera”.',
    agency: 'aosfatos',
    title: 'Vacinas de RNA contra a Covid-19 não são capazes de alterar o DNA',
    url: 'https://www.aosfatos.org/noticias/vacinas-de-rna-contra-covid-19-nao-sao-capazes-de-alterar-o-dna/',
    date: '2020-12-04',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2020/12/04/vejaaqui_vacina_rna_christiane.jpg',
      width: 960, height: 540,
      caption: 'Post que compartilhava vídeo com o alerta falso',
    },
  },
  {
    id: 'vacina-aids',
    year: 2021,
    claim: 'Relatórios do Reino Unido mostram que vacinados estão desenvolvendo Aids',
    verdict: 'Falso',
    fact: 'Os relatórios britânicos não falam em Aids. Aids é causada pelo HIV, não por vacina.',
    summary:
      'Bolsonaro leu o texto numa live em outubro de 2021. Os relatórios britânicos não falam em Aids, que é causada pelo HIV, e não por vacina. O texto veio do site negacionista Before It’s News. Facebook, Instagram e YouTube removeram a live.',
    agency: 'comprova',
    title: 'Vacina contra covid-19 não provoca Aids, ao contrário do que sugeriu Bolsonaro em live',
    url: 'https://projetocomprova.com.br/publica%C3%A7%C3%B5es/vacina-contra-covid-19-nao-provoca-aids-ao-contrario-do-que-sugeriu-bolsonaro-em-live-entenda/',
    date: '2022-08-25',
    image: {
      src: 'https://projetocomprova.com.br/wp-content/uploads/2022/08/null-27.png',
      width: 755, height: 501,
      caption: 'Texto do site Before It’s News, origem do boato',
    },
  },
  {
    id: 'fechar-igrejas',
    year: 2022,
    claim: 'Lula declarou que vai fechar igrejas em 2023',
    verdict: 'Falso',
    fact: 'Lula nunca publicou esses tuítes. Os prints foram fabricados.',
    summary:
      'Os tuítes nunca foram publicados no perfil de Lula e não aparecem nem em ferramentas que arquivam posts apagados. Lula desmentiu a autoria.',
    agency: 'aosfatos',
    title: 'Tuítes atribuídos a Lula sobre fechamento de igrejas são falsos',
    url: 'https://www.aosfatos.org/noticias/tuites-atribuidos-a-lula-sobre-fechamento-de-igrejas-sao-falsos/',
    date: '2022-10-07',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2022/10/07/07102022_va_lula_fechar_igrejas.jpg',
      width: 960, height: 540,
      caption: 'Prints de tuítes falsos atribuídos a Lula',
    },
  },
  {
    id: 'stm-72-horas',
    year: 2022,
    claim: 'Auditoria do Exército prova fraude e STM dá 72 horas para Moraes se explicar',
    verdict: 'Falso',
    fact: 'O STM não intimou Moraes e a Defesa negou o ofício. O TSE nega fraude.',
    summary:
      'O Superior Tribunal Militar e o Ministério da Defesa desmentiram a história, e o ofício que circulou não saiu da Defesa. O TSE nega que tenha havido fraude.',
    agency: 'aosfatos',
    title: 'STM e Defesa não provaram fraude eleitoral nem intimaram Moraes',
    url: 'https://www.aosfatos.org/noticias/stm-e-defesa-nao-provaram-fraude-eleitoral-nem-intimaram-moraes/',
    date: '2022-11-04',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2022/11/04/va_falso_stm_72horas_alexandredemoraes_04112022.png',
      width: 960, height: 1200,
      caption: 'Post que circulou no Facebook',
    },
  },
  {
    id: 'infiltrados-8-janeiro',
    year: 2023,
    claim: 'Fotos mostram petistas infiltrados presos no 8 de Janeiro',
    verdict: 'Falso',
    fact: 'As fotos são de presos pela polícia de El Salvador, em 2022.',
    summary:
      'As fotos são de pessoas presas pela polícia de El Salvador em 2022, antes dos ataques em Brasília. Foram divulgadas pelas autoridades do país e por páginas locais.',
    agency: 'aosfatos',
    title: 'Imagens mostram presos pela polícia de El Salvador, não ‘petistas infiltrados’ no 8 de Janeiro',
    url: 'https://www.aosfatos.org/noticias/presos-el-salvador-infiltrados-8-de-janeiro/',
    date: '2024-02-15',
    image: {
      src: 'https://static.aosfatos.org/media/cke_uploads/2024/02/15/15-02-2024_infiltrados_petistas_8j_elsalvador.png',
      width: 960, height: 1200,
      caption: 'Vídeo do TikTok com presos de El Salvador (rostos borrados pelo Aos Fatos)',
    },
  },
];

export const CHECAGEM_BY_ID = Object.fromEntries(CHECAGENS.map((c) => [c.id, c]));

// Ano da eleição em curso: esses boatos ganham destaque no feed e no Arquivo.
export const ELEICAO_ATUAL = 2026;

// Texto pronto para mandar a checagem no WhatsApp.
export const whatsappUrl = (c) =>
  `https://wa.me/?text=${encodeURIComponent(
    `🚫 FALSO: “${c.claim}”\n✅ O fato: ${c.fact}\nChecagem do ${agencyName(c)}: ${c.url}`
  )}`;

export const agencyName = (c) => AGENCIES[c.agency]?.name || c.agency;

export const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};
