// Prueft Reihentitel-Kandidaten gegen die Deutsche Nationalbibliothek (SRU).
const KAND = [
 'Auf meine Weise','Genau so richtig','Meine Art zu sein','Anders unterwegs',
 'Wie ich die Welt sehe','Eins von uns','Bei mir ist das so','Ganz normal ich',
 'So bin ich unterwegs','Kinder wie wir','Das kann ich anders','Ich mach das so',
 'Wie du bin ich','Anders und das ist gut so'
];
async function dnb(titel){
  const q = encodeURIComponent(`TIT=${titel}`);
  const url = `https://services.dnb.de/sru/dnb?version=1.1&operation=searchRetrieve&query=${q}&recordSchema=oai_dc&maximumRecords=5`;
  try{
    const r = await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'}});
    const x = await r.text();
    const anzahl = +(x.match(/<numberOfRecords>(\d+)<\/numberOfRecords>/)?.[1] ?? -1);
    const titelListe = [...x.matchAll(/<dc:title>([^<]{0,90})</g)].map(m=>m[1]);
    return {anzahl, titelListe};
  }catch(e){ return {anzahl:-1, fehler:String(e).slice(0,60)}; }
}
for(const k of KAND){
  const r = await dnb(k);
  console.log(`\n[${k}] DNB-Treffer: ${r.anzahl}`);
  if(r.titelListe?.length) r.titelListe.slice(0,4).forEach(t=>console.log('   - '+t));
  if(r.fehler) console.log('   Fehler: '+r.fehler);
  await new Promise(r=>setTimeout(r,250));
}
