const KAND = [
 'auf meine weise kinderbuch','genau so richtig kinderbuch','meine art zu sein buch',
 'anders unterwegs kinderbuch','wie ich die welt sehe kinderbuch','eins von uns kinderbuch',
 'du bist anders du bist gut','anders und das ist gut so','wie du bin ich',
 'kinderbuch stottern','kinderbuch adhs 7 jahre','kinderbuch legasthenie geschichten',
 'vorlesebuch anders sein grundschule','kurzgeschichten kinder anders sein'
];
async function j(u){try{const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}});return await r.json();}catch{return null;}}
async function g(q){const d=await j('https://suggestqueries.google.com/complete/search?client=firefox&hl=de&gl=DE&q='+encodeURIComponent(q));return Array.isArray(d)&&Array.isArray(d[1])?d[1]:[];}
for(const k of KAND){
  const s=await g(k);
  console.log(`[${k}] ${s.length} Vorschlaege`);
  if(s.length) console.log('   '+s.slice(0,5).join(' | '));
  await new Promise(r=>setTimeout(r,60));
}
