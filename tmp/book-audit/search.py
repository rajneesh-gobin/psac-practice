import pathlib,json,re,sys
inv=json.loads(pathlib.Path('tmp/book-audit/inventory.json').read_text())
for b in inv:
 if not re.search(sys.argv[1],b['file'],re.I): continue
 print('\nBOOK',b['audit_id'],pathlib.Path(b['file']).name)
 for pattern in sys.argv[2].split('|'):
  hits=[]
  for i,t in enumerate(pathlib.Path(b['text']).read_text(encoding='utf8').split('\f')):
   m=re.search(pattern,t,re.I)
   if m: hits.append((i+1,' '.join(t[max(0,m.start()-90):m.end()+190].split())))
  print(pattern, 'pages:',','.join(str(i) for i,t in hits), '\n examples:',hits[:3])
