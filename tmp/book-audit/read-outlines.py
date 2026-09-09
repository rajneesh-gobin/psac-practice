import pathlib
out=pathlib.Path('tmp/book-audit')
for p in sorted(out.glob('grade1__*.txt')):
 pages=p.read_text(encoding='utf8').split('\f')
 print('\nBOOK',p.name)
 for i,s in enumerate(pages[:9]):
  if any(w in s.lower() for w in ['contents','sommaire','table des','unit 1','unité 1']): print('PDF PAGE',i+1, s[:17000])
