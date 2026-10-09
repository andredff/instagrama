import { useEffect, useState } from 'react';
import { STORIES, USERS } from '../data.js';
import { Avatar } from '../components/Common.jsx';
import { BellLogo, Horn, Chat, Close } from '../components/Icons.jsx';
import PostCard from '../components/PostCard.jsx';

export default function Feed({ state, dispatch, go, openPost, openProfile, toast, unread }) {
  const [story, setStory] = useState(null);
  return (
    <div className="screen">
      <header className="topbar">
        <div className="brand">
          <BellLogo />
          <span className="brand__name">Insta<span>grama</span></span>
        </div>
        <div className="topbar__actions">
          <button className="icon-btn" aria-label="Berrantes (notificações)" onClick={() => go('notifications')}>
            <Horn />
            {unread ? <span className="dot dot--top" /> : null}
          </button>
          <button className="icon-btn" aria-label="Mensagens do zap" onClick={() => toast('Você tem 1.402 áudios não ouvidos. Encaminhe todos.')}>
            <Chat />
          </button>
        </div>
      </header>

      <div className="stories" role="list">
        <button className="story" role="listitem" onClick={() => go('compose')}>
          <span className="avatar-ring avatar-ring--empty" style={{ width: 64, height: 64 }}>
            <span className="avatar" style={{ width: 52, height: 52, background: '#B9B19B', fontSize: 22 }}>+</span>
          </span>
          <span className="story__name">Seu pasto</span>
        </button>
        {STORIES.map((s, i) => (
          <button key={s.user} className="story" role="listitem" onClick={() => setStory(i)}>
            <Avatar handle={s.user} size={52} ring />
            <span className="story__name">{s.user}</span>
          </button>
        ))}
      </div>

      <div className="feed">
        {state.posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            liked={!!state.liked[p.id]}
            saved={!!state.saved[p.id]}
            dispatch={dispatch}
            openPost={openPost}
            openProfile={openProfile}
            toast={toast}
          />
        ))}
        <p className="end-note">Você viu tudo. Agora encaminhe sem ler.</p>
      </div>

      {story !== null && <StoryViewer index={story} setIndex={setStory} />}
    </div>
  );
}

function StoryViewer({ index, setIndex }) {
  const s = STORIES[index];
  useEffect(() => {
    const t = setTimeout(() => setIndex(index + 1 < STORIES.length ? index + 1 : null), 4500);
    return () => clearTimeout(t);
  }, [index, setIndex]);
  return (
    <div className="story-viewer" role="dialog" aria-modal="true" aria-label={`Pasto de ${s.user}`}>
      <div className="story-viewer__bars">
        {STORIES.map((_, i) => (
          <span key={i} className="bar">
            <span className={`bar__fill ${i < index ? 'done' : i === index ? 'run' : ''}`} key={`${index}-${i}`} />
          </span>
        ))}
      </div>
      <div className="story-viewer__head">
        <Avatar handle={s.user} size={32} />
        <span className="strong light">{USERS[s.user].handle}</span>
        <button className="icon-btn light" aria-label="Fechar" onClick={() => setIndex(null)}><Close /></button>
      </div>
      <button
        className="story-viewer__body"
        onClick={() => setIndex(index + 1 < STORIES.length ? index + 1 : null)}
        aria-label="Próximo"
      >
        <span className="tag-urgent">URGENTE!!!</span>
        <p>{s.text}</p>
        <span className="pill pill--red">Checagem: FALSO</span>
      </button>
    </div>
  );
}
