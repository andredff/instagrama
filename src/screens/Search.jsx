import { useState } from 'react';
import { USERS } from '../data.js';
import { Avatar, NewsCard } from '../components/Common.jsx';
import { Search as SearchIcon } from '../components/Icons.jsx';

export default function Search({ state, openPost, openProfile }) {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const posts = state.posts.filter(
    (p) => !term || p.headline.toLowerCase().includes(term) || p.caption.toLowerCase().includes(term) || p.source.toLowerCase().includes(term)
  );
  const users = Object.values(USERS).filter((u) => term && (u.handle.includes(term) || u.name.toLowerCase().includes(term)));

  return (
    <div className="screen">
      <header className="search-bar">
        <label htmlFor="busca" className="sr-only">Buscar no pasto</label>
        <span className="search-bar__icon"><SearchIcon size={20} /></span>
        <input id="busca" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar (no grupo, claro)" />
      </header>
      {term && (
        <p className="search-hint">
          Resultados para “{q}”. Dica do Instagrama: o primeiro resultado que confirmar o que você já pensa é a fonte certa.
        </p>
      )}
      {users.length > 0 && (
        <div className="user-list">
          {users.map((u) => (
            <button key={u.handle} className="user-row" onClick={() => openProfile(u.handle)}>
              <Avatar handle={u.handle} size={40} />
              <span><b>{u.handle}</b><small>{u.name}</small></span>
            </button>
          ))}
        </div>
      )}
      <div className="grid">
        {posts.length === 0 && <p className="muted pad">Nada encontrado. Deve ser censura.</p>}
        {posts.map((p) => (
          <button key={p.id} className="grid__cell" onClick={() => openPost(p.id)} aria-label={p.headline}>
            <NewsCard post={p} compact />
          </button>
        ))}
      </div>
    </div>
  );
}
