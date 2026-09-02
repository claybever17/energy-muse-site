/* em-stones.js — the meaning pages, as data.
 *
 * Energy Muse has 66 of these and every one is the same ten sections in the
 * same order: "You need X if...", the meaning, one or two intentions, History
 * & Lore, Origin & Regionality, three separate "How to use your X crystal"
 * headings, and a best-sellers carousel at the end. The amethyst page runs to
 * 9,204 words. Heather asked for it much simpler, with the product static
 * rather than a carousel, and this is what that looks like: five sections, one
 * named product, and the reference material folded away rather than deleted.
 *
 * Every word here is theirs, lifted from the page it replaces and trimmed - no
 * copy has been written for them. Adding a stone is one object: a name, the
 * catalogue id of the piece it should sell, and the sections. Where a stone has
 * no photograph in assets/img/c365/ the template drops the picture rather than
 * showing a gap, and where a section is missing it is simply not rendered.
 *
 * On Shopify this is a metaobject: one template, 66 entries, edited in admin
 * by whoever writes the copy. This file is that table, early. */
window.EM_STONES = {
  "black-tourmaline": {
    "name": "Black Tourmaline",
    "product": "protection",
    "photo": "black-tourmaline",
    "hook": "Have you ever felt or picked up on bad vibes from a person or place? Have you ever gone into a situation where you knew there would be negative energy? Do you want a little extra energetic protection as you move throughout the world?",
    "meaning": "The Black Tourmaline crystal stone meaning is connected to its deep pitch-black color. Because of its dark coloration, this stone has a strong energy and an ability to absorb negative energy without compromising its own energy. Because it can absorb negativity, it can both protect and cleanse you and your environment.",
    "uses": [
      {
        "title": "Protection",
        "text": "The Black Tourmaline crystal healing properties are most well-known for protection-related intentions. By shielding your energy in a bubble of protection, the Black Tourmaline crystal meaning can ward off unwanted energy and low vibrations that come from other people, places, or even situations."
      },
      {
        "title": "Energy Clearing",
        "text": "Although protection is essential for your spiritual, emotional and energetic well-being, negative energy can still find its way in. In those cases, you can still work with the Black Tourmaline crystal stone meaning to clear your energy and remove those negative energies from your system."
      }
    ],
    "history": "Tourmaline has been around since Medieval times, but it wasn’t until the late 1800s, when mineralogist George Kunz sold Tourmaline to Tiffany & Co., that it gained popularity. Before it made a name for itself in popular culture, the power of Black Tourmaline was known only to those who worked with it.",
    "origin": "Black Tourmaline is found in Africa, Brazil, Pakistan, the United States and many other places around the world."
  },
  "clear-quartz": {
    "name": "Clear Quartz",
    "product": "fresh-start",
    "photo": "clear-quartz",
    "hook": "When someone asks you what you want in life or what your goals are, do you find it difficult to answer? Do you know what you want but find it challenging to make it a reality? You need the energy of clarity and manifestation that Clear Quartz crystals and jewelry provide.",
    "meaning": "The Quartz Clear crystal meaning is known for its high vibrations. By clearing your mind, body, and spirit of any clutter, a Clear Quartz crystal can help you align with your highest self and live at your highest potential. The Clear Quartz crystal stone meaning is especially powerful for anyone looking to set and achieve new goals.",
    "uses": [
      {
        "title": "Gaining Clarity",
        "text": "When you think about what you want in life, does the answer come easily? Sometimes, it can be difficult to identify what we want because there are so many competing ideas running through our heads."
      }
    ],
    "history": "Because Clear Crystal Quartz is such a worldly crystal, cultures from around the world have their own mythology related to the Quartz stone meaning. The term “quartz” comes from the Greek word for “ice.” Ancient Greek philosophers like Theophrastus believed that the transparent stone was a form of permanent ice, so cold, it kept from thawing.",
    "origin": "One of the most abundant minerals in the world, Clear Quartz can develop in a wide range of environments and can be found on every continent"
  },
  "pyrite": {
    "name": "Pyrite",
    "product": "wealth",
    "photo": "pyrite",
    "hook": "Do you have financial anxiety? Do you lack focus and motivation when it comes to career goals and creative projects? If you want to have more commitment and persistence in all your endeavors, the Pyrite stone is the crystal you need.",
    "meaning": "All that glitters isn't gold, but this glamorous stone is just as good. The frequencies of the Pyrite crystal meaning is a must-have for your office or workspace because it's the ultimate symbol of wealth and good luck. It's also known as “Fool’s gold” because of its shimmery golden hue, the color of gold and the midday sun at its full strength.",
    "uses": [
      {
        "title": "Pyrite Healing Properties",
        "text": "To harness the powerful and protective vibes of the Pyrite meaning and uses, give your self-confidence a boost when you use this warrior stone in a prosperity or aspiration healing layout. Incorporating several stones with Pyrite allows for even more powerful vibrations because it forms a union of energies between the stones using the ancient principles of sacred geometry."
      }
    ],
    "history": "Treasured in many ancient civilizations, the Pyrite stone meaning comes from the Greek word ‘pyr,’ which means fire. The Pyrite meaning symbolizes male energy, that burning cauldron of passion that exists deep within the solar plexus chakra.",
    "origin": "Pyrite is easily obtainable from many different geographical sources, including Germany, Italy, Peru, Russia, South America, Spain, and the US. The largest producers of Pyrite are Italy, China, and Spain."
  }
};
