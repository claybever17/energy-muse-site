/* em-versions.js — floating "Versions" switcher shared across homepage versions.
   Injects its own styles + DOM (same pattern as em-bag.js). Palette auto-picks
   light/dark from the page's body background. Classic (/) and Motion have a
   bespoke build of this menu (with the color-skin row); this script is for the
   other version pages + the chooser. */
(function(){
'use strict';
if(document.getElementById('emv'))return; // never double-inject

var VERSIONS=[
  ['/','Classic','the main homepage'],
  ['/home/motion/','Motion','glides in as you scroll'],
  ['/home/current/','Current','energy, visualized'],
  ['/home/cascade/','Cascade','experiment · crystal rain'],
  ['/designer/','Atelier','design your own bracelet']
];

function lum(){try{var m=getComputedStyle(document.body).backgroundColor.match(/\d+/g);
  if(!m)return 1;return (0.2126*m[0]+0.7152*m[1]+0.0722*m[2])/255;}catch(e){return 1;}}
var dark=lum()<0.45;
var P=dark?{bg:'rgba(14,24,38,.92)',fg:'#F1EADF',soft:'#AEB9C8',line:'#2A3A52',accent:'#C4855A',glow:'0 18px 60px rgba(0,0,0,.5)'}
          :{bg:'rgba(251,248,242,.92)',fg:'#1D2739',soft:'#5A6478',line:'#E4DCCB',accent:'#A9683E',glow:'0 18px 60px rgba(10,16,23,.24)'};

var css=[
'.emv{position:fixed;bottom:22px;right:22px;z-index:120;display:flex;flex-direction:column;align-items:flex-end;gap:10px;',
'  font-family:"Instrument Sans",-apple-system,BlinkMacSystemFont,sans-serif;}',
'.emv-btn{display:inline-flex;align-items:center;gap:9px;padding:10px 16px;border-radius:100px;cursor:pointer;',
'  border:1px solid '+P.line+';background:'+P.bg+';backdrop-filter:blur(14px);',
'  box-shadow:0 10px 40px rgba(10,16,23,.2);color:'+P.soft+';font-weight:600;font-size:11.5px;',
'  letter-spacing:.14em;text-transform:uppercase;transition:border-color .25s,color .25s;font-family:inherit;}',
'.emv-btn:hover{border-color:'+P.accent+';color:'+P.fg+';}',
'.emv-dot{width:8px;height:8px;border-radius:50%;background:'+P.accent+';flex:none;}',
'.emv-pop{width:min(280px,calc(100vw - 28px));padding:14px;border-radius:14px;border:1px solid '+P.line+';',
'  background:'+P.bg+';backdrop-filter:blur(18px);box-shadow:'+P.glow+';',
'  opacity:0;transform:translateY(10px);pointer-events:none;',
'  transition:opacity .3s cubic-bezier(.16,1,.3,1),transform .3s cubic-bezier(.16,1,.3,1);}',
'.emv-pop.open{opacity:1;transform:none;pointer-events:auto;}',
'.emv-lab{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:'+P.soft+';font-weight:600;margin:0 0 8px;}',
'.emv-pop a{display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:9px 10px;',
'  border-radius:8px;text-decoration:none;transition:background .2s;}',
'.emv-pop a strong{font-family:Fraunces,Georgia,serif;font-weight:400;font-size:16px;color:'+P.fg+';transition:color .2s;}',
'.emv-pop a span{font-size:11px;color:'+P.soft+';letter-spacing:.03em;text-align:right;}',
'.emv-pop a:hover{background:rgba(169,104,62,.12);}',
'.emv-pop a:hover strong{color:'+P.accent+';}',
'.emv-pop a.cur{background:rgba(169,104,62,.18);}',
'.emv-pop a.cur strong{color:'+P.accent+';}',
'@media(max-width:700px){.emv{bottom:12px;right:12px;}}'
].join('\n');

function boot(){
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var wrap=document.createElement('div');wrap.className='emv';wrap.id='emv';
  var pop=document.createElement('div');pop.className='emv-pop';
  var here=location.pathname.replace(/index\.html$/,'').replace(/\/$/,'')||'/';
  pop.innerHTML='<div class="emv-lab">Design directions</div>'+VERSIONS.map(function(v){
    var norm=v[0]==='/'?'/':v[0].replace(/\/$/,'');
    return '<a href="'+v[0]+'"'+(norm===here?' class="cur"':'')+'><strong>'+v[1]+'</strong><span>'+v[2]+'</span></a>';
  }).join('');
  var btn=document.createElement('button');btn.className='emv-btn';btn.setAttribute('aria-expanded','false');
  btn.innerHTML='<span class="emv-dot"></span><span>Versions</span>';
  function set(o){pop.classList.toggle('open',o);btn.setAttribute('aria-expanded',o?'true':'false');}
  btn.addEventListener('click',function(e){e.stopPropagation();set(!pop.classList.contains('open'));});
  document.addEventListener('click',function(e){if(!wrap.contains(e.target))set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
  wrap.appendChild(pop);wrap.appendChild(btn);document.body.appendChild(wrap);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
