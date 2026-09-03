/* em-header.js — unified site header + footer shared by the inner pages.
   Injects (same pattern as em-bag/em-versions): announcement bar (not on /quiz/),
   logo-left nav (Start Here · Shop · By Intention · Learn | Bag), a full
   mobile menu, and a compact footer with the non-medical disclaimer. Light/dark
   palette auto-picked from the page background. Include BEFORE em-bag.js so the
   injected Bag link gets bound by the cart. Root-absolute links work at any depth. */
(function(){
'use strict';
if(document.getElementById('emh'))return;

function lum(){try{var m=getComputedStyle(document.body).backgroundColor.match(/\d+/g);
  if(!m)return 1;return (0.2126*m[0]+0.7152*m[1]+0.0722*m[2])/255;}catch(e){return 1;}}
var dark=lum()<0.45;
var P=dark?{ink:'#F1EADF',soft:'#AEB9C8',stone:'#7C879A',line:'#243247',copper:'#C4855A',
            navbg:'rgba(10,17,28,.9)',annbg:'rgba(255,255,255,.03)',footbg:'#0B1320',menubg:'#0A111C'}
          :{ink:'#1D2739',soft:'#4E5A70',stone:'#8D8778',line:'#E4DCCB',copper:'#A9683E',
            navbg:'rgba(251,248,242,.92)',annbg:'#F4EFE5',footbg:'#F4EFE5',menubg:'#FBF8F2'};
/* The mark on a dark ground used to be recoloured to tan, cream and copper —
   a palette invented here to sit nicely against the site, not one taken from
   the brand. Energy Muse did not want their logo tinted, and on the dark
   footer that version was the thing people looked at.

   It is one colour now: the same currentColor the wordmark already uses, so
   the lockup is a single ink like any one-colour logo. The three paths are
   disjoint — the outer ring is punched and the two inner shapes fill the
   holes — so they cannot all be full strength or the mark flattens into a
   disc. Stepping the two inner shapes down in opacity keeps the form
   readable without introducing a hue that is not theirs.

   Light grounds keep the real brand colours and are untouched. */
var MARK  = dark ? ['currentColor','currentColor','currentColor']
                 : ['#152445','#e0e0e0','#44b891'];
var MARKO = dark ? ['1','.30','.60'] : ['1','1','1'];

var SPRITE='<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">'
 +'<symbol id="em-logo-hdr" viewBox="0 0 1167 247.5">'
 +'<g><path fill="'+MARK[0]+'" opacity="'+MARKO[0]+'" d="M189.69,194.19c-31.47,34.37-81.82,42.71-122.32,21.22-27.62-14.65-46.73-41.52-52.64-69.96-7.48-36.05,4.02-73.41,32.42-99.17,21.07-19.11,47.83-27.9,76.41-25.64,20.11,1.59,39.11,9.16,54.56,21.91,3.46,2.86,6.54,5.38,9.57,8.56,38.14,40.05,39.83,101.74,1.99,143.08ZM77.98,184.32c5.79,7.06,13.04,11.43,22.12,13.24,19.2,3.84,38.84-.55,55.55-10.91,29.03-17.98,42.78-50.33,39.88-84.29-3.17-37.1-31.15-67.2-68.24-72.09-4.79-.63-9.09-.96-14.66.35,20.78,4.81,36.06,16.44,35.82,41.81-.11,11.35-1.96,22.44-9.2,31.49-7.28,9.09-15.29,13.33-25.03,19.07-10.51,6.2-20.7,12.26-30.15,19.94-13.07,10.62-16.61,28.55-6.09,41.39ZM63.38,129.87c4.91-4.01,9.64-7.75,14.76-11.43,11.66-8.38,21.05-14.26,23.07-30.52.17-7.96-2.49-16.33-8.68-22-10.58-9.68-26.8-9.43-37.85.02-27.94,23.93-29.6,71.37-3.11,97.33l-.32-8.07c-.4-10.18,4.14-18.82,12.12-25.33Z"/><path fill="'+MARK[1]+'" opacity="'+MARKO[1]+'" d="M77.98,184.32c-10.52-12.84-6.98-30.77,6.09-41.39,9.44-7.68,19.64-13.74,30.15-19.94,9.73-5.74,17.75-9.98,25.03-19.07,7.24-9.05,9.09-20.14,9.2-31.49.25-25.38-15.03-37-35.82-41.81,5.57-1.31,9.86-.98,14.66-.35,37.09,4.89,65.07,34.99,68.24,72.09,2.9,33.96-10.85,66.3-39.88,84.29-16.71,10.36-36.35,14.74-55.55,10.91-9.07-1.81-16.33-6.18-22.12-13.24Z"/><path fill="'+MARK[2]+'" opacity="'+MARKO[2]+'" d="M63.38,129.87c-7.98,6.51-12.52,15.15-12.12,25.33l.32,8.07c-26.49-25.96-24.83-73.4,3.11-97.33,11.04-9.46,27.26-9.71,37.85-.02,6.2,5.67,8.85,14.04,8.68,22-2.03,16.26-11.41,22.14-23.07,30.52-5.12,3.68-9.86,7.43-14.76,11.43Z"/></g>'
 +'<g fill="currentColor"><path d="M853.79,172.48c.04,12.44,10.53,8.33,8,12.82l-38.17.09-1.52-1.1c-1.43-1.03,8.86-2.2,8.84-8.8l-.18-46.59c-.01-3.38-2.56-7.1-4.6-8.51-6.19-4.3-12.17-.82-18.36,4.64v49.09c-.01,8.77,8.79,8.19,8.34,9.45l-.63,1.75-39.77.02c-.09-.57-.2-2.19.24-2.3l2.23-.54c2.64-.64,6.37-2.6,6.38-6.38l.07-45.32c0-2.41-2.23-5.31-4.07-6.4l-6.07-3.59-.37-1.55c-.11-.44,1.26-.84,1.76-.99,10.81-2.01,19.86-5.81,30.84-10.22l.52,13.9,10.92-7.76c6.57-4.66,14.63-6.26,22.49-4.29,6.22,1.56,10.09,6.57,12.61,12.48,9.9-8.84,20-15.02,32.59-12.76,7.78,1.39,13.91,7.97,13.98,16.17l.44,47.45c.02,4.95,2.46,9.02,7.62,9.41.33.19,1.55,1.27,1.19,1.53l-1.61,1.15-38.06.03c-2.96-3.73,7.89-1.69,7.85-10.67l-.19-45.55c-.01-3.49-2.2-7.21-4.48-8.72-6.64-4.41-13.25-1.01-18.99,5.39l.17,46.68Z"/><path d="M666.82,195.28c-10.35,8.51-32.92,8.94-46.78,7.11-6.33-.84-12.42-1.77-17.48-6.06-1.96-1.67-2.22-5.78-1.23-8.54.75-2.08,3.65-4.06,6.51-5.71-1.66-1.42-4.37-3.76-4.99-5.85-3.54-11.87,8.75-18.04,20.28-21.39-7.08-2.13-12.85-5.05-16.97-10.61-6.77-9.15-4.63-21.64,4.42-28.65,6.17-4.77,13.78-6.92,21.73-7.35,2.46-13.51,15.31-28.02,26.59-23.29,5.04,2.11,6.3,7.47,5.35,12.41-1.06,5.57-5.59,9.39-11.69,7.82l-7.01-3.1c-2.34-1.04-4.97-1.42-7.27-.27-1.89.94-3.29,3.85-3.59,6.46,16.48-.1,32.46,9.08,31.66,25.07-.71,14.2-16.07,22.83-29.4,22.7-5.82-.05-12.54.55-17.62,2.46-.81.3-2.92,1.97-2.42,2.54l2.41,2.74,34.37.19c6.39,1.11,12.61,2.27,16.38,7.86,4.82,7.13,3.79,17.66-3.27,23.46ZM635.13,153.52c9.16-.27,10.41-23.53,5.77-37.93-.79-2.46-3.87-4.29-5.83-4.45-8.56-.7-9.51,11.12-9.48,21.11s.86,21.52,9.54,21.26ZM653.13,187.56l-8.61-1.4-23.26-.69-8.22-1.17c-2.42-.34-5.07,3.22-5.33,5.34-1.12,9.11,14.52,10.89,25.5,10.87,9.64-.02,24.4-.77,24.16-8.02-.07-1.99-1.71-4.51-4.24-4.92Z"/><path d="M400.83,119.53c-5.74-2.2-11.01.12-14.85,3.83l-2.43,2.34v48.34c0,8.15,10.4,9.22,8.98,10.25l-1.44,1.05h-38.94c-1.35-4.03,5.85-2.49,7.38-6.58,2.12-5.64,1.14-10.95,1.13-16.69l-.07-21.64c-.01-4.5,1.02-9.44-1.66-13.58s-10.56-5.7-9.4-6.92l1.56-1.64c10.35-1.9,19.71-5.1,29.29-9.52.7-.14,2.71.02,3.06.43l.15,12.69c9.8-8.62,22.53-15.91,34.73-11.55,7.06,2.52,11.72,9.16,11.75,16.78l.17,47.41c.03,7.85,8.26,7.51,8.88,9.06.22.54-.91,1.49-1.52,1.73l-38.84.04-.14-1.8c-.07-.84,8.61-1.26,8.6-8.32l-.05-45.47c0-4.18-2.47-8.77-6.32-10.25Z"/><path d="M991.57,108.87l.18,61.36c.01,3.99,4.32,6.3,7.42,7.15l1.62.44c.46.13.9,1.87.42,1.91l-2.31.23c-6.71.67-13.05,2.49-19.41,4.64l-9.82,3.33-.72-13.56c-9.75,8.3-20.69,14.44-32.87,10.94-7.54-2.16-13.62-8.37-13.75-16.4l-.67-40.33c-.08-4.66-9.54-6.45-10.6-10.42,11.27-2.1,20.92-5.26,31.11-9.67.41-.1,2.47-.08,2.46.46l-.03,2.42-.11,8.16.08,27.48.05,7.23c.04,5.27-.34,10.55.87,15.66,1.41,5.99,6.96,8.71,13.14,7.68,4.01-.67,7.8-3.9,10.27-7.31l.03-37.27c0-11.74-11.6-9.86-11.17-14.91,10.46-2.21,20.18-4.82,29.84-9.16.84-.38,2.71-.37,3.96-.07Z"/><path d="M519.08,156.82c.79.41,1.5.95,1.96,1.51-6.37,17.65-18.11,27.08-37.09,26.51-15.61-.46-30.45-9.59-36.3-24.45-5.67-14.4-1.51-30.72,9.09-41.5s27.28-14.91,41.88-9.58c13.28,4.85,21.9,17.03,21.5,31.21h-50.99c-.14,15.31,11.62,27.45,26.87,27.85,9.42.25,17.65-3.09,23.08-11.55ZM498.31,137.43c.79-11.92-1.73-26.75-11.82-27.75-14.44-1.43-17.7,13.84-17.47,27.81l29.3-.06Z"/><path d="M1143.53,166.73c4.47-1.92,6.42-6.47,10.96-9.02-.9,8.13-5.57,14.92-11.16,19.88-9.33,8.28-22.26,10.04-34.17,7.14-18.1-4.4-31.15-19.93-29.99-39.02.88-14.36,9.53-26.64,21.36-32.62,13.57-6.87,29.48-6.05,41.22,2.89,7,5.32,11.39,12.84,12.04,21.13l.38,4.88-50.94-.02c.13,10.85,5.62,20.53,15.37,24.84,8.15,3.6,16.39,3.61,24.93-.07ZM1132.24,139.01c.34-9.04-.4-16.69-4.78-23.57-2.19-3.45-6.39-4.45-10.4-4.28-9.07.38-13.09,11.09-13.9,21.05l-.55,6.77,29.62.03Z"/><path d="M297.3,160.84c11.48,12.2,34.17,11.88,42.71-3.08,2.43.94,1.46,2.7.86,4.34-6.71,18.29-24.78,27.5-43.74,22.86-11.86-2.9-22.25-9.89-27.51-21.35-5.45-11.87-4.26-25.5,3.15-37.08,10.1-15.8,31.19-22,49-14.77,12.26,4.98,19.62,17.24,19.52,30.22l-51.41.02c.83,6.97,2.59,13.7,7.43,18.85ZM319.62,139.04c.19-11.33-1.88-26.1-11.52-27.67-4.64-.75-9.02.48-12.02,3.87-3.18,3.59-5.07,8.41-5.41,13.21l-.75,10.6,29.71-.02Z"/><path d="M750.91,122.24l-14.12,27.4-18.52,37.5c-6.76,13.69-23.09,37.68-35.51,27.93-2.59-2.03-4.3-5-4.32-8.71-.03-4.97,2.09-8.74,6.53-10.08,4.01-1.21,8.33.32,10.92,4.45.93,1.49,2.88,4.25,4.8,4.42,1.47.11,4.29-2.13,5.1-3.46l9.9-16.13-30.6-63.13c-4.38-9.03-12.8-8.95-12.27-10.09l.8-1.69,42.01.06,1.58,1.09c1.49,1.03-4.22,1.78-6.21,4.41-.81,1.07-.75,4.45-.12,5.82l17.55,37.76,10.36-21.62c2.36-4.93,3.3-10.24,3.35-15.6.08-8.54-8.1-8.33-10.45-9.7-.47-.28.19-1.7.58-2.2l30.88.1.61,1.61c.27.72-9.15,2.69-12.85,9.86Z"/><path d="M1058.69,181.45c-14.14,9.31-30.81,5.06-46.77-1.04l-.94-11.52-.63-12.69-.12-1.89c-.03-.51,1.65-.45,1.98-.3,4.28,8.74,9.42,16.2,15.7,23.38,4.3,3.87,9.52,7.58,15.24,6.67,3.45-.55,6.69-2.08,8.24-4.47,1.81-2.79,1.82-6.83-.09-9.89-3.29-5.26-8.76-8.27-14.34-11.01l-19.02-9.35c-7.48-3.68-10.71-11.72-9.05-20.2,1.86-9.53,10.12-16.71,19.76-18.9,5.45-1.24,11.26-1.79,16.86-.53l15.21,3.44,3.2,22.4.22,1.53c.04.31-.95.31-1.73.36-5.42-11.24-20.76-29.04-31.87-24.71-2.97,1.16-5.06,3-5.77,5.38-4.97,16.51,40.96,15.71,45.24,38.02,1.97,10.3-2.72,19.66-11.29,25.31Z"/><path d="M562.31,174.98c0,6.82,7.12,7.1,9.02,8.21.45.26-.11,2.13-.69,2.13l-39.83.04c-3.59-3.78,8.71-1.22,8.69-11.45l-.09-42.17c0-4.05-2.61-6.94-5.83-8.51l-4.92-2.4c-.33-.24-.51-1.91-.09-2.09l1.91-.83c10.78-1.76,20.05-5.63,30.69-9.84l.28,17.68c4.79-6.12,5.87-13.16,15.4-16.22,4.27-1.37,9.62-.91,12.73,2.8,4.5,5.35,4.41,14.22-.05,19.62s-11.9,4.08-15.78-.94c-1.24-1.61-3.54-3.68-5.2-4.59-3.53.24-6.23,3.97-6.24,7.52v41.03Z"/></g>'
 +'</symbol></svg>';

var css=[
'.emh-ann{background:'+P.annbg+';border-bottom:1px solid '+P.line+';color:'+P.soft+';font:400 12px/1.5 "Instrument Sans",sans-serif;letter-spacing:.03em;}',
'.emh-ann-in{max-width:1240px;margin:0 auto;padding:9px 44px;display:flex;align-items:center;justify-content:center;gap:14px;text-align:center;position:relative;}',
'.emh-ann a{font-weight:600;color:'+P.ink+';text-decoration:none;border-bottom:1px solid '+P.copper+';padding-bottom:1px;',
'  white-space:nowrap;}',   /* the arrow stays with the last word */
'@media(max-width:640px){.emh-ann-in{gap:8px;padding-inline:38px;flex-wrap:wrap;}',
'  .emh-ann-more{display:none;}}',
'.emh-ann a:hover{color:'+P.copper+';}',
/* P.stone against the announcement ground measured 3.12:1, under the 4.5 a
   small control needs. P.ink is the same family, and legible. */
'.emh-annx{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:0;color:'+P.ink+';opacity:.72;cursor:pointer;font-size:16px;line-height:1;padding:6px;}',
/* The header wrapper has to outrank page content, and it did not.

   em-depth.js sets "body>*{position:relative;z-index:1}" so every direct
   child of body clears the ambient light it paints at z-index 0. #emh is one
   of those children, so the whole header became a stacking context worth 1 —
   and the nav's z-index:90 and the Shop panel's 120 are only meaningful
   INSIDE it. Against a hero that is also position:relative at z-index 1 and
   comes later in the document, the panel lost on document order and the
   dropdown rendered behind the page.

   An id beats "body>*" on specificity regardless of which file loads last,
   which is what makes this safe to fix from here rather than in em-depth. */
'#emh{position:relative;z-index:200;}',
'.emh-nav{position:sticky;top:0;z-index:90;background:'+P.navbg+';backdrop-filter:blur(12px);border-bottom:1px solid '+P.line+';}',
'.emh-in{max-width:1240px;margin:0 auto;padding:0 clamp(20px,4vw,44px);height:70px;display:flex;align-items:center;gap:clamp(22px,3vw,40px);}',
'.emh-brand{display:flex;align-items:center;flex-shrink:0;}',
'.emh-logo{height:38px;width:auto;aspect-ratio:1167/247.5;display:block;color:'+P.ink+';}',
'.emh-links{display:flex;gap:26px;font:500 13px "Instrument Sans",sans-serif;letter-spacing:.03em;transform:translateY(3px);}',
/* Crystals, Jewelry, Frequency and Kits lived only in the footer, seventeen
   screens down, so reaching a category cost Shop -> scroll -> a card -> the
   grid. Putting all four in the bar would make it eight items; this is one
   item that opens.

   It opens on CLICK, not hover. A hover menu on a nav that also has to work
   on a touch screen is the thing that gets called glitchy, and it has been
   called that on this project already. */
'.emh-shop{position:relative;}',
'.emh-shop > button{background:none;border:0;padding:0;cursor:pointer;color:inherit;',
'  font:inherit;letter-spacing:inherit;display:inline-flex;align-items:center;gap:5px;}',
'.emh-shop > button::after{content:"";width:5px;height:5px;border-right:1.4px solid currentColor;',
'  border-bottom:1.4px solid currentColor;transform:rotate(45deg) translate(-1px,-1px);',
'  transition:transform .2s;}',
'.emh-shop.open > button::after{transform:rotate(225deg) translate(-2px,-2px);}',
'.emh-shop > button:hover{color:'+P.copper+';}',
'.emh-panel{position:absolute;top:calc(100% + 14px);left:-16px;min-width:190px;z-index:120;',
'  background:'+P.menubg+';border:1px solid '+P.line+';border-radius:8px;padding:6px;',
'  box-shadow:0 18px 44px rgba(11,19,32,.13);opacity:0;visibility:hidden;transform:translateY(-6px);',
'  transition:opacity .2s,transform .2s,visibility .2s;}',
'.emh-shop.open .emh-panel{opacity:1;visibility:visible;transform:none;}',
'.emh-panel a{display:block;padding:10px 12px;border-radius:5px;color:'+P.ink+';',
'  text-decoration:none;font:500 13px "Instrument Sans",sans-serif;letter-spacing:.02em;}',
'.emh-panel a:hover{background:'+P.annbg+';color:'+P.copper+';}',
'.emh-panel .sep{height:1px;background:'+P.line+';margin:5px 8px;}',
'.emh-links a{color:'+P.soft+';text-decoration:none;transition:color .2s;}',
'.emh-links a:hover{color:'+P.copper+';}',
'.emh-utils{margin-left:auto;display:flex;gap:16px;align-items:center;font:500 12.5px "Instrument Sans",sans-serif;letter-spacing:.04em;transform:translateY(3px);}',
'.emh-utils a{color:'+P.soft+';text-decoration:none;}',
/* Hit areas. Search and Bag were 43x15 and 45x15 on a phone — a fifteen-pixel
   target is hard to hit with a thumb, and these two are on every page. The
   padding grows the tappable box to 44px without changing how any of it
   looks, and the negative margin keeps the row the same height. */
'@media (max-width:840px){',
'  .emh-utils{gap:6px;}',
'  .emh-utils a,.emh-utils button{min-height:44px;display:inline-flex;align-items:center;padding:0 10px;}',
'  .emh-brand{min-height:44px;}',
'  .emh-ann-in a{display:inline-flex;align-items:center;min-height:38px;}',
'  .emh-annx{width:44px;height:44px;display:flex;align-items:center;justify-content:center;padding:0;right:4px;}',
'}',
'.emh-utils a.bag{color:'+P.ink+';font-weight:600;}',
'.emh-burger{display:none;width:38px;height:38px;border:1px solid '+P.line+';background:none;border-radius:3px;cursor:pointer;flex-direction:column;align-items:center;justify-content:center;gap:5px;}',
'.emh-burger span{width:16px;height:1.5px;background:'+P.ink+';display:block;}',
'.emh-menu{position:fixed;inset:0;z-index:200;background:'+P.menubg+';color:'+P.ink+';display:flex;flex-direction:column;padding:20px clamp(20px,5vw,44px) 40px;opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .3s,transform .3s,visibility .3s;}',
'.emh-menu.open{opacity:1;visibility:visible;transform:none;}',
'.emh-menu-top{display:flex;align-items:center;justify-content:space-between;height:58px;}',
'.emh-menu-top .emh-logo{height:30px;}',
'.emh-close{width:38px;height:38px;border:1px solid '+P.line+';background:none;border-radius:3px;font-size:20px;color:'+P.ink+';cursor:pointer;line-height:1;}',
/* starts under the logo, not centred — see the note on .mobmenu nav */
'.emh-menu nav{display:flex;flex-direction:column;margin-top:clamp(22px,5vh,44px);flex:1;justify-content:flex-start;}',
'.emh-menu nav a{font:300 28px "Fraunces",Georgia,serif;color:'+P.ink+';text-decoration:none;padding:13px 0;border-bottom:1px solid '+P.line+';}',
'.emh-menu nav a:hover{color:'+P.copper+';}',
/* the quiet tier — utility weight, still 44px to tap */
'.emh-menu-sec{display:flex;flex-wrap:wrap;gap:4px 22px;padding-top:14px;}',
'.emh-menu-sec a{font:500 13.5px "Instrument Sans",sans-serif;letter-spacing:.04em;color:'+P.soft+';text-decoration:none;min-height:44px;display:inline-flex;align-items:center;}',
'.emh-menu-sec a:hover{color:'+P.copper+';}',
'.emh-menu-cats{display:flex;flex-wrap:wrap;gap:4px 20px;padding-top:12px;}',
'.emh-menu-cats a{font:500 14px "Instrument Sans",sans-serif;letter-spacing:.02em;',
'  color:'+P.ink+';text-decoration:none;min-height:44px;display:inline-flex;align-items:center;}',
'.emh-menu-cats a:hover{color:'+P.copper+';}',
/* one size for the row, so the injected Search button and the Bag link do not
   centre their labels a pixel apart — the same fix the homepage row needed */
'.emh-menu-foot{display:flex;align-items:center;gap:22px;padding-top:20px;}',
'.emh-menu-foot > *{min-height:44px;display:inline-flex;align-items:center;font:500 13px "Instrument Sans",sans-serif;letter-spacing:.04em;color:'+P.soft+';text-decoration:none;}',
'.emh-menu-foot a.bag{color:'+P.soft+';}',
'.emh-menu-foot > *:hover{color:'+P.copper+';}',
'body.emh-open{overflow:hidden;}',
/* overflow:hidden on <body> locks nothing here: the scrolling element is
   <html>, so with the menu open the page went right on scrolling behind
   it. The root has to be held too. :has() covers browsers that have it
   and set() below sets the same property directly for those that do not,
   which also keeps the scroll position from being lost on iOS. */
'html:has(body.emh-open){overflow:hidden;}',
'.emh-foot{background:'+P.footbg+';border-top:1px solid '+P.line+';font-family:"Instrument Sans",sans-serif;}',
'.emh-foot-in{max-width:1240px;margin:0 auto;padding:44px clamp(20px,4vw,44px) 30px;display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;}',
'.emh-foot .emh-logo{height:30px;}',
'.emh-foot-links{display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:center;font-size:13px;font-weight:600;}',
'.emh-foot-social{display:flex;align-items:center;justify-content:center;gap:6px;}',
'.emh-foot-social span{font-size:12px;font-weight:600;letter-spacing:.06em;color:'+P.soft+';margin-right:6px;}',
'.emh-foot-social a{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:'+P.soft+';}',
'.emh-foot-social a svg{width:19px;height:19px;}',
'.emh-foot-social a:hover{color:'+P.accent+';}'
  /* The footer nav sat at 21px - a real target on every page of the site. An
     overlay is wrong here because the links wrap with an 8px row gap and a
     44px box would reach into the row above and take its taps. Padding grows
     each link's own box instead, and the row gap comes off so the footer does
     not get taller for it. The text does not move: the padding is symmetric. */
+'@media(max-width:840px){.emh-foot-links{gap:0 20px}.emh-foot-links a{display:inline-block;padding-block:12px}}',
/* email capture belongs on every page, not just the homepage */
'.emh-sub{width:100%;max-width:440px;text-align:center;}',
'.emh-sub h3{font-family:Fraunces,Georgia,serif;font-weight:300;font-size:20px;margin:0 0 4px;max-width:none;color:'+P.fg+';}',
'.emh-sub p{font-size:12.5px;max-width:none;color:'+P.soft+';margin:0 0 12px;}',
'.emh-sub form{display:flex;gap:8px;}',
/* Both came out at 43px from padding and line-height, one short of the 44 the
   brief asks for. Stated rather than inferred. */
'.emh-sub form input,.emh-sub form button{min-height:44px;}',
'.emh-sub input{flex:1;min-width:0;padding:12px 14px;border-radius:8px;font-size:14px;font-family:inherit;',
'  border:1px solid '+P.line+';background:'+(dark?'rgba(255,255,255,.05)':'#fff')+';color:'+P.fg+';}',
'.emh-sub input:focus{outline:none;border-color:'+P.accent+';}',
'.emh-sub button{font:700 11px "Instrument Sans",sans-serif;letter-spacing:.1em;text-transform:uppercase;',
'  padding:12px 18px;border-radius:8px;border:none;cursor:pointer;color:#fff;',
'  background:linear-gradient(160deg,#9E6038,#96592F 46%,#8A4E2C);}',
'.emh-sub button{border-radius:999px;transition:background .25s,border-color .25s;'+(dark?'color:#F7EEE2;border:1px solid rgba(240,199,156,.48);background:linear-gradient(135deg,rgba(216,158,112,.34) 0%,rgba(184,122,75,.22) 55%,rgba(152,94,56,.18) 100%);box-shadow:inset 0 1px 0 rgba(255,240,220,.38),0 10px 30px rgba(0,0,0,.35);':'color:#1D2739;border:1px solid rgba(152,94,56,.38);background:linear-gradient(135deg,rgba(216,158,112,.26) 0%,rgba(184,122,75,.13) 55%,rgba(255,255,255,.22) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 -1px 0 rgba(152,94,56,.14),0 8px 24px rgba(152,94,56,.16);')+'backdrop-filter:blur(10px) saturate(1.3);-webkit-backdrop-filter:blur(10px) saturate(1.3);}',
'.emh-sub .ok{font-size:13px;font-weight:600;color:'+P.accent+';margin:0;}',
'.emh-foot-links a{color:'+P.soft+';text-decoration:none;}',
'.emh-foot-links a:hover{color:'+P.copper+';}',
'.emh-foot-legal{font-size:11.5px;color:'+P.stone+';line-height:1.6;max-width:72ch;text-wrap:balance;}',
/* Keyboard focus, which the bar had none of: the links, the Shop button,
   the burger and the bag were all reachable by tab and showed nothing when
   they got there. */
'#emh a:focus-visible,#emh button:focus-visible,.emh-menu a:focus-visible,.emh-menu button:focus-visible,.emh-foot a:focus-visible,.emh-foot button:focus-visible,.emh-foot input:focus-visible{outline:2px solid '+P.copper+';outline-offset:2px;border-radius:2px;}',
/* The 3px nudge on .emh-utils exists to sit Bag on the same line as the nav
   links, which are themselves 3px below the logo. That trade is right on a
   desktop. Below 840 the links are hidden, so the nudge buys nothing and
   costs the only alignment left - Bag against the wordmark. Clay spotted it. */
'@media(max-width:840px){.emh-links{display:none;}.emh-burger{display:flex;}.emh-utils a[href="#"]:not(.bag){display:none;}.emh-in{height:60px;}.emh-logo{height:30px;}.emh-utils{transform:none;}}'
].join('\n');

function boot(){
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var holder=document.createElement('div');holder.innerHTML=SPRITE;document.body.insertBefore(holder.firstChild,document.body.firstChild);

  /* The bar used to be dropped entirely on /quiz/, because its call to action
     is the quiz and pointing someone at the page they are already on is silly.
     But dropping it changed the chrome: the header is the same 71px everywhere,
     and losing the 39px band above it made the whole page jump and the cream
     band disappear on the one click between Shop and Start Here. Same bar on
     every page; only the sentence inside it changes. */
  var isQuiz=location.pathname.indexOf('/quiz')===0;
  var ann=isQuiz
    ? {say:'Not sure where to start?', more:' Every piece here is chosen for how you want to feel.',
       cta:'Shop by Intention \u2192', href:'/intention/'}
    : {say:'New to Energy Muse?', more:' Find your energy match in a few simple questions.',
       cta:'Take the Energy Quiz \u2192', href:'/quiz/'};
  var dismissed=false;try{dismissed=sessionStorage.getItem('em-ann')==='off';}catch(e){}
  var frag=document.createElement('div');frag.id='emh';
  frag.innerHTML=
    (!dismissed?'<div class="emh-ann"><div class="emh-ann-in"><span>'+ann.say+'<span class="emh-ann-more">'+ann.more+'</span></span><a href="'+ann.href+'">'+ann.cta+'</a><button class="emh-annx" aria-label="Dismiss">\u00d7</button></div></div>':'')
    +'<header class="emh-nav"><div class="emh-in">'
    +'<a class="emh-brand" href="/"><svg class="emh-logo" viewBox="0 0 1167 247.5" role="img" aria-label="Energy Muse"><use href="#em-logo-hdr"/></svg></a>'
    +'<nav class="emh-links">'
    +'<span class="emh-shop"><button type="button" aria-expanded="false" aria-haspopup="true">Shop</button>'
    +'<span class="emh-panel">'
    +'<a href="/shop/">Everything</a><span class="sep"></span>'
    +'<a href="/shop/?cat=Crystal">Crystals</a>'
    +'<a href="/shop/?cat=Jewelry">Jewelry</a>'
    +'<a href="/shop/?cat=Frequency">Frequency</a>'
    +'<a href="/shop/?cat=Kit%7CSystem">Kits &amp; Sets</a>'
    +'</span></span>'
    +'<a href="/intention/">By Intention</a><a href="/learn/">Learn</a>'
    +'<a href="/try/">Try It</a></nav>'
    /* Search was <a href="#">, wired to nothing, on every page of the site — a
       control in the primary nav that silently did nothing when clicked. Gone
       until there is something to search: product pages will give every item
       its own URL, and that index is what a real search needs to point at. */
    +'<div class="emh-utils"><a href="#" class="bag">Bag (0)</a>'
    +'<button class="emh-burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button></div>'
    +'</div></header>';
  document.body.insertBefore(frag,document.body.firstChild.nextSibling);

  var menu=document.createElement('div');menu.className='emh-menu';menu.setAttribute('role','dialog');menu.setAttribute('aria-modal','true');menu.setAttribute('aria-label','Menu');
  menu.innerHTML='<div class="emh-menu-top"><svg class="emh-logo" viewBox="0 0 1167 247.5" aria-label="Energy Muse"><use href="#em-logo-hdr"/></svg><button class="emh-close" aria-label="Close menu">×</button></div>'
    /* Four primary, matching the desktop bar. About drops into a quieter
       second tier alongside the two destinations this menu never carried at
       all — so the mobile menu stops being a different set of links from the
       one the header shows, and stops differing from the homepage's own. */
    +'<nav><a href="/shop/">Shop</a>'
    +'<a href="/intention/">By Intention</a><a href="/learn/">Learn</a>'
    +'<a href="/try/">Try It</a></nav>'
    /* the four categories, flat - a panel that has to be opened is worth it
       on a bar with no room, and pointless inside a menu that is already a
       list */
    +'<div class="emh-menu-cats"><a href="/shop/?cat=Crystal">Crystals</a>'
    +'<a href="/shop/?cat=Jewelry">Jewelry</a>'
    +'<a href="/shop/?cat=Frequency">Frequency</a>'
    +'<a href="/shop/?cat=Kit%7CSystem">Kits &amp; Sets</a></div>'
    +'<div class="emh-menu-sec"><a href="/heather/">With Heather</a><a href="/veza/">Veza</a><a href="/about/">About</a></div>'
    /* Search and Bag live in the menu now, not in the header bar. The
       homepage's own menu already had this row; this is the shared one
       catching up, so the two menus finally carry the same things. */
    +'<div class="emh-menu-foot"><a href="#" class="bag">Bag (0)</a></div>';
  document.body.appendChild(menu);

  /* A page that already has a footer of its own keeps it. Until now nothing
     needed this, because every page loading em-header had no footer - but the
     homepage does, and its footer is the fuller one: four link columns and the
     brand mark against this module's single flat row. Injecting ours as well
     would have given that page two. */
  if(!document.querySelector('footer')){
  var foot=document.createElement('footer');foot.className='emh-foot';
  foot.innerHTML='<div class="emh-foot-in">'
    +'<svg class="emh-logo" viewBox="0 0 1167 247.5" aria-label="Energy Muse"><use href="#em-logo-hdr"/></svg>'
    +'<div class="emh-sub"><h3>Let&rsquo;s stay connected</h3>'
      +'<p>New practices, founder guidance, product education, and early access — sent with intention, never noise.</p>'
      +'<form novalidate><input type="email" placeholder="you@email.com" aria-label="Email address" required>'
      +'<button type="submit">Join</button></form></div>'
    /* Six links that predate most of the site: no route to the shop at all, and
       "Frequency" pointed at /generator/, which is the film rather than the
       page that sells the devices. */
    +'<div class="emh-foot-social"><span>@energymuse</span>'
    +'<a href="https://www.instagram.com/energymuse/" target="_blank" rel="noopener" aria-label="Energy Muse on Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg></a><a href="https://www.tiktok.com/@energymuse" target="_blank" rel="noopener" aria-label="Energy Muse on TikTok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M13.5 3v11.2a3.3 3.3 0 1 1-3.3-3.3"/><path d="M13.5 3c.4 2.6 2.2 4.4 4.8 4.8"/></svg></a><a href="https://www.youtube.com/user/EnergyMuse" target="_blank" rel="noopener" aria-label="Energy Muse on YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none"/></svg></a>'
    +'</div>'
    +'<div class="emh-foot-links">'
    +'<a href="/shop/">Shop</a><a href="/jewelry/">Jewelry</a><a href="/gems/">Crystals</a>'
    +'<a href="/frequency/">Frequency</a><a href="/sets/">Kits &amp; Sets</a>'
    +'<a href="/intention/">By Intention</a><a href="/quiz/">Energy Quiz</a>'
    +'<a href="/try/">Try It</a><a href="/frequency-room/">Frequency Room</a>'
    +'<a href="/learn/">Learn</a><a href="/blog/">Journal</a><a href="/faq/">FAQ</a>'
    +'<a href="/about/">About</a><a href="/support/">Support</a></div>'
    +'<p class="emh-foot-legal">© 2026 Energy Muse. Energy Muse products and content are intended for personal practice and general wellbeing. They are not medical devices and are not intended to diagnose, treat, cure or prevent any disease. Individual experiences vary.</p>'
    +'</div>';
  document.body.appendChild(foot);

  /* inside the guard: foot only exists when we built it */
  var sf=foot.querySelector('.emh-sub form');
  if(sf)sf.addEventListener('submit',function(e){
    e.preventDefault();
    var i=sf.querySelector('input');
    if(!i||!i.value||i.value.indexOf('@')<0){i&&i.focus();return;}
    sf.parentNode.innerHTML='<p class="ok">Thank you — check your inbox to confirm.</p>';
  });
  }

  var annx=frag.querySelector('.emh-annx');
  if(annx)annx.addEventListener('click',function(){
    frag.querySelector('.emh-ann').style.display='none';
    try{sessionStorage.setItem('em-ann','off');}catch(e){}
  });
  var burger=frag.querySelector('.emh-burger'),close=menu.querySelector('.emh-close');
  /* the Shop panel: click to open, click away or Escape to close */
  var shop=document.querySelector('.emh-shop');
  if(shop){
    var sb=shop.querySelector('button');
    var setShop=function(o){
      shop.classList.toggle('open',o);
      sb.setAttribute('aria-expanded',o?'true':'false');
    };
    sb.addEventListener('click',function(e){
      e.stopPropagation();
      setShop(!shop.classList.contains('open'));
    });
    document.addEventListener('click',function(e){
      if(!shop.contains(e.target))setShop(false);
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape')setShop(false);
    });
  }

  function set(o){menu.classList.toggle('open',o);document.body.classList.toggle('emh-open',o);
    document.documentElement.style.overflow=o?'hidden':'';
    burger.setAttribute('aria-expanded',o?'true':'false');}
  burger.addEventListener('click',function(){set(true);});
  close.addEventListener('click',function(){set(false);});
  menu.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
}
/* Filter rows scroll sideways on a phone rather than wrapping to three lines.
   That left the selected chip off-screen when it sat past the fold: tapping
   "Kits & Sets" filtered the grid and the only thing confirming it was the
   count line, because the chip that went dark was 180px to the right. Delegated
   so it covers every one of these rows without each page repeating it, and it
   only ever scrolls the row itself - block:'nearest' keeps the page still. */
function keepChipInView(){
  var ROWS='.sfilter,.ssub,.ifilter,.jfilter,.jump,.tabs,.sizes';
  document.addEventListener('click',function(e){
    var row=e.target.closest&&e.target.closest(ROWS); if(!row)return;
    if(row.scrollWidth<=row.clientWidth+1)return;
    var chip=e.target.closest('button,a'); if(!chip||!row.contains(chip))return;
    if(chip.scrollIntoView)chip.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});
  },true);

  /* Clicking is not the only way a chip becomes the selected one: /shop/ reads
     ?cat= and ?sub= out of the URL and paints them selected at load, and a link
     to ?cat=Crystal&sub=Points arrived with the live chip 130px past the right
     edge of the row. The pages paint from an inline script, which runs before
     this deferred one, so the selected chip already exists by the time this
     runs. No smooth scroll here - nothing moved, so there is nothing to follow. */
  [].forEach.call(document.querySelectorAll(ROWS),function(row){
    if(row.scrollWidth<=row.clientWidth+1)return;
    var on=row.querySelector('.on,[aria-pressed="true"],[aria-current]');
    if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest',inline:'nearest'});
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){boot();keepChipInView();});
else {boot();keepChipInView();}
})();
