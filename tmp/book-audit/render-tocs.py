import pathlib,json,re,subprocess,concurrent.futures
from PIL import Image,ImageDraw
out=pathlib.Path('tmp/book-audit'); inv=json.loads((out/'inventory.json').read_text()); tasks=[]
for n,b in enumerate(inv):
 pages=pathlib.Path(b['text']).read_text(encoding='utf8').split('\f')
 hits=[i+1 for i,t in enumerate(pages[:22]) if re.search(r'contents|content pages?|sommaire|table des mati',t,re.I) and not re.search(r'Grammar time:|The Grade',t)]
 page=hits[0] if hits else 7
 b['audit_id']=f'B{n+1:02}'; b['toc_pdf_pages']=hits; tasks.append((b,page))
def render(task):
 b,page=task; prefix=out/(b['audit_id']+'-toc')
 subprocess.run(['pdftoppm','-f',str(page),'-l',str(page),'-scale-to','1400','-singlefile','-png',b['file'],str(prefix)],check=True,capture_output=True)
 return b,page,prefix.with_suffix('.png')
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: rendered=list(pool.map(render,tasks))
for k in range(0,len(rendered),4):
 group=rendered[k:k+4]; canvas=Image.new('RGB',(2000,2900),'#ddd'); draw=ImageDraw.Draw(canvas)
 for j,(b,page,path) in enumerate(group):
  im=Image.open(path); im.thumbnail((990,1400)); x=(j%2)*1000;y=(j//2)*1450
  canvas.paste(im,(x,y+40));draw.text((x+10,y+10),b['audit_id']+' '+pathlib.Path(b['file']).parent.name+' PDF '+str(page),fill='black')
 canvas.save(out/f'toc-sheet-{k//4+1}.jpg')
(out/'inventory.json').write_text(json.dumps(inv,indent=2),encoding='utf8')
print('Rendered',len(rendered),'book contents pages in 9 sheets')
