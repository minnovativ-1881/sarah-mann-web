import { readFileSync, writeFileSync } from 'node:fs';
const OUT = 'C:/_timon-claude/projects/sarah-mann-web/seo/erziehung-chancen/daten';
const norm = (s) => s.toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss');
const data = JSON.parse(readFileSync(OUT+'/multi-autocomplete.json','utf8'));
const sugg = [...new Set(data.union.map(norm))];

const THEMES = {
  'Erziehungsstile / Modelle / Baumrind': /erziehungsstil|autoritativ|autoritaer|permissiv|laissez|vernachlaessig|baumrind|demokratisch erzieh|antiautoritaer|erziehungsmodell|erziehungskonzept/,
  'Grenzen setzen': /grenze/,
  'Trotzphase / Autonomiephase': /trotz|autonomiephase|trotzig/,
  'Wut / Wutanfall / Aggression': /wut|aggressi|schlaegt|beisst|haut|tobt|ausraster|schreit/,
  'Kind hoert nicht / Gehorsam / Durchsetzen': /hoert nicht|gehorch|gehorsam|durchsetz|widersetzt|ignoriert|macht nicht was/,
  'Konsequenz / Strafen / Belohnung': /konsequen|strafe|bestraf|belohn|sanktion|auszeit|stille treppe|nachgeb/,
  'Beduerfnisorientiert / Bindung / Gentle Parenting': /beduerfnisorient|bindungsorient|gentle|attachment|bindung|artgerecht|unerzogen/,
  'Selbstregulation / Gefuehle / Co-Regulation': /selbstregul|co.?regul|gefuehl|emotion|regulier|beruhig|frust|impuls/,
  'Selbstwert / Selbstbewusstsein / Resilienz': /selbstwert|selbstbewusst|resilien|selbstvertrauen|staerken|selbstwirksam/,
  'Eltern: Erschoepfung / Schuld / Ueberforderung': /erschoepf|ausgebrannt|burnout|schuldgefuehl|ueberforder|versag|geduld|schimpf|laut geworden|ausgerastet/,
  'Schlaf / Abendroutine / Einschlafen': /schlaf|einschlaf|abendrout|bett|nachts|muede/,
  'Geschwister': /geschwister|bruder|schwester|eifersucht/,
  'Alter: Baby (0-1)': /baby|saeugling|1 jahr|einjaehrig/,
  'Alter: Kleinkind (1-3)': /kleinkind|2 jahre|3 jahre|zweijaehrig|dreijaehrig|2 jaehrig|3 jaehrig/,
  'Alter: Kindergarten/Vorschule (3-6)': /4 jahre|5 jahre|6 jahre|kindergarten|kita|vorschul/,
  'Alter: Schulkind (6-12)': /7 jahre|8 jahre|9 jahre|10 jahre|11 jahre|12 jahre|schulkind|grundschul/,
  'Alter: Pubertaet / Teenager': /pubertaet|teenager|jugendlich|13 jahre|14 jahre|15 jahre/,
  'Lob / Motivation / Selbststaendigkeit': /lob|loben|motivier|selbststaendig|verantwortung|helfen im haushalt|aufraeum/,
  'Medien / Bildschirmzeit': /medien|bildschirm|handy|tablet|fernseh|youtube|tiktok|spielzeit/,
  'Essen / Alltagskonflikte': /essen|esse|tisch|anziehen|zaehneputz|zahnputz|aufraeumen|einkauf|supermarkt/,
  'Partnerschaft / Grosseltern / Uneinigkeit': /partner|papa und mama|uneinig|grosseltern|oma|opa|erziehungsstil partner/,
  'Kita / Schule / Eingewoehnung': /eingewoehn|kita|kindergarten|schule|einschulung|erzieherin|lehrer/,
  'Definition / Test / Wissen': /was ist|definition|bedeutet|test|beispiele|vor und nachteile|merkmale|psychologie|studie|nach /,
};

const counts = {}; const examples = {};
for (const key of Object.keys(THEMES)) { counts[key]=0; examples[key]=[]; }
counts['(nicht zugeordnet)']=0; examples['(nicht zugeordnet)']=[];

for (const q of sugg) {
  let hit=false;
  for (const [key,re] of Object.entries(THEMES)) {
    if (re.test(q)) { counts[key]++; if(examples[key].length<40) examples[key].push(q); hit=true; }
  }
  if(!hit){ counts['(nicht zugeordnet)']++; if(examples['(nicht zugeordnet)'].length<60) examples['(nicht zugeordnet)'].push(q); }
}

const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
console.log('Gesamt eindeutige Suchvorschlaege:', sugg.length, '\n');
console.log('THEMA'.padEnd(52), 'TREFFER');
for (const [k,v] of sorted) console.log(k.padEnd(52), v);

writeFileSync(OUT+'/cluster.json', JSON.stringify({total:sugg.length, counts, examples},null,2));
console.log('\nGespeichert: cluster.json');
