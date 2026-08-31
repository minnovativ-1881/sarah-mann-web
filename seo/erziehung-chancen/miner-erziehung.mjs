import { writeFileSync } from 'node:fs';
const OUT = 'C:/_timon-claude/projects/sarah-mann-web/seo/erziehung-chancen/daten';

const SEEDS = [
  'erziehungsstile','autoritativer erziehungsstil','autoritärer erziehungsstil','permissiver erziehungsstil',
  'erziehungsstil test','grenzen setzen kind','grenzen setzen kleinkind','konsequent erziehen','konsequenz erziehung',
  'trotzphase','trotzanfall','wutanfall kind','kind hört nicht','nein sagen kind','regeln für kinder',
  'bedürfnisorientierte erziehung','bindungsorientierte erziehung','gentle parenting','attachment parenting',
  'kind schreit','kind respektlos','sich durchsetzen kind','autorität eltern','erziehung ohne schimpfen',
  'selbstregulation kind','co-regulation kind','kind beruhigen','emotionale entwicklung kind',
  'kind selbstbewusst machen','resilienz kind','erziehungsfehler','kind verwöhnen','überbehütung',
  'konsequenzen erziehung','strafen kinder','belohnung kinder','kind testet grenzen','machtkampf kind',
  'mutter erschöpft','eltern ausgebrannt','kind schläft nicht','einschlafbegleitung','abendroutine kind',
  'geschwisterstreit','pubertät grenzen','kind lügt','kind frech','kind schlägt','loben kinder',
  'erziehung baby','erziehung kleinkind','feste regeln kinder','kind grenzen austesten',
];
const PREFIX = ['warum','wieso','wann','wie','wie lange','wie oft','was tun wenn','welche','ab wann','soll ich','darf ich','hilfe mein kind','was ist','ist'];
const SUFFIX = ['mit','ohne','trotz','nach','bei','oder','weil','methode','erfahrungen','forum','beispiele','definition','vor und nachteile','psychologie','studie'];

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

const REL=/erzieh|grenze|trotz|wut|konsequen|autorit|bedürfnis|beduerfnis|bindung|gentle|attachment|regel|nein|hört|hoert|verwöhn|verwoehn|straf|belohn|selbstregul|resilien|beruhig|schimpf|streng|nachgeb|durchsetz|respekt|machtkampf|erschöpf|erschoepf|schlaf|einschlaf|geschwister|pubertät|pubertaet|selbstbewusst|selbstwert|gefühl|gefuehl|emotion|kind|eltern|mutter|vater/;
const clean = (set)=>[...set].filter(q=>REL.test(q)&&q.length>8);
const out = { google:clean(bySource.google), youtube:clean(bySource.youtube), bing:clean(bySource.bing) };
const unionAll = new Set([...out.google,...out.youtube,...out.bing]);
console.log('\nGoogle:',out.google.length,'YouTube:',out.youtube.length,'Bing:',out.bing.length,'| Union:',unionAll.size);
writeFileSync(OUT+'/multi-autocomplete.json', JSON.stringify({...out, union:[...unionAll].sort()},null,2));
console.log('Gespeichert: multi-autocomplete.json');
