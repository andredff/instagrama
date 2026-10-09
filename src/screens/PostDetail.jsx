import { useState } from 'react';
import { Avatar, NewsCard } from '../components/Common.jsx';
import { Back } from '../components/Icons.jsx';
import { fmt } from '../store.js';

export default function PostDetail({ post, dispatch, back, openProfile, toast }) {
  const [text, setText] = useState('');
  if (!post) return null;
  const cred = post.mine ? 0 : post.credibility;
  const submit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return toast('Ruminar vazio? Até o gado lê mais que isso.');
    dispatch({ type: 'comment', id: post.id, text: t });
    setText('');
    toast('Ruminado sem ler. Parabéns.');
  };
  const xray = [
    ['Fonte original', post.source],
    ['Publicado', post.year ? `Toda eleição desde ${post.year}, sempre como novidade` : 'Agora mesmo, sem checar nada'],
    ['Leitura', `0% leram · 100% compartilharam (${fmt(post.shares)})`],
    ['Checagem', post.check || 'Ainda não checado. O checador foi chamado de comprado antes mesmo de começar.'],
  ];
  return (
    <div className="screen screen--detail">
      <header className="subbar">
        <button className="icon-btn" aria-label="Voltar" onClick={back}><Back /></button>
        <span className="subbar__title">Notícia</span>
      </header>

      <div className="detail">
        <NewsCard post={post} />

        <section className="card xray" aria-label="Raio-x da fonte">
          <h2 className="xray__title">Raio-x da fonte</h2>
          {xray.map(([k, v]) => (
            <div className="xray__row" key={k}>
              <span className="xray__k">{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="meter">
            <div className="meter__top"><span>Mugímetro de credibilidade</span><span className="red">{cred}%</span></div>
            <div className="meter__track"><div className="meter__fill" style={{ width: `${Math.max(cred, 1)}%` }} /></div>
            <div className="meter__labels"><span>“o tio garantiu”</span><span>tem fonte de verdade</span></div>
          </div>
        </section>

        <h2 className="section-title">Ruminares</h2>
        <div className="comments">
          {post.comments.length === 0 && <p className="muted">Ninguém ruminou ainda. Todos estavam ocupados encaminhando.</p>}
          {post.comments.map((c) => (
            <div className="comment" key={c.id}>
              <button className="plain" onClick={() => openProfile(c.user)} aria-label={`Perfil de ${c.user}`}>
                <Avatar handle={c.user} size={30} />
              </button>
              <span><b>{c.user}</b> {c.text}</span>
            </div>
          ))}
        </div>
      </div>

      <form className="comment-bar" onSubmit={submit}>
        <label htmlFor="ruminar" className="sr-only">Escrever um ruminar</label>
        <input id="ruminar" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ruminar sem ler…" />
        <button type="submit" className="btn btn--gold">Mugir</button>
      </form>
    </div>
  );
}
