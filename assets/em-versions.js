/* em-versions.js — the floating "Versions" switcher.

   Every row used to be the same washed line of text, so five distinct
   design directions read as one list. Each now carries a tiny drawn
   signature of what it actually does — layout bands, a springing tilt,
   one energy line, stones falling to a bed, a wave shedding a stone —
   and the tools sit in their own group below a rule, with Atelier as a
   filled copper row so it reads as a thing you *use*, not another skin. */
(function(){
'use strict';
if(document.getElementById('emv'))return;

/* [href, name, note, signature svg] */
var SIG={
  classic:'<path d="M3 6h20M3 12h13M3 18h20" />',
  motion:'<path d="M4 7h18M2 13h13M6 19h16" /><path d="M22 13h3" opacity=".5"/>',
  current:'<path d="M2 12c4-7 7 7 11 0s7-7 11 0"/>',
  cascade:'<path d="M3 12h18" opacity=".5"/><circle cx="6" cy="12" r="1.5"/><circle cx="11" cy="12" r="1.5"/><circle cx="16" cy="12" r="2.6"/><circle cx="21" cy="12" r="1.5"/><path d="M5 5c3-4 6 4 9 0s5-3 6 0"/>',
  crystallize:'<path d="M2 9c4-6 7 6 11 0s7-6 11 0"/><circle cx="13" cy="13.5" r="1.7"/><path d="M13 16v3" opacity=".5"/><path d="M4 21h18" opacity=".55"/>',
  bleed:'<rect x="2" y="3" width="22" height="18" rx="1.5"/><path d="M6 16h10" opacity=".75"/><path d="M6 19.5h6" opacity=".5"/>',
  enter:'<rect x="2" y="3" width="4" height="18"/><rect x="7.5" y="3" width="4" height="18" opacity=".72"/><rect x="13" y="3" width="4" height="18" opacity=".52"/><rect x="18.5" y="3" width="4" height="18" opacity=".34"/>',
  atelier:'<circle cx="13" cy="12" r="7.5" opacity=".45"/><circle cx="13" cy="4.5" r="2"/><circle cx="19.4" cy="8.2" r="2"/><circle cx="19.4" cy="15.8" r="2"/><circle cx="13" cy="19.5" r="2"/><circle cx="6.6" cy="15.8" r="2"/><circle cx="6.6" cy="8.2" r="2"/>'
};
/* Narrowed to two on Clay's call. Current (v1) and Full Bleed are still in
   the repo and still reachable by URL — they are just no longer offered as
   choices, because four directions on a switcher is a decision nobody has
   made yet, and the work has been going into the first of these. */
var VERSIONS=[
  ['/designer/','Atelier','build a bracelet',SIG.atelier],
  ['/box/','Build a Box','fill one with crystals',SIG.crystallize],
  ['/home/cascade/','Frequency Room','turn the dial',SIG.cascade]
];
/* No longer a version switcher. There is one homepage now — Classic — so
   offering a choice between directions was offering a decision that has been
   made. What is left is the three interactive pieces, which are worth finding
   and are not otherwise on a menu: build a bracelet, fill a box, turn the
   frequency dial. Bottom right. Every other direction still lives at its URL. */

function lum(){try{var m=getComputedStyle(document.body).backgroundColor.match(/\d+/g);
  if(!m)return 1;return (0.2126*m[0]+0.7152*m[1]+0.0722*m[2])/255;}catch(e){return 1;}}
var dark=lum()<0.45;
var P=dark?{solid:'#0E1826',bg:'rgba(14,24,38,.94)',fg:'#F1EADF',soft:'#AEB9C8',line:'#2A3A52',accent:'#C4855A',glow:'0 18px 60px rgba(0,0,0,.5)'}
          :{solid:'#FBF8F2',bg:'rgba(251,248,242,.94)',fg:'#1D2739',soft:'#5A6478',line:'#E4DCCB',accent:'#A9683E',glow:'0 18px 60px rgba(10,16,23,.24)'};

var css=[
'.emv{position:fixed;bottom:22px;right:22px;z-index:120;display:flex;flex-direction:column;align-items:flex-end;gap:10px;',
'  font-family:"Instrument Sans",-apple-system,BlinkMacSystemFont,sans-serif;}',
/* a plain pill. The translucent fill plus a backdrop blur plus a 40px
   diffuse shadow together rendered a second, larger shape behind it. */
'.emv-btn{display:inline-flex;align-items:center;gap:9px;padding:10px 16px;border-radius:100px;cursor:pointer;',
'  border:1px solid '+P.line+';background:'+P.solid+';',
'  box-shadow:0 2px 8px rgba(10,16,23,.10);color:'+P.soft+';font-weight:600;font-size:11.5px;',
'  letter-spacing:.14em;text-transform:uppercase;transition:border-color .25s,color .25s;font-family:inherit;}',
'.emv-btn:hover{border-color:'+P.accent+';color:'+P.fg+';}',
'.emv-dot{width:8px;height:8px;border-radius:50%;background:'+P.accent+';flex:none;}',
'.emv-pop{width:min(336px,calc(100vw - 28px));padding:11px;border-radius:14px;border:1px solid '+P.line+';',
'  background:'+P.bg+';backdrop-filter:blur(18px);box-shadow:'+P.glow+';',
'  opacity:0;transform:translateY(10px) scale(.98);pointer-events:none;transform-origin:100% 100%;',
'  transition:opacity .3s cubic-bezier(.16,1,.3,1),transform .3s cubic-bezier(.16,1,.3,1);}',
'.emv-pop.open{opacity:1;transform:none;pointer-events:auto;}',
'.emv-lab{font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;color:'+P.soft+';font-weight:600;',
'  margin:0 0 6px 8px;opacity:.85;}',
'.emv-pop a{display:flex;align-items:center;gap:10px;padding:9px 8px;border-radius:9px;text-decoration:none;',
'  border:1px solid transparent;transition:background .2s,border-color .2s,transform .2s;}',
/* the drawn signature */
'.emv-ico{flex:none;width:22px;height:20px;color:'+P.accent+';opacity:.8;transition:opacity .2s,color .2s;}',
'.emv-ico svg{width:100%;height:100%;display:block;fill:none;stroke:currentColor;stroke-width:1.7;',
'  stroke-linecap:round;stroke-linejoin:round;}',
'.emv-ico svg circle{fill:currentColor;stroke:none;}',
'.emv-txt{display:flex;flex-direction:column;line-height:1.25;min-width:0;}',
'.emv-txt strong{font-family:Fraunces,Georgia,serif;font-weight:400;font-size:15px;color:'+P.fg+';transition:color .2s;}',
'.emv-txt span{font-size:10.5px;color:'+P.soft+';letter-spacing:.02em;}',
'.emv-pop a:hover{background:'+(dark?'rgba(196,133,90,.16)':'rgba(169,104,62,.10)')+';transform:translateX(2px);}',
'.emv-pop a:hover .emv-txt strong{color:'+P.accent+';}',
'.emv-pop a:hover .emv-ico{opacity:1;}',
/* the one you are on */
'.emv-pop a.cur{background:'+(dark?'rgba(196,133,90,.2)':'rgba(169,104,62,.14)')+';',
'  border-color:'+(dark?'rgba(196,133,90,.45)':'rgba(169,104,62,.34)')+';}',
'.emv-pop a.cur .emv-txt strong{color:'+P.accent+';}',
'.emv-pop a.cur .emv-ico{opacity:1;}',
'@media(max-width:700px){.emv{bottom:12px;right:12px;}}'
].join('\n');

function row(v,_unused,here){
  var norm=v[0]==='/'?'/':v[0].replace(/\/$/,'');
  var cls=(norm===here?'cur':'');
  return '<a href="'+v[0]+'"'+(cls?' class="'+cls+'"':'')+'>'+
    '<span class="emv-ico"><svg viewBox="0 0 26 24" aria-hidden="true">'+v[3]+'</svg></span>'+
    '<span class="emv-txt"><strong>'+v[1]+'</strong><span>'+v[2]+'</span></span></a>';
}

function boot(){
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var wrap=document.createElement('div');wrap.className='emv';wrap.id='emv';
  var pop=document.createElement('div');pop.className='emv-pop';
  var here=location.pathname.replace(/index\.html$/,'').replace(/\/$/,'')||'/';
  pop.innerHTML='<div class="emv-lab">Try it</div>'+
    VERSIONS.map(function(v){return row(v,false,here);}).join('');
  var btn=document.createElement('button');btn.className='emv-btn';btn.setAttribute('aria-expanded','false');
  btn.innerHTML='<span class="emv-dot"></span><span>Try it</span>';
  function set(o){pop.classList.toggle('open',o);btn.setAttribute('aria-expanded',o?'true':'false');}
  btn.addEventListener('click',function(e){e.stopPropagation();set(!pop.classList.contains('open'));});
  document.addEventListener('click',function(e){if(!wrap.contains(e.target))set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
  wrap.appendChild(pop);wrap.appendChild(btn);document.body.appendChild(wrap);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
