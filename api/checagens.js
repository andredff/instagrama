// Função da Vercel: GET /api/checagens?q=termo
// Consulta a Google Fact Check Tools API (claims:search) e devolve as
// checagens em português, cada uma com a imagem da matéria da agência.
// A chave fica só no servidor, na variável GOOGLE_FACTCHECK_API_KEY.

const GOOGLE_URL = 'https://factchecktools.googleapis.com/v1alpha1/claims:search';
const UA = 'Mozilla/5.0 (compatible; InstagramaBot/1.0; +https://github.com/andredff/instagrama)';
const MAX_HTML = 800_000;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const q = (url.searchParams.get('q') || '').trim().slice(0, 120);
    if (!q) return json({ error: 'consulta_vazia' }, 400);

    const key = process.env.GOOGLE_FACTCHECK_API_KEY;
    if (!key) return json({ error: 'sem_chave' }, 503);

    const params = new URLSearchParams({ query: q, languageCode: 'pt-BR', pageSize: '12', key });
    let data;
    try {
      const res = await fetch(`${GOOGLE_URL}?${params}`, { signal: AbortSignal.timeout(8000) });
      data = await res.json();
      if (!res.ok) {
        const detail = String(data?.error?.message || res.statusText).replaceAll(key, '***');
        return json({ error: 'google', detail }, 502);
      }
    } catch {
      return json({ error: 'google_indisponivel' }, 502);
    }

    const claims = (data.claims || []).map(normalize).filter((c) => c.reviews.length);
    await Promise.all(claims.map(async (c) => { c.image = await findImage(c.reviews[0].url); }));

    return json({ query: q, claims }, 200, {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    });
  },
};

function json(body, status, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });
}

function normalize(claim) {
  return {
    text: claim.text || '',
    claimant: claim.claimant || '',
    claimDate: claim.claimDate || '',
    reviews: (claim.claimReview || [])
      .filter((r) => isHttp(r.url))
      .map((r) => ({
        publisher: r.publisher?.name || r.publisher?.site || 'Checador',
        site: r.publisher?.site || '',
        url: r.url,
        title: r.title || '',
        rating: r.textualRating || '',
        date: r.reviewDate || '',
      })),
  };
}

function isHttp(u) {
  try {
    const { protocol, hostname } = new URL(u);
    return (protocol === 'https:' || protocol === 'http:') && hostname.includes('.') && !/^[\d.]+$/.test(hostname);
  } catch {
    return false;
  }
}

// Busca a imagem da checagem: no Aos Fatos a og:image é um banner genérico,
// então usa o primeiro print do corpo da matéria; nos demais, a og:image.
async function findImage(pageUrl) {
  try {
    const res = await fetch(pageUrl, {
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      redirect: 'follow',
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok || !(res.headers.get('content-type') || '').includes('html')) return null;
    const html = await readCapped(res, MAX_HTML);

    const aof = html.match(/https:\/\/static\.aosfatos\.org\/media\/cke_uploads\/[^"'\s)\\]+?\.(?:jpe?g|png|webp)/i);
    if (aof) return aof[0];

    const og = meta(html, 'og:image') || meta(html, 'twitter:image');
    if (!og || /opengraph-image/.test(og)) return null;
    const abs = new URL(decodeEntities(og), res.url || pageUrl).href;
    return isHttp(abs) ? abs : null;
  } catch {
    return null;
  }
}

async function readCapped(res, limit) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let html = '';
  while (html.length < limit) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  reader.cancel().catch(() => {});
  return html;
}

function meta(html, prop) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const name = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1];
    if (name?.toLowerCase() === prop) return tag.match(/\bcontent\s*=\s*["']([^"']+)["']/i)?.[1] || null;
  }
  return null;
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
}
