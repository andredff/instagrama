import { useState } from 'react';
import { USERS, FILTERS } from '../data.js';
import { CHECAGEM_BY_ID, agencyName, whatsappUrl } from '../checagens.js';
import { Grass, Search, Plus, Cowbell, External, Send } from './Icons.jsx';

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
  const check = CHECAGEM_BY_ID[post.checkId];
  const [failed, setFailed] = useState(false);
  if (compact && check?.image && !failed) {
    return (
      <div className="news news--compact news--photo">
        <img src={check.image.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer"
          className={check.image.sensitive ? 'is-blurred' : ''} onError={() => setFailed(true)} />
        <span className="news__tag news__tag--photo">FALSO · {check.year}</span>
      </div>
    );
  }
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

// Imagem real do boato (publicada pela agência de checagem), com o selo FALSO
// e a manchete no estilo do filtro. Se a imagem não carregar, volta ao card de texto.
export function PostMedia({ post, revealed = false, inDetail = false }) {
  const check = CHECAGEM_BY_ID[post.checkId];
  const [failed, setFailed] = useState(false);
  if (!check?.image || failed) return <NewsCard post={post} />;
  const f = FILTERS.find((x) => x.id === post.filter) || FILTERS[0];
  const blur = check.image.sensitive && !revealed;
  return (
    <div className="evidence">
      <div className={`evidence__frame ${blur ? 'is-blurred' : ''}`}>
        <img src={check.image.src} width={check.image.width} height={check.image.height}
          alt={`Reprodução do boato: ${check.image.caption}`} loading="lazy" decoding="async"
          referrerPolicy="no-referrer" onError={() => setFailed(true)} />
        <span className="stamp evidence__stamp">FALSO</span>
        {blur && <span className="evidence__veil">{inDetail ? 'Imagem sensível' : 'Imagem sensível · abra a notícia para ver'}</span>}
      </div>
      <p className="evidence__headline" style={{ background: f.bg, color: f.fg }}>
        <span className="evidence__year">circulando desde {check.year}</span>
        {post.headline}
      </p>
    </div>
  );
}

export function Credit({ check }) {
  if (!check?.image) return null;
  return (
    <p className="credit">
      {check.image.caption}. Imagem:{' '}
      <a href={check.url} target="_blank" rel="noopener noreferrer">{agencyName(check)}</a>
    </p>
  );
}

// Veredito + o fato em uma linha + atalhos para a checagem e para o WhatsApp.
export function FactBox({ check }) {
  return (
    <div className="factbox">
      <p className="factbox__line">
        <span className="factbox__verdict">{check.verdict.toUpperCase()}</span>
        <span><b>O fato:</b> {check.fact}</span>
      </p>
      <div className="factbox__actions">
        <a className="factbox__btn" href={check.url} target="_blank" rel="noopener noreferrer">
          Checagem do {agencyName(check)} <External />
        </a>
        <ShareButton check={check} className="factbox__btn factbox__btn--zap" />
      </div>
    </div>
  );
}

export function ShareButton({ check, className = '', label = 'Mandar no zap' }) {
  return (
    <a className={className} href={whatsappUrl(check)} target="_blank" rel="noopener noreferrer"
      aria-label={`${label}: checagem de “${check.claim}”`}>
      <Send size={16} /> {label}
    </a>
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
