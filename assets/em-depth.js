/* em-depth.js — site-wide depth. Injects an ambient light layer and a warm
   elevation system so surfaces sit *in* the page instead of on it.

   The brief: "the whole site feels too flat." Three moves, all additive —
   this file never touches layout, only light:
     1. Ambient — a soft overhead key + floor vignette on the page itself,
        so there is a light source to cast from.
     2. Elevation — layered, warm-tinted shadows (never neutral grey; grey
        on cream reads as dirt) applied to cards, media and panels.
     3. Grounding — photographs get a contact shadow and a hairline edge,
        so a cut-out stone looks placed rather than pasted.
   Palette auto-adapts to the page's own background luminance. */
(function(){
'use strict';
if(document.getElementById('em-depth'))return;

function lum(){try{var m=getComputedStyle(document.body).backgroundColor.match(/\d+/g);
  if(!m)return 1;return (0.2126*m[0]+0.7152*m[1]+0.0722*m[2])/255;}catch(e){return 1;}}

function boot(){
  var dark=lum()<0.45;

  /* warm shadow stacks — three tiers, each a near-contact + a soft bloom */
  var e1 = dark
    ? '0 1px 2px rgba(0,0,0,.5), 0 6px 16px rgba(0,0,0,.36)'
    : '0 1px 2px rgba(61,41,23,.07), 0 4px 12px rgba(61,41,23,.06)';
  var e2 = dark
    ? '0 2px 5px rgba(0,0,0,.52), 0 14px 34px rgba(0,0,0,.42)'
    : '0 2px 5px rgba(61,41,23,.08), 0 14px 32px rgba(61,41,23,.10)';
  var e3 = dark
    ? '0 4px 10px rgba(0,0,0,.55), 0 28px 64px rgba(0,0,0,.5)'
    : '0 4px 10px rgba(61,41,23,.09), 0 26px 60px rgba(61,41,23,.13)';
  var lift = dark
    ? '0 6px 14px rgba(0,0,0,.55), 0 34px 74px rgba(169,104,62,.3)'
    : '0 6px 14px rgba(61,41,23,.10), 0 32px 70px rgba(169,104,62,.20)';

  /* The film pages grade their own background from cream to dark as you
     scroll. We sample luminance once at load, so a fixed ambient wash would
     be locked to the wrong end of that arc — it showed up as a bright hotspot
     across the top of the dark half. Those pages light themselves; here we
     contribute elevation only. */
  var film=!!document.querySelector('.film,.stage');

  var css=[
  ':root{--em-e1:'+e1+';--em-e2:'+e2+';--em-e3:'+e3+';--em-lift:'+lift+';}'];

  if(!film)css=css.concat([
  /* ---- 1. ambient: a light source, felt rather than seen ---- */
  'body{position:relative;}',
  'body::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;',
  /* A key light, not a veil. This was a near-white wash at .55 sitting over
     the top of every page — it faded heroes out and made the whole site read
     washed. Ambient light should be felt, never seen. */
  '  background:radial-gradient(125% 62% at 50% -26%,'+(dark?'rgba(224,168,120,.09)':'rgba(255,252,244,.16)')+',transparent 55%),',
  '             radial-gradient(100% 55% at 50% 122%,'+(dark?'rgba(0,0,0,.30)':'rgba(141,135,120,.07)')+',transparent 54%);}',
  'body>*{position:relative;z-index:1;}']);

  css=css.concat([

  /* ---- 2. elevation — only ever on elements that own a surface.
     A shadow on a transparent caption draws a box around the words
     (and on a cut-out photo, a box around the stone), so the class
     below is applied by the JS pass, never by matching alone. ---- */
  '.em-el{box-shadow:var(--em-e2);}',
  '.em-el.em-hov:hover{box-shadow:var(--em-lift);}',
  '.em-el-hi{box-shadow:var(--em-e3);}',

  /* ---- 3. grounding: photographs sit on a surface ---- */
  '.media img,.hero-media img,.split img,.int img,.card img{',
  '  filter:drop-shadow(0 10px 22px '+(dark?'rgba(0,0,0,.5)':'rgba(61,41,23,.16)')+');}',
  /* cut-out product stones cast a contact shadow, not a box shadow */
  'img[src*="/products/"],img[src*="/beads/"]{box-shadow:none!important;',
  '  filter:drop-shadow(0 6px 10px '+(dark?'rgba(0,0,0,.6)':'rgba(61,41,23,.26)')+')',
  '         drop-shadow(0 18px 34px '+(dark?'rgba(0,0,0,.4)':'rgba(61,41,23,.12)')+');}',

  /* buttons pick up the same light so they feel pressable */
  '.btn-c,.cta,.btn.primary{box-shadow:inset 0 1px 0 rgba(255,255,255,.26),inset 0 -1px 0 rgba(0,0,0,.22),var(--em-e2);}',
  '.btn-c:hover,.cta:hover,.btn.primary:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.26),inset 0 -1px 0 rgba(0,0,0,.22),var(--em-lift);}',

  /* hairline separators gain a highlight edge — one pixel of relief */
  'header,.trust,.band{box-shadow:0 1px 0 '+(dark?'rgba(255,255,255,.05)':'rgba(255,255,255,.8)')+';}',

  '@media (prefers-reduced-motion:reduce){*{transition-duration:.01ms!important;}}'
  ]);
  css=css.join('\n');

  var st=document.createElement('style');st.id='em-depth';st.textContent=css;
  document.head.appendChild(st);

  /* --- decide what may be lifted: it must own an opaque surface --- */
  /* .fcard .jcard .mkc are the card classes the copy-rewrite pages use. Without
     them those pages loaded this file and lifted nothing — /jewelry/ has eight
     product cut-outs and grounded none of them, while the same cut-outs sat
     properly on the pages whose class names happened to be in this list. */
  var LIFT='.card,.int,.gem,.prod,.panel,.vcol,.way,.tile,.pcard,.fcard,.jcard,.mkc';
  var HIGH='.t3d,.figure,.shot';
  function opaque(el){
    var cs=getComputedStyle(el);
    if(cs.backgroundImage&&cs.backgroundImage!=='none')return true;
    var m=cs.backgroundColor.match(/[\d.]+/g);
    if(!m)return false;
    var a=m.length>3?parseFloat(m[3]):1;
    return a>=0.85;
  }
  function mark(sel,cls,hover){
    [].forEach.call(document.querySelectorAll(sel),function(el){
      if(!opaque(el))return;                 /* transparent caption → leave it alone */
      el.classList.add(cls);
      if(hover)el.classList.add('em-hov');
    });
  }
  function pass(){
    mark(LIFT,'em-el',true);
    mark(HIGH,'em-el-hi',false);
  }
  pass();
  /* shared components inject their own DOM after us */
  addEventListener('load',pass);
  setTimeout(pass,600);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
