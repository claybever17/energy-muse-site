/* em-prices.js — hold the generator prices until Energy Muse confirm them.

   Only the generators. Crystals and jewelry keep their real prices; those are
   settled. The devices are not, so rather than show a number that may be wrong
   in front of a client, their price reads $— until the switch is flipped.

       MODE = 'hold'   generator prices read $—
       MODE = 'live'   the site shows what the markup says

   Also settable per visit with ?prices=live, so the real thing can be checked
   without a deploy.

   Nothing is edited, only painted over: the underlying numbers stay in the
   markup and in em-frequencies.js, so the bag's arithmetic stays correct and
   flipping to 'live' needs no other change anywhere.

   A generator price is found by association, not by guessing at class names:
   any Add-to-Bag control whose id starts gen- marks its own card, and that
   card's price is the one held. The one exception is the generator page's own
   grid, where .gprice is unambiguous. */
(function () {
  'use strict';

  var MODE = 'hold';

  try {
    var q = new URLSearchParams(location.search).get('prices');
    if (q === 'live' || q === 'hold') MODE = q;
  } catch (e) {}

  window.EM_PRICE_MODE = MODE;
  if (MODE === 'live') return;

  var MARK = '$—';
  var MONEY = /\$\s?\d[\d,]*(?:\.\d{2})?/g;
  var PRICE_IN_CARD = '.price, .gprice, .pp, .pr, .p, [class*="price"]';

  function hold(el) {
    if (!el || el.dataset.emHeld) return;
    var t = el.textContent;
    if (!t || !/\$\s?\d/.test(t)) return;
    el.dataset.emHeld = t;
    el.textContent = t.replace(MONEY, MARK);
    el.title = 'Price to be confirmed';
  }

  function sweep() {
    /* 1. anything that adds a generator to the bag identifies its own card */
    document.querySelectorAll('[data-id^="gen-"]').forEach(function (btn) {
      var card = btn.closest('.rcard, .gen, .card, li, article, .pcard, .peek-i') || btn.parentElement;
      if (!card) return;
      card.querySelectorAll(PRICE_IN_CARD).forEach(hold);
    });
    /* 2. the generator page's grid, where the class is unambiguous */
    document.querySelectorAll('.gprice').forEach(hold);
    /* 3. the homepage promo, which sells a generator and says so in its heading */
    document.querySelectorAll('.cpromo, .promo').forEach(function (sec) {
      if (!/generator/i.test(sec.textContent || '')) return;
      sec.querySelectorAll('.price, .pp, [class*="price"]').forEach(hold);
    });
  }

  function boot() {
    sweep();
    /* the quiz and Cascade paint their generator card after this runs, and
       repaint it as the reader changes their answers */
    if (!('MutationObserver' in window)) return;
    var queued = false;
    new MutationObserver(function () {
      if (queued) return;
      queued = true;
      setTimeout(function () { queued = false; sweep(); }, 60);
    }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
