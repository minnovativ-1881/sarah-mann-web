// Prueft, ob Begriffskandidaten im deutschen Suchraum bereits belegt sind.
const KAND = [
 'heimkehr entladung','sicherheitsentladung','zusammenreiss effekt','zusammenreiß effekt',
 'nachmittagssturm','ankommenssturm','heimkehreffekt','kita kater','schulkater',
 'entladung nach der schule','zusammenbruch nach der schule','kind entlaedt sich zu hause',
 'sicherer hafen effekt kind','maskieren kind schule','kind funktioniert in der schule',
 'kind haelt sich zusammen','anspannung faellt ab kind','kind laesst los zu hause'
];
async function j(u){try{const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}});return await r.json();}catch{return null;}}
async function g(q){const d=await j('https://suggestqueries.google.com/complete/search?client=firefox&hl=de&gl=DE&q='+encodeURIComponent(q));return Array.isArray(d)&&Array.isArray(d[1])?d[1]:[];}
for(const k of KAND){
  const s=await g(k);
  console.log(`\n[${k}] -> ${s.length} Vorschlaege`);
  if(s.length) console.log('   '+s.slice(0,6).join(' | '));
  await new Promise(r=>setTimeout(r,60));
}
