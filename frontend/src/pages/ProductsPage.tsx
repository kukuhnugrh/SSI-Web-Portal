import { useState, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products, categories, sortOptions } from "@/data/products";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  Star,
  ArrowUpRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Filter Content Component extracted outside of render
const FilterContent = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  clearFilters,
}) => (
  <div className="space-y-8">
    {/* Categories */}
    <div>
      <h4 className="font-semibold text-foreground mb-4">Categories</h4>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
              selectedCategory === category.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </button>
        ))}
      </div>
    </div>

    {/* Price Range */}
    <div>
      <h4 className="font-semibold text-foreground mb-4">Price Range</h4>
      <Slider
        value={priceRange}
        onValueChange={setPriceRange}
        max={6000}
        min={0}
        step={100}
        className="mb-4"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>${priceRange[0].toLocaleString()}</span>
        <span>${priceRange[1].toLocaleString()}</span>
      </div>
    </div>

    {/* Availability */}
    <div>
      <h4 className="font-semibold text-foreground mb-4">Availability</h4>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={inStockOnly}
          onCheckedChange={setInStockOnly}
        />
        <Label htmlFor="inStock" className="text-sm text-muted-foreground">
          In Stock Only
        </Label>
      </div>
    </div>

    {/* Clear Filters */}
    <Button variant="outline" className="w-full" onClick={clearFilters}>
      Clear All Filters
    </Button>
  </div>
);

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedSort, setSelectedSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    switch (selectedSort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, inStockOnly, selectedSort]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 6000]);
    setInStockOnly(false);
    setSelectedSort("featured");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Collection
            </h1>
            <p className="text-muted-foreground">
              Discover our complete range of premium ergonomic seating solutions,
              crafted for the modern workplace.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <FilterContent
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  inStockOnly={inStockOnly}
                  setInStockOnly={setInStockOnly}
                  clearFilters={clearFilters}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Mobile Filter Button */}
                <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        inStockOnly={inStockOnly}
                        setInStockOnly={setInStockOnly}
                        clearFilters={clearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      viewMode === "grid"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      viewMode === "list"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div
                  className={cn(
                    viewMode === "grid"
                      ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  )}
                >
                  {filteredProducts.map((product) =>
                    viewMode === "grid" ? (
                      <Link to={`/products/${product.id}`} key={product.id}>
                        <Card className="group card-premium border-border/50 h-full bg-card">
                          <div className="relative overflow-hidden">
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                              {product.new && (
                                <Badge className="bg-accent text-accent-foreground">
                                  New
                                </Badge>
                              )}
                              {product.bestSeller && (
                                <Badge variant="secondary">Best Seller</Badge>
                              )}
                              {!product.inStock && (
                                <Badge variant="outline" className="bg-background">
                                  Out of Stock
                                </Badge>
                              )}
                            </div>
                            <div className="aspect-product bg-muted/30 p-4 image-zoom">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < Math.floor(product.rating)
                                      ? "text-premium-gold fill-premium-gold"
                                      : "text-muted"
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">
                                ({product.reviews})
                              </span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {product.shortDescription}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-foreground">
                                  ${product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ) : (
                      <Link to={`/products/${product.id}`} key={product.id}>
                        <Card className="group card-premium border-border/50 bg-card">
                          <div className="flex">
                            <div className="relative w-48 flex-shrink-0">
                              <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                {product.new && (
                                  <Badge className="bg-accent text-accent-foreground text-xs">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <div className="aspect-square bg-muted/30 p-4">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                            <CardContent className="p-5 flex-1 flex flex-col">
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                      i < Math.floor(product.rating)
                                        ? "text-premium-gold fill-premium-gold"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({product.reviews})
                                </span>
                              </div>
                              <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4 flex-1">
                                {product.shortDescription}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl font-bold text-foreground">
                                    ${product.price.toLocaleString()}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ${product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <Button variant="premium" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
