import { writeFileSync } from 'node:fs';
const OUT = 'C:/_timon-claude/projects/sarah-mann-web/seo/erziehung-chancen/daten';

const SEEDS = [
  // Kita / Eingewöhnung
  'kita eingewöhnung','eingewöhnung kindergarten','kind weint kita','kind will nicht in die kita',
  'kita start','krippeneingewöhnung','abschied kita morgens','trennungsschmerz kind',
  // Schule
  'einschulung','schulstart','erstes schuljahr','schulanfang kind','hausaufgaben streit',
  'kind will nicht in die schule','schulranzen','schultüte','lernen mit kind',
  // Weihnachten / Geschenke
  'weihnachten mit kindern','geschenke kinder weihnachten','wie viele geschenke kind',
  'adventszeit mit kindern','nikolaus kinder','weihnachten stress familie','kind undankbar geschenke',
  'kind will alles haben','wunschzettel kind','ostern mit kindern',
  // Ferien / Urlaub / Reisen
  'urlaub mit kleinkind','ferien mit kindern','autofahrt mit kind','fliegen mit kleinkind',
  'ferienbetreuung','sommerferien kinder beschäftigen','langeweile kind ferien','urlaub mit baby',
  'reisen mit mehreren kindern','strandurlaub mit kindern',
  // Jahreswechsel / Vorsätze
  'silvester mit kindern','neujahrsvorsätze familie','familienregeln neues jahr',
  'routinen familie','tagesstruktur kind','familienplaner',
  // Krankheit / Winter
  'kind krank winter','erkältung kind','fieber kind','kind ständig krank kita',
  'kind krank arbeiten','kinderkrankentage','kind langweilt sich krank',
  'infektzeit kita','dunkle jahreszeit kinder','kinder winter beschäftigen',
  // Zeitumstellung / Schlaf saisonal
  'zeitumstellung kind','zeitumstellung baby schlaf','sommerzeit kind schlafen',
  'kind schläft im sommer schlecht','hitze kind schlafen','helle abende kind schlafen',
  // Übergänge / Anlässe
  'geburtstag kind feiern','kindergeburtstag regeln','einschulung geschenk',
  'schulwechsel kind','umzug mit kindern','neues geschwisterchen','muttertag',
  'fasching kinder','halloween kinder','laternenfest','sankt martin',
  // Erschöpfung / Alltag
  'familienalltag organisieren','morgens stress mit kindern','abendessen familie',
  'mental load mutter','wochenende mit kindern gestalten','bildschirmzeit kinder regeln',
  'handy kind ab wann','tablet kleinkind',
];
const PREFIX = ['warum','wann','wie','wie lange','was tun wenn','ab wann','wie viel','tipps','hilfe'];
const SUFFIX = ['tipps','ideen','wie lange','was tun','erfahrungen','regeln','ohne stress','trotz','vorbereiten','checkliste'];

const queries = new Set();
for (const s of SEEDS) {
  queries.add(s);
  for (const p of PREFIX) queries.add(p + ' ' + s);
  for (const su of SUFFIX) queries.add(s + ' ' + su);
}
const Q = [...queries];
console.log('Query-Strings:', Q.length, 'x 3 Engines =', Q.length*3, 'Abfragen');

async function fetchJson(url) {
  try { const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }); return await r.json(); } catch { return null; }
}
async function google(q){ const d = await fetchJson('https://suggestqueries.google.com/complete/search?client=firefox&hl=de&gl=DE&q='+encodeURIComponent(q)); return Array.isArray(d)&&Array.isArray(d[1])?d[1]:[]; }
async function youtube(q){ const d = await fetchJson('https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=de&q='+encodeURIComponent(q)); return Array.isArray(d)&&Array.isArray(d[1])?d[1]:[]; }
async function bing(q){ const d = await fetchJson('https://api.bing.com/osjson.aspx?query='+encodeURIComponent(q)); return Array.isArray(d)&&Array.isArray(d[1])?d[1]:[]; }

const bySource = { google:new Set(), youtube:new Set(), bing:new Set() };
let done=0; const total=Q.length*3; const CONC=8;
async function worker(slice){
  for(const q of slice){
    const [g,y,b] = await Promise.all([google(q),youtube(q),bing(q)]);
    g.forEach(s=>bySource.google.add(s.toLowerCase().trim()));
    y.forEach(s=>bySource.youtube.add(s.toLowerCase().trim()));
    b.forEach(s=>bySource.bing.add(s.toLowerCase().trim()));
    done+=3;
    if(done%600<3) console.log(`  ~${done}/${total}`);
    await new Promise(r=>setTimeout(r,25));
  }
}
const slices=Array.from({length:CONC},()=>[]);
Q.forEach((q,i)=>slices[i%CONC].push(q));
await Promise.all(slices.map(worker));

const REL=/kind|kinder|eltern|mutter|vater|famili|kita|kindergart|schul|einschul|weihnacht|geschenk|advent|nikolaus|ostern|ferien|urlaub|reis|silvester|vorsatz|krank|fieber|erkält|erkaelt|winter|zeitumstell|geburtstag|umzug|fasching|halloween|laterne|martin|bildschirm|handy|tablet|routin|struktur|eingewöhn|eingewoehn/;
const clean = (set)=>[...set].filter(q=>REL.test(q)&&q.length>8);
const out = { google:clean(bySource.google), youtube:clean(bySource.youtube), bing:clean(bySource.bing) };
const unionAll = new Set([...out.google,...out.youtube,...out.bing]);
console.log('\nGoogle:',out.google.length,'YouTube:',out.youtube.length,'Bing:',out.bing.length,'| Union:',unionAll.size);
writeFileSync(OUT+'/saison-autocomplete.json', JSON.stringify({...out, union:[...unionAll].sort()},null,2));
console.log('Gespeichert: saison-autocomplete.json');
