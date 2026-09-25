const entries=JSON.parse(document.getElementById('curation-data').textContent);
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dates=[...new Set(entries.map(e=>e.issue))].sort().reverse();
let view=(location.pathname.includes('/topics')?'topics':'daily'),selected='',domain='全部',query='',kind='全部',month=(dates[0]||new Date().toISOString().slice(0,10)).slice(0,7),language='zh';
function listHash(){const p=new URLSearchParams();if(selected)p.set('date',selected);if(domain!=='全部')p.set('domain',domain);if(query)p.set('q',query);if(kind!=='全部')p.set('kind',kind);return '#'+view+(p.size?'?'+p:'');}
function detailHash(id){return '#entry/'+id+'?from='+encodeURIComponent(listHash().slice(1));}
function closeDrawers(){document.querySelectorAll('.open').forEach(e=>e.classList.remove('open'));$('#scrim').hidden=true;document.body.classList.remove('drawer-open');$('#menu').setAttribute('aria-expanded','false');$('#open-dates').setAttribute('aria-expanded','false');}
let drawerTrigger=null;
function openDrawer(selector,trigger){closeDrawers();drawerTrigger=trigger;$(selector).classList.add('open');$('#scrim').hidden=false;document.body.classList.add('drawer-open');trigger.setAttribute('aria-expanded','true');$(selector).querySelector('button:not([disabled]),a,input').focus();}
function update(){history.replaceState(null,'',listHash());renderList();renderDates();}
function sourceLink(c){return c.urls.length?`<a class="source-link" href="${esc(c.urls[0])}" target="_blank" rel="noopener noreferrer" aria-label="新标签页查看 ${esc(c.source)} 原文">原文 ↗</a>`:'<span class="source-missing">原文链接待补</span>';}
function story(c){return `<article class="story"><div class="story-meta"><span>${c.domain}</span><span>${c.format==='中英节译'?'中英节译':c.kind+'摘编'}</span></div><h3><a href="${esc(detailHash(c.id))}">${esc(c.title)}</a></h3><p class="summary">${esc(c.summary)}</p><div class="story-bottom"><span class="source-name">${esc(c.source)}</span><a class="read-link" href="${esc(detailHash(c.id))}">${c.en?'阅读节译':'阅读摘编'} →</a>${sourceLink(c)}</div></article>`;}
function renderList(){
 $('#list-view').hidden=false;$('#detail-view').hidden=true;$('#topic-tools').hidden=view!=='topics';$('#page-title').textContent=view==='daily'?'日报':'按主题看信息';$('#page-intro').textContent=view==='daily'?'按日期读，慢慢积累。':'从一个主题开始，找到值得重读的内容。';$('#breadcrumb').textContent='认知策展 / '+(view==='daily'?'日报':'按主题看信息');
 document.querySelectorAll('[data-view]').forEach(a=>a.setAttribute('aria-current',a.dataset.view===view?'page':'false'));
 $('#search').value=query;$('#kind').value=kind;
 $('#domains').innerHTML=['全部','AI','营销','创业'].map(d=>`<button data-domain="${d}" aria-pressed="${domain===d}">${d}</button>`).join('');
 const list=entries.filter(c=>(!selected||c.issue===selected)&&(view==='daily'||((domain==='全部'||c.domain===domain)&&(kind==='全部'||c.kind===kind||c.format===kind)&&[c.title,c.summary,c.source,c.excerpt].join(' ').toLowerCase().includes(query.toLowerCase()))));
 const groups=[...new Set(list.map(c=>c.issue))].sort().reverse();
 $('#results-status').textContent=`${selected?'刊期 '+selected:'全部刊期'} · ${list.length} 条内容`;
 $('#issues').innerHTML=groups.length?groups.map(d=>`<section class="issue" aria-label="${d} 刊期"><div class="issue-heading"><h2>${d.slice(5).replace('-','月')}日</h2><span>${d.slice(0,4)}</span><small>${list.filter(c=>c.issue===d).length} 条</small></div><div class="issue-items">${list.filter(c=>c.issue===d).map(story).join('')}</div></section>`).join(''):`<div class="empty"><h2>${selected&&!entries.some(c=>c.issue===selected)?'这一天没有收录内容':'没有找到相符内容'}</h2><p>${selected&&!entries.some(c=>c.issue===selected)?'可以在日历中选择带下划线的日期，或查看全部日期。':'换个关键词，或清除日期和主题条件后再试。'}</p><button id="reset-filters">清除筛选，查看全部</button></div>`;
 if($('#reset-filters'))$('#reset-filters').onclick=()=>{selected='';domain='全部';query='';kind='全部';update();};
 document.title=(view==='daily'?'日报':'按主题看信息')+' · 思远 AI Labs';
}
function renderDates(){
 const [y,m]=month.split('-').map(Number);$('#month-title').textContent=`${y} 年 ${m} 月`;
 const offset=(new Date(y,m-1,1).getDay()+6)%7,count=new Date(y,m,0).getDate();
 $('#calendar').innerHTML='<span class="blank"></span>'.repeat(offset)+Array.from({length:count},(_,i)=>{const d=month+'-'+String(i+1).padStart(2,'0');return `<button data-date="${d}" class="${dates.includes(d)?'has-entry':''} ${selected===d?'selected':''}" aria-label="${d} ${dates.includes(d)?'有收录内容':'无收录内容'}" aria-pressed="${selected===d}">${i+1}</button>`;}).join('');
 $('#all-dates').classList.toggle('active',!selected);$('#all-dates').setAttribute('aria-pressed',String(!selected));
 const hq=$('#history-search').value.trim();const hd=dates.filter(d=>d.includes(hq));
 $('#history').innerHTML=hd.map(d=>`<button class="history-date ${selected===d?'selected':''}" data-date="${d}" aria-pressed="${selected===d}"><span>${d}</span><small>${entries.filter(c=>c.issue===d).length} 条</small></button>`).join('')||'<p class="rail-note">没有匹配的历史日期</p>';
}
function setDate(d){selected=d;if(d)month=d.slice(0,7);closeDrawers();location.hash=listHash();renderList();renderDates();window.scrollTo(0,0);}
function renderTranslation(c){
 $('#translation-body').innerHTML=`<div class="translation">${language!=='en'?`<p lang="zh-CN">${esc(c.zh)}</p>`:''}${language!=='zh'?`<p class="english" lang="en">${esc(c.en)}</p>`:''}</div>`;
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
}
function markdown(s){return s.split('\n\n').map(p=>{if(p.startsWith('## '))return '<h2>'+esc(p.slice(3))+'</h2>';if(/^---+$/.test(p.trim()))return '';return '<p>'+esc(p.replace(/^> /gm,'').replace(/\*\*(.*?)\*\*/g,'$1'))+'</p>';}).join('');}
function renderDetail(id){
 const c=entries.find(c=>c.id===id);$('#list-view').hidden=true;$('#detail-view').hidden=false;
 if(!c){$('#detail-view').innerHTML='<h1>没有找到这条内容</h1><p><a href="#daily">返回日报</a></p>';return;}
 document.title=c.title+' · 思远 AI Labs';$('#breadcrumb').textContent='认知策展 / 阅读';
 $('#detail-view').innerHTML=`<a class="back-link" href="${esc(listHash())}">← 返回${view==='daily'?'日报':'主题列表'}</a><div class="story-meta"><span>${esc(c.domain)} / ${esc(c.format)}</span><span>收录于 ${esc(c.issue)}</span></div><h1 class="article-title">${esc(c.title)}</h1><div class="article-source">原始来源<ul class="source-list">${c.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.name)} · ${esc(s.title)} ↗</a><time datetime="${esc(s.publishedAt)}">原文发布：${esc(new Date(s.publishedAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false}))}（北京时间）</time></li>`).join('')}</ul></div><div class="detail-notice">${esc(c.note)}</div>${c.en?`<div class="language-tools" role="group" aria-label="阅读语言"><button data-lang="zh">中文节译</button><button data-lang="en">英文摘句</button><button data-lang="both">中英对照</button></div><div id="translation-body"></div><h2 class="section-label">机器摘要</h2>`:'<h2 class="section-label">中文摘编</h2>'}<div class="article-body">${markdown(c.excerpt)}</div><div class="article-end">依据来源材料整理，保留事实、观点与适用范围的区别。<br>完整上下文请阅读原始来源。</div>`;
 if(c.en){language='zh';renderTranslation(c);document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{language=b.dataset.lang;renderTranslation(c);});}
}
function syncNavigation(){
 document.body.classList.toggle('topic-view',view==='topics');
 $('#date-nav').hidden=view==='topics';
 $('#open-dates').hidden=view==='topics';
}
function route(){
 const raw=location.hash.slice(1)||(location.pathname.includes('/topics')?'topics':'daily');const [path,qs='']=raw.split('?');const p=new URLSearchParams(qs);
 if(path.startsWith('entry/')){const from=p.get('from')||'daily';const [v,q='']=from.split('?');readState(v,new URLSearchParams(q));renderDates();renderDetail(path.slice(6));}
 else{readState(path,p);renderList();renderDates();}
 syncNavigation();
 closeDrawers();
}
function readState(v,p){view=v==='topics'?'topics':'daily';selected=/^\d{4}-\d{2}-\d{2}$/.test(p.get('date')||'')?p.get('date'):'';domain=p.get('domain')||'全部';query=p.get('q')||'';kind=p.get('kind')||'全部';if(view==='topics')selected='';if(selected)month=selected.slice(0,7);}
$('#calendar').onclick=e=>{if(e.target.dataset.date)setDate(e.target.dataset.date);};$('#history').onclick=e=>{const b=e.target.closest('[data-date]');if(b)setDate(b.dataset.date);};$('#all-dates').onclick=()=>setDate('');$('#history-search').oninput=renderDates;
function shiftMonth(n){const [y,m]=month.split('-').map(Number),d=new Date(y,m-1+n,1);month=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');renderDates();}
$('#prev-month').onclick=()=>shiftMonth(-1);$('#next-month').onclick=()=>shiftMonth(1);
$('#search').oninput=e=>{query=e.target.value;update();$('#search').focus();};$('#kind').onchange=e=>{kind=e.target.value;update();};$('#domains').onclick=e=>{if(e.target.dataset.domain){domain=e.target.dataset.domain;update();}};
$('#menu').onclick=e=>openDrawer('#site-nav',e.currentTarget);$('#open-dates').onclick=e=>openDrawer('#date-nav',e.currentTarget);
function dismiss(){closeDrawers();drawerTrigger?.focus();}$('#close-dates').onclick=dismiss;$('#scrim').onclick=dismiss;
document.addEventListener('keydown',e=>{if(!document.body.classList.contains('drawer-open'))return;if(e.key==='Escape'){dismiss();return;}if(e.key==='Tab'){const panel=document.querySelector('aside.open');const items=[...panel.querySelectorAll('a,button:not([disabled]),input')];const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
const scrollPositions=new Map();document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a?.classList.contains('skip')){e.preventDefault();$('#main').focus();return;}if(a){scrollPositions.set(location.hash||listHash(),window.scrollY);}});
window.addEventListener('hashchange',()=>{route();requestAnimationFrame(()=>window.scrollTo(0,scrollPositions.get(location.hash)||0));});
route();
