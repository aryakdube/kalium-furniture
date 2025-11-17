const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kalium_furniture';

const sampleProducts = [
  // MIRRORS
  {
    name: "Tact Mirror",
    price: "199.00",
    originalPrice: "245.00",
    currencySymbol: "$",
    features: "Resin mirror with prismatic design.",
    description: "The Tact Mirror by Tacchini features prismatic surfaces that reflect light and emotions with delicate intensity. Made of colored resin, it adds a contemporary touch to any space.",
    dimensions: "50 × 7 × 70 cm",
    materials: "Colored resin",
    finish: "Prismatic resin finish",
    designer: "Tacchini",
    countryOfOrigin: "Italy",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "TAC-MIR-001",
    category: "mirrors",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tact-mirror-1.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tact-mirror-1-220x220.jpeg",
        alt: "Tact Mirror"
      }
    ],
    reviews: [
      {
        author: "Sarah Mitchell",
        rating: 5,
        comment: "Absolutely stunning mirror! The prismatic design creates such beautiful light reflections throughout my living room. The quality is exceptional and it arrived perfectly packaged. Highly recommend!",
        date: new Date('2024-10-15')
      },
      {
        author: "James Chen",
        rating: 4,
        comment: "Love the modern aesthetic of this mirror. The resin finish is unique and adds character to my space. Only minor issue is it's a bit smaller than I expected, but the design quality makes up for it.",
        date: new Date('2024-11-02')
      }
    ]
  },
  {
    name: "Freestanding Aluminium Mirror",
    price: "349.00",
    originalPrice: "425.00",
    currencySymbol: "$",
    features: "Modern freestanding mirror with sleek aluminium frame. Versatile design that can be placed anywhere in your home for functional elegance.",
    description: "The Freestanding Aluminium Mirror is a contemporary masterpiece that combines functionality with minimalist design. Crafted from lightweight yet durable aluminium, this mirror features a sleek frame that complements any interior style. Its freestanding design offers maximum flexibility, allowing you to position it exactly where you need it—whether in a bedroom, hallway, or living space. The polished aluminium finish reflects light beautifully, creating a sense of spaciousness while adding a touch of modern sophistication to your decor.",
    dimensions: "80 × 5 × 100 cm",
    materials: "Aluminium frame with premium glass",
    finish: "Polished aluminium finish",
    designer: "Modern Design Studio",
    countryOfOrigin: "Germany",
    importerPackerMarketer: "European Home Collections",
    articleNumber: "FAM-ALU-2024",
    category: "mirrors",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-mirror-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-mirror-3-220x220.jpeg",
        alt: "Freestanding Aluminium Mirror"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-2-220x220.jpeg",
        alt: "Freestanding Aluminium Mirror Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-3-220x220.jpeg",
        alt: "Freestanding Aluminium Mirror Side"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-4-220x220.jpeg",
        alt: "Freestanding Aluminium Mirror in Room"
      }
    ],
    reviews: [
      {
        author: "Emma Thompson",
        rating: 5,
        comment: "Perfect mirror for my bedroom! The freestanding design is so convenient - I can move it wherever I need. The aluminium frame is lightweight yet sturdy, and the reflection is crystal clear. Excellent purchase!",
        date: new Date('2024-09-20')
      },
      {
        author: "Michael Rodriguez",
        rating: 4,
        comment: "Great quality mirror with a sleek modern look. The aluminium finish is beautiful and matches my contemporary decor perfectly. Only wish it was slightly taller, but overall very satisfied with the purchase.",
        date: new Date('2024-10-08')
      }
    ]
  },
  {
    name: "Tilting Table-Top Brass Mirror",
    price: "279.00",
    originalPrice: null,
    currencySymbol: "$",
    features: "Elegant table-top mirror with tilting mechanism and handcrafted brass frame. Perfect for vanities, desks, or bedside tables.",
    description: "The Tilting Table-Top Brass Mirror is a sophisticated addition to any space, combining classic elegance with practical functionality. The handcrafted brass frame features a smooth tilting mechanism that allows you to adjust the angle for optimal viewing. This versatile mirror is perfect for vanities, dressing tables, or bedside settings, providing both style and utility. The warm brass finish adds a luxurious touch to any interior, while the adjustable design ensures you always have the perfect reflection angle. Part of our Classic Collection, this mirror brings timeless sophistication to modern living.",
    dimensions: "45 × 8 × 60 cm",
    materials: "Brass frame with premium glass",
    finish: "Polished brass finish",
    designer: "Heritage Design Studio",
    countryOfOrigin: "Italy",
    importerPackerMarketer: "Mediterranean Home Furnishings",
    articleNumber: "TTBM-BRASS-5678",
    category: "mirrors",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-mirror-1.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-mirror-1.jpeg",
        alt: "Tilting Table-Top Brass Mirror"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-2-220x220.jpeg",
        alt: "Tilting Table-Top Brass Mirror Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-3-220x220.jpeg",
        alt: "Tilting Table-Top Brass Mirror Close-up"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-4-220x220.jpeg",
        alt: "Tilting Table-Top Brass Mirror on Table"
      }
    ],
    reviews: [
      {
        author: "Olivia Williams",
        rating: 5,
        comment: "This mirror is absolutely perfect for my vanity! The tilting mechanism works smoothly and the brass finish is gorgeous. It's exactly the right size and adds such elegance to my dressing area. Love it!",
        date: new Date('2024-10-25')
      },
      {
        author: "David Park",
        rating: 4,
        comment: "Beautiful craftsmanship and the brass has a lovely warm tone. The tilting feature is very useful. The only thing is it's a bit heavy, but that actually makes it feel more premium. Great quality overall.",
        date: new Date('2024-11-10')
      }
    ]
  },
  {
    name: "Ultrafragola Mirror",
    price: "1,299.00",
    originalPrice: "1,599.00",
    currencySymbol: "$",
    features: "Iconic wavy mirror design by Ettore Sottsass. A legendary piece that combines art and functionality in a stunning statement mirror.",
    description: "The Ultrafragola Mirror is an iconic design masterpiece by Ettore Sottsass, representing the pinnacle of Italian design innovation. This legendary mirror features the distinctive wavy, organic frame that has made it one of the most recognizable pieces in modern design history. The undulating curves create a soft, feminine silhouette that transforms any space into a work of art. More than just a mirror, this is a sculptural statement piece that reflects both light and the bold aesthetic of postmodern design. The Ultrafragola has graced the pages of design magazines and the homes of design enthusiasts for decades, making it a true collector's item that combines timeless beauty with contemporary appeal.",
    dimensions: "100 × 10 × 140 cm",
    materials: "Resin frame with premium glass",
    finish: "White resin with glossy finish",
    designer: "Ettore Sottsass",
    countryOfOrigin: "Italy",
    importerPackerMarketer: "Italian Design Imports Ltd.",
    articleNumber: "UFM-SOTTSASS-9012",
    category: "mirrors",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-13.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-1-220x220.jpeg",
        alt: "Ultrafragola Mirror"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-14.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-2-220x220.jpeg",
        alt: "Ultrafragola Mirror Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-3-220x220.jpeg",
        alt: "Ultrafragola Mirror Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-4-220x220.jpeg",
        alt: "Ultrafragola Mirror Installation"
      }
    ],
    reviews: [
      {
        author: "Sophie Anderson",
        rating: 5,
        comment: "An absolute masterpiece! This is more than a mirror - it's a work of art. The iconic wavy design by Sottsass is breathtaking and becomes the focal point of any room. Worth every penny for such an iconic design piece.",
        date: new Date('2024-08-15')
      },
      {
        author: "Robert Kim",
        rating: 5,
        comment: "Incredible design piece that exceeded all expectations. The quality is outstanding and the resin finish is flawless. This mirror transforms my entire living space. A true collector's item that I'm proud to own.",
        date: new Date('2024-09-30')
      }
    ]
  },
  // RUGS
  {
    name: "New Zealand Wool Runner",
    price: "1,299.00",
    currencySymbol: "$",
    features: "A handwoven runner crafted from 100% New Zealand wool, featuring subtle monochrome contrasts and a broken twill pattern.",
    description: "The New Zealand Wool Runner by Bomat is part of the Clayscape Collection, inspired by the rich diversity found in nature. With its classic appearance and subtle monochrome contrasts, this runner is highly suitable for an all-over application. The broken twill pattern refers to traditional weaving techniques, adding a touch of heritage to its design.",
    dimensions: "300 × 80 × 0.8 cm",
    materials: "100% New Zealand wool",
    finish: "Natural wool finish with protective treatment",
    designer: "Bomat",
    countryOfOrigin: "New Zealand",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "NZ-WOOL-RUNNER-001",
    category: "rugs",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-1.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-1-220x220.jpeg",
        alt: "New Zealand Wool Runner"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-2-220x220.jpeg",
        alt: "New Zealand Wool Runner Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-3-220x220.jpeg",
        alt: "New Zealand Wool Runner Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-4-220x220.jpeg",
        alt: "New Zealand Wool Runner in Room"
      }
    ],
    reviews: [
      {
        author: "Charlotte Brown",
        rating: 5,
        comment: "Beautiful handwoven runner that adds warmth and texture to my hallway. The monochrome pattern is subtle yet elegant, and the quality of the New Zealand wool is exceptional. It's soft underfoot and looks stunning!",
        date: new Date('2024-10-12')
      },
      {
        author: "Thomas Wilson",
        rating: 4,
        comment: "Great quality rug with a classic design. The broken twill pattern adds interest without being overwhelming. The wool is durable and has held up well in a high-traffic area. Very pleased with this purchase.",
        date: new Date('2024-11-05')
      }
    ]
  },
  {
    name: "Handcrafted Jute Accent Rug",
    price: "1,299.00",
    currencySymbol: "₹",
    features: "Eco-friendly hand-braided jute rug with a natural texture and durable build. Ideal for living rooms, hallways, and minimalistic home décor settings. Its earthy tones blend seamlessly with modern and rustic interiors.",
    description: "This handcrafted jute accent rug is part of our Sustainable Living Collection, designed for eco-conscious homes. Each rug is handwoven by skilled artisans using traditional techniques passed down through generations. The natural jute fibers provide excellent durability while maintaining a soft, comfortable feel underfoot. Perfect for high-traffic areas, this rug is both practical and stylish, bringing warmth and texture to any space.",
    dimensions: "200 × 150 × 0.8 cm",
    materials: "100% Natural Jute",
    finish: "Natural jute finish with protective coating",
    designer: "Urban Artisan Studio",
    countryOfOrigin: "India",
    importerPackerMarketer: "EarthWeave Home Furnishings Pvt. Ltd.",
    articleNumber: "JW-ACCENT-5721",
    category: "rugs",
    images: [],
    reviews: [
      {
        author: "Lisa Martinez",
        rating: 4,
        comment: "Love the natural jute texture! This rug brings an earthy, organic feel to my living room. It's durable and easy to clean. The neutral color works perfectly with my minimalist decor. Great value for money.",
        date: new Date('2024-09-18')
      },
      {
        author: "Kevin Johnson",
        rating: 5,
        comment: "Perfect eco-friendly addition to my home. The hand-braided construction is evident in the quality. It's comfortable to walk on and adds just the right amount of texture. Highly recommend for anyone looking for sustainable home decor.",
        date: new Date('2024-10-22')
      }
    ]
  },
  {
    name: "Rectangular PET Rug",
    price: "1,850.00",
    currencySymbol: "$",
    features: "Eco-friendly rectangular rug made from recycled PET fibers. Durable, stain-resistant, and perfect for high-traffic areas. Combines sustainability with modern design aesthetics.",
    description: "The Rectangular PET Rug is a testament to sustainable design innovation, crafted entirely from recycled PET (polyethylene terephthalate) fibers. This eco-conscious rug transforms plastic bottles into a beautiful, durable floor covering that's both stylish and environmentally responsible. The rectangular shape makes it versatile for any room layout, while the PET fibers provide exceptional durability and easy maintenance. Perfect for families and pet owners, this rug resists stains and moisture while maintaining its vibrant colors and soft texture. Part of our Eco-Collection, it proves that sustainable choices don't mean compromising on style or quality.",
    dimensions: "300 × 100 × 1.2 cm",
    materials: "100% Recycled PET Fibers",
    finish: "PET fiber finish with stain-resistant treatment",
    designer: "Eco Design Studio",
    countryOfOrigin: "United States",
    importerPackerMarketer: "Sustainable Home Solutions Inc.",
    articleNumber: "RPR-PET-2024",
    category: "rugs",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/pet-rug-5.jpeg",
        alt: "Rectangular PET Rug"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-2-220x220.jpeg",
        alt: "Rectangular PET Rug Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-3-220x220.jpeg",
        alt: "Rectangular PET Rug Texture"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-4-220x220.jpeg",
        alt: "Rectangular PET Rug in Room"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-5.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-5-220x220.jpeg",
        alt: "Rectangular PET Rug Close-up"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-6.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-6-220x220.jpeg",
        alt: "Rectangular PET Rug Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-7.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-7-220x220.jpeg",
        alt: "Rectangular PET Rug Installation"
      }
    ],
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ]
  },
  {
    name: "Sticky Tape Rug",
    price: "3,500.00",
    currencySymbol: "$",
    features: "Innovative rug design featuring adhesive tape construction. Unique modular approach that allows for easy installation and creative customization. A modern take on traditional floor coverings.",
    description: "The Sticky Tape Rug represents a revolutionary approach to floor design, combining functionality with avant-garde aesthetics. This innovative rug utilizes a unique adhesive tape construction method that creates a distinctive texture and visual appeal. The modular design allows for creative installation patterns, making each installation a unique work of art. Perfect for contemporary spaces seeking something truly different, this rug challenges traditional notions of floor coverings while providing practical benefits like easy cleaning and repositioning. The adhesive tape construction creates a durable surface that's both comfortable underfoot and visually striking, making it a conversation piece for any modern interior.",
    dimensions: "400 × 300 × 1.5 cm",
    materials: "Adhesive Tape with Synthetic Backing",
    finish: "Tape construction with protective coating",
    designer: "Innovative Design Collective",
    countryOfOrigin: "Japan",
    importerPackerMarketer: "Modern Floor Solutions Ltd.",
    articleNumber: "STR-TAPE-7890",
    category: "rugs",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-1-220x220.jpeg",
        alt: "Sticky Tape Rug"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-2-220x220.jpeg",
        alt: "Sticky Tape Rug Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-3-220x220.jpeg",
        alt: "Sticky Tape Rug Texture"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-4-220x220.jpeg",
        alt: "Sticky Tape Rug in Room"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-5.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-5-220x220.jpeg",
        alt: "Sticky Tape Rug Close-up"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-6.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-6-220x220.jpeg",
        alt: "Sticky Tape Rug Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-7.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-7-220x220.jpeg",
        alt: "Sticky Tape Rug Installation"
      }
    ],
    reviews: [
      {
        author: "Rachel Green",
        rating: 5,
        comment: "This is the most unique and conversation-starting rug I've ever owned! The adhesive tape construction is innovative and creates such an interesting texture. It's surprisingly comfortable and easy to maintain. A true statement piece!",
        date: new Date('2024-08-22')
      },
      {
        author: "Mark Stevens",
        rating: 4,
        comment: "Fascinating design that really stands out. The modular approach allows for creative placement. It's durable and the texture is interesting. The only thing is it took a bit to get used to the look, but now I love how unique it is.",
        date: new Date('2024-09-28')
      }
    ]
  },
  {
    name: "Bamboo Silk and Wool Rug",
    price: "899.00",
    currencySymbol: "€",
    features: "Luxurious blend of bamboo silk and premium wool. Combines the softness of silk with the durability of wool. Natural materials create a sophisticated, eco-friendly floor covering.",
    description: "The Bamboo Silk and Wool Rug is a harmonious blend of two exceptional natural fibers, creating a floor covering that's both luxurious and practical. Bamboo silk, derived from bamboo plants, provides an incredibly soft texture and natural sheen, while premium wool adds durability, warmth, and natural stain resistance. This unique combination results in a rug that feels sumptuous underfoot while standing up to daily use. The natural fibers are sustainably sourced and create a hypoallergenic environment, making it perfect for homes with children or allergy sufferers. The blend of these two materials creates a subtle, sophisticated texture that complements both traditional and contemporary interiors, while the natural color variations add depth and character to any space.",
    dimensions: "250 × 180 × 1.0 cm",
    materials: "60% Bamboo Silk, 40% Premium Wool",
    finish: "Natural fiber finish with protective treatment",
    designer: "Natural Living Design",
    countryOfOrigin: "China",
    importerPackerMarketer: "Asian Home Textiles Ltd.",
    articleNumber: "BSW-NAT-4567",
    category: "rugs",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bam-boo-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-1-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-2-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-3-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Texture"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-4-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug in Room"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-5.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-5-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Close-up"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-6.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-6-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-7.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-7-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Installation"
      }
    ],
    reviews: [
      {
        author: "Jennifer Taylor",
        rating: 5,
        comment: "Absolutely luxurious! The blend of bamboo silk and wool creates the perfect combination of softness and durability. It feels amazing underfoot and the natural sheen from the bamboo silk is beautiful. This rug elevates my entire bedroom!",
        date: new Date('2024-10-30')
      },
      {
        author: "Christopher Moore",
        rating: 5,
        comment: "Exceptional quality and comfort. The natural fibers are hypoallergenic which is perfect for my family. The texture is sophisticated and the color variations add depth. It's both beautiful and practical - exactly what I was looking for.",
        date: new Date('2024-11-12')
      }
    ]
  }
];

const sampleCategories = [
  {
    name: "Home Decor",
    slug: "decor",
    description: "Transform your living space with our curated collection of home decor. From elegant mirrors that reflect your style to handwoven rugs that add warmth, premium textiles that bring comfort, and beautiful vases that complete your aesthetic—discover pieces that make your house a home.",
    isActive: true
  },
  {
    name: "Mirrors",
    slug: "mirrors",
    description: "Discover our collection of elegant mirrors designed to enhance any room. From modern prismatic designs to classic decorative pieces, our mirrors combine functionality with artistic beauty to reflect your unique style and expand your space visually.",
    isActive: true
  },
  {
    name: "Rugs",
    slug: "rugs",
    description: "Explore our premium collection of handwoven rugs and runners crafted from the finest materials. Each piece combines traditional weaving techniques with contemporary design, adding texture, warmth, and character to your floors while maintaining exceptional quality and durability.",
    isActive: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products (optional - comment out if you want to keep existing data)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    // Insert or update sample products
    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ articleNumber: productData.articleNumber });
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
        console.log(`Created product: ${product.name}`);
      } else {
        // Update existing product with reviews if they don't exist or are different
        if (productData.reviews && productData.reviews.length > 0) {
          existingProduct.reviews = productData.reviews;
          await existingProduct.save();
          console.log(`Updated product with reviews: ${productData.name}`);
        } else {
          console.log(`Product already exists: ${productData.name}`);
        }
      }
    }

    // Insert or update categories
    for (const categoryData of sampleCategories) {
      const existingCategory = await Category.findOne({ slug: categoryData.slug });
      if (!existingCategory) {
        const category = new Category(categoryData);
        await category.save();
        console.log(`Created category: ${category.name}`);
      } else {
        // Update existing category
        existingCategory.name = categoryData.name;
        existingCategory.description = categoryData.description;
        existingCategory.isActive = categoryData.isActive;
        await existingCategory.save();
        console.log(`Updated category: ${categoryData.name}`);
      }
    }

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

