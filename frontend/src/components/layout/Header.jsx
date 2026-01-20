import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-10">
            <div className={cn(
              "font-serif text-2xl font-bold tracking-tight transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-foreground"
            )}>
              ERGŌ
            </div>
            <span className={cn(
              "text-xs uppercase tracking-widest font-medium transition-colors duration-300",
              isScrolled ? "text-muted-foreground" : "text-muted-foreground"
            )}>
              Seating
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-300 link-underline py-1",
                  isActive(item.href)
                    ? "text-accent"
                    : isScrolled
                    ? "text-foreground hover:text-accent"
                    : "text-foreground hover:text-accent"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-foreground"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-foreground"
              )}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-foreground"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                0
              </span>
            </Button>
            <Link to="/admin">
              <Button variant="premium" size="sm" className="ml-2">
                B2B Portal
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-foreground"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "transition-colors duration-300",
                    isScrolled ? "text-foreground" : "text-foreground"
                  )}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div className="font-serif text-xl font-bold">ERGŌ</div>
                  </div>
                  <nav className="flex flex-col gap-1 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                          isActive(item.href)
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-secondary"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pt-6 border-t border-border">
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="premium" className="w-full">
                        B2B Portal
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};
