import pathlib,json,re,collections
root=pathlib.Path.cwd();out=root/'docs/book-syllabus-audit'
books=json.loads((out/'book-inventory.json').read_text(encoding='utf8'));rows=json.loads((out/'chapter-mapping.json').read_text(encoding='utf8'));packs=json.loads((out/'app-syllabus-snapshot.json').read_text(encoding='utf8'))
errors=[]
for path in out.glob('*.md'):
 for target in re.findall(r'\]\(<([^>]+)>\)',path.read_text(encoding='utf8')):
  file=re.sub(r':\d+$','',target)
  if not pathlib.Path(file).exists():errors.append((path.name,target))
assert not errors,errors
assert len(books)==33 and len(rows)==235 and len(packs)==25
assert {r['book'] for r in rows}=={b['audit_id'] for b in books}
health=[r for r in rows if r['pack'].endswith('-health')];assert len(health)==41 and all(r['status']=='Missing' for r in health)
g8missing=[r['book_topic'] for r in rows if r['book']=='B33' and r['status']=='Missing'];assert len(g8missing)==5
assert sum(1 for r in rows if r['book']=='B24')==8
print(json.dumps({'all_source_and_app_links_exist':True,'all_33_books_mapped':True,'health_lessons_missing':len(health),'grade8_maths_missing_chapters':g8missing,'grade7_english_units':7,'mapping_rows':len(rows),'source_pages':sum(b['pages'] for b in books),'files':[{ 'name':p.name,'bytes':p.stat().st_size} for p in out.iterdir()]},indent=2))
