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
 * by whoever writes the copy. This file is that table, early.
 *
 * Sept 3: six more, pulled from their live pages the same way - angelite,
 * apatite, jade, shungite, turquoise, chrysocolla - the ones with a CRYSTAL365
 * photograph on hand and an in-stock piece to sell. Nine now. */
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
  },
  "angelite": {
    "name": "Angelite",
    "product": "angelite-stone",
    "photo": "angelite",
    "hook": "Are you looking for a sign from the angelic realm? Are you seeking more connection with the spirit world?",
    "meaning": "The tranquility of the Angelite crystal will quiet the spirit so you can surrender to a more vulnerable state. This sense of openness and humility allows you to ask your angels for the help you need and to be receptive to the answers.",
    "uses": [
      {
        "title": "Angelite Healing Properties",
        "text": "When you tune into the  Angelite healing  properties, you feel your angels’ divine love and remember that you are not alone. Even in your darkest hour, you can call on the Angelite stone meaning for support."
      }
    ],
    "history": "The Angelite stone is a relatively new crystal, discovered in Peru in 1987. It is also sometimes referred to as Blue Anhydrite."
  },
  "apatite": {
    "name": "Apatite",
    "product": "apatite-stone",
    "photo": "apatite",
    "hook": "The Greeks were the first to recognize the chameleon-like qualities of Apatite and its ability to resemble other crystals such as  Peridot . The Apatite crystal stone meaning comes from the Greek word “to deceive,” owing its name to its unique properties.",
    "meaning": "The Greeks were the first to recognize the chameleon-like qualities of Apatite and its ability to resemble other crystals such as  Peridot . The Apatite crystal stone meaning comes from the Greek word “to deceive,” owing its name to its unique properties. A combination of different levels of fluorine, chlorine, and hydroxide, the Apatite crystal ranges in color from deep blue-green to green to yellow and sometimes pink or violet.",
    "uses": [
      {
        "title": "Apatite Healing Properties",
        "text": "Give in to the inspirational qualities of the Apatite crystal stone and encourage a peaceful respite from the confusion that comes from adulting in the modern world. The Apatite crystal stone helps to reawaken a sense of clarity that lights the path to self-expression."
      },
      {
        "title": "Apatite Properties",
        "text": "If you’re like most people, you’re probably juggling life’s daily demands with a slew of pesky thoughts clouding up your judgment. From neurotic to confused and everything in between, these harmful thought patterns are not your friends but the roadblocks holding back from your true potential."
      }
    ]
  },
  "jade": {
    "name": "Jade",
    "product": "jade-bracelet",
    "photo": "jade",
    "hook": "If you feel your path to prosperity is blocked, use Jade to clear the way. Do you have trouble following through with your plans?",
    "meaning": "While all crystals promote harmony between the mind, body and spirit, the Jade crystal is a superstar in the world of crystal healing thanks to its powerful connection to the heart chakra and its varying degrees of intense, piercing shades of green. When it comes to bringing prosperity and abundance into your life, the Jade crystal meaning is the ultimate good luck charm. But not just for wealth intentions, working with Jade can support every area of your life.",
    "uses": [
      {
        "title": "Living a Prosperous Life",
        "text": "When it comes to prosperity, the Jade crystal is your key to success. Although the stone itself has a lucky energy and an air of abundance, connecting with the Jade crystal meaning does far more than boost your luck."
      },
      {
        "title": "Manifesting Wealth",
        "text": "Although the Jade crystal meaning can support prosperity across all areas of your life, this green stone is especially well-suited to support intentions related to wealth, financial abundance, and success. Its lucky energy and vibrant color both empower you to attract new financial possibilities and take action toward achieving your goals."
      }
    ],
    "history": "For centuries, Jade has been thought to bring good fortune. Cultures all over the world believe that Jade represents a wealth of virtues, including happiness, courage, purity, longevity, and wisdom.",
    "origin": "Jade is found in Canada, China, Mexico, New Zealand, the United States, and many other places."
  },
  "shungite": {
    "name": "Shungite",
    "product": "tall-shungite-pyramid",
    "photo": "shungite",
    "hook": "Have you been feeling foggy or low energy? Do you need to detox your spirit of negativity?",
    "meaning": "The Shungite meaning ranges from spiritual and emotional purification to protection, which makes it one of the most adaptable and powerful stones out there. Whether you’re looking for an  energetic shield  to minimize the effects of EMFs and technology, or you’re looking for an emotional detox from heavy energy, this carbon-based stone holds the energy you need to support your intention.",
    "uses": [
      {
        "title": "EMF Protection",
        "text": "The Shungite meaning is known to aid in the inhibiting of EMFs, or electromagnetic fields, that are the result of electromagnetic radiation. Electromagnetic fields are created by electronic devices."
      },
      {
        "title": "Detoxification of the Mind, Body, and Spirit",
        "text": "Even though EMF protection is the most popular reason for using it, Shungite is also incredibly powerful for energetic, emotional, mental and spiritual purification. The grounding and protective energy of this stone helps to neutralize negative energy stored within the mind, body, and spirit."
      }
    ],
    "history": "Shungite has been around for an estimated two billion years, but what is shungite and its healing potential was recognized through the 1996 Nobel Prize-winning research that discovered fullerenes within the stone. Shungite is composed mostly of pure carbon and is the only known natural mineral to contain fullerenes, which are specific molecular formations of carbon that act as powerful, long-lasting antioxidants."
  },
  "turquoise": {
    "name": "Turquoise",
    "product": "mexican-turquoise-stone",
    "photo": "turquoise",
    "hook": "Are you having trouble recognizing or listening to what your body needs to feel your best? Is taking care of yourself falling to the bottom of your to-do list?",
    "meaning": "The Turquoise crystal meaning is highly versatile. Because of the stone’s connection to the throat chakra and the energy of water, plus its long history of being used for spiritual and energetic healing, the ways to connect with the  Turquoise crystal stone  meaning are endless. However, some of the most powerful intentions to use with a Turquoise crystal stem from its calming and healing energy.",
    "uses": [
      {
        "title": "Prioritizing Your Health",
        "text": "The healing frequencies of a Turquoise crystal connect you to the energy of the Earth. Mother Nature is in a constant state of renewal, and your stone allows you to embrace this regenerative energy and channel it toward your own healing."
      },
      {
        "title": "Protection",
        "text": "In crystal healing, the Turquoise crystal stone meaning is associated with personal protection, making it a popular protective shield for ancient warriors heading out into battle. The bright and stunning hue of the Turquoise crystal has been discovered in the ceremonial masks and battle gear of the Aztecs, a tribe that revered this decorative stone for its ability to provide personal protection against negative forces."
      }
    ],
    "history": "Adored for centuries, Turquoise rocks have been carved and set into everything from royal thrones and daggers to jewelry and cups. The Egyptians believed the Turquoise crystal meaning brought good fortune and made them invulnerable.",
    "origin": "Turquoise is found in Africa, Belgium, China, France, Iran, Mexico, the United States, and many other places."
  },
  "chrysocolla": {
    "name": "Chrysocolla",
    "product": "chrysocolla-stone",
    "photo": "chrysocolla",
    "hook": "Have you ever felt as though you are living on auto-pilot? Have you been dreaming up a fresh start in an area of your life, but haven’t found the motivation to actually make it happen?",
    "meaning": "With its combination of blues and greens, the Chrysocolla crystal meaning represents a combination of energies related to love, growth, and communication. By surrounding you with soothing energy, the Chrysocolla crystal stone meaning invites you to explore your heart’s desires — whether that means connecting with others, speaking your truth, or embarking on a new journey in life.",
    "uses": [
      {
        "title": "Starting Fresh",
        "text": "The soothing Chrysocolla crystal meaning guides you toward a state of calm confidence in all situations, making this the ideal crystal to connect with when change is on the horizon. If you’ve been resisting a long-overdue change, or have been hesitant to initiate a desired shift, a Chrysocolla crystal can be the nudge you need to both accept and welcome change."
      },
      {
        "title": "Communicating From The Heart",
        "text": "In addition to supporting change, the Chrysocolla crystal properties also connect with the heart and throat chakras, the energy centers related to matters of communication and love, to facilitate heartfelt communication. If you often find yourself overanalyzing or getting in your head, Chrysocolla crystal can help you get out of your head and tap into your heart."
      }
    ],
    "history": "Found in deposits alongside its cousins  Blue Azurite  and Malachite, this gemstone forms amorphous shapes called stalactites, which contribute to its ability to create a flow of positive energy that helps you adapt to changes during a spiritual transformation.",
    "origin": "Chrysocolla crystal is found in Australia, England, Israel, Mexico, the United States, and many other places."
  }
};
