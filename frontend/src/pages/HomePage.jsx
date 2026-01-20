import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products, clients, testimonials, stats } from "@/data/products";
import { ArrowRight, Star, Check, ArrowUpRight, Quote, Shield, Truck, Headphones, Award } from "lucide-react";

const HomePage = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=80"
            alt="Modern workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <span className="text-accent mr-2">•</span>
                Premium B2B Seating Solutions
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Elevate Your
                <span className="block text-gradient-premium mt-2">Workspace Experience</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Premium ergonomic seating designed for the modern workplace. 
                31 years of innovation delivering comfort, style, and productivity 
                to Fortune 500 companies worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button variant="hero" size="xl" className="group">
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button variant="elegant" size="xl">
                    B2B Inquiry
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index}>
                    <div className="font-serif text-2xl lg:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Product Image */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=800&q=80"
                  alt="Premium ergonomic chair"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
                {/* Floating Badge */}
                <div className="absolute top-8 -left-4 bg-card rounded-lg shadow-lg p-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">12 Year</div>
                      <div className="text-xs text-muted-foreground">Warranty</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8">
            Trusted by industry leaders worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {clients.map((client, index) => (
              <div
                key={index}
                className="opacity-40 hover:opacity-70 transition-opacity grayscale hover:grayscale-0"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-4">
                Featured Collection
              </Badge>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
                Signature Seating
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 text-accent font-medium flex items-center gap-2 hover:gap-3 transition-all link-underline"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <Card
                  className="group card-premium border-border/50 h-full bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    {/* Product badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      {product.new && (
                        <Badge className="bg-accent text-accent-foreground">
                          New
                        </Badge>
                      )}
                      {product.bestSeller && (
                        <Badge variant="secondary">Best Seller</Badge>
                      )}
                    </div>
                    <div className="aspect-product bg-muted/30 p-4 img-zoom">
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
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1549399905-5d1bad747576?w=800&q=80"
                  alt="Modern office with ergonomic chairs"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Stats Card Overlay */}
              <div className="absolute -bottom-8 -right-8 bg-card rounded-xl shadow-xl p-6 hidden lg:block">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="font-serif text-2xl font-bold text-accent">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Badge variant="outline" className="mb-4">
                About ERGŌ
              </Badge>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Three Decades of Ergonomic Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Since 1993, ERGŌ has been at the forefront of ergonomic innovation. 
                We believe that exceptional seating is not a luxury—it's a necessity 
                for productivity, health, and wellbeing in the modern workplace.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our chairs are crafted with precision engineering, premium materials, 
                and decades of research into human biomechanics. Every curve, every 
                adjustment mechanism is designed with your comfort in mind.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Award-winning ergonomic design",
                  "Sustainable manufacturing",
                  "12-year comprehensive warranty",
                  "Global B2B support network",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/products">
                <Button variant="premium" size="lg">
                  Explore Our Range
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Why Choose ERGŌ
            </Badge>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The B2B Advantage
            </h2>
            <p className="text-muted-foreground">
              We understand the unique needs of businesses. From consultation to 
              installation, we're your partners in creating healthier workplaces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "12-Year Warranty",
                description:
                  "Industry-leading warranty coverage for complete peace of mind on all purchases.",
              },
              {
                icon: Truck,
                title: "Global Delivery",
                description:
                  "Seamless logistics and installation services for offices worldwide.",
              },
              {
                icon: Headphones,
                title: "Dedicated Support",
                description:
                  "Personal account managers for all B2B clients with priority service.",
              },
              {
                icon: Award,
                title: "Volume Pricing",
                description:
                  "Competitive bulk pricing and flexible payment terms for enterprise orders.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group border-border/50 hover:border-accent/50 transition-all duration-300 bg-card"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <feature.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              Testimonials
            </Badge>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-primary-foreground/70">
              Trusted by leading companies to transform their workspaces.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="bg-primary-foreground/5 border-primary-foreground/10 backdrop-blur"
              >
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-accent mb-4" />
                  <p className="text-primary-foreground/90 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-primary-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-primary-foreground/60">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=1600&q=80"
                alt="Modern office space"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
            </div>
            <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
              <div className="max-w-2xl">
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Transform Your Workspace?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Contact our B2B team for a consultation and discover how ERGŌ 
                  can elevate your office environment with premium ergonomic seating.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/admin">
                    <Button
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Request a Quote
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    >
                      Browse Catalog
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
