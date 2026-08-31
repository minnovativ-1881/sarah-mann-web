import { writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

const OUT = 'C:/_timon-claude/projects/sarah-mann-web/seo/erziehung-chancen/daten';

const DOMAINS = [
  'geborgen-wachsen.de', 'nestling.org', 'elternleben.de', 'familie.de', 'eltern.de',
  'babelli.de', 'hallo-eltern.de', 'kindergesundheit-info.de', 'urbia.de', 'pampers.de',
  'hipp.de', 'scoyo.de', 'betreut.de', 'swissmom.ch', 'wir-eltern.ch',
  'kita.de', 'vaterfreuden.de', 'lernfoerderung.de', 'kinderaerzte-im-netz.de',
  'mit-kindern-wachsen.de', 'praxisvita.de', 'babyclub.de', 'leben-und-erziehen.de',
  'rund-ums-baby.de', 'gluecklichekinder.de', 'sarahmann.de',
];

// Erziehungs-/Haltungs-Tokens (bewusst auf Sarahs Territorium)
const TOK = ['erzieh','grenze','grenzen','trotz','wutanfall','wut-','wutausbruch','konsequen','autorit',
  'beduerfnis','bedürfnis','bindung','gentle','attachment','regeln','nein-sagen','verwoehn','verwöhn',
  'strafe','bestrafung','belohn','selbstregul','co-regulation','koregulation','resilien','schimpf','streng',
  'nachgeb','durchsetz','respekt','machtkampf','selbstbewusst','selbstwert','gefuehle','gefühle',
  'emotion','geschwisterstreit','pubertaet','pubertät','autonomiephase','erziehungsstil',
  'kleinkind','elternrolle','erschoepf','erschöpf','loben','bindungsorientiert',
  'frustration','provozier','angeschrien','angeschrieen','hoert-nicht','hoert_nicht','nicht-hoert',
  'einschlafbegleit','einschlaf','schlafenszeit','abendritual','zubettgeh','bettgeh',
  'wutkind','streit','kooperation','mitarbeit','regulier','beruhig','ausraster','tobt',
  'selbststaendig','autonomie','frech','luegt','haut-','beisst'];

// WICHTIG (Gotcha aus dem Skill): nur den PFAD prüfen, nicht die ganze URL.
const isRel = (url) => {
  let p;
  try { p = new URL(url).pathname.toLowerCase(); } catch { return false; }
  // Rauschen ausschliessen: Foren, Tags, Autoren, Shop
  if (/\/(forum|foren|tag|tags|autor|author|shop|produkt|product|kategorie|category|page)\//.test(p)) return false;
  return TOK.some(t => p.includes(t));
};

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', 'Accept': 'application/xml,text/xml,*/*' };

async function get(url, asBuffer = false) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, { headers: UA, signal: ctrl.signal, redirect: 'follow' });
    if (!res.ok) return null;
    if (asBuffer) return Buffer.from(await res.arrayBuffer());
    return await res.text();
  } catch { return null; } finally { clearTimeout(t); }
}

async function fetchXml(url) {
  const buf = await get(url, true);
  if (!buf) return null;
  let text;
  if (url.endsWith('.gz') || (buf[0] === 0x1f && buf[1] === 0x8b)) {
    try { text = gunzipSync(buf).toString('utf8'); } catch { return null; }
  } else text = buf.toString('utf8');
  return text;
}

const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map(m => m[1].replace(/&amp;/g, '&'));

async function discoverSitemaps(domain) {
  const found = new Set();
  const robots = await get(`https://${domain}/robots.txt`);
  if (robots) for (const m of robots.matchAll(/^\s*sitemap:\s*(\S+)/gim)) found.add(m[1].trim());
  for (const c of ['sitemap.xml', 'sitemap_index.xml', 'sitemap-index.xml', 'wp-sitemap.xml', 'sitemap/sitemap-index.xml']) {
    const u = `https://${domain}/${c}`;
    const xml = await fetchXml(u);
    if (xml && /<(urlset|sitemapindex)/i.test(xml)) found.add(u);
  }
  return [...found];
}

async function collectUrls(domain) {
  const seeds = await discoverSitemaps(domain);
  if (!seeds.length) return { domain, sitemaps: 0, total: 0, rel: 0, relUrls: [], note: 'keine sitemap gefunden' };
  const queue = [...seeds];
  const seenMaps = new Set();
  const urls = new Set();
  let mapsFetched = 0;
  while (queue.length && mapsFetched < 80 && urls.size < 400000) {
    const sm = queue.shift();
    if (seenMaps.has(sm)) continue;
    seenMaps.add(sm);
    const xml = await fetchXml(sm);
    if (!xml) continue;
    mapsFetched++;
    const isIndex = /<sitemapindex/i.test(xml);
    const found = locs(xml);
    if (isIndex) { for (const child of found) if (!seenMaps.has(child)) queue.push(child); }
    else for (const u of found) urls.add(u);
  }
  const relUrls = [...urls].filter(isRel);
  return { domain, sitemaps: mapsFetched, total: urls.size, rel: relUrls.length, relUrls, note: urls.size >= 400000 ? 'gekappt bei 400k' : '' };
}

const results = [];
for (const d of DOMAINS) {
  const r = await collectUrls(d);
  results.push(r);
  console.log(`${r.domain.padEnd(30)} sitemaps:${String(r.sitemaps).padStart(3)}  urls:${String(r.total).padStart(7)}  erziehung-relevant:${String(r.rel).padStart(5)}  ${r.note}`);
}
writeFileSync(OUT + '/sitemaps-v2.json', JSON.stringify(results, null, 2));
console.log('\nGespeichert: sitemaps.json');
