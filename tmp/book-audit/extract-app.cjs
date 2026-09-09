const fs = require('fs'); const vm = require('vm');
const packs=[];
for(const name of fs.readdirSync('subjects').filter(n=>/^grade[12378]-/.test(n))){
 const file=`subjects/${name}/_manifest.js`;
 vm.runInNewContext(fs.readFileSync(file,'utf8'),{registerSubject:p=>packs.push({file,...p})},{timeout:5000});
}
fs.writeFileSync('tmp/book-audit/app-syllabus.json',JSON.stringify(packs,null,2));
fs.writeFileSync('tmp/book-audit/app-syllabus.txt',packs.map(p=>`${p.id} comingSoon=${p.comingSoon}\n`+p.chapters.map(c=>`${c.id}: ${c.name}\n${c.syllabus||''}\nSubsections: ${(p.syllabus?.[c.id]?.subsections||[]).map(s=>s.name).join('; ')}\nNotes: ${(c.notes||[]).join(' | ')}`).join('\n')).join('\n\n'));
console.log(packs.map(p=>[p.id,p.chapters.length,p.comingSoon]));
