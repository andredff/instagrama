import { useState } from 'react';
import { USERS, ME } from '../data.js';
import { Avatar, NewsCard } from '../components/Common.jsx';
import { Back, Menu } from '../components/Icons.jsx';
import { fmt } from '../store.js';

const HIGHLIGHTS = [
  { name: 'Bom dia', icon: 'FLOR', bg: '#E8B92E', fg: '#1B1B18' },
  { name: 'Acampa', icon: 'BARRACA', bg: '#2F5E22', fg: '#F6F1E4' },
  { name: 'Pix', icon: 'R$', bg: '#1B1B18', fg: '#F6F1E4' },
  { name: 'Correntes', icon: '10 GRUPOS', bg: '#C8402B', fg: '#FFFFFF' },
];

export default function Profile({ handle, state, dispatch, back, openPost, toast, canGoBack }) {
  const u = USERS[handle];
  const [tab, setTab] = useState('posts');
  const [following, setFollowing] = useState(false);
  const [armed, setArmed] = useState(false);
  const isMe = handle === ME;
  const posts = state.posts.filter((p) => p.user === handle);
  const saved = state.posts.filter((p) => state.saved[p.id]);
  const shown = tab === 'saved' ? saved : posts;
  const shares = posts.reduce((a, p) => a + p.shares, 0);

  return (
    <div className="screen">
      <header className="subbar subbar--between">
        {canGoBack ? (
          <button className="icon-btn" aria-label="Voltar" onClick={back}><Back /></button>
        ) : <span style={{ width: 44 }} />}
        <span className="subbar__title">{u.handle}</span>
        <button className="icon-btn" aria-label={isMe ? 'Restaurar pasto original' : 'Menu'} onClick={() => {
          if (!isMe) return toast('Denunciar? Aqui a gente só encaminha.');
          if (armed) { dispatch({ type: 'reset' }); setArmed(false); toast('Pasto restaurado ao original.'); }
          else { setArmed(true); toast('Toque de novo para apagar suas correntes e restaurar o pasto.'); setTimeout(() => setArmed(false), 3500); }
        }}><Menu /></button>
      </header>

      <section className="profile-head">
        <Avatar handle={handle} size={76} ring />
        <div className="stats">
          <div><b>{fmt(posts.length)}</b><span>correntes</span></div>
          <div><b>{fmt(shares)}</b><span>encaminhadas</span></div>
          <div><b>1</b><span>fonte</span></div>
        </div>
      </section>

      <section className="profile-bio">
        <b>{u.name}</b>
        <span className="muted small">{isMe ? 'Influenciador de família' : 'Perfil do pasto'}</span>
        <span className="pre">{u.bio}</span>
      </section>

      <div className="profile-cta">
        {isMe ? (
          <>
            <button className="btn btn--soft" onClick={() => toast('Editar perfil? Só depois de encaminhar mais 10 correntes.')}>Editar perfil</button>
            <button className="btn btn--soft" onClick={() => toast('Áudio de 7 min gravado. Ninguém vai ouvir.')}>Gravar áudio de 7 min</button>
          </>
        ) : (
          <>
            <button className={`btn ${following ? 'btn--soft' : 'btn--green'}`} onClick={() => setFollowing(!following)}>
              {following ? 'Na manada' : 'Seguir a manada'}
            </button>
            <button className="btn btn--soft" onClick={() => toast('Áudio de 7 min enviado.')}>Mandar áudio de 7 min</button>
          </>
        )}
      </div>

      <div className="highlights">
        {HIGHLIGHTS.map((h) => (
          <button key={h.name} className="highlight" onClick={() => toast(`Destaque “${h.name}”: 340 stories iguais.`)}>
            <span className="highlight__circle" style={{ background: h.bg, color: h.fg }}>{h.icon}</span>
            <span className="highlight__name">{h.name}</span>
          </button>
        ))}
      </div>

      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'posts'} className={tab === 'posts' ? 'is-on' : ''} onClick={() => setTab('posts')}>Correntes</button>
        {isMe && <button role="tab" aria-selected={tab === 'saved'} className={tab === 'saved' ? 'is-on' : ''} onClick={() => setTab('saved')}>Curral (salvos)</button>}
      </div>

      <div className="grid">
        {shown.length === 0 && <p className="muted pad">{tab === 'saved' ? 'Nada guardado no curral ainda.' : 'Nenhuma corrente. Ainda.'}</p>}
        {shown.map((p) => (
          <button key={p.id} className="grid__cell" onClick={() => openPost(p.id)} aria-label={p.headline}>
            <NewsCard post={p} compact />
          </button>
        ))}
      </div>
    </div>
  );
}
