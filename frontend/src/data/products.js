// Mock product data for the B2B Chair landing page
export const products = [
  {
    id: 1,
    name: "Aeron Executive",
    category: "executive",
    price: 1895,
    originalPrice: 2195,
    description: "The iconic Aeron chair reimagined for the modern executive. Features advanced PostureFit SL back support, 8Z Pellicle suspension, and fully adjustable arms.",
    shortDescription: "Premium executive ergonomic chair with advanced lumbar support",
    image: "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=800&q=80",
      "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?w=800&q=80",
      "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=800&q=80"
    ],
    colors: ["Graphite", "Mineral", "Carbon"],
    material: "Mesh",
    materialColors: {
      mesh: ["Onyx", "Zinc", "Carbon", "Alpine"],
      frame: ["Graphite", "Mineral", "Satin Carbon", "Polished Aluminum"]
    },
    warranty: "12 Years",
    inStock: true,
    featured: true,
    bestSeller: true,
    new: false,
    rating: 4.9,
    reviews: 342,
    features: [
      "PostureFit SL Back Support",
      "8Z Pellicle Suspension",
      "Fully Adjustable Arms",
      "Tilt Limiter with Seat Angle",
      "Adjustable Lumbar Support"
    ],
    dimensions: {
      width: "27\"",
      depth: "16-18\"",
      height: "41-45\"",
      seatHeight: "16-20.5\""
    },
    weight: "41 lbs"
  },
  {
    id: 2,
    name: "Cosm Mid-Back",
    category: "task",
    price: 1495,
    originalPrice: null,
    description: "Instant comfort without manual adjustments. The Cosm chair uses Auto-Harmonic Tilt to respond to your body's movement naturally.",
    shortDescription: "Self-adjusting task chair with Auto-Harmonic Tilt",
    image: "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=800&q=80",
      "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=800&q=80"
    ],
    colors: ["Glacier", "Nightfall", "Canyon"],
    material: "Mesh",
    materialColors: {
      mesh: ["Glacier", "Nightfall", "Canyon", "Dipped in Color"],
      frame: ["White", "Graphite", "Carbon"]
    },
    warranty: "12 Years",
    inStock: true,
    featured: true,
    bestSeller: false,
    new: true,
    rating: 4.8,
    reviews: 189,
    features: [
      "Auto-Harmonic Tilt",
      "Continuous Frame",
      "Intercept Suspension",
      "Adjustable Height",
      "Leaf Arms"
    ],
    dimensions: {
      width: "26.5\"",
      depth: "17-19\"",
      height: "37-42\"",
      seatHeight: "15.5-21\""
    },
    weight: "38 lbs"
  },
  {
    id: 3,
    name: "Embody Gaming",
    category: "gaming",
    price: 1795,
    originalPrice: null,
    description: "Engineered for gamers and designed for health. Features Cyan gaming colorway and enhanced cooling technology.",
    shortDescription: "Gaming-optimized ergonomic chair with cooling technology",
    image: "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?w=800&q=80",
      "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=800&q=80"
    ],
    colors: ["Cyan", "Sync Onyx", "Nightfall"],
    material: "Sync Fabric",
    materialColors: {
      fabric: ["Sync Black", "Sync Blue", "Sync Cyan", "Sync Nightfall"],
      frame: ["Titanium", "Matte Black", "White"]
    },
    warranty: "12 Years",
    inStock: true,
    featured: false,
    bestSeller: true,
    new: false,
    rating: 4.7,
    reviews: 256,
    features: [
      "Pixelated Support",
      "Backfit Adjustment",
      "Copper-infused Cooling Foam",
      "4D Adjustable Arms",
      "Enhanced Breathability"
    ],
    dimensions: {
      width: "29.5\"",
      depth: "15-18\"",
      height: "42-45\"",
      seatHeight: "16-20.5\""
    },
    weight: "51 lbs"
  },
  {
    id: 4,
    name: "Mirra 2",
    category: "task",
    price: 1095,
    originalPrice: 1295,
    description: "A lighter approach to serious ergonomics. The Mirra 2 offers exceptional back support with its Butterfly Back design.",
    shortDescription: "Lightweight ergonomic task chair with Butterfly Back",
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?w=800",
    gallery: [
      "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?w=800",
      "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=800&q=80"
    ],
    colors: ["Graphite", "Alpine", "Slate Grey"],
    material: "Polymer",
    materialColors: {
      polymer: ["Graphite", "Slate Grey", "Dark Turquoise", "Studio White"],
      frame: ["Graphite", "Studio White", "Fog"]
    },
    warranty: "12 Years",
    inStock: true,
    featured: false,
    bestSeller: false,
    new: false,
    rating: 4.6,
    reviews: 178,
    features: [
      "Butterfly Back",
      "FlexFront Seat Edge",
      "PostureFit Sacral Support",
      "Harmonic 2 Tilt",
      "Recycled Content"
    ],
    dimensions: {
      width: "26.8\"",
      depth: "16-18\"",
      height: "37-42\"",
      seatHeight: "16-20.5\""
    },
    weight: "36 lbs"
  },
  {
    id: 5,
    name: "Sayl Chair",
    category: "task",
    price: 695,
    originalPrice: null,
    description: "Inspired by suspension bridges, the Sayl chair delivers ergonomic support with minimal materials.",
    shortDescription: "Bridge-inspired design with minimal environmental impact",
    image: "https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?w=800&q=80",
      "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=800&q=80"
    ],
    colors: ["Black", "White", "Red"],
    material: "Elastomer",
    materialColors: {
      elastomer: ["Black", "White", "Red", "Green Apple", "Berry Blue"],
      frame: ["Black", "White", "Fog"]
    },
    warranty: "12 Years",
    inStock: true,
    featured: true,
    bestSeller: false,
    new: false,
    rating: 4.5,
    reviews: 412,
    features: [
      "Y-Tower Suspension",
      "ArcSpan Back",
      "PostureFit Support",
      "Adjustable Height",
      "Sustainable Design"
    ],
    dimensions: {
      width: "24.5\"",
      depth: "16-18\"",
      height: "35-39\"",
      seatHeight: "15.5-20.5\""
    },
    weight: "28 lbs"
  },
  {
    id: 6,
    name: "Eames Executive",
    category: "executive",
    price: 5495,
    originalPrice: null,
    description: "Timeless design meets executive comfort. The Eames Executive Chair represents the pinnacle of mid-century modern design.",
    shortDescription: "Iconic mid-century design with premium leather",
    image: "https://images.unsplash.com/photo-1571829604981-ea159f94e5ad?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571829604981-ea159f94e5ad?w=800&q=80",
      "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?w=800&q=80"
    ],
    colors: ["Oatmeal", "Black", "Ivory"],
    material: "MCL Leather",
    materialColors: {
      leather: ["Oatmeal", "Black", "Ivory", "Vicuna", "Walnut", "MCL Mahogany"],
      frame: ["Polished Aluminum", "White", "Black"]
    },
    warranty: "5 Years",
    inStock: false,
    featured: true,
    bestSeller: false,
    new: false,
    rating: 4.9,
    reviews: 89,
    features: [
      "Die-cast Aluminum Frame",
      "MCL Premium Leather",
      "Pneumatic Height Adjustment",
      "Tilt & Swivel",
      "5-star Base"
    ],
    dimensions: {
      width: "23.25\"",
      depth: "23.25\"",
      height: "40-44\"",
      seatHeight: "17.5-21.5\""
    },
    weight: "45 lbs"
  },
  {
    id: 7,
    name: "Verus Chair",
    category: "task",
    price: 575,
    originalPrice: null,
    description: "Performance seating for any space. The Verus chair offers essential ergonomics at an accessible price.",
    shortDescription: "Essential ergonomics for every workspace",
    image: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=800&q=80",
      "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=800&q=80"
    ],
    colors: ["Black", "Berry Blue", "Nightfall"],
    material: "Mesh",
    warranty: "12 Years",
    inStock: true,
    featured: false,
    bestSeller: false,
    new: true,
    rating: 4.4,
    reviews: 156,
    features: [
      "TriFlex Back",
      "Seat Depth Adjustment",
      "Adjustable Lumbar",
      "Height Adjustable Arms",
      "Tilt Tension"
    ],
    dimensions: {
      width: "25.8\"",
      depth: "16-18\"",
      height: "36-40\"",
      seatHeight: "16-20\""
    },
    weight: "31 lbs"
  },
  {
    id: 8,
    name: "Fuld Nesting",
    category: "guest",
    price: 895,
    originalPrice: null,
    description: "Saves space without sacrificing comfort. The Fuld Nesting Chair is perfect for conference rooms and collaborative spaces.",
    shortDescription: "Space-saving nesting chair for collaborative spaces",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
      "https://images.unsplash.com/photo-1549399905-5d1bad747576?w=800&q=80"
    ],
    colors: ["Nightfall", "Glacier", "Ochre"],
    material: "3D Knit",
    warranty: "12 Years",
    inStock: true,
    featured: false,
    bestSeller: false,
    new: true,
    rating: 4.3,
    reviews: 67,
    features: [
      "Nesting Capability",
      "3D Knit Textile",
      "FlexNet Seat",
      "Stackable Design",
      "Lightweight Frame"
    ],
    dimensions: {
      width: "22\"",
      depth: "21\"",
      height: "32\"",
      seatHeight: "18\""
    },
    weight: "18 lbs"
  }
];

export const categories = [
  { id: "all", name: "All Chairs", count: 8 },
  { id: "executive", name: "Executive", count: 2 },
  { id: "task", name: "Task Chairs", count: 4 },
  { id: "gaming", name: "Gaming", count: 1 },
  { id: "guest", name: "Guest & Nesting", count: 1 }
];

export const materials = [
  "All Materials",
  "Mesh",
  "Leather",
  "Fabric",
  "Polymer"
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" }
];

export const clients = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "VP of Operations",
    company: "TechCorp Industries",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    quote: "The transformation in our employees' wellbeing has been remarkable. Since upgrading to premium ergonomic seating, we've seen a 40% reduction in reported back pain and a noticeable boost in productivity.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Torres",
    role: "Facilities Director",
    company: "Global Finance Ltd",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    quote: "The B2B service has been exceptional. From consultation to installation across our 50 offices, the team delivered on every promise. Quality that speaks for itself.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "HR Manager",
    company: "Creative Studios",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    quote: "Our designers spend 10+ hours daily at their desks. These chairs have become an essential part of our creative process - comfort that enables creativity.",
    rating: 5
  }
];

export const stats = [
  { value: "31+", label: "Years of Excellence" },
  { value: "50K+", label: "Chairs Delivered" },
  { value: "500+", label: "Corporate Clients" },
  { value: "12", label: "Year Warranty" }
];
