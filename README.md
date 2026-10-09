# Instagrama — o Instagram dos gados

Sátira em React sobre fake news. Os perfis são inventados; os boatos são reais,
já foram desmentidos por agências de checagem e cada post leva à checagem
original. As imagens são as publicadas pelas próprias agências (o print do
boato ou o documento que o desmente), exibidas direto da fonte com crédito.

A base tem 20 boatos: 7 da eleição de 2026, checados entre o 1º e o 2º turno,
e 13 de 2018 a 2023 (mamadeira, kit gay, urna, vacina, caixões, 8 de Janeiro…).

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ para hospedar
npm run build:single  # gera dist-single/index.html (um arquivo só)
```

## Publicar na Vercel

1. Coloque estes arquivos na **raiz** do repositório no GitHub: o
   `package.json` precisa ficar no primeiro nível, e não dentro de uma
   subpasta.
2. Na Vercel: **Add New → Project**, importe o repositório e clique em
   **Deploy**. O `vercel.json` já define o framework (Vite), o build
   (`npm run build`) e a pasta de saída (`dist`).
3. Se o código estiver dentro de uma subpasta, vá em **Settings → General →
   Root Directory** e aponte para ela.

Também dá para publicar pelo terminal: `npm i -g vercel` e depois `vercel`
dentro da pasta do projeto.

## Checagens

- **Base própria** (`src/checagens.js`): cada boato tem a frase como circulou,
  “o fato” em uma linha, o resumo da checagem, o link, a data, a agência e a
  imagem tirada da matéria. Imagens com conteúdo sensível ficam borradas até
  o leitor pedir para ver; imagens que mostram pessoas comuns não são usadas.
- **Mandar no zap:** cada checagem tem um botão que abre o WhatsApp com o
  boato, o fato e o link da agência.
- **Verdade no pasto** (escudo no topo do feed):
  - *Arquivo:* os boatos desta eleição em destaque e os antigos abaixo.
  - *Ao vivo:* busca na [Google Fact Check Tools API](https://developers.google.com/fact-check/tools/api)
    pela função `api/checagens.js`, que também busca a imagem de cada checagem.

### Ligar a aba “Ao vivo”

1. No Google Cloud, ative a **Fact Check Tools API** e crie uma chave de API.
2. Na Vercel: **Settings → Environment Variables**, nome
   `GOOGLE_FACTCHECK_API_KEY`. Depois faça um novo deploy.
3. Para testar no `npm run dev`, copie `.env.example` para `.env.local` e
   preencha a chave.

A chave fica só no servidor. Sem ela, a aba mostra um aviso e o resto do app
funciona normalmente. As respostas ficam em cache na Vercel por 1 hora.

### Incluir um boato novo

Acrescente um item em `src/checagens.js` (só com checagem publicada e imagem
tirada da própria matéria) e um post correspondente no `WRAP` de
`src/data.js`. Se mudar os posts de exemplo, troque a chave `KEY` em
`src/store.js` para quem já abriu o app ver o feed novo.

## O que funciona

- **Pasto (feed):** posts com a imagem real do boato, o selo FALSO, “o fato”,
  o link da checagem e o botão de mandar no zap. Mugir (curtir), Ruminar
  (comentar), Espalhar (+256 encaminhamentos) e Guardar no curral (salvar).
- **Pastos (stories):** visualizador em tela cheia com avanço automático.
- **Notícia:** veredito e resumo da checagem, raio-x da fonte, mugímetro de
  credibilidade e comentários.
- **Nova publicação:** manchete, filtros (Caps Lock, Verde-amarelo, Print
  borrado, Seta vermelha), fonte, legenda e o botão "Tocar o berrante".
  "Checar fatos" fica sempre indisponível.
- **Perfil:** grade de correntes, aba de salvos e perfis dos outros usuários.
- **Busca e Berrantes (notificações).**

Os dados ficam no `localStorage` do navegador. No seu perfil, toque duas
vezes no menu (☰) para restaurar o conteúdo original.

## Estrutura

```
api/
  checagens.js       função da Vercel: Google Fact Check API + imagem da matéria
src/
  App.jsx            navegação (pilha de telas) e toast
  store.js           estado com useReducer + localStorage
  checagens.js       boatos reais com link, data, agência e imagem
  data.js            perfis, posts (ligados às checagens), stories, notificações
  components/        Icons, Common (Avatar, NewsCard, PostMedia, FactBox…), PostCard
  screens/           Feed, PostDetail, FactCheck, Compose, Profile, Search, Notifications
  styles.css
```

O único backend é a função de checagens. Para virar uma rede de verdade, troque `store.js` por chamadas
a uma API (por exemplo Supabase ou Firebase) mantendo as mesmas ações
(`like`, `save`, `share`, `comment`, `publish`).
