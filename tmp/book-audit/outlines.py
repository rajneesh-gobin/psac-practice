import pathlib,sys,re
out=pathlib.Path('tmp/book-audit')
for p in sorted(out.glob(sys.argv[1]+'__*.txt')):
 pages=p.read_text(encoding='utf8').split('\f')
 print('\nBOOK',p.name)
 for i,s in enumerate(pages[:22]):
  if re.search(r'contents|content pages|sommaire|table des mati',s,re.I) and len(s)<18000: print('PDF PAGE',i+1, s)

