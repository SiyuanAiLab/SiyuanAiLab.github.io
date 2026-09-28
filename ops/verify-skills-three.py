"""Read-only local HTTP acceptance; run from repository root with Python 3."""
from pathlib import Path
from html.parser import HTMLParser
import argparse, hashlib, json, re, subprocess
parser=argparse.ArgumentParser()
parser.add_argument('--base-url',default='http://127.0.0.1:4326')
parser.add_argument('--output')
parser.add_argument('--verify-originals',action='store_true')
args=parser.parse_args()
BASE=args.base_url.rstrip('/')
class Node:
 def __init__(self,tag='',attrs=(),parent=None): self.tag=tag;self.attrs=dict(attrs);self.children=[];self.parent=parent
 def text(self): return ''.join(c if isinstance(c,str) else c.text() for c in self.children)
 def find(self,test): return ([self] if test(self) else [])+sum((c.find(test) for c in self.children if isinstance(c,Node)),[])
class DOM(HTMLParser):
 def __init__(self,s):
  super().__init__(convert_charrefs=True);self.root=Node();self.cur=self.root;self.feed(s)
 def handle_starttag(self,t,a):
  n=Node(t,a,self.cur);self.cur.children.append(n)
  if t not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'): self.cur=n
 def handle_endtag(self,t):
  n=self.cur
  while n.parent:
   if n.tag==t: self.cur=n.parent;return
   n=n.parent
 def handle_data(self,s): self.cur.children.append(s)
def digest(b): return hashlib.sha256(b if isinstance(b,bytes) else b.encode()).hexdigest()
def norm(n): return re.sub(r'\s+','',n.text())
def hrefs(n): return [x.attrs['href'] for x in n.find(lambda x:x.tag=='a' and 'href' in x.attrs)]
def get(route):
 raw=subprocess.check_output(['curl','--fail','--silent','--show-error','--connect-timeout','10','--max-time','30',BASE+route]);return raw,DOM(raw.decode()).root
results=[]
for family in ['ai-coach','business-consult','private-board']:
 for rec in json.loads(Path(f'src/data/{family}/sources.json').read_text()):
  key=rec['key'];route=f'/skills/{family}/'+('' if key in ('work','report') else key+'/')
  source=Path(rec['snapshot']).read_bytes(); raw,out=get(route)
  body=re.search(r'<body>([\s\S]*?)</body>',source.decode(),re.I)[1]
  body=re.sub(r'<span class="module-tag">[^<]*</span>','',body)
  if family=='business-consult': body=body.replace(' ｜ 本页为打磨期线稿','')
  original=DOM(body).root
  region=out.find(lambda n:n.attrs.get('data-frozen-key')==key)
  assert len(region)==1,(family,key,'frozen region count');region=region[0]
  checks={'snapshot_sha_matches':digest(source)==rec['sha256'],'normalized_text_equal':norm(original)==norm(region),'external_links_exact_order': [h for h in hrefs(original) if h.startswith('http')]==[h for h in hrefs(region) if h.startswith('http')],'no_visible_module_tags':not region.find(lambda n:'module-tag' in n.attrs.get('class','').split()),'source_ids_preserved':set(n.attrs['id'] for n in original.find(lambda n:'id' in n.attrs))<=set(n.attrs['id'] for n in region.find(lambda n:'id' in n.attrs))}
  if args.verify_originals: checks['original_snapshot_bytes_match']=source==Path(rec['source']).read_bytes()
  if family in ('ai-coach','private-board'):
   mapping={'2026-09-28-skill作品卡-ai-coach-线稿v0.1.html':'/skills/ai-coach/','2026-09-28-证据页-判定卡与KB实录-ai-coach出卡-v0.1.html':'/skills/ai-coach/evidence/'}
   if family=='private-board': mapping={'2026-09-28-skill作品卡-稷下学宫-线稿v0.1.html':'/skills/private-board/','2026-09-28-证据页-互驳实录-稷下学宫-v0.1.html':'/skills/private-board/evidence/'}
   checks['all_hrefs_exact_approved_mapping']=[next((h.replace(k,v,1) for k,v in mapping.items() if h.split('#')[0]==k),h) for h in hrefs(original)]==hrefs(region)
   checks['preformatted_text_exact']=[n.text() for n in original.find(lambda n:n.tag=='pre')]==[n.text() for n in region.find(lambda n:n.tag=='pre')]
   if key=='work':
    checks['five_modules']=len(region.find(lambda n:n.tag=='section'))==5
    checks['steps_01_to_05']=[n.text().strip() for n in region.find(lambda n:n.attrs.get('class')=='no')]==['01','02','03','04','05']
  for href in hrefs(region):
   if href.startswith('/'):
    path,_,anchor=href.partition('#');_,target=get(path)
    if anchor: assert target.find(lambda n:n.attrs.get('id')==anchor),href
  results.append(dict(family=family,key=key,route=route,checks=checks,source_sha256=digest(source),http_sha256=digest(raw),source_normalized_text_sha256=digest(norm(original)),http_normalized_text_sha256=digest(norm(region))))
_,listing=get('/skills/')
items=listing.find(lambda n:n.tag=='ul' and n.attrs.get('id')=='skills-list')[0].find(lambda n:n.tag=='h2')
order=[n.text() for n in items]
_,research=get('/curation/research/')
_,evidence=get('/skills/private-board/evidence/')
assert '诚实声明' in evidence.text() and '演示案例' in evidence.text() and '真实' in evidence.text(), 'Honesty disclosure missing'
report={'ok':all(all(r['checks'].values()) for r in results) and order==['Business Consult','AI Coach','稷下学宫'],'normalization':'Compare decoded body text with all Unicode whitespace removed; remove only five module-tag spans from each new work source. Separately compare pre text exactly and every href in order using the two approved path mappings. Snapshot bytes and raw SHA remain exact; rendered HTML is NOT byte-identical to source. Business Consult uses its pre-existing approved draft-label removal.','pages':results,'skills_order':order,'research_text':research.text().strip()[-700:]}
if args.output: Path(args.output).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'ok':report['ok'],'checks':[(r['family'],r['key'],r['checks']) for r in results],'order':order},ensure_ascii=False))
assert report['ok']
