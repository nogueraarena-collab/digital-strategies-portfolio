import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ShoppingCart, 
  Search, 
  Heart, 
  Star, 
  Filter,
  ArrowLeft,
  Plus,
  Minus,
  X,
  ShoppingBag
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const products = [
  { id: 1, name: "Auriculares Bluetooth Pro", price: 149.99, originalPrice: 199.99, rating: 4.8, reviews: 234, image: "🎧", category: "Electrónicos", badge: "Más vendido" },
  { id: 2, name: "Smartwatch Deportivo", price: 299.99, originalPrice: null, rating: 4.6, reviews: 156, image: "⌚", category: "Electrónicos", badge: null },
  { id: 3, name: "Mochila Urban Tech", price: 89.99, originalPrice: 119.99, rating: 4.9, reviews: 89, image: "🎒", category: "Accesorios", badge: "Oferta" },
  { id: 4, name: "Cámara Instantánea", price: 79.99, originalPrice: null, rating: 4.7, reviews: 312, image: "📷", category: "Electrónicos", badge: null },
  { id: 5, name: "Lámpara LED Inteligente", price: 45.99, originalPrice: 59.99, rating: 4.5, reviews: 178, image: "💡", category: "Hogar", badge: "Nuevo" },
  { id: 6, name: "Teclado Mecánico RGB", price: 129.99, originalPrice: null, rating: 4.8, reviews: 445, image: "⌨️", category: "Electrónicos", badge: "Más vendido" },
  { id: 7, name: "Botella Térmica Premium", price: 34.99, originalPrice: 44.99, rating: 4.6, reviews: 267, image: "🍶", category: "Accesorios", badge: null },
  { id: 8, name: "Altavoz Portátil", price: 69.99, originalPrice: 89.99, rating: 4.7, reviews: 198, image: "🔊", category: "Electrónicos", badge: "Oferta" },
];

const categories = ["Todos", "Electrónicos", "Accesorios", "Hogar"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Ecommerce = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-primary">TechStore</h1>
              <nav className="hidden md:flex items-center gap-6">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm font-medium transition-colors ${
                      selectedCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Buscar productos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-secondary border-0"
                />
              </div>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-secondary rounded-lg"
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              <Link to="/#projects">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft size={16} />
                  Portafolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary/20 to-accent/10 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4">🔥 Ofertas de Temporada</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hasta <span className="text-primary">50% OFF</span> en Electrónicos
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Descubre nuestra colección de productos tecnológicos con los mejores precios del mercado.
            </p>
            <Button size="lg" className="gap-2">
              <ShoppingBag size={20} />
              Ver Ofertas
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mobile Filter */}
      <div className="md:hidden container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter size={18} className="text-muted-foreground flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">
            {selectedCategory === "Todos" ? "Todos los Productos" : selectedCategory}
          </h3>
          <span className="text-muted-foreground">{filteredProducts.length} productos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-secondary to-secondary/50 p-8 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
                
                {product.badge && (
                  <Badge className="absolute top-3 left-3" variant={product.badge === "Oferta" ? "destructive" : "default"}>
                    {product.badge}
                  </Badge>
                )}
                
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    favorites.includes(product.id) 
                      ? "bg-red-500 text-white" 
                      : "bg-background/80 hover:bg-background text-muted-foreground"
                  }`}
                >
                  <Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews} reseñas)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => addToCart(product)}
                    className="gap-1"
                  >
                    <Plus size={16} />
                    Agregar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold">Carrito ({cartItemsCount})</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                      <span className="text-3xl">{item.image}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-primary font-semibold">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-secondary rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-secondary rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-muted-foreground hover:text-destructive"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg">
                  Proceder al Pago
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Envío gratis en pedidos mayores a $100
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Ecommerce;
