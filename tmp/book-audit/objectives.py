import pathlib,re,sys
for p in sorted(pathlib.Path('tmp/book-audit').glob(sys.argv[1])):
 print('\nBOOK',p.name)
 for i,t in enumerate(p.read_text(encoding='utf8').split('\f')):
  m=re.search(r'(?:By the end of this chapter|At the end of this unit|At the end of the unit|By the end of this unit)[\s\S]*',t,re.I)
  if m:
   s=re.split(r'\n[^\n]*(?:in Real Life|in real life|Real Life Context|CHECK THAT|Key words|Key Words|Keywords|KEY TERMS)',m[0])[0]
   print('PDF',i+1,' '.join(s[:2400].split()))
