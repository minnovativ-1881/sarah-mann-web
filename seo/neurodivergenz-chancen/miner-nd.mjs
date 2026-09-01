import { writeFileSync } from 'node:fs';
const OUT = 'C:/_timon-claude/projects/sarah-mann-web/seo/neurodivergenz-chancen/daten';

const SEEDS = [
  // Reizoffenheit / Ueberlastung
  'reizueberflutung kind','reizüberflutung kind','überreiztes kind','reizoffenes kind','kind zu viele reize',
  'kind schnell überfordert','kind übererregt','kind überdreht','kind reagiert über','sensorische überempfindlichkeit kind',
  // Meltdown / Eskalation
  'meltdown kind','shutdown kind','kind rastet aus','kind explodiert','kind ausraster grundschule',
  'wutanfall oder meltdown','unterschied meltdown trotzanfall','kind wutanfall 6 jahre','kind wutanfall 8 jahre',
  'kind aggressiv grundschule','kind zerstört sachen wut','kind beruhigt sich nicht mehr',
  // Vor der Diagnose
  'verdacht adhs kind','adhs test kind','adhs diagnose kind wartezeit','ist mein kind adhs',
  'autismus verdacht kind','autismus anzeichen kind','ist mein kind autistisch','kind entwicklungsauffällig',
  'spz termin wartezeit','kinderpsychiater wartezeit','wann zum kinderarzt verhalten',
  'kind auffällig kita','entwicklungsgespräch kita auffällig','kind anders als andere kinder',
  'neurodivergent kind','neurodivers kind','mein kind tickt anders','ist mein kind normal verhalten',
  // Alltagsbruchstellen
  'kind will sich nicht anziehen','anziehen kind kampf','kind zähneputzen weigert sich',
  'kind übergänge schwierig','kind will nicht aus dem haus','morgens mit kind stress',
  'kind nach kita ausraster','kind nach schule aggressiv','after school restraint collapse',
  'kind isst nur weniges','wählerisches kind essen','kind sensorik essen',
  'kind kleidung naht stört','kind verträgt keine socken','kind mag etiketten nicht',
  'kind laute geräusche empfindlich','kind hält ohren zu','kind supermarkt überfordert',
  'kind einschlafen überdreht','kind abends dreht auf',
  // Schule / Institution
  'kind überfordert schule','nachteilsausgleich schule','kind schule verweigert',
  'elterngespräch schule kind auffällig','lehrer sagt kind stört','kind hat keine freunde grundschule',
  // Eltern
  'eltern erschöpft besonderes kind','kind fordert mich total','schuldgefühle mutter kind',
  'geschwister kommen zu kurz','partnerschaft belastet kind besonders',
  'kind hört nicht trotz konsequenz','erziehungstipps funktionieren nicht',
  // Angrenzend besetzt
  'gefühlsstarkes kind','hochsensibles kind','wildes kind','eigensinniges kind','high need kind',
  'kind kann nicht verlieren','frustrationstoleranz kind','kind gibt sofort auf',
];
const PREFIX = ['warum','wieso','wann','wie','wie lange','was tun wenn','was hilft bei','welche','ab wann','soll ich','hilfe mein kind','was ist','ist','woran erkenne ich'];
const SUFFIX = ['was tun','forum','erfahrungen','test','anzeichen','symptome','ursachen','buch','tipps','oder','trotz','ohne','bei kindern','grundschule','kita','5 jahre','7 jahre'];

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
    if(done%300<3) console.log(`  ~${done}/${total}`);
    await new Promise(r=>setTimeout(r,25));
  }
}
const slices=Array.from({length:CONC},()=>[]);
Q.forEach((q,i)=>slices[i%CONC].push(q));
await Promise.all(slices.map(worker));

const REL=/reiz|überreiz|ueberreiz|meltdown|shutdown|ausrast|explod|wutanfall|aggressiv|adhs|ads |autis|asperger|neurodiver|entwicklungs|auffäll|auffaell|hochsensi|gefühlsstark|gefuehlsstark|high need|wild|eigensinn|überforder|ueberforder|sensor|empfindlich|geräusch|geraeusch|socken|etikett|anziehen|zähneputz|zaehneputz|übergang|uebergang|kita|schule|nachteilsausgleich|frustration|verlieren|erschöpf|erschoepf|schuldgefühl|schuldgefuehl|geschwister|diagnose|spz|kinderpsych|verdacht|anders|tickt|essen|wählerisch|waehlerisch|kind|eltern/;
const clean = (set)=>[...set].filter(q=>REL.test(q)&&q.length>8);
const out = { google:clean(bySource.google), youtube:clean(bySource.youtube), bing:clean(bySource.bing) };
const unionAll = new Set([...out.google,...out.youtube,...out.bing]);
console.log('\nGoogle:',out.google.length,'YouTube:',out.youtube.length,'Bing:',out.bing.length,'| Union:',unionAll.size);
writeFileSync(OUT+'/multi-autocomplete.json', JSON.stringify({...out, union:[...unionAll].sort()},null,2));
console.log('Gespeichert: multi-autocomplete.json');
