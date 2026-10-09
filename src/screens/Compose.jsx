import { useState } from 'react';
import { FILTERS, SOURCES, ME } from '../data.js';
import { NewsCard } from '../components/Common.jsx';
import { Close, Horn } from '../components/Icons.jsx';

export default function Compose({ dispatch, go, toast }) {
  const [headline, setHeadline] = useState('');
  const [caption, setCaption] = useState('Não li, mas concordo. REPASSEM!!!');
  const [filter, setFilter] = useState('capslock');
  const [source, setSource] = useState(SOURCES[0]);
  const [groups, setGroups] = useState(true);
  const [forwarded, setForwarded] = useState(true);

  const preview = { headline: headline.toUpperCase(), filter, mine: true };

  const publish = () => {
    if (!headline.trim()) return toast('Escreva uma manchete. Em CAPS LOCK, de preferência.');
    dispatch({
      type: 'publish',
      post: {
        id: `u${Date.now()}`,
        user: ME,
        mine: true,
        filter,
        headline: headline.trim(),
        caption: caption.trim(),
        source,
        check: '',
        credibility: 0,
        likes: 0,
        shares: groups ? 256 : 0,
        forwarded,
        createdAt: Date.now(),
        comments: [],
      },
    });
    toast(groups ? 'Berrante tocado! Enviado para 256 grupos.' : 'Publicado só no pasto.');
    go('feed');
  };

  return (
    <div className="screen screen--detail">
      <header className="subbar subbar--between">
        <button className="icon-btn" aria-label="Fechar" onClick={() => go('feed')}><Close /></button>
        <span className="subbar__title">Nova publicação</span>
        <button className="text-btn" onClick={publish}>Publicar</button>
      </header>

      <div className="detail">
        <NewsCard post={preview} />

        <div className="field">
          <label htmlFor="headline">Manchete</label>
          <input id="headline" value={headline} maxLength={90} onChange={(e) => setHeadline(e.target.value)}
            placeholder="Ex.: URGENTE!!! REPASSEM ANTES QUE APAGUEM" />
        </div>

        <div className="field">
          <span className="field__label" id="filtros">Filtros</span>
          <div className="filters" role="radiogroup" aria-labelledby="filtros">
            {FILTERS.map((f) => (
              <button key={f.id} role="radio" aria-checked={filter === f.id} className={`filter ${filter === f.id ? 'is-on' : ''}`}
                onClick={() => setFilter(f.id)}>
                <span className="filter__swatch" style={{ background: f.bg, color: f.fg }}>{f.mark}</span>
                <span className="filter__name">{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="fonte">Fonte</label>
          <select id="fonte" value={source} onChange={(e) => setSource(e.target.value)}>
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="legenda">Legenda</label>
          <textarea id="legenda" rows={3} value={caption} onChange={(e) => setCaption(e.target.value)} />
        </div>

        <div className="card toggles">
          <label className="toggle">
            <span><b>Espalhar em 256 grupos</b><small>Inclui o grupo da família e o do condomínio</small></span>
            <input type="checkbox" checked={groups} onChange={(e) => setGroups(e.target.checked)} />
          </label>
          <label className="toggle">
            <span><b>Marcar como “encaminhada com frequência”</b><small>Credibilidade instantânea</small></span>
            <input type="checkbox" checked={forwarded} onChange={(e) => setForwarded(e.target.checked)} />
          </label>
          <label className="toggle is-disabled" onClick={() => toast('Checar fatos? Recurso indisponível neste pasto.')}>
            <span><b>Checar fatos antes de postar</b><small className="red">Recurso indisponível neste pasto</small></span>
            <input type="checkbox" disabled />
          </label>
        </div>

        <button className="btn btn--gold btn--big" onClick={publish}>
          <Horn size={22} /> Tocar o berrante
        </button>
      </div>
    </div>
  );
}
