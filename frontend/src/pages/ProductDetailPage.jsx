import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find product using useMemo to avoid setState in effect
  const product = useMemo(() => {
    return products.find((p) => p.id === parseInt(id)) || null;
  }, [id]);
  
  // Initialize selectedColor based on product
  const [selectedColor, setSelectedColor] = useState(() => {
    const found = products.find((p) => p.id === parseInt(id));
    return found ? found.colors[0] : "";
  });

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 border-b border-border">
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

      {/* Product Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square bg-muted/30 rounded-xl overflow-hidden mb-4">
                {product.new && (
                  <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                    New
                  </Badge>
                )}
                <img
                  src={product.gallery[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "aspect-square bg-muted/30 rounded-lg overflow-hidden p-4 transition-all",
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
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
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
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

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

              {/* Benefits */}
              <div className="grid sm:grid-cols-3 gap-4 py-6 border-t border-b border-border">
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
          </div>

          {/* Tabs */}
          <Tabs defaultValue="features" className="mt-16">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="aspect-video bg-muted/30 rounded-xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-4">
                      Dimensions
                    </h3>
                    <dl className="space-y-3">
                      {Object.entries(product.dimensions).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b border-border last:border-0"
                        >
                          <dt className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </dt>
                          <dd className="font-medium text-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-4">
                      Details
                    </h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground">Material</dt>
                        <dd className="font-medium text-foreground">
                          {product.material}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground">Weight</dt>
                        <dd className="font-medium text-foreground">{product.weight}</dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground">Warranty</dt>
                        <dd className="font-medium text-foreground">
                          {product.warranty}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-muted-foreground">Colors Available</dt>
                        <dd className="font-medium text-foreground">
                          {product.colors.length}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-premium-gold mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {product.rating} out of 5
                </h3>
                <p className="text-muted-foreground mb-4">
                  Based on {product.reviews} reviews
                </p>
                <Button variant="outline">Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

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

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
