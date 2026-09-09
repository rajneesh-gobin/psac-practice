import pathlib,subprocess,json,concurrent.futures
out=pathlib.Path('tmp/book-audit')
files=list(pathlib.Path('books').rglob('*.pdf'))
def extract(p):
 dest=out/(p.parent.name+'__'+p.stem+'.txt')
 r=subprocess.run(['pdftotext','-layout',str(p),str(dest)],capture_output=True)
 text=dest.read_text(encoding='utf8') if dest.exists() else ''
 pages=text.split('\f')
 return {'file':str(p),'text':str(dest),'pages':len(pages)-1,'chars':len(text),'sparse_pages':[i+1 for i,x in enumerate(pages[:-1]) if len(x.strip())<80]}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(extract,files))
(out/'inventory.json').write_text(json.dumps(results,indent=2),encoding='utf8')
print(json.dumps(results,indent=2))
