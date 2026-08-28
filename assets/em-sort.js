/* em-sort.js — one sort control, for every grid that has one.

   Their shop sorts and ours did not, which was the most visible gap left
   against energymuse.com. Both of our grids had a hardcoded
   .sort(a.price - b.price) buried in paint(), so the shop opened on its
   cheapest twenty and there was no way for a reader to say otherwise.

   Four orders, and only four, because four is all the data honestly supports.
   Shopify offers best-selling and newest as well; we have no sales figures and
   no dates, and inventing either in front of a client is worse than not
   offering the sort.

   The mode lives in ?sort=, the same way ?cat= and ?feel= already do on these
   pages, so a sorted shop is a link somebody can send. The default is left out
   of the URL rather than written into it.

   Mount it with the element showing the result count and it lays that count
   and itself out on one row; call apply() wherever the old .sort() was. */
(function () {
  'use strict';

  var MODES = [
    ['featured',   'Featured'],
    ['price-asc',  'Price: Low to High'],
    ['price-desc', 'Price: High to Low'],
    ['name',       'Name: A–Z']
  ];
  var DEFAULT = 'featured', PARAM = 'sort', sel = null;

  function known(k) {
    for (var i = 0; i < MODES.length; i++) if (MODES[i][0] === k) return k;
    return DEFAULT;
  }
  function read() {
    try { return known(new URLSearchParams(location.search).get(PARAM) || ''); }
    catch (e) { return DEFAULT; }
  }
  var mode = read();

  function write(k) {
    try {
      var u = new URL(location.href);
      if (k === DEFAULT) u.searchParams.delete(PARAM); else u.searchParams.set(PARAM, k);
      history.replaceState(null, '', u.pathname + (u.search || '') + u.hash);
    } catch (e) {}
  }

  /* "Featured" cannot mean the catalogue's own order. em-catalog.js is written
     cheapest-first, so that would open the shop on twenty tumbled stones
     between $3.88 and $9.88 — the bargain-bin row already taken off the
     homepage twice. It is a round-robin across the categories instead, each
     keeping its own internal order, so the first row carries a bracelet, a
     stone, a generator and a kit: what the shop sells rather than what is
     cheapest in it. Deterministic, and invented out of nothing but the data. */
  function featured(list) {
    var order = [], bucket = {};
    list.forEach(function (p) {
      var k = p.cat || '';
      if (!bucket[k]) { bucket[k] = []; order.push(k); }
      bucket[k].push(p);
    });
    var out = [], deepest = 0, i;
    for (i = 0; i < order.length; i++) deepest = Math.max(deepest, bucket[order[i]].length);
    for (var row = 0; row < deepest; row++)
      for (var c = 0; c < order.length; c++)
        if (bucket[order[c]][row]) out.push(bucket[order[c]][row]);
    return out;
  }

  function apply(list) {
    var a = (list || []).slice();
    if (mode === 'price-asc') a.sort(function (x, y) { return x.price - y.price; });
    else if (mode === 'price-desc') a.sort(function (x, y) { return y.price - x.price; });
    else if (mode === 'name') a.sort(function (x, y) {
      return String(x.name || '').localeCompare(String(y.name || ''));
    });
    else a = featured(a);
    /* Whatever the order asked for, nothing unavailable comes first. A sold-out
       card cannot be bought, and a screen of them reads as an empty shop. */
    return a.filter(function (p) { return p.stock !== 'out'; })
            .concat(a.filter(function (p) { return p.stock === 'out'; }));
  }

  var CSS =
    '.emsort-row{display:flex;align-items:baseline;justify-content:space-between;' +
      'gap:12px 20px;flex-wrap:wrap}' +
    '.emsort-row > .scount,.emsort-row > .icount{margin-top:16px;flex:1 1 auto;min-width:0}' +
    '.emsort{display:inline-flex;align-items:center;gap:9px;flex:0 0 auto;margin-top:16px;' +
      'font-family:var(--sans);font-size:10.5px;font-weight:600;letter-spacing:.16em;' +
      'text-transform:uppercase;color:var(--stone)}' +
    '.emsort select{font-family:var(--sans);font-size:13px;font-weight:500;letter-spacing:0;' +
      'text-transform:none;color:var(--ink);background-color:var(--surface);' +
      'border:1px solid var(--hair);border-radius:4px;padding:10px 32px 10px 12px;' +
      'min-height:44px;cursor:pointer;appearance:none;-webkit-appearance:none;' +
      'background-image:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1.5 6 6.5 11 1.5\' fill=\'none\' stroke=\'%238D8778\' stroke-width=\'1.6\' stroke-linecap=\'round\'/%3E%3C/svg%3E");' +
      'background-repeat:no-repeat;background-position:right 12px center;background-size:11px 7px;' +
      'transition:border-color .2s}' +
    '.emsort select:hover{border-color:var(--copper)}' +
    '.emsort select:focus-visible{outline:2px solid var(--copper);outline-offset:2px}' +
    /* On a phone the count and the control stop competing for one line: the
       count keeps the left, the control takes the row under it, full width and
       still a 44px target. */
    '@media (max-width:560px){' +
      '.emsort-row{gap:8px 12px}' +
      '.emsort-row > .scount,.emsort-row > .icount{flex:1 0 100%;margin-top:14px}' +
      '.emsort{flex:1 0 100%;margin-top:0}' +
      '.emsort select{flex:1 1 auto}' +
    '}';

  function styles() {
    if (document.getElementById('em-sort-css')) return;
    var s = document.createElement('style');
    s.id = 'em-sort-css'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* `count` is the element already showing "115 pieces across the shop"; it is
     moved into a row beside the control rather than duplicated. */
  function mount(opts) {
    opts = opts || {};
    var count = opts.count;
    if (!count || !count.parentNode) return null;
    styles();

    var row = document.createElement('div');
    row.className = 'emsort-row';
    count.parentNode.insertBefore(row, count);
    row.appendChild(count);

    var label = document.createElement('label');
    label.className = 'emsort';
    var span = document.createElement('span');
    span.textContent = 'Sort';
    label.appendChild(span);

    sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Sort products');
    MODES.forEach(function (m) {
      var o = document.createElement('option');
      o.value = m[0]; o.textContent = m[1];
      if (m[0] === mode) o.selected = true;
      sel.appendChild(o);
    });
    label.appendChild(sel);
    row.appendChild(label);

    sel.addEventListener('change', function () {
      mode = known(sel.value);
      write(mode);
      if (opts.onChange) opts.onChange(mode);
    });
    return sel;
  }

  /* Registered before the page's own inline script, so when the reader goes
     back the mode is already current by the time the page repaints. */
  window.addEventListener('popstate', function () {
    var m = read();
    if (m === mode) return;
    mode = m;
    if (sel) sel.value = m;
  });

  window.EM_SORT = {
    apply: apply,
    mount: mount,
    modes: MODES,
    mode: function () { return mode; }
  };
})();
