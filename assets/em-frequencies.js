/* em-frequencies.js — the generators, once.

   Every frequency on this site used to be written out wherever it was needed:
   the Cascade dial, the five intention pages, the hero marquee, the promo
   band, the quiz results. Five hardcoded copies, and they had drifted badly
   enough that we were selling a device that does not exist and three of the
   five intention pages pointed at the same generator.

   Checked against energymuse.com/pages/frequency-generators, August 2026.
   Names and purpose words are THEIRS — they are product names, not our
   copy, and must not be rewritten for tone. The `say` prose is ours and
   follows the rigorous voice: what it is and where to put it, no claims.

   SEVEN generators. Their live shop page lists six and omits 1111 Hz, so an
   earlier pass here removed it as invented — it is not. The approved copy
   (Website Copy Re-write, Part 4) states plainly: "Energy Muse offers seven
   different fixed frequency generators ... 1111Hz for manifestation mastery."
   The copy document wins. Worth one confirmation that 1111 is still stocked,
   since their own shop does not currently list it.

   The `url` slugs come from their own page. Five follow {hz}hz-frequency-generator;
   7.83 is the exception. The 639 link on their page appeared to point at the
   417 product — almost certainly a fault on their side, so ours follows the
   pattern. Worth one confirmation before launch.

   This file has no side effects beyond defining EM_FREQ — nothing is
   injected, so it is safe to load anywhere, in any order. */
(function () {
  'use strict';

  var FREQ = [
    {
      hz: '7.83', url: 'https://energymuse.com/products/7-83-hz-earth-frequency-generator', slug: 'better-sleep', id: 'gen-7.83',
      name: 'Better Sleep',
      purpose: ['Grounding', 'Nervous System Reset', 'Deep Calm'],
      cats: ['Calm', 'Wellness'],
      intention: 'calm',
      img: 'assets/img/generators/7-83.png',
      price: 99.88,
      tone: '#5E8C7A', soft: '#DDE9E3', room: '#F7F8F4',
      say: 'The Schumann resonance — the rate the planet itself keeps. The steadying one: put it where you want the room to slow down.'
    },
    {
      hz: '174', url: 'https://energymuse.com/products/174hz-frequency-generator', slug: 'tension-stress-release', id: 'gen-174',
      name: 'Tension & Stress Release',
      purpose: ['Pain Relief', 'Comfort', 'Restoration'],
      cats: ['Wellness'],
      intention: null,
      img: 'assets/img/generators/174.png',
      price: 99.88,
      tone: '#4E6070', soft: '#DCE3E9', room: '#F6F7F8',
      say: 'The lowest of the tuned tones. Kept where the body is asked to hold still for a long time — a desk, a bedside, a treatment room.'
    },
    {
      hz: '417', url: 'https://energymuse.com/products/417hz-frequency-generator', slug: 'energy-clearing', id: 'gen-417',
      name: 'Energy Clearing',
      purpose: ['Removes Negativity', 'Emotional Reset', 'Renewal'],
      cats: ['Fresh Start', 'Protection'],
      intention: 'protection',
      img: 'assets/img/generators/417.png',
      price: 99.88,
      tone: '#B0803A', soft: '#F0E3CC', room: '#FBF7EE',
      say: 'For a room that needs to start again — after an argument, a long week, a house guest. Entryways and thresholds.'
    },
    {
      hz: '528', url: 'https://energymuse.com/products/528hz-frequency-generator', slug: 'accelerates-manifestation', id: 'gen-528',
      name: 'Accelerates Manifestation',
      purpose: ['Joy', 'Magnetism', 'Heart-Opening'],
      cats: ['Wealth', 'Wellness'],
      intention: 'abundance',
      img: 'assets/img/generators/528.png',
      price: 99.88,
      tone: '#A9683E', soft: '#EBD9C9', room: '#FBF8F2',
      say: 'The best known of them, and our most asked for. The one people keep on through the working day.'
    },
    {
      hz: '639', url: 'https://energymuse.com/products/639hz-frequency-generator', slug: 'emotional-balance', id: 'gen-639',
      name: 'Emotional Balance',
      purpose: ['Connection', 'Relationship Healing', 'Harmony'],
      cats: ['Love'],
      intention: 'connection',
      img: 'assets/img/generators/639.png',
      price: 99.88,
      tone: '#B76A7C', soft: '#F2DDE2', room: '#FCF6F6',
      say: 'For the rooms people share. Kitchens, dining tables, anywhere a household actually sits together.'
    },
    {
      hz: '963', url: 'https://energymuse.com/products/963hz-frequency-generator', slug: 'mental-focus', id: 'gen-963',
      name: 'Mental Focus',
      purpose: ['Connection', 'Awareness', 'Clarity'],
      cats: ['Spirituality', 'Clarity'],
      intention: 'clarity',
      img: 'assets/img/generators/963.png',
      price: 99.88,
      tone: '#7B62A8', soft: '#E4DCEF', room: '#F9F7FC',
      say: 'The one for work that needs a quiet head. Studios, studies, and the desk you actually think at.'
    },
    {
      hz: '1111', url: 'https://energymuse.com/products/1111hz-frequency-generator', slug: 'manifestation-mastery', id: 'gen-1111',
      name: 'Manifestation Mastery',
      purpose: ['Alignment', 'Momentum', 'Manifestation'],
      cats: ['Power', 'Wealth'],
      intention: null,
      img: 'assets/img/generators/1111.png',
      price: 99.88,
      tone: '#8A6A3C', soft: '#EAE0CC', room: '#FAF8F1',
      say: 'The highest we wind, and the one people reach for at a turning point. Keep it where decisions get made.'
    }
  ];

  /* the short label the marquee and the dial use — kept separate from `name`
     because "Tension & Stress Release" cannot sit under a 64px numeral */
  var SHORT = {
    '7.83': 'Sleep', '174': 'Release', '417': 'Clearing',
    '528': 'Manifestation', '639': 'Balance', '963': 'Focus', '1111': 'Mastery'
  };

  function byHz(hz) {
    hz = String(hz);
    for (var i = 0; i < FREQ.length; i++) if (FREQ[i].hz === hz) return FREQ[i];
    return null;
  }
  function byIntention(name) {
    for (var i = 0; i < FREQ.length; i++) if (FREQ[i].intention === name) return FREQ[i];
    return null;
  }
  function short(hz) { return SHORT[String(hz)] || ''; }

  window.EM_FREQ = FREQ;
  window.EM_FREQ_BY = { hz: byHz, intention: byIntention, short: short };
})();
