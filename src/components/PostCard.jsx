import { USERS } from '../data.js';
import { CHECAGEM_BY_ID } from '../checagens.js';
import { timeAgo, fmt } from '../store.js';
import { Avatar, PostMedia, Credit, FactBox } from './Common.jsx';
import { Cow, Comment, Send, Bookmark } from './Icons.jsx';

export default function PostCard({ post, liked, saved, dispatch, openPost, openProfile, toast }) {
  const u = USERS[post.user];
  const check = CHECAGEM_BY_ID[post.checkId];
  const onShare = () => {
    dispatch({ type: 'share', id: post.id });
    toast('Espalhado para 256 grupos. Ninguém leu. Missão cumprida.');
  };
  const onLike = () => {
    dispatch({ type: 'like', id: post.id });
    if (!liked) toast('Muuuuu!');
  };
  return (
    <article className="post">
      <header className="post__head">
        <button className="post__user" onClick={() => openProfile(post.user)}>
          <Avatar handle={post.user} />
          <span className="post__meta">
            <span className="post__name">
              {post.user}
              {u?.verified && <span className="badge-verified">VERIFICADO PELO TIO</span>}
            </span>
            <span className="post__sub">Fonte: {post.source} · {timeAgo(post.createdAt)}</span>
          </span>
        </button>
      </header>

      <button className="post__media" onClick={() => openPost(post.id)} aria-label={`Abrir notícia: ${post.headline}`}>
        <PostMedia post={post} />
      </button>
      <Credit check={check} />

      <div className="post__actions">
        <div className="post__actions-left">
          <button className={`act ${liked ? 'is-on' : ''}`} onClick={onLike} aria-pressed={liked} aria-label="Mugir">
            <Cow filled={liked} /> <span className="act__label">Mugir</span>
          </button>
          <button className="act" onClick={() => openPost(post.id)} aria-label="Ruminar">
            <Comment /> <span className="act__label">Ruminar</span>
          </button>
          <button className="act" onClick={onShare} aria-label="Espalhar">
            <Send /> <span className="act__label">Espalhar</span>
          </button>
        </div>
        <button
          className={`icon-btn ${saved ? 'is-on' : ''}`}
          aria-label={saved ? 'Tirar do curral' : 'Guardar no curral'}
          aria-pressed={saved}
          onClick={() => dispatch({ type: 'save', id: post.id })}
        >
          <Bookmark filled={saved} />
        </button>
      </div>

      <div className="post__body">
        <span className="strong">{fmt(post.likes)} mugidos · {fmt(post.shares)} encaminhamentos</span>
        <span><b>{post.user}</b> {post.caption}</span>
        {post.comments.length > 0 && (
          <button className="link-muted" onClick={() => openPost(post.id)}>
            Ver os {post.comments.length} ruminares e o raio-x da fonte
          </button>
        )}
        {check
          ? <FactBox check={check} />
          : <span className="chip-check">{post.mine ? 'Checagem de fatos: dormindo no pasto' : 'Checagem de fatos: FALSO'}</span>}
      </div>
    </article>
  );
}
