import pathlib,sys,re
for p in sorted(pathlib.Path('tmp/book-audit').glob(sys.argv[1])):
 print('\nBOOK',p.name)
 pages=p.read_text(encoding='utf8',errors='replace').split('\f')
 for i,t in enumerate(pages):
  if re.search(sys.argv[2],t,re.I):
   print('\nPDF PAGE',i+1,t[:int(sys.argv[3])])
