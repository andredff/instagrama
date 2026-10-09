# Instagrama — o Instagram dos gados

Sátira em React sobre fake news. Os perfis são inventados e as manchetes são
boatos reais que circularam no Brasil e já foram desmentidos. Todos aparecem
com o selo **FALSO**.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ para hospedar
npm run build:single  # gera dist-single/index.html (um arquivo só)
```

## O que funciona

- **Pasto (feed):** posts com Mugir (curtir), Ruminar (comentar), Espalhar
  (+256 encaminhamentos) e Guardar no curral (salvar).
- **Pastos (stories):** visualizador em tela cheia com avanço automático.
- **Notícia:** raio-x da fonte, mugímetro de credibilidade e comentários.
- **Nova publicação:** manchete, filtros (Caps Lock, Verde-amarelo, Print
  borrado, Seta vermelha), fonte, legenda e o botão "Tocar o berrante".
  "Checar fatos" fica sempre indisponível.
- **Perfil:** grade de correntes, aba de salvos e perfis dos outros usuários.
- **Busca e Berrantes (notificações).**

Os dados ficam no `localStorage` do navegador. No seu perfil, toque duas
vezes no menu (☰) para restaurar o conteúdo original.

## Estrutura

```
src/
  App.jsx            navegação (pilha de telas) e toast
  store.js           estado com useReducer + localStorage
  data.js            perfis, posts, stories, notificações
  components/        Icons, Common (Avatar, NewsCard, BottomNav), PostCard
  screens/           Feed, PostDetail, Compose, Profile, Search, Notifications
  styles.css
```

Não há backend: para virar uma rede de verdade, troque `store.js` por chamadas
a uma API (por exemplo Supabase ou Firebase) mantendo as mesmas ações
(`like`, `save`, `share`, `comment`, `publish`).
# instagrama
