import pathlib,sys
for p in sorted(pathlib.Path('tmp/book-audit').glob(sys.argv[1])):
 print('\nBOOK',p.name)
 for i,t in enumerate(p.read_text(encoding='utf8').split('\f')[:int(sys.argv[2])]):
  print('PDF',i+1,t[:14000])
