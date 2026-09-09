import pathlib,json,sys
inv=json.loads(pathlib.Path('tmp/book-audit/inventory.json').read_text())
b=next(x for x in inv if x['audit_id']==sys.argv[1]); pages=pathlib.Path(b['text']).read_text(encoding='utf8').split('\f')
for r in sys.argv[2].split(','):
 a,_,z=r.partition('-')
 for p in range(int(a),int(z or a)+1): print('\n'+b['audit_id']+' PDF PAGE '+str(p)+'\n'+pages[p-1])
