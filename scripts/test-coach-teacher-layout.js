'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const name=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));
  if(!name.startsWith(root+path.sep)||!fs.existsSync(name)||fs.statSync(name).isDirectory()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',name.endsWith('.css')?'text/css':name.endsWith('.js')?'text/javascript':'text/html');
  fs.createReadStream(name).pipe(res);
});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const get=url=>new Promise((resolve,reject)=>http.get(url,r=>{let s='';r.on('data',v=>s+=v);r.on('end',()=>{try{resolve(JSON.parse(s));}catch(e){reject(e);}});}).on('error',reject));
let chrome,ws;
(async()=>{
  await new Promise(r=>server.listen(8795,'127.0.0.1',r));
  chrome=spawn(process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',[
    '--headless=new','--remote-debugging-port=9341','--user-data-dir='+fs.mkdtempSync(path.join(os.tmpdir(),'psac-coach-ui-')),'--no-first-run','about:blank'
  ],{stdio:'ignore'});
  let version;
  for(let i=0;i<40&&!version;i++){try{version=await get('http://127.0.0.1:9341/json/version');}catch(_){await sleep(250);}}
  assert(version,'Chrome starts');
  ws=new WebSocket(version.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
  let serial=0;const waiting=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(waiting.has(m.id)){waiting.get(m.id)(m);waiting.delete(m.id);}};
  function send(method,params={},sessionId){return new Promise((resolve,reject)=>{
    const id=++serial,t=setTimeout(()=>{waiting.delete(id);reject(Error('Timeout '+method));},15000);
    waiting.set(id,m=>{clearTimeout(t);m.error?reject(Error(m.error.message)):resolve(m.result);});ws.send(JSON.stringify({id,method,params,sessionId}));
  });}
  const target=await send('Target.createTarget',{url:'about:blank'});
  const session=await send('Target.attachToTarget',{targetId:target.targetId,flatten:true});
  const call=(m,p)=>send(m,p,session.sessionId);
  await call('Page.enable');await call('Runtime.enable');await call('Network.enable');
  await call('Network.setBypassServiceWorker',{bypass:true});await call('Network.setCacheDisabled',{cacheDisabled:true});
  await call('Page.navigate',{url:'http://127.0.0.1:8795/'});await sleep(6000);
  if (process.argv.includes('--light-theme')) {
    await call('Runtime.evaluate',{expression:"const themeTestStyle=document.createElement('style'); themeTestStyle.textContent='*,*::before,*::after { transition:none !important; animation:none !important; }'; document.head.append(themeTestStyle);"});
    for (const width of [390,1280]) {
      await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
      const probe=await call('Runtime.evaluate',{returnByValue:true,expression:`(()=>{
        const lum=rgb=>rgb.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
        const rgb=s=>(s.match(/[\\d.]+/g)||[]).map(Number);
        const ratio=(a,b)=>(Math.max(lum(rgb(a)),lum(rgb(b)))+.05)/(Math.min(lum(rgb(a)),lum(rgb(b)))+.05);
        const samples=[];
        for(const id of ['parent','admin','teacher','practice']) {
          document.querySelectorAll('.screen').forEach(e=>e.classList.add('hidden'));
          const screen=document.getElementById('screen-'+id);screen.classList.remove('hidden');
          const fixture=document.createElement('div');fixture.className='bg-white border border-gray-200 rounded-xl p-4';
          fixture.innerHTML='<p class="text-xs text-gray-400">Helpful instructions for this screen</p><button class="btn-primary">Continue</button><button class="mcq-opt selected">Selected answer</button><button class="mcq-opt correct disabled">Correct answer</button><button class="mcq-opt wrong disabled">Incorrect answer</button><button class="pr-tool" disabled><span class="pr-tool-lbl">Help unavailable</span></button>';
          screen.prepend(fixture);
          const snapshot=()=>[fixture,fixture.querySelector('p'),...fixture.querySelectorAll('button')].map(e=>{const s=getComputedStyle(e);return [s.color,s.backgroundColor,s.borderColor,s.opacity,s.fontSize];});
          document.documentElement.classList.add('dark');const darkBefore=JSON.stringify(snapshot());
          document.documentElement.classList.remove('dark');
          const text=fixture.querySelector('p'),txt=getComputedStyle(text),bg=getComputedStyle(fixture).backgroundColor;
          const primary=fixture.querySelector('.btn-primary'),ps=getComputedStyle(primary);
          const disabled=getComputedStyle(fixture.querySelector('.pr-tool'));
          const answer=fixture.querySelector('.correct'),wrong=fixture.querySelector('.wrong');
          const bounds=fixture.getBoundingClientRect();
          const bodyBackground=getComputedStyle(document.body).backgroundColor;
          const value={id,ratio:ratio(txt.color,bg),font:parseFloat(txt.fontSize),bg,bodyBackground,fit:bounds.right<=innerWidth+1,
            correct:getComputedStyle(answer).backgroundColor,wrong:getComputedStyle(wrong).backgroundColor,
            disabled:disabled.opacity,primaryInk:ps.color};
          document.documentElement.classList.add('dark');value.darkRestored=darkBefore===JSON.stringify(snapshot());
          fixture.remove();samples.push(value);
        }
        return samples;
      })()`});
      assert(!probe.exceptionDetails,JSON.stringify(probe.exceptionDetails));
      for(const sample of probe.result.value) {
        assert(sample.ratio>=4.5,JSON.stringify(sample));assert(sample.font>=14);assert(sample.fit);
        assert.equal(sample.bodyBackground,'rgb(232, 237, 242)');assert.equal(sample.bg,'rgb(247, 248, 250)');
        assert.notEqual(sample.correct,sample.wrong);assert.equal(sample.disabled,'1');assert(sample.darkRestored);
        console.log(`Soft light theme: ${sample.id}, ${width}px, supporting text ${sample.ratio.toFixed(2)}:1, dark-mode round trip unchanged.`);
      }
    }
  }
  for(const width of [390,1280]) for(const dark of [false,true]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
    const result=await call('Runtime.evaluate',{returnByValue:true,expression:`(()=>{
      document.documentElement.classList.toggle('dark',${dark});
      document.querySelectorAll('.screen').forEach(e=>e.classList.add('hidden'));
      const teacher=document.getElementById('screen-teacher'); teacher.classList.remove('hidden');
      const measured=[...teacher.querySelectorAll('.ta-tab,.teacher-step,#ta-access,#ta-grade,#ta-subject')].map(e=>({text:e.textContent.trim().slice(0,50),x:e.getBoundingClientRect().x,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width}));
      return {measured,buttons:teacher.querySelectorAll('.teacher-navigation .ta-tab').length,steps:teacher.querySelectorAll('.teacher-step').length,coach:typeof LearningCoach};
    })()`});
    assert(!result.exceptionDetails,JSON.stringify(result.exceptionDetails));
    const value=result.result.value;assert.equal(value.buttons,4);assert.equal(value.steps,3);assert.equal(value.coach,'object');
    for(const e of value.measured){assert(e.width>0,e.text+' visible');assert(e.x>=-1&&e.right<=width+1,e.text+' fits '+width);}
    console.log(`Teacher layout fits ${width}px, ${dark?'dark':'light'} theme; coach module loaded.`);
    const coachResult=await call('Runtime.evaluate',{returnByValue:true,expression:`(()=>{
      document.getElementById('screen-teacher').classList.add('hidden');
      document.getElementById('screen-subject-select').classList.remove('hidden');
      Auth.getActiveAccount=()=>({grade:5});
      _isParentContext=()=>false;
      LearningCoach.renderChild();
      const card=document.getElementById('coach-child-subject');
      const r=card.getBoundingClientRect();
      return {width:r.width,right:r.right,text:card.textContent,display:getComputedStyle(card).display};
    })()`});
    assert(!coachResult.exceptionDetails,JSON.stringify(coachResult.exceptionDetails));
    const card=coachResult.result.value;
    assert(card.width>0 && card.right<=width+1);assert.notEqual(card.display,'none');
    assert.match(card.text,/Start today’s mission/);
  }
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{ws?.close();chrome?.kill();server.close();});
