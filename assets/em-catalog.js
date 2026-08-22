/* em-catalog.js — every product on the site, in one place.

   Prices used to live in the markup of whichever page happened to sell the
   thing: jewelry in eight data- attributes, crystals inside the 3D viewer's
   own array, kits and systems in two more inline lists. A price that exists in
   four files is a price that will disagree with itself. This is the one file
   it exists in now, and /product/ renders any of it from an id.

   Generators are NOT copied in here. They already have a single source in
   em-frequencies.js and are folded in at load, so that file stays the only
   place a frequency is described.

   Crystal copy is the site's own, off the /gems/ viewer. Jewelry copy is
   Energy Muse's, from their catalogue. Nothing here is invented — a made-up
   product with a made-up price has already cost this site one cleanup. */
(function () {
  'use strict';

  var ITEMS = [
  { id: "calm", name: "Agate Geode Slice", cat: "Crystal", group: "Calm", price: 48.88, img: "/assets/img/thumbs/calm.jpg", desc: "A real Energy Muse crystal, scanned in 3D. Banded, slow-formed agate — a soft visual pause for desk or shelf.", home: "/gems/", scan: true },
  { id: "protection", name: "Black Tourmaline", cat: "Crystal", group: "Protection", price: 8.88, img: "/assets/img/products/protection.png", desc: "The classic boundary crystal, scanned in 3D — striated black crystal for entries, desks and thresholds.", home: "/gems/", scan: true },
  { id: "wellness", name: "Quantum Quattro Crystal", cat: "Crystal", group: "Wellness", price: 229.88, img: "/assets/img/products/wellness.png", desc: "A real Energy Muse specimen, scanned in 3D — shattuckite, dioptase, malachite and smoky quartz in quartz.", home: "/gems/", scan: true },
  { id: "spirituality", name: "Amethyst Cluster", cat: "Crystal", group: "Spirituality", price: 34.88, img: "/assets/img/products/spirituality.png", desc: "Natural amethyst points on a copper stand — the classic meditative crystal for clarity and quiet attention.", home: "/gems/" },
  { id: "wealth", name: "Pyrite Cube", cat: "Crystal", group: "Wealth", price: 24.88, img: "/assets/img/products/wealth.png", desc: "A naturally cubic pyrite crystal — bright, metallic and grounded. Kept where plans are made.", home: "/gems/" },
  { id: "love", name: "Rhodochrosite Point", cat: "Crystal", group: "Love", price: 48.88, img: "/assets/img/products/love.png", desc: "A tender rose-banded point for compassion, self-worth and the relationships you nurture.", home: "/gems/" },
  { id: "fresh-start", name: "Clear Quartz Pyramid", cat: "Crystal", group: "Fresh Start", price: 18.88, img: "/assets/img/products/fresh-start.png", desc: "A polished quartz pyramid — a bright, clean point of focus for beginning again.", home: "/gems/" },
  { id: "trapiche", name: "Trapiche Amethyst Slice", cat: "Crystal", group: "Spirituality", price: 39.88, img: "/assets/img/products/trapiche.png", desc: "A rare star-patterned amethyst slice \\u2014 six rays formed over millions of years.", home: "/gems/" },
  { id: "blue-agate", name: "Blue Sky Agate Point", cat: "Crystal", group: "Calm", price: 48.88, img: "/assets/img/products/blue-agate.png", desc: "Soft blue banding in a standing point \\u2014 a quiet horizon for desk or bedside.", home: "/gems/" },
  { id: "rose-heart", name: "Rose Quartz Heart", cat: "Crystal", group: "Love", price: 12.88, img: "/assets/img/products/rose-heart.png", desc: "The classic crystal of gentle affection, carved into a hand-sized heart.", home: "/gems/" },
  { id: "malachite", name: "Malachite Crystal Point", cat: "Crystal", group: "Protection", price: 34.88, img: "/assets/img/products/malachite.png", desc: "Deep green banding in a polished point \\u2014 a strong, grounding guardian crystal.", home: "/gems/" },
  { id: "merkaba", name: "Clear Quartz Merkaba", cat: "Crystal", group: "Spirituality", price: 14.88, img: "/assets/img/products/merkaba.png", desc: "Sacred geometry cut in clear quartz \\u2014 a small, precise object of focus.", home: "/gems/" },
  { id: "labradorite", name: "Labradorite Wand", cat: "Crystal", group: "Power", price: 27.92, img: "/assets/img/products/labradorite.png", desc: "Flashes of blue and gold in a polished wand, presented on its own stand.", home: "/gems/" },
  { id: "blue-opal", name: "Owyhee Blue Opal", cat: "Crystal", group: "Wellness", price: 24.88, img: "/assets/img/products/blue-opal.png", desc: "A soft blue touchstone \\u2014 smooth in the palm, easy to carry through the day.", home: "/gems/" },
  { id: "himalayan", name: "Himalayan Quartz Cluster", cat: "Crystal", group: "Fresh Start", price: 399.88, img: "/assets/img/products/himalayan.png", desc: "A statement cluster from high-altitude veins \\u2014 many points, one clear intention.", home: "/gems/" },
  { id: "infinite-prosperity-bracelet", name: "Infinite Prosperity Bracelet", cat: "Jewelry", price: 64.88, img: "/assets/img/jewelry-shop/infinite-prosperity-bracelet.png", desc: "The piece that started Energy Muse 26 years ago was the Prosperity Necklace. This bracelet carries that same formula — reborn for who you’re becoming and made to move with you all day.", home: "/jewelry/", shop: "https://www.energymuse.com/products/infinite-prosperity-bracelet" },
  { id: "rose-quartz-bracelet-3", name: "Rose Quartz Bracelet", cat: "Jewelry", price: 26.88, img: "/assets/img/jewelry-shop/rose-quartz-bracelet-3.png", desc: "Make your heart soar and do it in style with the exquisite Rose Quartz Bracelet! This chic and timeless accessory not only enhances your look but also brings three invaluable gifts into your life: love, acceptance, and boundless hope. Love: At the core of Rose Quartz Bracelets lies the power of love.", home: "/jewelry/", shop: "https://www.energymuse.com/products/rose-quartz-bracelet" },
  { id: "breakthrough-bracelet-1", name: "Breakthrough Bracelet", cat: "Jewelry", price: 26.88, img: "/assets/img/jewelry-shop/breakthrough-bracelet-1.png", desc: "Exclusively designed by Energy Muse’s co-founder Heather Askinosie, the number of stones, the type of stones, and even the sequences used in The Breakthrough Bracelet were all deliberately selected by Heather in order to amplify the crystals’ healing energies.", home: "/jewelry/", shop: "https://www.energymuse.com/products/the-breakthrough-bracelet" },
  { id: "ground-anklet", name: "Grounding Anklet", cat: "Jewelry", price: 28.88, img: "/assets/img/jewelry-shop/ground-anklet.png", desc: "To feel balanced and centered, it is important to be grounded and connected to the energy of the Earth.", home: "/jewelry/", shop: "https://www.energymuse.com/products/ground-anklet" },
  { id: "protection-bracelet", name: "Protection Crystal Bracelet", cat: "Jewelry", price: 26.88, img: "/assets/img/jewelry-shop/protection-bracelet.png", desc: "The Protection Bracelet is one of Energy Muse’s most trusted formula pieces for energetic shielding and daily balance.", home: "/jewelry/", shop: "https://www.energymuse.com/products/protection-bracelet" },
  { id: "the-millionaire-mindset-bracelet", name: "The Millionaire Mindset Bracelet", cat: "Jewelry", price: 54.88, img: "/assets/img/jewelry-shop/the-millionaire-mindset-bracelet.png", desc: "This exclusive formula blends Hypersthene for disciplined wealth strategy, Black Spinel for resilience and magnetic personal power, and Black Tourmaline for energetic protection against financial drains.", home: "/jewelry/", shop: "https://www.energymuse.com/products/the-millionaire-mindset-bracelet" },
  { id: "seven-stone-necklace", name: "Seven & Stone Necklace", cat: "Jewelry", price: 124.88, img: "/assets/img/jewelry-shop/seven-stone-necklace.png", desc: "There are crystals that do one thing beautifully. And then there is Super 7. Held at your heart center, the Seven &amp; Stone Necklace carries one of the most complete energetic combinations in the crystal world.", home: "/jewelry/", shop: "https://www.energymuse.com/products/seven-stone-necklace" },
  { id: "infinite-prosperity-necklace", name: "Infinite Prosperity Necklace", cat: "Jewelry", price: 149.88, img: "/assets/img/jewelry-shop/infinite-prosperity-necklace.png", desc: "Twenty-six years ago, one piece started Energy Muse: the Prosperity Necklace. It became the necklace thousands reached for when they were ready to call in more. This is its next evolution — and we took ten years to get it right.", home: "/jewelry/", shop: "https://www.energymuse.com/products/infinite-prosperity-necklace" },
  { id: "glow-back-kit", name: "Get Your Glow Back Ritual Kit", cat: "Kit", group: "Ritual kit", price: 29.91, img: "/assets/img/sets/glow-back-kit.png", desc: "For clearing emotional heaviness and coming back to yourself.", home: "/sets/" },
  { id: "healing-ritual-set", name: "Healing Ritual Set", cat: "Kit", group: "Ritual set", price: 37.41, img: "/assets/img/sets/healing-ritual-set.png", desc: "Three of the most potent botanica tools, for intentions around health and protection.", home: "/sets/" },
  { id: "supercharge-bundle", name: "Super-Charging Station Bundle", cat: "Kit", group: "Bundle", price: 54.95, img: "/assets/img/sets/supercharge-bundle.png", desc: "A copper pyramid and a selenite plate — where your other crystals go to be cleared.", home: "/sets/" },
  { id: "diy-bracelet-kit", name: "DIY Crystal Bracelet Kit", cat: "Kit", group: "Make it yourself", price: 28.88, img: "/assets/img/sets/diy-bracelet-kit.png", desc: "Cord, needle, glue, 50 crystal beads and two stamped Energy Muse logo beads.", home: "/sets/" },
  { id: "angel-111", name: "111 Angel Number Jewelry Set", cat: "Kit", group: "Jewelry set", price: 17.33, img: "/assets/img/sets/angel-111.png", desc: "Necklace, ring and bracelet — the sequence for alignment and new beginnings.", home: "/sets/" },
  { id: "angel-444", name: "444 Angel Number Jewelry Set", cat: "Kit", group: "Jewelry set", price: 17.33, img: "/assets/img/sets/angel-444.png", desc: "Necklace, ring and bracelet — the sequence for steadiness and protection.", home: "/sets/" },
  { id: "copper-spheres", name: "Copper Activation Mini-Spheres", cat: "System", group: "Copper", price: 24.88, img: "/assets/img/sets/copper-spheres.png", desc: "Small solid-copper spheres that sit with the generator and spread its signal through the room.", home: "/systems/" },
  { id: "frequency-bag", name: "Frequency Generator Bag", cat: "System", group: "Accessory", price: 18.88, img: "/assets/img/sets/frequency-bag.png", desc: "A 6.5-inch canvas case, so the generator travels with you rather than staying on one shelf.", home: "/systems/" },
  { id: "formula-home", name: "Harmonious Home Frequency Formula", cat: "System", group: "For the living room", price: 299.88, img: "/assets/img/sets/formula-home.png", desc: "A living room holds onto more than you notice — the friction of a hard conversation, the static of a long commute, the weight of a full day. Most spaces just keep it. This one is built to move it on.", home: "/systems/" },
  { id: "formula-sleep", name: "Restorative Sleep Frequency Formula", cat: "System", group: "For the bedroom", price: 299.88, img: "/assets/img/sets/formula-sleep.png", desc: "A bedroom absorbs the loop of unfinished thoughts and the static of a day that never fully powered down. The next Formula in the system, tuned for the room you are least awake in.", home: "/systems/" },
  { id: "ultimate-bundle", name: "The Ultimate Crystal Lover’s Bundle", cat: "Kit", group: "Bundle", price: 46.95, img: "/assets/img/sets/ultimate-bundle.png", desc: "The Crystal365 book with the stones to practise it — one crystal, one purpose, one practice.", home: "/sets/" },
  { id: "home-frequency", name: "Home Frequency Bundle", cat: "System", group: "Bundle", price: 158.88, img: "/assets/img/sets/home-frequency.png", desc: "A full-home energetic grid — the restorative 7.83Hz paired with the activating 528Hz.", home: "/systems/" },
  { id: "copper-conductor", name: "Copper Conductor Bundle", cat: "System", group: "Bundle", price: 84.88, img: "/assets/img/sets/copper-conductor.png", desc: "Designed to amplify and steady what your generator emits, so the output is clearer and better held.", home: "/systems/" },
  { id: "copper-plate", name: "Solid Copper Plate", cat: "System", group: "Copper", price: 44.88, img: "/assets/img/sets/copper-plate.png", desc: "The conductor every Formula is built on — set the generator on it and the whole plate carries the signal.", home: "/systems/" },
  { id: "copper-pyramid", name: "Solid Copper Pyramid", cat: "System", group: "Copper", price: 24.88, img: "/assets/img/sets/copper-pyramid.png", stock: "out", desc: "Strengthens the cleansing process and amplifies the energy of whatever sits beneath it.", home: "/systems/" }
  ];

  /* the seven generators, borrowed rather than duplicated */
  function generators() {
    var F = window.EM_FREQ;
    if (!F) return [];
    return F.map(function (f) {
      return {
        id: f.id, name: f.hz + 'Hz Frequency Generator', cat: 'Frequency',
        group: f.intention, price: f.price, img: '/' + f.img,
        desc: (f.say || (f.purpose || []).join(' · ')),
        home: '/frequency/', stock: f.stock || 'in'
      };
    });
  }

  function all() { return ITEMS.concat(generators()); }
  function get(id) {
    var list = all();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  /* same category first, then anything, never the item itself */
  function related(id, n) {
    var me = get(id); if (!me) return [];
    var same = all().filter(function (p) { return p.id !== id && p.cat === me.cat; });
    var rest = all().filter(function (p) { return p.id !== id && p.cat !== me.cat; });
    return same.concat(rest).slice(0, n || 4);
  }

  window.EM_CATALOG = { all: all, get: get, related: related, items: ITEMS };
})();
