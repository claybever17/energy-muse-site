/* em-search.js — site search.

   The nav used to carry a "Search" link that was <a href="#">, wired to
   nothing, on every page. It was removed rather than left lying there. This
   puts it back, working — and it INJECTS its own control, so the button can
   only exist when the thing behind it does. A dead control is worse than no
   control, and that is not a mistake worth making twice.

   The index is em-catalog.js plus the written pages listed below. Neither is
   loaded until the first time somebody opens search: a shopper who never
   searches never pays for it.

   Keyboard: / or Cmd/Ctrl-K opens, Escape closes, Up/Down walks the results,
   Enter follows the highlighted one. */
(function () {
  'use strict';

  /* The written pages. Products come from the catalogue; these do not exist
     there, and they are most of what people actually search for by word —
     "sizing", "cleansing", "how do I choose". */
  var PAGES = [
    { t: 'Learning Center', u: '/learn/', k: 'learn guides education beginner new first steps basics how to choose start crystal stones meanings shapes cleansing clearing care point cluster tumbled pyramid frequency generator hz placement fixed variable room seven jewelry bracelet sizing size stacking elastic wrist measure', c: 'Guide' },
    { t: 'FAQs', u: '/faq/', k: 'faq questions answers help water sunlight medical returns care', c: 'Guide' },
    { t: 'The Energy Quiz', u: '/quiz/', k: 'quiz match recommendation personalised personalized find what do i need', c: 'Tool' },
    { t: 'Design a Bracelet', u: '/designer/', k: 'atelier design custom build your own bracelet beads rondelle make', c: 'Tool' },
    { t: 'Build a Box of Crystals', u: '/box/', k: 'box build your own crystals kit custom curate', c: 'Tool' },
    { t: 'The Frequency Room', u: '/frequency/#tune', k: 'frequency room try dial tune listen demo', c: 'Tool' },
    { t: 'Shop', u: '/shop/', k: 'shop all products browse buy', c: 'Shop' },
    { t: 'Jewelry', u: '/jewelry/', k: 'jewelry bracelets necklaces anklets wear', c: 'Shop' },
    { t: 'Crystals', u: '/gems/', k: 'crystals stones gems specimens collection', c: 'Shop' },
    { t: 'Frequency Generators', u: '/frequency/', k: 'frequency generators devices hz shop', c: 'Shop' },
    { t: 'Kits & Sets', u: '/sets/', k: 'kits sets bundles ritual curated gift', c: 'Shop' },
    { t: 'Frequency Systems', u: '/systems/', k: 'systems formula copper plate pyramid bundle harmonious restorative', c: 'Shop' },
    { t: 'Shop by Intention', u: '/intention/', k: 'intention calm clarity protection abundance connection feeling', c: 'Shop' },
    { t: 'About Energy Muse', u: '/about/', k: 'about story heather founders who we are', c: 'About' },
    { t: 'Personal Sessions with Heather', u: '/heather/', k: 'heather session personal guidance consultation book', c: 'About' },
    { t: 'Support', u: '/support/', k: 'support help contact question problem order', c: 'About' }
  ];

  var idx = null, loading = null;
  var el = {}, results = [], cursor = -1, lastFocus = null;

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  /* Built once, on first open. em-frequencies must be in place before the
     catalogue, because the catalogue folds the generators in from it. */
  function buildIndex() {
    if (idx) return Promise.resolve(idx);
    if (loading) return loading;
    var need = [];
    if (!window.EM_FREQ) need.push('/assets/em-frequencies.js?v=2');
    if (!window.EM_CATALOG) need.push('/assets/em-catalog.js?v=1');
    loading = need.reduce(function (p, src) {
      return p.then(function () { return loadScript(src); });
    }, Promise.resolve()).then(function () {
      var rows = PAGES.map(function (p) {
        return { title: p.t, url: p.u, cat: p.c, sub: '', hay: (p.t + ' ' + p.k).toLowerCase() };
      });
      if (window.EM_CATALOG) {
        window.EM_CATALOG.all().forEach(function (p) {
          rows.push({
            title: p.name, url: '/product/?id=' + encodeURIComponent(p.id),
            cat: p.cat, sub: '$' + p.price.toFixed(2), img: p.img,
            hay: (p.name + ' ' + p.cat + ' ' + (p.group || '') + ' ' + (p.desc || '')).toLowerCase()
          });
        });
      }
      idx = rows;
      return idx;
    })['catch'](function () { idx = PAGES.map(function (p) {
        return { title: p.t, url: p.u, cat: p.c, sub: '', hay: (p.t + ' ' + p.k).toLowerCase() };
      }); return idx; });
    return loading;
  }

  function score(row, terms) {
    var t = row.title.toLowerCase(), total = 0;
    for (var i = 0; i < terms.length; i++) {
      var q = terms[i];
      if (t === q) total += 100;
      else if (t.indexOf(q) === 0) total += 60;
      else if (t.indexOf(q) > -1) total += 40;
      else if (row.hay.indexOf(q) > -1) total += 12;
      else return 0;                    /* every term has to land somewhere */
    }
    return total;
  }

  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !idx) return [];
    return idx.map(function (r) { return { r: r, s: score(r, terms) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s || a.r.title.length - b.r.title.length; })
      .slice(0, 8).map(function (x) { return x.r; });
  }

  function render() {
    var q = el.input.value.trim();
    results = search(q); cursor = results.length ? 0 : -1;
    if (!q) {
      el.list.innerHTML = '';
      el.hint.textContent = 'Products, guides and pages.';
      el.live.textContent = '';
      return;
    }
    if (!results.length) {
      el.list.innerHTML = '';
      el.hint.innerHTML = 'Nothing matched &ldquo;' + esc(q) + '&rdquo;. Try a stone, a frequency, or a word like sizing or cleansing.';
      el.live.textContent = 'No results';
      return;
    }
    el.hint.textContent = '';
    el.list.innerHTML = results.map(function (r, i) {
      return '<a class="ems-hit' + (i === 0 ? ' on' : '') + '" href="' + r.url + '" data-i="' + i + '">'
        + (r.img ? '<span class="ems-im"><img src="' + r.img + '" alt="" loading="lazy"></span>'
                 : '<span class="ems-im ems-none"></span>')
        + '<span class="ems-t">' + esc(r.title) + '</span>'
        + '<span class="ems-c">' + esc(r.cat) + (r.sub ? ' &middot; ' + r.sub : '') + '</span></a>';
    }).join('');
    el.live.textContent = results.length + (results.length === 1 ? ' result' : ' results');
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function move(d) {
    if (!results.length) return;
    cursor = (cursor + d + results.length) % results.length;
    [].forEach.call(el.list.children, function (a, i) { a.classList.toggle('on', i === cursor); });
    var on = el.list.children[cursor];
    if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' });
  }

  function open() {
    lastFocus = document.activeElement;
    el.wrap.classList.add('on');
    el.wrap.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    el.input.value = ''; render();
    buildIndex().then(render);
    setTimeout(function () { el.input.focus(); }, 30);
  }
  function close() {
    el.wrap.classList.remove('on');
    el.wrap.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  var CSS = [
    '.ems-open{background:none;border:0;padding:0;cursor:pointer;font:500 12.5px "Instrument Sans",sans-serif;letter-spacing:.04em;color:#4E5A70;}',
    /* same thumb-sized hit area as the rest of the header row */
    '@media (max-width:840px){.ems-open{min-height:44px;display:inline-flex;align-items:center;padding:0 10px;}}',
    '.ems-open:hover{color:#A9683E;}',
    /* The word costs 63px in a 390px bar that already carries a logo, a bag
       and a burger — four controls with 6px between them. A magnifier is the
       glyph people look for anyway, and it hands ~40px back to the row.

       Only the button in the header swaps. The one in the homepage's mobile
       menu sits in a text row beside "Bag (0)" and stays a word, which is why
       the icon is scoped to .ems-open-bar rather than to .ems-open. */
    '.ems-ico{display:none;width:20px;height:20px;flex:none;}',
    '.ems-open-bar{color:#4E5A70;}',
    /* The header bar drops Search entirely on mobile — it lives in the
       hamburger, where both menus now carry it. The icon stays defined
       because the desktop bar still shows the word, and because putting it
       back in the bar is then one line rather than a rewrite. */
    /* Two classes, not one, and it matters: em-header.js sets
       ".emh-utils button{display:inline-flex}" inside the same breakpoint,
       which is specificity (0,1,1) and beats a bare ".ems-open-bar" (0,1,0)
       however late it appears. The bar kept its Search button and the rule
       looked like it simply had not loaded. */
    '@media (max-width:840px){ .emh-utils .ems-open-bar,.nav-utils .ems-open-bar{display:none;} }',
    '.ems-wrap{position:fixed;inset:0;z-index:400;display:none;}',
    '.ems-wrap.on{display:block;}',
    '.ems-veil{position:absolute;inset:0;background:rgba(11,19,32,.42);backdrop-filter:blur(3px);}',
    '.ems-panel{position:relative;max-width:660px;margin:min(12vh,110px) auto 0;background:#FBF8F2;',
    '  border:1px solid #EAE3D6;border-radius:8px;box-shadow:0 30px 70px rgba(11,19,32,.28);overflow:hidden;}',
    '.ems-top{display:flex;align-items:center;gap:12px;padding:16px 18px;border-bottom:1px solid #EAE3D6;}',
    '.ems-top svg{flex:none;width:17px;height:17px;stroke:#8D8778;fill:none;stroke-width:1.7;}',
    '.ems-in{flex:1;border:0;background:transparent;font:400 17px "Instrument Sans",sans-serif;color:#1D2739;}',
    /* the bare input keeps no ring of its own - the whole row takes it instead,
   which is what a reader actually sees as the focused thing */
'.ems-in:focus{outline:none;}',
'.ems-top:focus-within{box-shadow:inset 0 0 0 2px #8F5330;}',
'.ems-esc:focus-visible,.ems-hit:focus-visible{outline:2px solid #8F5330;outline-offset:-2px;}',
    '.ems-in::placeholder{color:#8D8778;}',
    '.ems-esc{font:600 10px "Instrument Sans",sans-serif;letter-spacing:.14em;text-transform:uppercase;',
    '  color:#8D8778;border:1px solid #EAE3D6;border-radius:4px;padding:5px 8px;background:#fff;cursor:pointer;}',
    '.ems-body{max-height:min(56vh,460px);overflow:auto;}',
    '.ems-hint{padding:20px 18px;font:400 14px "Instrument Sans",sans-serif;color:#8D8778;}',
    '.ems-hit{display:grid;grid-template-columns:40px 1fr auto;gap:13px;align-items:center;',
    '  padding:11px 18px;text-decoration:none;color:inherit;border-bottom:1px solid #F1EADD;}',
    '.ems-hit.on{background:#F4EFE5;}',
    '.ems-im{width:40px;height:40px;border-radius:4px;background:#F4EFE5;display:grid;place-items:center;overflow:hidden;}',
    '.ems-im img{width:100%;height:100%;object-fit:contain;padding:3px;}',
    '.ems-im.ems-none{background:#F4EFE5;}',
    '.ems-t{font:600 14.5px "Instrument Sans",sans-serif;color:#1D2739;}',
    '.ems-c{font:600 10px "Instrument Sans",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8D8778;white-space:nowrap;}',
    '.ems-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
    '@media (max-width:560px){.ems-panel{margin:0;max-width:none;height:100%;border-radius:0;border:0;}',
    '  .ems-body{max-height:calc(100% - 58px);}}'
  ].join('');

  function boot() {
    /* .emh-utils is the shared header. .nav-utils is the homepage, which has
       its own hand-built nav — and which kept a dead href="#" Search long
       after the shared one was fixed, because the fix only reached pages
       using the shared header. */
    var utils = document.querySelector('.emh-utils, .nav-utils');
    if (!utils) return false;

    var st = document.createElement('style'); st.textContent = CSS;
    document.head.appendChild(st);

    var ICON = '<svg class="ems-ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">'
      + '<circle cx="11" cy="11" r="6.6" stroke="currentColor" stroke-width="1.7"/>'
      + '<path d="M16.1 16.1 21 21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'ems-open ems-open-bar';
    btn.innerHTML = ICON + '<span class="ems-lbl">Search</span>';
    /* the icon carries no text, so the label has to come from here */
    btn.setAttribute('aria-label', 'Search Energy Muse');
    btn.setAttribute('title', 'Search');
    utils.insertBefore(btn, utils.firstChild);

    /* Both mobile menus carry a footer row now — the homepage's .mobmenu-foot
       and the shared header's .emh-menu-foot — and on mobile this is the only
       way to reach search, so it mounts into every one it finds rather than
       the first. */
    var feet = document.querySelectorAll('.mobmenu-foot, .emh-menu-foot');
    Array.prototype.forEach.call(feet, function (foot) {
      var mb = document.createElement('button');
      mb.type = 'button'; mb.className = 'ems-open'; mb.textContent = 'Search';
      mb.setAttribute('aria-label', 'Search Energy Muse');
      foot.insertBefore(mb, foot.firstChild);
      mb.addEventListener('click', function () {
        /* close whichever menu this row belongs to before opening search */
        var mm = document.getElementById('mobmenu');
        if (mm) mm.classList.remove('open');
        document.body.classList.remove('menu-open');
        var em = document.querySelector('.emh-menu');
        if (em) em.classList.remove('open');
        document.body.classList.remove('emh-open');
        open();
      });
    });

    var wrap = document.createElement('div');
    wrap.className = 'ems-wrap'; wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', 'Search');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<div class="ems-veil"></div>'
      + '<div class="ems-panel">'
      + '<div class="ems-top">'
      + '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/></svg>'
      + '<input class="ems-in" type="search" placeholder="Search products, guides and pages" '
      + 'aria-label="Search" autocomplete="off" spellcheck="false">'
      + '<button class="ems-esc" type="button">Esc</button>'
      + '</div>'
      + '<div class="ems-body"><p class="ems-hint"></p><div class="ems-list"></div></div>'
      + '<p class="ems-sr" role="status" aria-live="polite"></p>'
      + '</div>';
    document.body.appendChild(wrap);

    el = { wrap: wrap, input: wrap.querySelector('.ems-in'), list: wrap.querySelector('.ems-list'),
           hint: wrap.querySelector('.ems-hint'), live: wrap.querySelector('.ems-sr') };

    btn.addEventListener('click', open);
    wrap.querySelector('.ems-veil').addEventListener('click', close);
    wrap.querySelector('.ems-esc').addEventListener('click', close);
    el.input.addEventListener('input', render);
    el.input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter' && results[cursor]) { e.preventDefault(); location.href = results[cursor].url; }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
    });
    document.addEventListener('keydown', function (e) {
      var open_ = wrap.classList.contains('on');
      if (open_ && e.key === 'Escape') { close(); return; }
      if (open_) return;
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || '')) || e.target.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(); }
      else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); open(); }
    });
    return true;
  }

  /* em-header injects the nav on DOMContentLoaded, and this may land first.
     Try, then keep trying briefly rather than racing it. */
  function start() {
    if (boot()) return;
    var n = 0;
    var t = setInterval(function () {
      if (boot() || ++n > 40) clearInterval(t);
    }, 50);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
