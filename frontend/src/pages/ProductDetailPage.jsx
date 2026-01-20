import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products } from "@/data/products";
import { toast } from "sonner";
import {
  Star,
  Heart,
  Share2,
  ShoppingBag,
  Check,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Download,
  FileText,
  Box,
  Palette,
  Ruler,
  Play,
  Users,
  Leaf,
  Award,
  ExternalLink,
  ImageIcon,
  Info,
  Lightbulb,
  Briefcase,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Find product using useMemo to avoid setState in effect
  const product = useMemo(() => {
    return products.find((p) => p.id === parseInt(id)) || null;
  }, [id]);
  
  // Initialize selectedColor based on product
  const [selectedColor, setSelectedColor] = useState(() => {
    const found = products.find((p) => p.id === parseInt(id));
    return found ? found.colors[0] : "";
  });

  // Initialize material colors based on product
  const [selectedMaterialColors, setSelectedMaterialColors] = useState(() => {
    const found = products.find((p) => p.id === parseInt(id));
    if (found && found.materialColors) {
      const initialColors = {};
      Object.keys(found.materialColors).forEach((key) => {
        initialColors[key] = found.materialColors[key][0];
      });
      return initialColors;
    }
    return {};
  });

  // Helper to update material color selection
  const handleMaterialColorChange = (materialType, color) => {
    setSelectedMaterialColors((prev) => ({
      ...prev,
      [materialType]: color,
    }));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Product not found
          </h2>
          <Link to="/products">
            <Button variant="premium">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to cart`, {
      description: `Color: ${selectedColor}`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleContactDealer = () => {
    toast.success("Contact request sent", {
      description: "A dealer will reach out to you shortly.",
    });
  };

  // Mock design story content
  const designStory = {
    title: `The Story Behind ${product.name}`,
    designer: "Studio 7.5",
    introduction: `The ${product.name} was meticulously designed to address the evolving needs of the modern workplace. Our design team spent over 18 months researching, prototyping, and refining every detail.`,
    philosophy: `We believe that exceptional seating isn't just about comfort—it's about enhancing human performance. The ${product.name} embodies this philosophy through its innovative approach to ergonomics and sustainability.`,
    process: `Through extensive user research and over 50 functional prototypes, we refined the ${product.name} to deliver optimal support without complexity. Every adjustment mechanism, every curve, and every material choice was deliberate.`,
    sustainability: `Sustainability is built into the DNA of ${product.name}. From the selection of recyclable materials to our manufacturing processes, we've minimized environmental impact while maximizing product longevity.`,
  };

  // Mock pro resources
  const proResources = [
    {
      type: "3D Models",
      icon: Box,
      items: [
        { name: `${product.name} - Revit Family`, format: ".rfa", size: "2.4 MB" },
        { name: `${product.name} - SketchUp`, format: ".skp", size: "1.8 MB" },
        { name: `${product.name} - AutoCAD`, format: ".dwg", size: "890 KB" },
      ],
    },
    {
      type: "Specifications",
      icon: FileText,
      items: [
        { name: "Product Specifications Sheet", format: ".pdf", size: "1.2 MB" },
        { name: "Installation Guide", format: ".pdf", size: "3.5 MB" },
        { name: "Care & Maintenance", format: ".pdf", size: "520 KB" },
      ],
    },
    {
      type: "Marketing",
      icon: ImageIcon,
      items: [
        { name: "High-Resolution Images", format: ".zip", size: "45 MB" },
        { name: "Product Video", format: ".mp4", size: "120 MB" },
        { name: "Brochure", format: ".pdf", size: "8.2 MB" },
      ],
    },
  ];

  // Extended gallery for the images tab
  const extendedGallery = [
    ...product.gallery,
    "https://images.unsplash.com/photo-1549399905-5d1bad747576?w=800&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=800&q=80",
  ];

  // Quick links for navigation
  const quickLinks = [
    { icon: Box, label: "3D Models", href: "#pro-resources" },
    { icon: Palette, label: "Materials", href: "#materials" },
    { icon: Ruler, label: "Dimensions", href: "#dimensions" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              to="/products"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Navigation Tabs */}
      <div className="sticky top-[72px] z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: "overview", label: "Overview" },
              { id: "specs", label: "Specs" },
              { id: "design-story", label: "Design Story" },
              { id: "pro-resources", label: "Pro Resources" },
              { id: "images", label: "Product Images" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-16">
              {/* Hero Section */}
              <section className="grid lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div>
                  <div className="relative aspect-square bg-muted/30 rounded-xl overflow-hidden mb-4 group">
                    {product.new && (
                      <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                        New
                      </Badge>
                    )}
                    <img
                      src={product.gallery[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-contain p-8 cursor-zoom-in"
                      onClick={() => setLightboxOpen(true)}
                    />
                    <button 
                      className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setLightboxOpen(true)}
                    >
                      <ZoomIn className="w-5 h-5 text-foreground" />
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {product.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "aspect-square bg-muted/30 rounded-lg overflow-hidden p-2 transition-all",
                          selectedImage === index
                            ? "ring-2 ring-accent"
                            : "hover:ring-2 hover:ring-border"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Quick Links */}
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
                    {quickLinks.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(link.href.includes("pro") ? "pro-resources" : "specs")}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Designed by {designStory.designer}
                  </div>
                  <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-premium-gold fill-premium-gold"
                            : "text-muted"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-3xl font-bold text-foreground">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                        <Badge variant="secondary" className="text-success">
                          Save $
                          {(product.originalPrice - product.price).toLocaleString()}
                        </Badge>
                      </>
                    )}
                  </div>

                  {/* Color Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Color: <span className="text-muted-foreground">{selectedColor}</span>
                    </label>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                            selectedColor === color
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-foreground">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.inStock ? (
                          <span className="flex items-center gap-1 text-success">
                            <Check className="w-4 h-4" /> In Stock
                          </span>
                        ) : (
                          <span className="text-destructive">Out of Stock</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 mb-8">
                    <Button
                      variant="premium"
                      size="lg"
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleWishlist}
                      className={cn(
                        isWishlisted && "text-destructive border-destructive"
                      )}
                    >
                      <Heart
                        className={cn("w-5 h-5", isWishlisted && "fill-current")}
                      />
                    </Button>
                    <Button variant="outline" size="lg" onClick={handleShare}>
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mb-8"
                    onClick={handleContactDealer}
                  >
                    Contact a Dealer
                  </Button>

                  {/* Benefits */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Truck className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          Free Shipping
                        </div>
                        <div className="text-xs text-muted-foreground">On orders $500+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Shield className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {product.warranty}
                        </div>
                        <div className="text-xs text-muted-foreground">Warranty</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <RotateCcw className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">30-Day</div>
                        <div className="text-xs text-muted-foreground">Returns</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Grid */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                  Effortless comfort, anywhere
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                        <img
                          src={product.image}
                          alt=""
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{feature}</h3>
                        <p className="text-sm text-muted-foreground">
                          Engineered for optimal performance and designed to support your natural movements throughout the day.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Specs Preview */}
              <section className="bg-secondary/30 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Specs</h2>
                  <Button variant="link" onClick={() => setActiveTab("specs")} className="text-accent">
                    View all specs <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <p className="text-muted-foreground mb-6">
                  Dimensions, materials, details and available options that make up the {product.name}.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(product.dimensions).slice(0, 4).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-sm text-muted-foreground capitalize mb-1">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="text-lg font-semibold text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Design Story Preview */}
              <section className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-[4/3] bg-muted/30 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1549399905-5d1bad747576?w=800&q=80"
                    alt="Design process"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Design Story</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {designStory.introduction}
                  </p>
                  <Button variant="link" onClick={() => setActiveTab("design-story")} className="text-accent p-0">
                    Read the Design Story <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </section>
            </div>
          )}

          {/* Specs Tab */}
          {activeTab === "specs" && (
            <div className="space-y-16">
              {/* Dimensions Section */}
              <section id="dimensions">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Dimensions</h2>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="aspect-[4/3] bg-muted/30 rounded-xl flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={`${product.name} dimensions`}
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-6">{product.name}</h3>
                    <dl className="space-y-4">
                      {Object.entries(product.dimensions).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-3 border-b border-border"
                        >
                          <dt className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </dt>
                          <dd className="font-medium text-foreground">{value}</dd>
                        </div>
                      ))}
                      <div className="flex justify-between py-3 border-b border-border">
                        <dt className="text-muted-foreground">Weight</dt>
                        <dd className="font-medium text-foreground">{product.weight}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              {/* Materials Section */}
              <section id="materials">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Materials</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <div className="aspect-square bg-muted/30 rounded-lg mb-4 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1571829604981-ea159f94e5ad?w=400&q=80"
                          alt="Finishes"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Finishes</h3>
                      <p className="text-sm text-muted-foreground">Frame, arm and base options</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <div className="aspect-square bg-muted/30 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={product.image}
                          alt="Textiles"
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Textiles</h3>
                      <p className="text-sm text-muted-foreground">{product.material} and upholstered options</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <div className="aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center">
                        <Palette className="w-16 h-16 text-muted-foreground/30" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Colors</h3>
                      <p className="text-sm text-muted-foreground">{product.colors.join(", ")}</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Features Section */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Features</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.features.map((feature, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-6">
                        <div className="aspect-video bg-muted/30 rounded-lg mb-4 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={feature}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                        <h3 className="font-semibold text-foreground">{feature}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Sustainability & Warranty */}
              <section className="grid md:grid-cols-2 gap-8">
                <Card className="border-border/50">
                  <CardContent className="p-8 flex gap-6">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-8 h-8 text-success" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">Sustainability</h3>
                      <p className="text-muted-foreground mb-4">
                        We&apos;re committed to sustainability in everything we do: the materials we use, 
                        our manufacturing processes and our products&apos; recyclability.
                      </p>
                      <Button variant="link" className="text-accent p-0">
                        Track our progress <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-8 flex gap-6">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">Warranty</h3>
                      <p className="text-muted-foreground mb-4">
                        We stand behind the quality and performance of our products with a {product.warranty}, 
                        3-shift warranty, with limited exceptions.
                      </p>
                      <Button variant="link" className="text-accent p-0">
                        Learn more <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          )}

          {/* Design Story Tab */}
          {activeTab === "design-story" && (
            <div className="max-w-4xl mx-auto space-y-16">
              <section>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  {product.name} by {designStory.designer}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {designStory.introduction}
                </p>
              </section>

              <div className="aspect-video bg-muted/30 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1549399905-5d1bad747576?w=1200&q=80"
                  alt="Design process"
                  className="w-full h-full object-cover"
                />
              </div>

              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt="Design detail"
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Meticulous prototyping helped {product.name} become what it is today.
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {designStory.philosophy}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {designStory.process}
                  </p>
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                    Every molecule counts
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {designStory.sustainability}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    As our design studio continues to evolve, so does the way we work, 
                    and it takes different thinking to support the changes. That&apos;s why we created {product.name}, 
                    a chair that proves that sometimes less is really more.
                  </p>
                </div>
                <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80"
                    alt="Sustainability"
                    className="w-full h-full object-cover"
                  />
                </div>
              </section>

              {/* Designer Card */}
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
                      <Users className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                        {designStory.designer}
                      </h3>
                      <p className="text-muted-foreground mb-3">Award-winning design studio</p>
                      <Button variant="link" className="text-accent p-0">
                        Meet the Designers <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Pro Resources Tab */}
          {activeTab === "pro-resources" && (
            <div className="space-y-12">
              <div>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Pro Resources
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Download 3D models, specifications, and marketing materials for the {product.name}. 
                  All resources are available for design professionals and partners.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {proResources.map((resource, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                          <resource.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="font-semibold text-lg text-foreground">{resource.type}</h2>
                      </div>
                      <div className="space-y-3">
                        {resource.items.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                            onClick={() => toast.success(`Downloading ${item.name}`)}
                          >
                            <div className="flex items-center gap-3">
                              <Download className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                              <div className="text-left">
                                <div className="text-sm font-medium text-foreground">{item.name}</div>
                                <div className="text-xs text-muted-foreground">{item.format} • {item.size}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Section */}
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                        Need custom resources?
                      </h3>
                      <p className="text-muted-foreground">
                        Contact our team for custom specifications, bulk orders, or partnership inquiries.
                      </p>
                    </div>
                    <Button variant="premium" onClick={handleContactDealer}>
                      <Briefcase className="w-4 h-4 mr-2" />
                      Contact Sales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Product Images Tab */}
          {activeTab === "images" && (
            <div className="space-y-12">
              <div>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Product Images
                </h1>
                <p className="text-muted-foreground">
                  High-resolution images of the {product.name} from multiple angles and in various settings.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {extendedGallery.map((image, index) => (
                  <button
                    key={index}
                    className="aspect-square bg-muted/30 rounded-xl overflow-hidden group relative"
                    onClick={() => {
                      setSelectedImage(index < product.gallery.length ? index : 0);
                      toast.success("Image preview opened");
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-background opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => toast.success("Downloading all images...")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All Images
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link to={`/products/${relProduct.id}`} key={relProduct.id}>
                  <Card className="group card-premium border-border/50 h-full bg-card">
                    <div className="aspect-product bg-muted/30 p-4 img-zoom">
                      <img
                        src={relProduct.image}
                        alt={relProduct.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                        {relProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-foreground">
                        ${relProduct.price.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Find a dealer</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Locate one of our dealers near you from our global network.
                </p>
                <Button variant="link" className="text-accent">
                  Find a dealer <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Find a showroom</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule an appointment at one of our showrooms around the globe.
                </p>
                <Button variant="link" className="text-accent">
                  Find a showroom <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Info className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get help</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Have a question? We&apos;re here to help. Connect with us.
                </p>
                <Button variant="link" className="text-accent">
                  Get in touch <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
