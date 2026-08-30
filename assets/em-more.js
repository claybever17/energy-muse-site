/* em-more.js — show a page of products, then the rest on request.

   /shop/ renders 122 products into a two-column phone grid, which is 23.5
   screens of scrolling and 123 images fetched before the reader has decided
   anything. /intention/ is 105, /gems/ 67, /jewelry/ 33. Narrowing the columns
   was the obvious answer and the wrong one: at three-up the cards are 110px
   and a name like "Rhodonite Crystal Point Necklace" runs to five lines, which
   is the cramping we spent a week taking out of the founder cards. It also
   only reaches 15.3 screens, which is still too long.

   The column count was never the problem. Rendering the whole catalogue at
   once was. Twenty-four to begin with - twelve rows on a phone, five on a
   desktop - and the rest a tap away.

   Every grid on the site renders the same way: host.innerHTML = list.map(fn).
   So this takes the same three arguments and each page changes one line. */
(function () {
  'use strict';

  var PAGE = 24;

  var CSS =
    '.em-more{display:flex;flex-direction:column;align-items:center;gap:10px;' +
      'margin-top:clamp(26px,3.4vw,40px)}' +
    '.em-more-btn{font-family:var(--sans);font-weight:600;font-size:12px;letter-spacing:.14em;' +
      'text-transform:uppercase;color:var(--ink);background:var(--surface);' +
      'border:1px solid var(--hair);border-radius:999px;padding:0 30px;min-height:48px;' +
      'cursor:pointer;transition:border-color .2s,color .2s}' +
    '.em-more-btn:hover{border-color:var(--copper);color:var(--copper)}' +
    '.em-more-btn:focus-visible{outline:2px solid var(--copper);outline-offset:2px}' +
    '.em-more-count{font-family:var(--sans);font-size:12px;color:var(--stone);margin:0}' +
    '.em-more-done{font-family:var(--sans);font-size:12px;color:var(--stone);margin:0;' +
      'padding:14px 0}' +
    '.em-more-done:focus{outline:none}';

  function styles() {
    if (document.getElementById('em-more-css')) return;
    var s = document.createElement('style');
    s.id = 'em-more-css'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* host: the grid. list: every item that passed the filter. card: item -> html.
     Called fresh on every filter and sort change, so the page always reopens at
     the first twenty-four rather than wherever the reader had got to. */
  function paint(host, list, card) {
    styles();
    var shown = Math.min(PAGE, list.length);
    host.innerHTML = list.slice(0, shown).map(card).join('');

    var tray = host.nextElementSibling;
    if (!tray || !tray.classList || !tray.classList.contains('em-more')) {
      tray = document.createElement('div');
      tray.className = 'em-more';
      host.parentNode.insertBefore(tray, host.nextSibling);
    }
    tray.innerHTML = '';
    if (shown >= list.length) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'em-more-btn';
    var count = document.createElement('p');
    count.className = 'em-more-count';
    /* polite, because the reader asked for this - it should not interrupt them */
    count.setAttribute('aria-live', 'polite');

    function label() {
      var left = list.length - shown;
      btn.textContent = 'Load ' + Math.min(PAGE, left) + ' more';
      count.textContent = shown + ' of ' + list.length;
    }
    label();

    btn.addEventListener('click', function () {
      var from = shown;
      shown = Math.min(shown + PAGE, list.length);
      /* append rather than re-render, so nothing already on screen is rebuilt
         under the reader and no image is fetched twice */
      var frag = document.createElement('div');
      frag.innerHTML = list.slice(from, shown).map(card).join('');
      while (frag.firstChild) host.appendChild(frag.firstChild);

      if (shown >= list.length) {
        /* Removing the button would drop keyboard focus to the top of the
           document. It is replaced in place by a line that takes the focus. */
        var done = document.createElement('p');
        done.className = 'em-more-done';
        done.setAttribute('tabindex', '-1');
        done.textContent = 'All ' + list.length + ' shown';
        tray.innerHTML = '';
        tray.appendChild(done);
        done.focus();
      } else {
        label();
      }
    });

    tray.appendChild(btn);
    tray.appendChild(count);
  }

  window.EM_MORE = { paint: paint, pageSize: PAGE };
})();
