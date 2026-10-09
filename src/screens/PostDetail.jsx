import { useState } from 'react';
import { CHECAGEM_BY_ID, ELEICAO_ATUAL, agencyName, fmtDate } from '../checagens.js';
import { Avatar, PostMedia, Credit, ShareButton } from '../components/Common.jsx';
import { Back, External } from '../components/Icons.jsx';
import { fmt } from '../store.js';

export default function PostDetail({ post, dispatch, back, openProfile, toast }) {
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  if (!post) return null;
  const check = CHECAGEM_BY_ID[post.checkId];
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
    ['Publicado', !post.year ? 'Agora mesmo, sem checar nada'
      : post.year === ELEICAO_ATUAL ? 'Nesta eleição, entre o 1º e o 2º turno'
      : `Toda eleição desde ${post.year}, sempre como novidade`],
    ['Leitura', `0% leram · 100% compartilharam (${fmt(post.shares)})`],
    ...(check ? [] : [['Checagem', 'Ainda não checado. O checador foi chamado de comprado antes mesmo de começar.']]),
  ];
  return (
    <div className="screen screen--detail">
      <header className="subbar">
        <button className="icon-btn" aria-label="Voltar" onClick={back}><Back /></button>
        <span className="subbar__title">Notícia</span>
      </header>

      <div className="detail">
        <div className="detail__media">
          <PostMedia post={post} revealed={revealed} inDetail />
          {check?.image?.sensitive && !revealed && (
            <button className="btn btn--soft reveal" onClick={() => setRevealed(true)}>Ver imagem sensível</button>
          )}
          <Credit check={check} />
        </div>

        {check && (
          <section className="card verdict" aria-label="Checagem">
            <div className="verdict__head">
              <span className="verdict__label">{check.verdict.toUpperCase()}</span>
              <span className="muted small">{agencyName(check)} · {fmtDate(check.date)}</span>
            </div>
            <p className="verdict__fact"><b>O fato:</b> {check.fact}</p>
            <p className="verdict__summary">{check.summary}</p>
            <div className="verdict__actions">
              <a className="btn btn--green" href={check.url} target="_blank" rel="noopener noreferrer">
                Ler a checagem no {agencyName(check)} <External />
              </a>
              <ShareButton check={check} className="btn btn--zap" label="Mandar a checagem no zap" />
            </div>
          </section>
        )}

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
