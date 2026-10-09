import { useEffect, useReducer } from 'react';
import { SEED_POSTS, ME } from './data.js';

// v3: posts apontam para checagens reais (checkId), com os boatos da eleição de 2026.
const KEY = 'instagrama:v3';

const initial = () => ({
  posts: SEED_POSTS.map((p) => ({ ...p, createdAt: Date.now() - p.minutesAgo * 60000 })),
  liked: {},
  saved: {},
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* storage indisponível: começa do zero */ }
  return initial();
}

function reducer(state, action) {
  switch (action.type) {
    case 'like': {
      const was = !!state.liked[action.id];
      return {
        ...state,
        liked: { ...state.liked, [action.id]: !was },
        posts: state.posts.map((p) => (p.id === action.id ? { ...p, likes: p.likes + (was ? -1 : 1) } : p)),
      };
    }
    case 'save':
      return { ...state, saved: { ...state.saved, [action.id]: !state.saved[action.id] } };
    case 'share':
      return { ...state, posts: state.posts.map((p) => (p.id === action.id ? { ...p, shares: p.shares + 256 } : p)) };
    case 'comment':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.id
            ? { ...p, comments: [...p.comments, { id: Math.random().toString(36).slice(2), user: ME, text: action.text }] }
            : p
        ),
      };
    case 'publish':
      return { ...state, posts: [action.post, ...state.posts] };
    case 'reset':
      return initial();
    default:
      return state;
  }
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignora */ }
  }, [state]);
  return [state, dispatch];
}

export function timeAgo(ts) {
  const m = Math.max(0, Math.round((Date.now() - ts) / 60000));
  if (m < 1) return 'agora';
  if (m < 60) return `há ${m} min`;
  const h = Math.round(m / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${Math.round(h / 24)} d`;
}

export const fmt = (n) => n.toLocaleString('pt-BR');
