// Perfis inventados. As manchetes são boatos reais que circularam no Brasil
// e foram desmentidos — sempre exibidos com o selo FALSO.

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
];

export const FILTERS = [
  { id: 'capslock', name: 'Caps Lock', bg: '#1F3B17', fg: '#F6F1E4', mark: 'AAA!' },
  { id: 'verdeamarelo', name: 'Verde-amarelo', bg: '#E8B92E', fg: '#1F3B17', mark: 'VA' },
  { id: 'borrado', name: 'Print borrado', bg: '#B9B19B', fg: '#1B1B18', mark: '░░' },
  { id: 'seta', name: 'Seta vermelha', bg: '#C8402B', fg: '#FFFFFF', mark: '→' },
];

const c = (user, text) => ({ id: Math.random().toString(36).slice(2), user, text });

export const SEED_POSTS = [
  {
    id: 'p1', user: 'berrante_news', filter: 'capslock', year: 2020,
    headline: 'Vacina da Covid tem chip 5G para rastrear você',
    caption: 'Não li, mas concordo. Repassem antes que a mídia descubra que é mentira.',
    source: 'um amigo de um primo de um general',
    check: 'Agências de checagem: falso. Vacinas não contêm chips nem qualquer dispositivo eletrônico.',
    credibility: 2, likes: 2314, shares: 9870, minutesAgo: 3,
    comments: [
      c('patriota_raiz', 'Pesquisei a fundo: no próprio grupo. Confirmado.'),
      c('vaquinha.br', 'Não sei se é verdade, mas faz todo sentido pra mim.'),
      c('tiodozap', 'Já mandei pros 256 grupos. Depois eu leio.'),
    ],
  },
  {
    id: 'p2', user: 'curral_oficial', filter: 'seta', year: 2018,
    headline: 'Vídeo prova: urna eletrônica completa o voto sozinha',
    caption: 'ISSO A MÍDIA NÃO MOSTRA!!!',
    source: 'vídeo sem data e sem contexto',
    check: 'TSE e agências de checagem: falso. O boato reaparece a cada eleição.',
    credibility: 3, likes: 5120, shares: 22400, minutesAgo: 18,
    comments: [
      c('berrante_news', 'Se for mentira, a culpa é de quem checou.'),
      c('curral_oficial', '(a mídia mostrou: é falso)'),
    ],
  },
  {
    id: 'p3', user: 'patriota_raiz', filter: 'verdeamarelo', year: 2018,
    headline: 'Mamadeira erótica distribuída em creches',
    caption: 'Meu primo que trabalha lá viu. Ninguém mais viu, mas ele viu.',
    source: 'meu primo que trabalha lá',
    check: 'Checadores: falso. Nenhuma mamadeira desse tipo foi distribuída em creches.',
    credibility: 1, likes: 3890, shares: 15012, minutesAgo: 47,
    comments: [c('vaquinha.br', 'Nunca vi, mas tenho certeza.')],
  },
  {
    id: 'p4', user: 'vaquinha.br', filter: 'borrado', year: 2020,
    headline: 'Cloroquina cura Covid',
    caption: 'Fiz minha própria pesquisa (assisti um vídeo de 40 segundos).',
    source: 'print do print do print',
    check: 'Estudos clínicos: a cloroquina não mostrou eficácia contra a Covid.',
    credibility: 4, likes: 1702, shares: 6033, minutesAgo: 95,
    comments: [c('patriota_raiz', 'Ciência é opinião.')],
  },
  {
    id: 'p5', user: 'tiodozap', filter: 'capslock', year: 2022,
    headline: 'Se a esquerda ganhar, igrejas serão fechadas',
    caption: 'Bom dia, grupo! Flor + versículo + CAPS LOCK.',
    source: 'grupo “Família Unida”',
    check: 'Checadores: falso. Não há proposta nem lei para fechar igrejas.',
    credibility: 2, likes: 980, shares: 4410, minutesAgo: 180,
    comments: [],
  },
  { id: 'p6', user: 'tiodozap', filter: 'verdeamarelo', year: 2018, headline: '“Kit gay” entregue a crianças nas escolas',
    caption: 'Repassa!', source: 'áudio de 7 min do cunhado',
    check: 'Checadores: falso. O material citado nunca foi distribuído nas escolas.',
    credibility: 1, likes: 2200, shares: 8100, minutesAgo: 600, comments: [] },
  { id: 'p7', user: 'tiodozap', filter: 'borrado', year: 2020, headline: 'Vacina altera o seu DNA',
    caption: 'Fonte: confia.', source: 'print do print do print',
    check: 'Cientistas: falso. Vacinas de mRNA não alteram o DNA humano.',
    credibility: 2, likes: 1400, shares: 5300, minutesAgo: 900, comments: [] },
  { id: 'p8', user: 'tiodozap', filter: 'seta', year: 2018, headline: 'Banheiro unissex obrigatório nas escolas',
    caption: 'URGENTE!!!', source: 'meu primo que trabalha lá',
    check: 'Checadores: falso. Não existe essa obrigação.',
    credibility: 1, likes: 870, shares: 3020, minutesAgo: 1500, comments: [] },
  { id: 'p9', user: 'tiodozap', filter: 'capslock', year: 2018, headline: 'Bandeira do Brasil vai virar vermelha',
    caption: 'Assista antes que tirem do ar.', source: 'vídeo sem data e sem contexto',
    check: 'Checadores: falso. Não há qualquer proposta de mudar a bandeira.',
    credibility: 1, likes: 1650, shares: 7200, minutesAgo: 3000, comments: [] },
];

export const STORIES = [
  { user: 'berrante_news', text: 'BOM DIA, PATRIOTAS! Hoje tem corrente nova às 6h da manhã.' },
  { user: 'patriota_raiz', text: 'Fiz minha própria pesquisa: li o título.' },
  { user: 'vaquinha.br', text: 'Se não repassar para 10 grupos, 7 anos de seca no pasto.' },
  { user: 'curral_oficial', text: 'Checador de fatos é comprado. Fonte: o checador desmentiu a gente.' },
];

export const NOTIFICATIONS = [
  { user: 'patriota_raiz', text: 'encaminhou seu post para 48 grupos sem abrir.', time: '2 min' },
  { user: 'vaquinha.br', text: 'mugiu para “Vacina da Covid tem chip 5G”.', time: '9 min' },
  { user: 'curral_oficial', text: 'comentou: “ISSO A MÍDIA NÃO MOSTRA!!!”', time: '25 min' },
  { user: 'berrante_news', text: 'te marcou num áudio de 7 minutos.', time: '1 h' },
  { user: 'patriota_raiz', text: 'disse que pesquisou (no grupo) e confirmou.', time: '3 h' },
];
