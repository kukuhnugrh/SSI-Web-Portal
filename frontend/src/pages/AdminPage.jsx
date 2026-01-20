import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { products as initialProducts, categories } from "@/data/products";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  DollarSign,
  TrendingUp,
  Users,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Eye,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminPage = () => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("admin_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "task",
    price: "",
    originalPrice: "",
    description: "",
    shortDescription: "",
    image: "",
    material: "",
    warranty: "12 Years",
    inStock: true,
    featured: false,
    bestSeller: false,
    new: false,
    colors: "",
    features: "",
  });

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      change: "+12%",
      positive: true,
    },
    {
      label: "Total Revenue",
      value: `$${products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}`,
      icon: DollarSign,
      change: "+8%",
      positive: true,
    },
    {
      label: "Featured Items",
      value: products.filter((p) => p.featured).length,
      icon: TrendingUp,
      change: "+2",
      positive: true,
    },
    {
      label: "Out of Stock",
      value: products.filter((p) => !p.inStock).length,
      icon: Users,
      change: "-3",
      positive: false,
    },
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      category: "task",
      price: "",
      originalPrice: "",
      description: "",
      shortDescription: "",
      image: "",
      material: "",
      warranty: "12 Years",
      inStock: true,
      featured: false,
      bestSeller: false,
      new: false,
      colors: "",
      features: "",
    });
    setEditingProduct(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      description: product.description,
      shortDescription: product.shortDescription,
      image: product.image,
      material: product.material,
      warranty: product.warranty,
      inStock: product.inStock,
      featured: product.featured,
      bestSeller: product.bestSeller,
      new: product.new,
      colors: product.colors.join(", "),
      features: product.features.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.price || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const productData = {
      id: editingProduct?.id || Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice
        ? parseFloat(formData.originalPrice)
        : null,
      description: formData.description,
      shortDescription:
        formData.shortDescription || formData.description.slice(0, 100),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=800&q=80",
      gallery: [
        formData.image ||
          "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=800&q=80",
      ],
      material: formData.material || "Mesh",
      warranty: formData.warranty,
      inStock: formData.inStock,
      featured: formData.featured,
      bestSeller: formData.bestSeller,
      new: formData.new,
      colors: formData.colors
        ? formData.colors.split(",").map((c) => c.trim())
        : ["Black"],
      features: formData.features
        ? formData.features.split(",").map((f) => f.trim())
        : ["Ergonomic Design"],
      rating: editingProduct?.rating || 4.5,
      reviews: editingProduct?.reviews || 0,
      dimensions: editingProduct?.dimensions || {
        width: '26"',
        depth: '17"',
        height: '40"',
        seatHeight: '18"',
      },
      weight: editingProduct?.weight || "35 lbs",
    };

    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? productData : p))
      );
      toast.success("Product updated successfully");
    } else {
      setProducts([productData, ...products]);
      toast.success("Product created successfully");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      toast.success("Product deleted successfully");
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const openDeleteDialog = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:block">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="font-serif text-2xl font-bold text-foreground">
                ERGŌ
              </div>
              <Badge variant="secondary" className="text-xs">
                Admin
              </Badge>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "sidebar-item w-full",
                  activeTab === item.id && "active"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Back to Site */}
          <div className="p-4 border-t border-border">
            <Link to="/">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="lg:hidden bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-serif text-xl font-bold text-foreground">
              ERGŌ Admin
            </Link>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">
                {activeTab === "dashboard"
                  ? "Dashboard"
                  : activeTab === "products"
                  ? "Products"
                  : "Settings"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {activeTab === "products"
                  ? "Manage your product catalog"
                  : "Overview of your store performance"}
              </p>
            </div>
            {activeTab === "products" && (
              <Button variant="premium" onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>

          {/* Stats Grid */}
          {(activeTab === "dashboard" || activeTab === "products") && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                    <div
                      className={cn(
                        "text-xs mt-2 font-medium",
                        stat.positive ? "text-success" : "text-destructive"
                      )}
                    >
                      {stat.change} from last month
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Products Table */}
          {activeTab === "products" && (
            <Card className="border-border/50">
              <CardHeader className="border-b border-border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-muted/30 overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-foreground">
                                  {product.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  ID: {product.id}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-foreground">
                              ${product.price.toLocaleString()}
                            </div>
                            {product.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                ${product.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {product.inStock ? (
                                <Badge
                                  variant="outline"
                                  className="text-success border-success/30 bg-success/10"
                                >
                                  In Stock
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-destructive border-destructive/30 bg-destructive/10"
                                >
                                  Out of Stock
                                </Badge>
                              )}
                              {product.featured && (
                                <Badge variant="secondary">Featured</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link to={`/products/${product.id}`}>
                                <Button variant="ghost" size="icon">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(product)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => openDeleteDialog(product)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      No products found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? "Try adjusting your search"
                        : "Add your first product to get started"}
                    </p>
                    <Button variant="outline" onClick={openCreateDialog}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Dashboard Content */}
          {activeTab === "dashboard" && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted/30 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {product.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${product.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant={product.inStock ? "secondary" : "outline"}>
                        {product.inStock ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Content */}
          {activeTab === "settings" && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Store Name</Label>
                    <Input defaultValue="ERGŌ Seating" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input defaultValue="contact@ergo-seating.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Default Warranty</Label>
                    <Select defaultValue="12">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Years</SelectItem>
                        <SelectItem value="10">10 Years</SelectItem>
                        <SelectItem value="12">12 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button variant="premium">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingProduct ? "Edit Product" : "Create New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update the product details below"
                : "Fill in the product details to add it to your catalog"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Aeron Executive"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c.id !== "all")
                      .map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="1495"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price ($)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  placeholder="Leave empty if no discount"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                placeholder="Brief product tagline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Detailed product description"
                rows={3}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  value={formData.material}
                  onChange={(e) =>
                    setFormData({ ...formData, material: e.target.value })
                  }
                  placeholder="e.g., Mesh, Leather"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="colors">Colors (comma-separated)</Label>
                <Input
                  id="colors"
                  value={formData.colors}
                  onChange={(e) =>
                    setFormData({ ...formData, colors: e.target.value })
                  }
                  placeholder="Black, White, Gray"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warranty">Warranty</Label>
                <Select
                  value={formData.warranty}
                  onValueChange={(value) =>
                    setFormData({ ...formData, warranty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5 Years">5 Years</SelectItem>
                    <SelectItem value="10 Years">10 Years</SelectItem>
                    <SelectItem value="12 Years">12 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                placeholder="Lumbar Support, Adjustable Arms, Breathable Mesh"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, inStock: checked })
                  }
                />
                <Label htmlFor="inStock" className="text-sm">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked })
                  }
                />
                <Label htmlFor="featured" className="text-sm">
                  Featured
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="bestSeller"
                  checked={formData.bestSeller}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, bestSeller: checked })
                  }
                />
                <Label htmlFor="bestSeller" className="text-sm">
                  Best Seller
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="new"
                  checked={formData.new}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, new: checked })
                  }
                />
                <Label htmlFor="new" className="text-sm">
                  New
                </Label>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="premium">
                {editingProduct ? "Save Changes" : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Delete Product
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{productToDelete?.name}&rdquo;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
