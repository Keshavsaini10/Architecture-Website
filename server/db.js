const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const stonesData = [
  {
    id: "makrana-marble",
    name: "Makrana Marble",
    subtitle: "The royal white marble",
    category: "Marble",
    origin: "Rajasthan",
    quarryLocation: "Makrana, Didwana-Kuchaman District, Rajasthan",
    image: "/assets/images/stone_makrana.jpg",
    description: "World-renowned pure crystalline calcium marble celebrated for its snowy luster and translucent depth. Formed over 1,450 million years ago, it remains cool to the touch and grows more radiant with age.",
    color: "Pure White with soft silver and grey calcite veins",
    finishAvailable: ["Mirror Polished", "Honed Velvet", "Antique Leather", "Brushed", "Bush Hammered"],
    compressiveStrength: "1,860 kg/cm²",
    waterAbsorption: "0.04% (Impermeable)",
    hardness: "3.5 Mohs",
    density: "2.71 g/cm³",
    recommendedUses: ["Luxury Flooring", "Palatial Feature Walls", "Temple Sanctums", "Sculptures", "Bathroom Ensuites"],
    historicalSignificance: "The very stone commissioned by Emperor Shah Jahan in 1632 to build the Taj Mahal. Also chosen by Sir William Emerson for the Victoria Memorial.",
    priceTier: "Super Premium",
    rating: 5.0,
    tags: ["White Marble", "Taj Mahal Stone", "Heritage", "Ultra Luxury"]
  },
  {
    id: "kota-stone",
    name: "Kota Stone",
    subtitle: "Elegant & durable",
    category: "Limestone",
    origin: "Kota, Rajasthan",
    quarryLocation: "Ramganj Mandi, Kota District, Rajasthan",
    image: "/assets/images/stone_kota.jpg",
    description: "Naturally fine-grained, non-porous dolomitic limestone quarried from the Hadoti region. Beloved by architects for its supreme durability, natural non-slip properties, and cool earthy greenish-blue undertones.",
    color: "Refined Greenish-Grey & Slate Blue",
    finishAvailable: ["Honed", "Mirror Polished", "Rough Natural Cleft", "Shot Blasted", "River Washed"],
    compressiveStrength: "2,100 kg/cm²",
    waterAbsorption: "0.20%",
    hardness: "4.0 Mohs",
    density: "2.68 g/cm³",
    recommendedUses: ["Heavy Traffic Commercial Flooring", "Garden Pathways", "Staircases", "Corridors", "Swimming Pool Decks"],
    historicalSignificance: "Extensively utilized in public corridors, railway heritage stations, and prestigious institutional campuses across India for over a century.",
    priceTier: "Accessible Luxury",
    rating: 4.8,
    tags: ["Limestone", "Durable", "Non-Slip", "Cooling"]
  },
  {
    id: "jaisalmer-yellow",
    name: "Jaisalmer Yellow",
    subtitle: "Warm golden hues",
    category: "Sandstone",
    origin: "Jaisalmer, Rajasthan",
    quarryLocation: "Jethwai & Mool Sagar, Thar Desert, Rajasthan",
    image: "/assets/images/stone_jaisalmer.jpg",
    description: "The mystical 'Golden Stone' of the Thar Desert. A dense jurassic fossiliferous limestone and sandstone that glows like liquid gold under sunlight, featuring delicate fossil ammonite swirls.",
    color: "Radiant Honey Ochre, Desert Gold & Amber",
    finishAvailable: ["Polished", "Honed", "Sawn Cleft", "Sandblasted", "Tumbled"],
    compressiveStrength: "1,450 kg/cm²",
    waterAbsorption: "0.85%",
    hardness: "3.5 Mohs",
    density: "2.52 g/cm³",
    recommendedUses: ["Heritage Palaces", "Luxury Cladding", "Carved Jali Screens", "Fireplace Mantels", "Bespoke Sculptures"],
    historicalSignificance: "The entire living Golden Fort (Sonar Qila) of Jaisalmer, founded in 1156 AD, is constructed from this golden stone.",
    priceTier: "Premium",
    rating: 4.9,
    tags: ["Golden Stone", "Desert Sun", "Jali Carving", "Palatial"]
  },
  {
    id: "black-galaxy-granite",
    name: "Black Galaxy Granite",
    subtitle: "Starry elegance",
    category: "Granite",
    origin: "Karnataka",
    quarryLocation: "Chimakurthi, Ongole & Karnataka border zone",
    image: "/assets/images/stone_black_galaxy.jpg",
    description: "An awe-inspiring deep obsidian black gabbro granite peppered with naturally occurring golden-bronze enstatite spangles that resemble the twinkling night galaxy.",
    color: "Pitch Jet Black with Metallic Gold & Copper Flecks",
    finishAvailable: ["High Gloss Polished", "Flamed", "Leather Touch", "Lapato", "Honed"],
    compressiveStrength: "2,780 kg/cm²",
    waterAbsorption: "0.03%",
    hardness: "6.5 - 7.0 Mohs",
    density: "2.97 g/cm³",
    recommendedUses: ["High-End Kitchen Countertops", "Executive Boardrooms", "Bar Counters", "Grand Lobbies", "Feature Steps"],
    historicalSignificance: "One of India's most exported luxury stones, celebrated by global interior designers in Milan, London, and Tokyo for its celestial sparkle.",
    priceTier: "Ultra Premium",
    rating: 5.0,
    tags: ["Granite", "Starry Sparkle", "Scratch Proof", "Countertop King"]
  },
  {
    id: "indian-green-marble",
    name: "Indian Green Marble",
    subtitle: "Luxurious & unique",
    category: "Marble",
    origin: "Rajasthan",
    quarryLocation: "Rishabhdeo, Keshariyaji, Udaipur District, Rajasthan",
    image: "/assets/images/stone_green_marble.jpg",
    description: "Often termed 'Verde Guatemala' or 'Emerald Forest', this deep serpentine marble possesses mesmerizing deep emerald greens interwoven with dark forest veins and lighter crystalline branches.",
    color: "Deep Royal Emerald Green with Dark Branching Veins",
    finishAvailable: ["Polished", "Honed", "Leather", "Antique Patina"],
    compressiveStrength: "1,720 kg/cm²",
    waterAbsorption: "0.15%",
    hardness: "4.0 Mohs",
    density: "2.83 g/cm³",
    recommendedUses: ["Spa Bathrooms", "Bookmatched Accent Walls", "Vanity Tops", "Luxury Table Tops", "Columns"],
    historicalSignificance: "Adorns royal palaces of Mewar, private maharani chambers, and prestigious five-star presidential suites across the globe.",
    priceTier: "Premium",
    rating: 4.85,
    tags: ["Verde Marble", "Emerald Green", "Spa Luxury", "Serpentine"]
  },
  {
    id: "rajasthan-sandstone",
    name: "Rajasthan Sandstone",
    subtitle: "Rustic & timeless",
    category: "Sandstone",
    origin: "Rajasthan",
    quarryLocation: "Dholpur & Karauli, Rajasthan",
    image: "/assets/images/stone_rajasthan_sandstone.jpg",
    description: "Extracted from the ancient Vindhyan ranges, this natural stone combines thermal insulation, weather resistance, and warm terracotta blush tones that age gracefully with majestic patina.",
    color: "Warm Blush Terracotta, Rosy Buff & Earth Ochre",
    finishAvailable: ["Hand Chiseled", "Natural Cleft", "Shotblasted", "Sawn Cut", "Tumbled"],
    compressiveStrength: "1,350 kg/cm²",
    waterAbsorption: "1.10%",
    hardness: "5.5 Mohs",
    density: "2.45 g/cm³",
    recommendedUses: ["Exterior Facade Cladding", "Fortification Walls", "Garden Pavilions", "Temple Mandapas", "Boundary Pillars"],
    historicalSignificance: "Constructed the formidable Amber Fort, Red Fort of Delhi, and modern marvels like the Akshardham temple complex.",
    priceTier: "Accessible Luxury",
    rating: 4.8,
    tags: ["Sandstone", "Weatherproof", "Terracotta", "Heritage"]
  },
  {
    id: "banswara-purple-marble",
    name: "Banswara Purple Marble",
    subtitle: "Artistic dramatic veining",
    category: "Marble",
    origin: "Rajasthan",
    quarryLocation: "Banswara District, Southern Rajasthan",
    image: "/assets/images/stone_banswara_purple.jpg",
    description: "A distinctive Indian marble characterized by a creamy porcelain white base canvas overlaid with bold violet, lavender, and wine-colored spider veins.",
    color: "Milk White with Dramatic Purple & Lavender Veining",
    finishAvailable: ["Mirror Polished", "Honed", "Bookmatched Slabs"],
    compressiveStrength: "1,690 kg/cm²",
    waterAbsorption: "0.08%",
    hardness: "3.5 Mohs",
    density: "2.69 g/cm³",
    recommendedUses: ["Boutique Hotel Lobbies", "Powder Rooms", "Artistic Sinks", "Feature Fireplace Walls"],
    historicalSignificance: "Favored by contemporary landscape architects and bespoke villa designers seeking artistic expression akin to Italian Calacatta Viola.",
    priceTier: "Ultra Premium",
    rating: 4.9,
    tags: ["Purple Vein", "Exotic Marble", "Bookmatch"]
  },
  {
    id: "dholpur-beige-sandstone",
    name: "Dholpur Beige Sandstone",
    subtitle: "Imperial sovereign stone",
    category: "Sandstone",
    origin: "Dholpur, Rajasthan",
    quarryLocation: "Bari & Sarmathura, Dholpur, Rajasthan",
    image: "/assets/images/stone_dholpur_beige.jpg",
    description: "The revered stone of state. Uniform cream-buff sandstone with outstanding load-bearing capacity and immaculate carving capability.",
    color: "Soft Buff Cream & Warm Biscuit Tone",
    finishAvailable: ["Honed", "Bush Hammered", "Fine Chiseled", "Flamed"],
    compressiveStrength: "1,520 kg/cm²",
    waterAbsorption: "0.95%",
    hardness: "5.0 Mohs",
    density: "2.48 g/cm³",
    recommendedUses: ["Government & Civic Buildings", "Embassies", "Colonloaded Porticos", "Jali Screens"],
    historicalSignificance: "Famously chosen by Sir Edwin Lutyens and Herbert Baker for the Parliament House and Rashtrapati Bhavan in New Delhi.",
    priceTier: "Premium",
    rating: 4.95,
    tags: ["Lutyens Delhi", "Civic Monument", "Sovereign Stone"]
  },
  {
    id: "ambaji-white-marble",
    name: "Ambaji White Marble",
    subtitle: "Sacred crystalline purity",
    category: "Marble",
    origin: "Gujarat / Rajasthan Border",
    quarryLocation: "Ambaji, Aravalli Mountain Range",
    image: "/assets/images/stone_makrana.jpg",
    description: "Renowned for its fine grain, translucent milky crystal matrix, and immaculate white surface with light grey clouding.",
    color: "Pristine Crystalline White with Soft Feather Clouding",
    finishAvailable: ["High Polish", "Honed", "Chiseled Relief", "Waterjet"],
    compressiveStrength: "1,810 kg/cm²",
    waterAbsorption: "0.06%",
    hardness: "3.5 Mohs",
    density: "2.70 g/cm³",
    recommendedUses: ["Temple Shrines & Mandapas", "Grand Staircases", "Courtyard Flooring", "Carved Capitals"],
    historicalSignificance: "The legendary stone of the 11th-century Dilwara Temples at Mount Abu, known for translucent stone carving so thin that light permeates through.",
    priceTier: "Super Premium",
    rating: 4.95,
    tags: ["Temple Marble", "Dilwara", "White Marble"]
  },
  {
    id: "rainforest-brown-marble",
    name: "Rainforest Brown Serpentine",
    subtitle: "Bidasar nature's tapestry",
    category: "Marble",
    origin: "Bidasar, Rajasthan",
    quarryLocation: "Bidasar, Churu District, Rajasthan",
    image: "/assets/images/stone_rajasthan_sandstone.jpg",
    description: "An exotic natural stone with a rich cocoa and coffee brown background crisscrossed by intricate dark root-like veins resembling an aerial view of an ancient rainforest.",
    color: "Deep Cocoa Brown with Golden Russet and Crimson Branch Veins",
    finishAvailable: ["Polished High Gloss", "Leathered Satin", "Antique Honed"],
    compressiveStrength: "1,640 kg/cm²",
    waterAbsorption: "0.18%",
    hardness: "4.0 Mohs",
    density: "2.65 g/cm³",
    recommendedUses: ["Dramatic Powder Room Vanities", "Living Room Wall Cladding", "Bar Counters", "Conference Tables"],
    historicalSignificance: "A geological wonder unique to India, highly sought after by luxury European architects for high-contrast bespoke feature walls.",
    priceTier: "Ultra Premium",
    rating: 4.88,
    tags: ["Rainforest", "Exotic Serpentine", "Bidasar"]
  },
  {
    id: "dholpur-red-sandstone",
    name: "Dholpur Red Sandstone",
    subtitle: "Imperial fortress stone",
    category: "Sandstone",
    origin: "Rajasthan",
    quarryLocation: "Dholpur District, Eastern Rajasthan",
    image: "/assets/images/stone_rajasthan_sandstone.jpg",
    description: "Deep imperial ruby and terracotta sandstone of unmatched strength, weather endurance, and acoustic insulation.",
    color: "Rich Imperial Terracotta & Rust Crimson",
    finishAvailable: ["Natural Cleft", "Chiseled", "Shot Blasted", "Honed"],
    compressiveStrength: "1,480 kg/cm²",
    waterAbsorption: "0.80%",
    hardness: "5.5 Mohs",
    density: "2.47 g/cm³",
    recommendedUses: ["Fortress Gateways", "External Cladding", "Heritage Villa Porticos", "Garden Pavilions"],
    historicalSignificance: "The sovereign stone of Delhi's Red Fort, Fatehpur Sikri, and Agra Fort, built by Mughal Emperor Akbar the Great.",
    priceTier: "Accessible Luxury",
    rating: 4.92,
    tags: ["Red Sandstone", "Red Fort", "Imperial Stone"]
  },
  {
    id: "tan-brown-granite",
    name: "Tan Brown Granite",
    subtitle: "Chestnut igneous luxury",
    category: "Granite",
    origin: "Telangana / Karnataka",
    quarryLocation: "Karimnagar, Deccan Plateau",
    image: "/assets/images/stone_black_galaxy.jpg",
    description: "A dark rich igneous granite presenting a predominantly brown, black, and burnt-amber crystal matrix with deep metallic flecks.",
    color: "Rich Coffee Chestnut with Charcoal and Amber Crystals",
    finishAvailable: ["Mirror Polished", "Flamed", "Honed", "Bush Hammered"],
    compressiveStrength: "2,650 kg/cm²",
    waterAbsorption: "0.04%",
    hardness: "6.5 Mohs",
    density: "2.92 g/cm³",
    recommendedUses: ["Heavy Duty Kitchen Worktops", "High Footfall Commercial Flooring", "Elevator Surrounds", "Steps"],
    historicalSignificance: "One of the most durable natural granites in the world, quarried from the Precambrian Deccan craton.",
    priceTier: "Premium",
    rating: 4.85,
    tags: ["Granite", "Tan Brown", "Indestructible"]
  }
];

const architectureData = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    stoneUsed: "Makrana Marble",
    location: "Agra, Uttar Pradesh",
    era: "Medieval Architecture (1632 - 1653 AD)",
    builder: "Mughal Emperor Shah Jahan",
    image: "/assets/images/arch_taj_mahal.jpg",
    summary: "The pinnacle of Mughal architectural genius and universal love, crafted from pristine Makrana marble that changes hue with the shifting sunlight and moonlight.",
    stoneDetails: "Over 20,000 workers quarried Makrana marble 300 km away in Rajasthan and transported it on ox-carts. The marble's fine calcite crystal structure reflects sunlight with an ethereal warm glow at sunrise, dazzling white at midday, and translucent silver under the full moon.",
    keyFeatures: [
      "Inlaid with 28 types of precious stones (Pietra Dura)",
      "Central onion dome rising 73 meters",
      "Perpetually gleaming surface without discoloration"
    ]
  },
  {
    id: "khajuraho-temples",
    name: "Khajuraho Temples",
    stoneUsed: "Buff & Ochre Sandstone",
    location: "Khajuraho, Madhya Pradesh",
    era: "Ancient India (950 - 1050 AD)",
    builder: "Chandela Dynasty",
    image: "/assets/images/arch_khajuraho.jpg",
    summary: "UNESCO World Heritage site representing the zenith of Indian temple architecture, adorned with breathtaking figurative stone relief carvings.",
    stoneDetails: "Constructed using interlocking mortise and tenon stone joints without mortar, sculpted from local fine-grained Panna sandstone that allowed the sculptors to achieve lifelike delicacy in hair curls, drapery, and expressions.",
    keyFeatures: [
      "Nagara-style curvilinear shikhara spires",
      "Over 80 original temple sanctuaries",
      "Centuries-old stone joint preservation"
    ]
  },
  {
    id: "victoria-memorial",
    name: "Victoria Memorial",
    stoneUsed: "White Makrana Marble",
    location: "Kolkata, West Bengal",
    era: "Colonial Era (1906 - 1921)",
    builder: "Sir William Emerson (Architect)",
    image: "/assets/images/arch_victoria.jpg",
    summary: "A grand marble monument melding Indo-Saracenic, British neoclassical, and Venetian Renaissance architectural traditions.",
    stoneDetails: "Built using over 250,000 cubic feet of prime Makrana marble from the very same Rajasthani quarries that supplied the Taj Mahal three centuries prior, testifying to the perennial quality of Indian marble.",
    keyFeatures: [
      "184-foot high central marble dome",
      "Angel of Victory bronze rotating weather vane",
      "64 acres of reflecting pools and marble balustrades"
    ]
  },
  {
    id: "ranakpur-temple",
    name: "Ranakpur Temple",
    stoneUsed: "Crystalline Amber & White Marble",
    location: "Ranakpur, Pali, Rajasthan",
    era: "Medieval Architecture (15th Century)",
    builder: "Dharna Shah & Rana Kumbha",
    image: "/assets/images/arch_ranakpur.jpg",
    summary: "A sprawling 15th-century Chaumukha Jain temple sanctuary hidden in the Aravalli hills, celebrated for its forest of 1,444 intricately carved marble pillars.",
    stoneDetails: "Carved from light-toned Rajasthani marble that subtly shifts from warm cream at dawn to pale amber in the afternoon. Every single pillar features entirely unique, unrepeated sculptural motifs.",
    keyFeatures: [
      "1,444 individually hand-carved marble pillars",
      "Pillar in the main hall designed with a conscious tilt as a tribute to divine perfection",
      "Passive cooling marble arches that regulate desert heat"
    ]
  },
  {
    id: "amber-fort",
    name: "Amber Fort",
    stoneUsed: "Yellow & Red Sandstone",
    location: "Jaipur, Rajasthan",
    era: "Medieval Architecture (1592 AD)",
    builder: "Raja Man Singh I",
    image: "/assets/images/arch_amber_fort.jpg",
    summary: "A majestic hilltop fortress palace harmoniously marrying Rajput martial architecture with opulent Mughal marble and sandstone courtrooms.",
    stoneDetails: "High-density red and yellow sandstone quarried from neighboring hills provided impregnable defensive ramparts while allowing delicate floral fretwork and pierced jali windows.",
    keyFeatures: [
      "Sheesh Mahal (Palace of Mirrors) with inlaid convex glass and marble",
      "Ganesh Pol multi-level carved sandstone gateway",
      "Sukh Niwas marble channel air-conditioning system"
    ]
  },
  {
    id: "modern-architecture",
    name: "Modern Architecture",
    stoneUsed: "Granite & Marble Cladding",
    location: "New Delhi & NCR",
    era: "Modern Architecture (1947 - Present)",
    builder: "Leading Contemporary Architects",
    image: "/assets/images/arch_modern.jpg",
    summary: "Next-generation civic centers, luxury towers, and embassies using ventilated Indian stone rainscreens for energy efficiency and timeless prestige.",
    stoneDetails: "Combines CNC diamond-sawn Indian granite with thermal flamed finishes and acoustic stone tile panels, reducing cooling loads while providing generational building envelopes.",
    keyFeatures: [
      "High thermal mass reducing HVAC operational carbon",
      "Precision bookmatched marble lobby centerpieces",
      "LEED Platinum certified natural stone sourcing"
    ]
  }
];

const heritageTimelineData = [
  {
    eraId: "ancient",
    eraName: "Ancient India",
    period: "Pre-1600",
    title: "Rock-Cut Sanctuaries & Vedic Temples",
    description: "The dawn of Indian monumental stonework. Craftsmen chiseled entire mountains of basalt and granite into monolithic wonders like the Kailasa Temple at Ellora, the Sun Temple at Konark, and early stupas.",
    stoneHero: "Granite, Basalt & Panna Sandstone",
    exemplar: "Ellora Caves & Khajuraho Complex"
  },
  {
    eraId: "medieval",
    eraName: "Medieval Architecture",
    period: "1600 - 1700 AD",
    title: "The Golden Age of Mughal & Rajput Marble",
    description: "An explosion of stone refinement. Royal patronage elevated Makrana marble to divine status, pioneering the Pietra Dura inlay technique, pierced jali screens that filter desert winds, and palatial fortress compounds.",
    stoneHero: "Makrana Pure Marble & Jaisalmer Yellow",
    exemplar: "Taj Mahal & Amber Fort"
  },
  {
    eraId: "colonial",
    eraName: "Colonial Era",
    period: "1700 - 1947",
    title: "Indo-Saracenic & Classical Civic Architecture",
    description: "A monumental fusion where British engineers embraced indigenous Indian stone. Lutyens chose Dholpur red and buff sandstone for Delhi's grand avenues, while Kolkata erected the Victoria Memorial in Makrana marble.",
    stoneHero: "Dholpur Sandstone & Makrana Marble",
    exemplar: "Victoria Memorial & Rashtrapati Bhavan"
  },
  {
    eraId: "modern",
    eraName: "Modern Architecture",
    period: "1947 - Present",
    title: "Sustainable Luxury & Contemporary Facades",
    description: "Modern architects re-imagine Indian stones with aerospace-grade CNC waterjet precision, lightweight honeycomb-backed marble panels, and sustainable ventilated rainscreens for luxury residences and global landmarks.",
    stoneHero: "Black Galaxy Granite & Bookmatched Marbles",
    exemplar: "Modern Luxury Villas & Civic Centers"
  }
];

const applicationsData = {
  modern: [
    {
      id: "app-luxury-flooring",
      title: "Luxury Flooring",
      subtitle: "Mirrored gloss & enduring grandeur",
      icon: "fa-gem",
      recommended: ["Makrana Marble", "Indian Green Marble", "Kota Stone"],
      description: "Bookmatched large format slabs that deliver seamless expansive floors, reflecting natural light and maintaining a naturally cool temperature in any climate."
    },
    {
      id: "app-countertops",
      title: "Kitchen Countertops",
      subtitle: "Heat, stain & scratch resistance",
      icon: "fa-utensils",
      recommended: ["Black Galaxy Granite", "Tan Brown Granite", "Honed Granite"],
      description: "Dense igneous granites with high Mohs hardness that withstand knife marks, hot cookware, and acidic food preparation while looking breathtaking."
    },
    {
      id: "app-bathrooms",
      title: "Bathroom Surfaces",
      subtitle: "Sanctuary of spa elegance",
      icon: "fa-bath",
      recommended: ["Makrana Marble", "Indian Green Marble", "Banswara Purple"],
      description: "Non-porous polished and honed stones ideal for zero-grout shower walls, sculpted marble freestanding tubs, and floating vanities."
    },
    {
      id: "app-feature-walls",
      title: "Feature Walls",
      subtitle: "Living art pieces in stone",
      icon: "fa-border-all",
      recommended: ["Bookmatched Banswara", "Backlit Onyx Marble", "Jaisalmer Yellow"],
      description: "Dramatic quad-matched veins that form symmetrical organic butterflies and abstract landscapes, turning interior walls into museum-grade art."
    },
    {
      id: "app-staircases",
      title: "Staircases",
      subtitle: "Sculptural vertical transitions",
      icon: "fa-stairs",
      recommended: ["Kota Stone (Honed)", "Black Galaxy Granite", "Makrana White"],
      description: "Full bullnose and bevel-edge treads with precision anti-skid grooving and contrasting stone risers that endure heavy footfalls."
    },
    {
      id: "app-facades",
      title: "Exterior Facades",
      subtitle: "Generational climate envelopes",
      icon: "fa-building",
      recommended: ["Rajasthan Sandstone", "Dholpur Beige", "Flamed Granite"],
      description: "Dry-hung ventilated stone cladding that acts as a natural thermal buffer, shielding buildings from ultraviolet degradation and weathering."
    }
  ],
  traditional: [
    {
      id: "app-temple-interiors",
      title: "Temple Interiors",
      subtitle: "Sacred sanctum craftsmanship",
      icon: "fa-place-of-worship",
      recommended: ["Makrana White Marble", "Ambaji White Marble"],
      description: "Revered stones specified according to ancient Shilpa Shastra guidelines for garbhagrihas, mandapas, and sanctum altars."
    },
    {
      id: "app-heritage-buildings",
      title: "Heritage Buildings",
      subtitle: "Authentic historic preservation",
      icon: "fa-landmark",
      recommended: ["Jaisalmer Yellow Sandstone", "Dholpur Red Sandstone"],
      description: "Quarry-matched replacement ashlar blocks and lintels for restoring forts, royal havelis, and colonial monuments."
    },
    {
      id: "app-sculptures",
      title: "Sculptures",
      subtitle: "Hand-chiseled timeless figures",
      icon: "fa-monument",
      recommended: ["Pure White Makrana", "Soft Pink Sandstone"],
      description: "Master artisans sculpting intricate floral arabesques, deity statues, and monumental installations with millimeter precision."
    },
    {
      id: "app-decorative-columns",
      title: "Decorative Columns",
      subtitle: "Pillars of aristocratic power",
      icon: "fa-columns",
      recommended: ["Carved Sandstone", "Polished Marble"],
      description: "Fluted, spiral, and bell-capital monolithic pillars replicating the architectural majesty of Ranakpur and Amber palaces."
    },
    {
      id: "app-monument-restoration",
      title: "Monument Restoration",
      subtitle: "Conservation science & stone matching",
      icon: "fa-hammer",
      recommended: ["Historic Rajasthani Quarries"],
      description: "Geological petrographic testing and conservation mortar pairing to preserve centuries of architectural heritage."
    },
    {
      id: "app-jali-carving",
      title: "Traditional Jali Carving",
      subtitle: "Intricate perforated lattice screens",
      icon: "fa-th",
      recommended: ["Jaisalmer Sandstone", "Makrana Marble"],
      description: "Intricate pierced stone fretwork that filters intense solar glare, casts poetic lace shadows, and funnels cooling breezes through the Venturi effect."
    }
  ]
};

const visualizerPresets = {
  rooms: [
    {
      id: "living",
      name: "Luxury Living Room",
      baseImage: "/assets/images/room_visualizer_living.jpg",
      floorHeight: "52%",
      wallWidth: "35%"
    },
    {
      id: "corridor",
      name: "Heritage Palace Hall",
      baseImage: "/assets/images/corridor_heritage.jpg",
      floorHeight: "45%",
      wallWidth: "40%"
    },
    {
      id: "bath",
      name: "Royal Suite Bathroom",
      baseImage: "/assets/images/gallery_luxury_bath.jpg",
      floorHeight: "48%",
      wallWidth: "50%"
    },
    {
      id: "lobby",
      name: "Modern Civic Lobby",
      baseImage: "/assets/images/gallery_modern_lobby.jpg",
      floorHeight: "44%",
      wallWidth: "30%"
    }
  ],
  lightingModes: [
    { id: "daylight", name: "Natural Daylight", filter: "brightness(1) contrast(1.05)" },
    { id: "golden-hour", name: "Golden Sunset Hour", filter: "brightness(0.98) sepia(0.25) saturate(1.3)" },
    { id: "evening", name: "Dramatic Evening Accent", filter: "brightness(0.85) contrast(1.25) hue-rotate(-10deg)" }
  ],
  finishes: [
    { id: "polished", name: "Mirror Polished", overlayOpacity: "0.92", blendMode: "soft-light" },
    { id: "honed", name: "Velvet Honed", overlayOpacity: "0.75", blendMode: "multiply" },
    { id: "leather", name: "Antiqued Leather", overlayOpacity: "0.85", blendMode: "overlay" }
  ],
  stonesAvailable: [
    { id: "makrana-marble", name: "Makrana Marble", category: "Marble", texture: "/assets/images/stone_makrana.jpg", tint: "#f7f7f7" },
    { id: "kota-stone", name: "Kota Stone", category: "Limestone", texture: "/assets/images/stone_kota.jpg", tint: "#6a7b73" },
    { id: "jaisalmer-yellow", name: "Jaisalmer Yellow", category: "Sandstone", texture: "/assets/images/stone_jaisalmer.jpg", tint: "#d9a74a" },
    { id: "black-galaxy-granite", name: "Black Galaxy", category: "Granite", texture: "/assets/images/stone_black_galaxy.jpg", tint: "#111111" },
    { id: "indian-green-marble", name: "Indian Green", category: "Marble", texture: "/assets/images/stone_green_marble.jpg", tint: "#1e3f20" },
    { id: "rajasthan-sandstone", name: "Rajasthan Sandstone", category: "Sandstone", texture: "/assets/images/stone_rajasthan_sandstone.jpg", tint: "#c47a5b" },
    { id: "banswara-purple-marble", name: "Banswara Purple", category: "Marble", texture: "/assets/images/stone_banswara_purple.jpg", tint: "#eae2f0" },
    { id: "dholpur-beige-sandstone", name: "Dholpur Beige", category: "Sandstone", texture: "/assets/images/stone_dholpur_beige.jpg", tint: "#e8dcbe" }
  ]
};

const galleryData = [
  {
    id: "g1",
    title: "Palatial Marble Hallway",
    category: "Interior",
    stone: "Makrana White Marble",
    image: "/assets/images/gallery_palace_floor.jpg",
    caption: "High gloss mirror polished Makrana marble flooring reflecting courtyard fountains in an Udaipur heritage hotel."
  },
  {
    id: "g2",
    title: "Royal Arch & Sandstone Carving",
    category: "Carvings",
    stone: "Rajasthan Sandstone",
    image: "/assets/images/gallery_carved_arch.jpg",
    caption: "Cusped arches with hand-carved floral rosettes and fluted pillars in Jaipur."
  },
  {
    id: "g3",
    title: "Executive Penthouse Bathroom",
    category: "Interior",
    stone: "Verde Green Marble & Makrana",
    image: "/assets/images/gallery_luxury_bath.jpg",
    caption: "Continuous vein slab bathroom ensuite with integrated stone basin and concealed lighting."
  },
  {
    id: "g4",
    title: "Sacred Temple Relief Sculpture",
    category: "Carvings",
    stone: "Jaisalmer Golden Limestone",
    image: "/assets/images/gallery_temple_sculpture.jpg",
    caption: "Artisan carving depicting ancient motifs with three-dimensional depth and razor-sharp shadow relief."
  },
  {
    id: "g5",
    title: "Contemporary Corporate Headquarters",
    category: "Facades",
    stone: "Flamed Granite & Honed Cladding",
    image: "/assets/images/gallery_modern_lobby.jpg",
    caption: "Precision curtain wall facade in New Delhi with monolithic granite columns."
  },
  {
    id: "g6",
    title: "Lotus Carved Stone Fountain",
    category: "Monumental",
    stone: "Makrana Marble & Sandstone",
    image: "/assets/images/gallery_stone_fountain.jpg",
    caption: "Multi-tiered lotus fountain with natural water ripple cascades."
  }
];

const statsData = {
  yearsExperience: "25+",
  stoneVarieties: "100+",
  projectsCompleted: "500+",
  citiesServed: "20+",
  satisfactionRate: "99.8%",
  quarryOwnership: "12 Exclusive Quarries"
};

// Initial database files
function initFile(filename, initialData) {
  const filepath = path.join(dataDir, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

initFile('stones.json', stonesData);
initFile('architecture.json', architectureData);
initFile('heritage_timeline.json', heritageTimelineData);
initFile('applications.json', applicationsData);
initFile('visualizer_presets.json', visualizerPresets);
initFile('gallery.json', galleryData);
initFile('stats.json', statsData);
initFile('inquiries.json', []);
initFile('subscribers.json', []);

function readJson(filename) {
  const filepath = path.join(dataDir, filename);
  try {
    const raw = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return null;
  }
}

function writeJson(filename, data) {
  const filepath = path.join(dataDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  // Stones
  getStones: (filter = {}) => {
    let list = readJson('stones.json') || [];
    if (filter.category && filter.category.toLowerCase() !== 'all') {
      list = list.filter(s => s.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.origin.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.tags && s.tags.some(t => t.toLowerCase().includes(q)))
      );
    }
    return list;
  },
  getStoneById: (id) => {
    const list = readJson('stones.json') || [];
    return list.find(s => s.id === id);
  },

  // Architecture
  getArchitecture: () => {
    return readJson('architecture.json') || [];
  },
  getArchitectureById: (id) => {
    const list = readJson('architecture.json') || [];
    return list.find(a => a.id === id);
  },

  // Heritage Timeline
  getTimeline: () => {
    return readJson('heritage_timeline.json') || [];
  },

  // Applications
  getApplications: () => {
    return readJson('applications.json') || {};
  },

  // Visualizer
  getVisualizerPresets: () => {
    return readJson('visualizer_presets.json') || {};
  },

  // Gallery
  getGallery: (category) => {
    let list = readJson('gallery.json') || [];
    if (category && category.toLowerCase() !== 'all') {
      list = list.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  },

  // Stats
  getStats: () => {
    return readJson('stats.json') || {};
  },

  // Inquiries
  createInquiry: (inquiryData) => {
    const inquiries = readJson('inquiries.json') || [];
    const newInquiry = {
      id: 'INQ-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      status: 'Received',
      ...inquiryData
    };
    inquiries.unshift(newInquiry);
    writeJson('inquiries.json', inquiries);
    return newInquiry;
  },
  getInquiries: () => {
    return readJson('inquiries.json') || [];
  },

  // Newsletter
  addSubscriber: (email, source = 'website_footer') => {
    const subscribers = readJson('subscribers.json') || [];
    const normalized = email.trim().toLowerCase();
    const existing = subscribers.find(s => s.email === normalized);
    if (existing) {
      return { status: 'already_subscribed', message: 'You are already subscribed to our heritage stone newsletter!' };
    }
    const newSub = {
      email: normalized,
      source,
      subscribedAt: new Date().toISOString()
    };
    subscribers.unshift(newSub);
    writeJson('subscribers.json', subscribers);
    return { status: 'success', message: 'Thank you for subscribing! Welcome to ExploreMore Stones.' };
  },
  getSubscribers: () => {
    return readJson('subscribers.json') || [];
  }
};
