import pathlib,json,subprocess,concurrent.futures
from PIL import Image,ImageDraw
out=pathlib.Path('tmp/book-audit'); inv=json.loads((out/'inventory.json').read_text()); byid={b['audit_id']:b for b in inv}
specs=[('B04',8),('B05',6),('B11',8),('B12',6),('B20',6),('B21',8),('B28',74),('B28',195),('B33',34),('B33',95),('B33',173),('B33',262),('B29',29),('B29',55),('B27',154),('B32',119),('B30',221),('B30',228),('B09',6),('B15',10),('B16',8)]
def render(s):
 bid,p=s; prefix=out/f'{bid}-p{p}'
 subprocess.run(['pdftoppm','-f',str(p),'-l',str(p),'-scale-to','1600','-singlefile','-png',byid[bid]['file'],str(prefix)],check=True,capture_output=True)
 return bid,p,prefix.with_suffix('.png')
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: rendered=list(pool.map(render,specs))
for k in range(0,len(rendered),4):
 canvas=Image.new('RGB',(2200,3280),'#ddd'); draw=ImageDraw.Draw(canvas)
 for j,(bid,p,path) in enumerate(rendered[k:k+4]):
  im=Image.open(path); im.thumbnail((1090,1600));x=j%2*1100;y=j//2*1640
  canvas.paste(im,(x,y+30));draw.text((x+10,y+5),bid+' PDF '+str(p),fill='black')
 canvas.save(out/f'evidence-sheet-{k//4+1}.jpg')
(out/'visual-checks.json').write_text(json.dumps(specs))
print('Rendered',len(rendered),'additional evidence pages')
