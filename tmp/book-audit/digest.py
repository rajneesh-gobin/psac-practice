import pathlib,json,re,sys
inv=json.loads(pathlib.Path('tmp/book-audit/inventory.json').read_text())
for b in inv:
 if b['audit_id'] not in sys.argv[1].split(','): continue
 print('\nBOOK',b['audit_id'])
 for i,t in enumerate(pathlib.Path(b['text']).read_text(encoding='utf8').split('\f')):
  lines=[s.strip() for s in t.splitlines() if s.strip()]
  head=' / '.join(lines[:5]);
  print(str(i+1)+': '+head[:230])
