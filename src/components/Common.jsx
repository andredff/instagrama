import { USERS, FILTERS } from '../data.js';
import { Grass, Search, Plus, Cowbell } from './Icons.jsx';

export function Avatar({ handle, size = 36, ring = false }) {
  const u = USERS[handle] || { ini: '?', color: '#B9B19B' };
  const inner = (
    <span className="avatar" style={{ width: size, height: size, background: u.color, fontSize: size * 0.36 }}>
      {u.ini}
    </span>
  );
  if (!ring) return inner;
  return (
    <span className="avatar-ring" style={{ width: size + 12, height: size + 12 }}>
      {inner}
    </span>
  );
}

export function NewsCard({ post, compact = false }) {
  const f = FILTERS.find((x) => x.id === post.filter) || FILTERS[0];
  const light = f.id === 'verdeamarelo' || f.id === 'borrado';
  return (
    <div className={`news news--${f.id} ${compact ? 'news--compact' : ''}`} style={{ background: f.bg, color: f.fg }}>
      {!compact && (
        <div className="news__top">
          <span className="tag-urgent">URGENTE!!!</span>
          <span className="news__muted" style={{ color: light ? '#4A473E' : '#CFE0B8' }}>
            {post.year ? `circulando desde ${post.year}` : 'print do print do print'}
          </span>
        </div>
      )}
      {compact && <span className="news__tag">{post.mine ? 'SEM CHECAGEM' : `FALSO${post.year ? ` · ${post.year}` : ''}`}</span>}
      <p className="news__headline">{post.headline || '[SUA MANCHETE EM CAPS LOCK]'}</p>
      {!compact && (
        <div className="news__bottom">
          <span className="pill pill--gold">Encaminhada com frequência</span>
          {post.mine
            ? <span className="pill pill--red">Checagem: dormindo no pasto</span>
            : <span className="stamp">FALSO</span>}
        </div>
      )}
    </div>
  );
}

export function BottomNav({ screen, go, unread }) {
  const items = [
    { id: 'feed', label: 'Pasto (início)', icon: <Grass /> },
    { id: 'search', label: 'Buscar', icon: <Search /> },
    { id: 'compose', label: 'Nova publicação', icon: <Plus />, cta: true },
    { id: 'notifications', label: 'Berrantes', icon: <Cowbell />, badge: unread },
    { id: 'profile', label: 'Perfil', icon: <Avatar handle="tiodozap" size={28} /> },
  ];
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {items.map((it) => (
        <button
          key={it.id}
          aria-label={it.label}
          aria-current={screen === it.id ? 'page' : undefined}
          className={`nav-btn ${it.cta ? 'nav-btn--cta' : ''} ${screen === it.id ? 'is-active' : ''}`}
          onClick={() => go(it.id)}
        >
          {it.icon}
          {it.badge ? <span className="dot" /> : null}
        </button>
      ))}
    </nav>
  );
}

export function Toast({ text }) {
  if (!text) return null;
  return <div className="toast" role="status">{text}</div>;
}
