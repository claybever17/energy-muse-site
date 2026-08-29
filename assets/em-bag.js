/* em-bag.js — the prototype Bag. localStorage-backed, shared by every page.
   Injects its own slide-over drawer + styles. Paths stored root-relative so
   items survive navigation between pages at different depths.
   API: EMBag.add({id,name,price,img,link}) · remove(id) · setQty(id,n) · open() · close() */
(function(){
'use strict';
var KEY='em-bag';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}}
function save(items){try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){}}
function count(){return load().reduce(function(n,it){return n+it.qty},0)}
function money(n){return '$'+n.toFixed(2)}

/* ---------- styles ---------- */
var css=[
'.embag-veil{position:fixed;inset:0;z-index:220;background:rgba(11,19,32,.45);backdrop-filter:blur(3px);',
'  opacity:0;pointer-events:none;transition:opacity .35s}',
'.embag-veil.on{opacity:1;pointer-events:auto}',
'.embag{position:fixed;top:0;right:0;bottom:0;z-index:230;width:min(400px,92vw);display:flex;flex-direction:column;',
'  background:#FBF8F2;color:#1D2739;box-shadow:-18px 0 60px rgba(11,19,32,.3);',
'  transform:translateX(105%);transition:transform .45s cubic-bezier(.16,1,.3,1);',
'  font-family:\"Instrument Sans\",-apple-system,sans-serif;font-size:15px}',
'.embag.on{transform:none}',
'.embag-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid #EAE3D6}',
'.embag-head strong{font-family:Fraunces,Georgia,serif;font-weight:400;font-size:22px;letter-spacing:-.01em}',
'.embag-head .n{color:#A9683E;font-size:13px;font-weight:600;margin-left:8px}',
/* 36px against the 44 the brief asks for, and it is the control that gets you
   back out of the drawer. The bordered square stays 36 so nothing looks
   different; an ::after overlay carries the hit area out to 46. Note this
   rule is spread over three array entries - the declarations continue on
   the next lines - so anything added here belongs INSIDE it, not between
   the entries, which silently breaks the whole block. */
'.embag-x{background:none;border:1px solid #C8BCA6;border-radius:3px;width:36px;height:36px;font-size:19px;color:#3D4658;',
'  position:relative;',
'  cursor:pointer;color:#1D2739;line-height:1}',
/* Padding would have grown the bordered square along with the hit area,
   because the border is drawn outside the padding - the button ended up
   visibly 46px. An overlay extends only what the finger has to land on. */
'.embag-x::after{content:"";position:absolute;inset:-5px;}',
'.embag-x:hover{border-color:#A9683E;color:#A9683E}',
'.embag-items{flex:1;overflow-y:auto;padding:10px 22px}',
'.embag-empty{padding:46px 10px;text-align:center;color:#8D8778}',
'.embag-empty svg{width:74px;height:76px;color:#A9683E;opacity:.5;margin-bottom:14px}',
'.embag-it{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid #EAE3D6}',
'.embag-it img{width:58px;height:58px;object-fit:contain;background:#fff;border:1px solid #EAE3D6;border-radius:8px;padding:6px;flex:none}',
'.embag-it .inf{flex:1;min-width:0}',
'.embag-it .nm{font-family:Fraunces,Georgia,serif;font-size:16px;line-height:1.2}',
'.embag-it .pr{color:#8F5330;font-size:13px;margin-top:3px}',
'.embag-qty{display:flex;align-items:center;gap:8px;margin-top:8px}',
'.embag-qty button{width:24px;height:24px;border:1px solid #EAE3D6;background:#fff;border-radius:3px;cursor:pointer;',
'  font-size:14px;line-height:1;color:#1D2739}',
'.embag-qty button:hover{border-color:#A9683E;color:#A9683E}',
'.embag-qty span{min-width:16px;text-align:center;font-weight:600;font-size:13px}',
'.embag-rm{background:none;border:none;color:#6B6455;font-size:11px;letter-spacing:.08em;text-transform:uppercase;',
'  cursor:pointer;padding:6px 0 0;font-weight:600}',
'.embag-rm:hover{color:#A9683E}',
'.embag-foot{padding:18px 22px 22px;border-top:1px solid #EAE3D6;background:#F4EFE5}',
'.embag a:focus-visible,.embag button:focus-visible,.embag-veil:focus-visible{outline:2px solid #8F5330;outline-offset:2px;border-radius:3px}',
'.embag-sub{display:flex;justify-content:space-between;font-size:14px;margin-bottom:14px}',
'.embag-sub b{font-family:Fraunces,Georgia,serif;font-weight:400;font-size:18px}',
'.embag-go{width:100%;display:inline-flex;justify-content:center;padding:15px 20px;border:none;cursor:pointer;',
'  font-weight:600;font-size:14px;color:#fff;font-family:inherit;',
'  background:linear-gradient(160deg,#9E6038,#96592F 46%,#8A4E2C);',
'  box-shadow:inset 0 1px 0 rgba(255,255,255,.25),inset 0 -1px 0 rgba(0,0,0,.22);',
'  border-radius:8px}',
'.embag-note{margin-top:10px;font-size:11px;color:#8D8778;text-align:center;letter-spacing:.03em}',
'@media (prefers-reduced-motion:reduce){.embag{transition:none}.embag-veil{transition:none}}',
].join('\n');

/* ---------- drawer DOM ---------- */
var veil,drawer,itemsEl,countEls=[];
function build(){
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  veil=document.createElement('div');veil.className='embag-veil';veil.addEventListener('click',close);
  drawer=document.createElement('aside');drawer.className='embag';drawer.setAttribute('aria-label','Shopping bag');
  drawer.innerHTML=
    '<div class="embag-head"><div><strong>Your Bag</strong><span class="n" id="embag-n"></span></div>'+
    '<button class="embag-x" aria-label="Close bag">&times;</button></div>'+
    '<div class="embag-items" id="embag-items"></div>'+
    '<div class="embag-foot"><div class="embag-sub"><span>Subtotal</span><b id="embag-sub"></b></div>'+
    '<button class="embag-go" id="embag-go">Checkout</button>'+
    '<div class="embag-note">Prototype bag &mdash; saved on this device. Checkout connects when the store goes live.</div></div>';
  document.body.appendChild(veil);document.body.appendChild(drawer);
  drawer.querySelector('.embag-x').addEventListener('click',close);
  itemsEl=drawer.querySelector('#embag-items');
  drawer.querySelector('#embag-go').addEventListener('click',function(){
    this.textContent='Checkout — coming soon';
    var b=this;setTimeout(function(){b.textContent='Checkout';},1800);
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
}
function render(){
  var items=load(),n=count();
  drawer.querySelector('#embag-n').textContent=n?n+(n===1?' item':' items'):'';
  countEls.forEach(function(el){el.textContent='Bag ('+n+')';});
  if(!items.length){
    itemsEl.innerHTML='<div class="embag-empty">'+
      '<svg viewBox="0 0 231.33 238.67" aria-hidden="true"><use href="#em-markline"/></svg>'+
      '<div>Your bag is empty.<br>Start with what you want more of.</div></div>';
  }else{
    itemsEl.innerHTML=items.map(function(it){
      return '<div class="embag-it" data-id="'+it.id+'">'+
        '<img src="'+it.img+'" alt="">'+
        '<div class="inf"><div class="nm">'+it.name+'</div><div class="pr">'+money(it.price)+'</div>'+
        '<div class="embag-qty"><button data-q="-1" aria-label="Less">&minus;</button><span>'+it.qty+'</span>'+
        '<button data-q="1" aria-label="More">+</button></div></div>'+
        '<button class="embag-rm">Remove</button></div>';
    }).join('');
    itemsEl.querySelectorAll('.embag-it').forEach(function(row){
      var id=row.getAttribute('data-id');
      row.querySelectorAll('[data-q]').forEach(function(b){
        b.addEventListener('click',function(){setQty(id,qtyOf(id)+parseInt(b.getAttribute('data-q'),10));});
      });
      row.querySelector('.embag-rm').addEventListener('click',function(){remove(id);});
    });
  }
  var sub=items.reduce(function(s,it){return s+it.price*it.qty},0);
  drawer.querySelector('#embag-sub').textContent=money(sub);
}
function qtyOf(id){var it=load().find(function(i){return i.id===id});return it?it.qty:0}

/* ---------- API ---------- */
function add(item){
  var items=load(),ex=items.find(function(i){return i.id===item.id});
  if(ex)ex.qty++;else items.push({id:item.id,name:item.name,price:item.price,img:item.img,link:item.link||'/',qty:1});
  save(items);render();open();
}
function remove(id){save(load().filter(function(i){return i.id!==id}));render();}
function setQty(id,n){
  if(n<1)return remove(id);
  var items=load(),it=items.find(function(i){return i.id===id});
  if(it){it.qty=n;save(items);render();}
}
function open(){veil.classList.add('on');drawer.classList.add('on');}
function close(){veil.classList.remove('on');drawer.classList.remove('on');}

/* ---------- boot: bind every "Bag (0)" link on the page ---------- */
function boot(){
  build();
  document.querySelectorAll('a.bag, [data-bag]').forEach(function(el){
    countEls.push(el);
    el.addEventListener('click',function(e){e.preventDefault();open();});
  });
  render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();

window.EMBag={add:add,remove:remove,setQty:setQty,open:open,close:close,count:count};
})();
