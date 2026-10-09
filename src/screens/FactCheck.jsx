import { useEffect, useRef, useState } from 'react';
import { CHECAGENS, ELEICAO_ATUAL, agencyName, fmtDate } from '../checagens.js';
import { ShareButton } from '../components/Common.jsx';
import { Back, External, Search as SearchIcon } from '../components/Icons.jsx';

const SUGESTOES = ['Bolsonaro', 'urna eletrônica', 'vacina', 'Lula', '8 de janeiro', 'STF'];

export default function FactCheck({ back }) {
  const [tab, setTab] = useState('arquivo');
  return (
    <div className="screen">
      <header className="subbar">
        <button className="icon-btn" aria-label="Voltar" onClick={back}><Back /></button>
        <span className="subbar__title">Verdade no pasto</span>
      </header>
      <p className="fc-intro">
        O que as agências de checagem já desmentiram. Cada item leva à checagem original, e as imagens são das próprias agências.
      </p>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'arquivo'} className={tab === 'arquivo' ? 'is-on' : ''} onClick={() => setTab('arquivo')}>
          Arquivo ({CHECAGENS.length})
        </button>
        <button role="tab" aria-selected={tab === 'aovivo'} className={tab === 'aovivo' ? 'is-on' : ''} onClick={() => setTab('aovivo')}>
          Ao vivo
        </button>
      </div>
      {tab === 'arquivo' ? <Archive /> : <Live />}
    </div>
  );
}

function Archive() {
  const atuais = CHECAGENS.filter((c) => c.year === ELEICAO_ATUAL).sort((a, b) => b.date.localeCompare(a.date));
  const antigos = CHECAGENS.filter((c) => c.year !== ELEICAO_ATUAL).sort((a, b) => a.year - b.year);
  return (
    <>
      <h2 className="fc-section">Eleição {ELEICAO_ATUAL} · boatos desta reta final</h2>
      <div className="fc-list">{atuais.map((c) => <ArchiveItem key={c.id} c={c} />)}</div>
      <h2 className="fc-section">Já desmentidos, de 2018 a 2023</h2>
      <div className="fc-list">{antigos.map((c) => <ArchiveItem key={c.id} c={c} />)}</div>
    </>
  );
}

function ArchiveItem({ c }) {
  return (
    <article className="fc-item">
      <Thumb src={c.image?.src} blur={c.image?.sensitive} />
      <div className="fc-item__body">
        <span className="fc-item__meta">
          <b className="verdict-tag verdict-tag--red">{c.verdict.toUpperCase()}</b> {c.year} · {agencyName(c)}
        </span>
        <h3 className="fc-item__claim">{c.claim}</h3>
        <p className="fc-item__summary"><b>O fato:</b> {c.fact}</p>
        <div className="fc-item__actions">
          <a className="fc-item__link" href={c.url} target="_blank" rel="noopener noreferrer">
            Checagem de {fmtDate(c.date)} <External />
          </a>
          <ShareButton check={c} className="fc-item__link fc-item__link--zap" />
        </div>
      </div>
    </article>
  );
}

const MESSAGES = {
  sem_chave: 'A busca ao vivo está desligada: falta configurar a chave GOOGLE_FACTCHECK_API_KEY na Vercel. O Arquivo continua funcionando.',
  sem_api: 'A busca ao vivo só funciona no app publicado na Vercel ou rodando com npm run dev.',
  google_indisponivel: 'A API de checagem do Google não respondeu. Tente de novo em instantes.',
  consulta_vazia: 'Digite um assunto para buscar.',
};

function Live() {
  const [q, setQ] = useState(SUGESTOES[0]);
  const [res, setRes] = useState({ status: 'idle' });
  const ctrl = useRef();

  const run = async (term) => {
    const t = term.trim();
    if (!t) return;
    ctrl.current?.abort();
    const c = new AbortController();
    ctrl.current = c;
    setRes({ status: 'loading', q: t });
    try {
      const r = await fetch(`/api/checagens?q=${encodeURIComponent(t)}`, { signal: c.signal });
      // Sem a função (build de arquivo único, prévia estática), a resposta vem em HTML.
      if (!(r.headers.get('content-type') || '').includes('json')) return setRes({ status: 'error', code: 'sem_api', q: t });
      const data = await r.json();
      if (!r.ok) return setRes({ status: 'error', code: data.error, detail: data.detail, q: t });
      setRes({ status: 'done', q: t, claims: data.claims || [] });
    } catch (e) {
      if (e.name !== 'AbortError') setRes({ status: 'error', code: 'sem_api', q: t });
    }
  };

  useEffect(() => {
    run(SUGESTOES[0]);
    return () => ctrl.current?.abort();
  }, []);

  const submit = (e) => { e.preventDefault(); run(q); };
  const pick = (s) => { setQ(s); run(s); };

  return (
    <div className="fc-live">
      <form className="search-bar search-bar--inline" onSubmit={submit} role="search">
        <label htmlFor="fc-q" className="sr-only">Buscar checagens</label>
        <span className="search-bar__icon"><SearchIcon size={20} /></span>
        <input id="fc-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar boato checado" maxLength={120} />
      </form>
      <div className="chips">
        {SUGESTOES.map((s) => (
          <button key={s} className={`chip ${res.q === s ? 'is-on' : ''}`} onClick={() => pick(s)}>{s}</button>
        ))}
      </div>

      {res.status === 'loading' && <p className="muted pad-x" role="status">Consultando os checadores sobre “{res.q}”…</p>}
      {res.status === 'error' && (
        <p className="fc-notice" role="status">
          {res.code === 'google' ? `A API do Google recusou a consulta: ${res.detail}` : MESSAGES[res.code] || MESSAGES.sem_api}
        </p>
      )}
      {res.status === 'done' && res.claims.length === 0 && (
        <p className="muted pad-x">Nenhuma checagem em português para “{res.q}”. Os checadores ainda não chegaram nesse pasto.</p>
      )}
      {res.status === 'done' && res.claims.length > 0 && (
        <div className="fc-list">
          {res.claims.map((c, i) => <LiveItem key={`${c.reviews[0].url}-${i}`} claim={c} />)}
        </div>
      )}

      <p className="fc-source">
        Fonte: <a href="https://toolbox.google.com/factcheck/explorer" target="_blank" rel="noopener noreferrer">Google Fact Check Tools</a>,
        que reúne checagens publicadas por agências no padrão ClaimReview. Busca em português.
      </p>
    </div>
  );
}

function LiveItem({ claim }) {
  const [main, ...others] = claim.reviews;
  return (
    <article className="fc-item">
      <Thumb src={claim.image} />
      <div className="fc-item__body">
        <span className="fc-item__meta">
          {main.rating && <b className={`verdict-tag ${tone(main.rating)}`}>{main.rating}</b>} {main.publisher}
          {main.date ? ` · ${new Date(main.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}` : ''}
        </span>
        <h3 className="fc-item__claim">{claim.text || main.title}</h3>
        {claim.claimant && <p className="fc-item__summary">Quem disse: {claim.claimant}</p>}
        <a className="fc-item__link" href={main.url} target="_blank" rel="noopener noreferrer">
          {main.title || 'Ler a checagem'} <External />
        </a>
        {others.length > 0 && (
          <p className="fc-item__summary">
            Também checado por{' '}
            {others.map((r, i) => (
              <span key={r.url}>
                {i > 0 && ', '}
                <a href={r.url} target="_blank" rel="noopener noreferrer">{r.publisher}</a>
              </span>
            ))}
          </p>
        )}
        {claim.image && <span className="fc-item__credit">Imagem: {main.publisher}</span>}
      </div>
    </article>
  );
}

function Thumb({ src, blur }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <img className={`fc-item__thumb ${blur ? 'is-blurred' : ''}`} src={src} alt="" loading="lazy" decoding="async"
      referrerPolicy="no-referrer" onError={() => setFailed(true)} />
  );
}

function tone(rating) {
  const r = rating.toLowerCase();
  if (/(falso|fake|mentira|montagem|inventad|não é verdade|nao e verdade)/.test(r)) return 'verdict-tag--red';
  if (/(engan|distorc|imprec|exager|contexto|insustent|sem prova|não é bem assim|, mas)/.test(r)) return 'verdict-tag--gold';
  if (/(verdadeiro|correto)/.test(r)) return 'verdict-tag--green';
  return '';
}
