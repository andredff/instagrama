// Perfis inventados. As manchetes são boatos reais que circularam no Brasil
// e foram desmentidos — sempre exibidos com o selo FALSO e o link da checagem.

import { CHECAGEM_BY_ID } from './checagens.js';

export const ME = 'tiodozap';

export const USERS = {
  tiodozap: { handle: 'tiodozap', name: 'Tio do Zap', ini: 'TZ', color: '#7A5A2E',
    bio: 'Patriota de pasto. Bom dia com foto de flor.\nNão li, mas já encaminhei.\nPesquisa? Só a do grupo.' },
  berrante_news: { handle: 'berrante_news', name: 'Berrante News', ini: 'BN', color: '#2F5E22', verified: true,
    bio: 'Jornalismo de verdade (fonte: a gente mesmo).' },
  patriota_raiz: { handle: 'patriota_raiz', name: 'Patriota Raiz', ini: 'PR', color: '#3E7C2E',
    bio: 'Pesquiso tudo. No grupo.' },
  'vaquinha.br': { handle: 'vaquinha.br', name: 'Vaquinha BR', ini: 'VB', color: '#1B1B18',
    bio: 'Não sei se é verdade, mas faz sentido.' },
  curral_oficial: { handle: 'curral_oficial', name: 'Curral Oficial', ini: 'CO', color: '#C8402B',
    bio: 'O que a mídia não mostra (a mídia mostrou).' },
};

export const SOURCES = [
  'áudio de 7 min do cunhado',
  'um amigo de um primo de um general',
  'print do print do print',
  'vídeo sem data e sem contexto',
  'grupo “Família Unida”',
  'meu primo que trabalha lá',
  'um site gringo que ninguém conhece',
];

export const FILTERS = [
  { id: 'capslock', name: 'Caps Lock', bg: '#1F3B17', fg: '#F6F1E4', mark: 'AAA!' },
  { id: 'verdeamarelo', name: 'Verde-amarelo', bg: '#E8B92E', fg: '#1F3B17', mark: 'VA' },
  { id: 'borrado', name: 'Print borrado', bg: '#B9B19B', fg: '#1B1B18', mark: '░░' },
  { id: 'seta', name: 'Seta vermelha', bg: '#C8402B', fg: '#FFFFFF', mark: '→' },
];

const c = (user, text) => ({ id: Math.random().toString(36).slice(2), user, text });

// Embrulho satírico de cada boato: quem postou, legenda e "fonte". O boato em
// si, a imagem e a checagem vêm de checagens.js (pelo checkId).
const WRAP = {
  'pcc-cv-2026': { user: 'curral_oficial', filter: 'seta', minutesAgo: 2, likes: 6230, shares: 31400,
    caption: 'Nem o Ministério Público sabia. Mas o grupo sabia.',
    source: 'print do print do print',
    comments: [
      c('patriota_raiz', 'Não achei em lugar nenhum, então é verdade.'),
      c('vaquinha.br', 'O MP negou? Prova que é verdade.'),
    ] },
  'faltou-tse-2026': { user: 'tiodozap', filter: 'verdeamarelo', minutesAgo: 9, likes: 3410, shares: 14200,
    caption: 'Fui conferir e diz que eu faltei!!! (o site ainda tava processando, mas já encaminhei)',
    source: 'meu primo que trabalha lá',
    comments: [c('berrante_news', 'Esperar o TSE terminar de processar? Jamais.')] },
  'bolsa-familia-2026': { user: 'berrante_news', filter: 'capslock', minutesAgo: 15, likes: 2980, shares: 12750,
    caption: 'Vídeo de 2025, notícia de 2026. O pasto não tem calendário.',
    source: 'vídeo sem data e sem contexto', comments: [] },
  'percentual-flavio-2026': { user: 'patriota_raiz', filter: 'capslock', minutesAgo: 26, likes: 1890, shares: 8040,
    caption: 'Fiz a conta no dedo. Matemática é coisa da esquerda.',
    source: 'áudio de 7 min do cunhado',
    comments: [c('vaquinha.br', 'Porcentagem é opinião.')] },
  'nordestinos-2026': { user: 'berrante_news', filter: 'verdeamarelo', minutesAgo: 40, likes: 4120, shares: 17900,
    caption: 'Ele disse! (citando o outro, mas ele disse)',
    source: 'grupo “Família Unida”', comments: [] },
  'urna-rn-2026': { user: 'vaquinha.br', filter: 'seta', minutesAgo: 58, likes: 2210, shares: 9930,
    caption: 'TROCARAM A URNA!!! (porque a tela apagou, mas não conta pra ninguém)',
    source: 'vídeo sem data e sem contexto', comments: [] },
  'g1-montagem-2026': { user: 'patriota_raiz', filter: 'borrado', minutesAgo: 75, likes: 2760, shares: 13100,
    caption: 'Tá no g1! (num g1 que o próprio g1 não conhece)',
    source: 'print do print do print', comments: [] },
  'chip-5g': { user: 'berrante_news', filter: 'capslock', minutesAgo: 123, likes: 2314, shares: 9870,
    caption: 'Não li, mas concordo. Repassem antes que a mídia descubra que é mentira.',
    source: 'um amigo de um primo de um general',
    comments: [
      c('patriota_raiz', 'Pesquisei a fundo: no próprio grupo. Confirmado.'),
      c('vaquinha.br', 'Não sei se é verdade, mas faz todo sentido pra mim.'),
      c('tiodozap', 'Já mandei pros 256 grupos. Depois eu leio.'),
    ] },
  'boletim-9909': { user: 'curral_oficial', filter: 'seta', minutesAgo: 138, likes: 5120, shares: 22400,
    caption: 'ISSO A MÍDIA NÃO MOSTRA!!! (777 eleitores, 9.909 votos: a matemática do pasto)',
    source: 'print do print do print',
    comments: [
      c('berrante_news', 'Se for mentira, a culpa é de quem checou.'),
      c('curral_oficial', '(a mídia mostrou: é montagem)'),
    ] },
  'mamadeira': { user: 'patriota_raiz', filter: 'verdeamarelo', minutesAgo: 167, likes: 3890, shares: 15012,
    caption: 'Meu primo que trabalha lá viu. Ninguém mais viu, mas ele viu.',
    source: 'meu primo que trabalha lá',
    comments: [c('vaquinha.br', 'Nunca vi, mas tenho certeza.')] },
  'cloroquina': { user: 'vaquinha.br', filter: 'borrado', minutesAgo: 215, likes: 1702, shares: 6033,
    caption: 'Fiz minha própria pesquisa (assisti um vídeo de 40 segundos).',
    source: 'áudio de 7 min do cunhado',
    comments: [c('patriota_raiz', 'Ciência é opinião.')] },
  'fechar-igrejas': { user: 'tiodozap', filter: 'capslock', minutesAgo: 300, likes: 980, shares: 4410,
    caption: 'Bom dia, grupo! Flor + versículo + CAPS LOCK.',
    source: 'grupo “Família Unida”', comments: [] },
  'vacina-aids': { user: 'berrante_news', filter: 'seta', minutesAgo: 380, likes: 3105, shares: 12800,
    caption: 'Até o presidente leu na live. Se ele leu, eu repasso.',
    source: 'um site gringo que ninguém conhece',
    comments: [c('vaquinha.br', 'Tiraram do ar, então é verdade.')] },
  'stm-72-horas': { user: 'curral_oficial', filter: 'capslock', minutesAgo: 540, likes: 4470, shares: 19300,
    caption: 'AGORA VAI!!! 72 horas!!! (contando desde 2022)',
    source: 'um amigo de um primo de um general',
    comments: [c('patriota_raiz', 'Fonte: o próprio post. Confiável.')] },
  'kit-gay': { user: 'tiodozap', filter: 'verdeamarelo', minutesAgo: 720, likes: 2200, shares: 8100,
    caption: 'Repassa!', source: 'áudio de 7 min do cunhado', comments: [] },
  'infiltrados-8-janeiro': { user: 'patriota_raiz', filter: 'borrado', minutesAgo: 880, likes: 2650, shares: 11020,
    caption: 'Olha os infiltrados aí! (de El Salvador, mas detalhe)',
    source: 'vídeo sem data e sem contexto', comments: [] },
  'vacina-dna': { user: 'tiodozap', filter: 'borrado', minutesAgo: 1020, likes: 1400, shares: 5300,
    caption: 'Fonte: confia.', source: 'print do print do print', comments: [] },
  'caixoes-vazios': { user: 'vaquinha.br', filter: 'seta', minutesAgo: 1620, likes: 1870, shares: 7020,
    caption: 'URGENTE!!! Foto de 2017, notícia de hoje.',
    source: 'grupo “Família Unida”', comments: [] },
  'pix-cpmf': { user: 'vaquinha.br', filter: 'borrado', minutesAgo: 2400, likes: 3020, shares: 15800,
    caption: 'Tirei o print só da parte que interessa.',
    source: 'print do print do print',
    comments: [c('tiodozap', 'O resto do texto eu não li, mas o print diz tudo.')] },
  'livro-haddad': { user: 'tiodozap', filter: 'capslock', minutesAgo: 3120, likes: 1650, shares: 7200,
    caption: 'Não li o livro. Nem o post. Mas assino embaixo.',
    source: 'vídeo sem data e sem contexto', comments: [] },
};

export const SEED_POSTS = Object.entries(WRAP).map(([checkId, w], i) => {
  const ch = CHECAGEM_BY_ID[checkId];
  return { id: `p${i + 1}`, checkId, year: ch.year, headline: ch.claim, credibility: 1 + (i % 4), ...w };
});

export const STORIES = [
  { user: 'berrante_news', text: 'BOM DIA, PATRIOTAS! Hoje tem corrente nova às 6h da manhã.' },
  { user: 'patriota_raiz', text: 'Fiz minha própria pesquisa: li o título.' },
  { user: 'vaquinha.br', text: 'Se não repassar para 10 grupos, 7 anos de seca no pasto.' },
  { user: 'curral_oficial', text: 'Checador de fatos é comprado. Fonte: o checador desmentiu a gente.' },
];

export const NOTIFICATIONS = [
  { user: 'patriota_raiz', text: 'encaminhou seu post para 48 grupos sem abrir.', time: '2 min' },
  { user: 'vaquinha.br', text: 'mugiu para “Vacina chinesa tem nanochip 5G”.', time: '9 min' },
  { user: 'curral_oficial', text: 'comentou: “ISSO A MÍDIA NÃO MOSTRA!!!”', time: '25 min' },
  { user: 'berrante_news', text: 'te marcou num áudio de 7 minutos.', time: '1 h' },
  { user: 'patriota_raiz', text: 'disse que pesquisou (no grupo) e confirmou.', time: '3 h' },
];
