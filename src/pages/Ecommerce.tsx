import { motion, AnimatePresence } from "framer-motion";
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
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  ChevronRight,
  Check,
  Package
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Formato de precio en pesos colombianos
const formatCOP = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const products = [
  { id: 1, name: "Auriculares Bluetooth Pro", price: 599900, originalPrice: 799900, rating: 4.8, reviews: 234, image: "🎧", category: "Electrónicos", badge: "Más vendido", description: "Auriculares inalámbricos con cancelación de ruido activa y 30h de batería.", specs: ["Bluetooth 5.3", "ANC", "30h batería", "Carga rápida"] },
  { id: 2, name: "Smartwatch Deportivo", price: 1199900, originalPrice: null, rating: 4.6, reviews: 156, image: "⌚", category: "Electrónicos", badge: null, description: "Reloj inteligente con GPS, monitor cardíaco y resistencia al agua.", specs: ["GPS integrado", "50m waterproof", "SpO2", "7 días batería"] },
  { id: 3, name: "Mochila Urban Tech", price: 359900, originalPrice: 479900, rating: 4.9, reviews: 89, image: "🎒", category: "Accesorios", badge: "Oferta", description: "Mochila ergonómica con compartimento para laptop y puerto USB.", specs: ["Laptop 15.6\"", "Puerto USB", "Antirrobo", "30L capacidad"] },
  { id: 4, name: "Cámara Instantánea", price: 319900, originalPrice: null, rating: 4.7, reviews: 312, image: "📷", category: "Electrónicos", badge: null, description: "Cámara de impresión instantánea con flash automático.", specs: ["Film Instax Mini", "Flash auto", "Selfie mirror", "Pilas AA"] },
  { id: 5, name: "Lámpara LED Inteligente", price: 183900, originalPrice: 239900, rating: 4.5, reviews: 178, image: "💡", category: "Hogar", badge: "Nuevo", description: "Lámpara WiFi compatible con Alexa y Google Home, 16M de colores.", specs: ["WiFi", "16M colores", "Alexa/Google", "App control"] },
  { id: 6, name: "Teclado Mecánico RGB", price: 519900, originalPrice: null, rating: 4.8, reviews: 445, image: "⌨️", category: "Electrónicos", badge: "Más vendido", description: "Teclado gaming con switches mecánicos y retroiluminación RGB.", specs: ["Switch Red", "RGB per-key", "USB-C", "Hot-swap"] },
  { id: 7, name: "Botella Térmica Premium", price: 139900, originalPrice: 179900, rating: 4.6, reviews: 267, image: "🍶", category: "Accesorios", badge: null, description: "Botella de acero inoxidable, mantiene temperatura por 24h.", specs: ["750ml", "Acero 18/8", "24h frío", "12h caliente"] },
  { id: 8, name: "Altavoz Portátil", price: 279900, originalPrice: 359900, rating: 4.7, reviews: 198, image: "🔊", category: "Electrónicos", badge: "Oferta", description: "Altavoz Bluetooth con sonido 360° y resistencia al agua IPX7.", specs: ["20W", "IPX7", "12h batería", "TWS pairing"] },
  { id: 9, name: "Monitor 27\" 4K UHD", price: 1899900, originalPrice: 2299900, rating: 4.9, reviews: 87, image: "🖥️", category: "Electrónicos", badge: "Premium", description: "Monitor profesional 4K con panel IPS y 99% sRGB para diseño y gaming.", specs: ["4K UHD", "IPS 144Hz", "99% sRGB", "USB-C PD"] },
  { id: 10, name: "Organizador de Escritorio", price: 89900, originalPrice: null, rating: 4.4, reviews: 156, image: "📦", category: "Hogar", badge: null, description: "Organizador multifuncional de bambú con carga inalámbrica integrada.", specs: ["Bambú natural", "Carga Qi 15W", "5 compartimentos", "Portacelular"] },
  { id: 11, name: "Maleta de Viaje Premium", price: 749900, originalPrice: 899900, rating: 4.8, reviews: 203, image: "🧳", category: "Accesorios", badge: "Oferta", description: "Maleta de cabina con carcasa dura, ruedas 360° y candado TSA.", specs: ["22\" carry-on", "TSA lock", "Ruedas 360°", "Policarbonato"] },
  { id: 12, name: "Humidificador Aromático", price: 149900, originalPrice: null, rating: 4.5, reviews: 312, image: "💨", category: "Hogar", badge: "Nuevo", description: "Humidificador ultrasónico con difusor de aromas y luz LED ambiente.", specs: ["300ml", "8h autonomía", "LED 7 colores", "Silencioso"] },
];

const categories = ["Todos", "Electrónicos", "Accesorios", "Hogar"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation";

const Ecommerce = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);

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
    toast.success(`${product.name} agregado al carrito`);
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
    const product = products.find(p => p.id === productId);
    if (product) {
      const isFav = favorites.includes(productId);
      toast.success(isFav ? "Eliminado de favoritos" : "Agregado a favoritos");
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = cartTotal > 400000 ? 0 : 39900;
  const orderTotal = cartTotal + shippingCost;

  const handleCheckout = () => {
    setCheckoutStep("shipping");
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("confirmation");
    setTimeout(() => {
      setOrderComplete(true);
      setCart([]);
    }, 2000);
  };

  const resetCheckout = () => {
    setCheckoutStep("cart");
    setOrderComplete(false);
    setIsCartOpen(false);
    setShippingInfo({ name: "", email: "", address: "", city: "", phone: "" });
  };

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
                onClick={() => {
                  setSelectedCategory("Todos");
                  const favProducts = products.filter(p => favorites.includes(p.id));
                  if (favProducts.length > 0) {
                    toast.info(`Tienes ${favProducts.length} productos favoritos`);
                  }
                }}
                className="relative p-2 hover:bg-secondary rounded-lg"
              >
                <Heart size={24} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              
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
              Descubre nuestra colección de productos tecnológicos con los mejores precios del mercado colombiano.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                <ShoppingBag size={20} />
                Ver Ofertas
              </Button>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck size={18} />
                  <span>Envío gratis +$400.000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={18} />
                  <span>Garantía 2 años</span>
                </div>
              </div>
            </div>
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
              <div 
                className="relative bg-gradient-to-br from-secondary to-secondary/50 p-8 flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <span className="text-6xl group-hover:scale-110 transition-transform">{product.image}</span>
                
                {product.badge && (
                  <Badge className="absolute top-3 left-3" variant={product.badge === "Oferta" ? "destructive" : "default"}>
                    {product.badge}
                  </Badge>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
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
                <h4 
                  className="font-semibold mb-2 group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
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
                    <span className="text-lg font-bold">{formatCOP(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through block">
                        {formatCOP(product.originalPrice)}
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

      {/* Features Section */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-card rounded-xl">
              <div className="p-3 rounded-full bg-primary/20">
                <Truck size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Envío Gratis</h4>
                <p className="text-sm text-muted-foreground">En pedidos mayores a $400.000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-card rounded-xl">
              <div className="p-3 rounded-full bg-primary/20">
                <Shield size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Garantía 2 Años</h4>
                <p className="text-sm text-muted-foreground">En todos los productos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-card rounded-xl">
              <div className="p-3 rounded-full bg-primary/20">
                <CreditCard size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Pago Seguro</h4>
                <p className="text-sm text-muted-foreground">Múltiples métodos de pago</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-card border border-border rounded-xl z-50 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-lg z-10"
              >
                <X size={20} />
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-secondary to-secondary/50 p-12 flex items-center justify-center">
                  <span className="text-8xl">{selectedProduct.image}</span>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh] md:max-h-none">
                  <Badge className="mb-2">{selectedProduct.category}</Badge>
                  <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="font-medium">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({selectedProduct.reviews} reseñas)</span>
                  </div>

                  <p className="text-muted-foreground mb-6">{selectedProduct.description}</p>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-bold text-primary">{formatCOP(selectedProduct.price)}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatCOP(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {/* Product Specs */}
                  {'specs' in selectedProduct && selectedProduct.specs && (
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {(selectedProduct.specs as string[]).map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-primary" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button 
                      className="w-full gap-2" 
                      size="lg"
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                    >
                      <ShoppingCart size={20} />
                      Agregar al Carrito
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Heart size={20} fill={favorites.includes(selectedProduct.id) ? "currentColor" : "none"} />
                      {favorites.includes(selectedProduct.id) ? "En Favoritos" : "Agregar a Favoritos"}
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck size={16} />
                      <span>Envío gratis en pedidos +$400.000</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Shield size={16} />
                      <span>Garantía de 2 años incluida</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar with Checkout */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => {
                if (checkoutStep === "cart") setIsCartOpen(false);
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  {checkoutStep !== "cart" && !orderComplete && (
                    <button 
                      onClick={() => setCheckoutStep(
                        checkoutStep === "payment" ? "shipping" : "cart"
                      )}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <h3 className="text-xl font-bold">
                    {checkoutStep === "cart" && `Carrito (${cartItemsCount})`}
                    {checkoutStep === "shipping" && "Datos de Envío"}
                    {checkoutStep === "payment" && "Método de Pago"}
                    {checkoutStep === "confirmation" && "Confirmación"}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    if (orderComplete) resetCheckout();
                    else setIsCartOpen(false);
                  }}
                  className="p-2 hover:bg-secondary rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Checkout Steps Indicator */}
              {!orderComplete && cart.length > 0 && (
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    {["cart", "shipping", "payment"].map((step, index) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          checkoutStep === step ? "bg-primary text-primary-foreground" :
                          ["shipping", "payment"].indexOf(checkoutStep) > ["cart", "shipping", "payment"].indexOf(step) 
                            ? "bg-green-500 text-white" : "bg-secondary text-muted-foreground"
                        }`}>
                          {["shipping", "payment"].indexOf(checkoutStep) > ["cart", "shipping", "payment"].indexOf(step) 
                            ? <Check size={16} /> : index + 1}
                        </div>
                        {index < 2 && (
                          <ChevronRight size={16} className="mx-2 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                {/* Cart Items */}
                {checkoutStep === "cart" && (
                  cart.length === 0 ? (
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
                            <p className="text-primary font-semibold">{formatCOP(item.price)}</p>
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
                  )
                )}

                {/* Shipping Form */}
                {checkoutStep === "shipping" && (
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Nombre Completo</label>
                      <Input 
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                        placeholder="Juan Pérez"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        placeholder="juan@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Dirección</label>
                      <Input 
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        placeholder="Calle 123 #45-67"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Ciudad</label>
                      <Input 
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        placeholder="Bogotá"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Teléfono</label>
                      <Input 
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        placeholder="+57 300 123 4567"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full mt-6">
                      Continuar al Pago
                    </Button>
                  </form>
                )}

                {/* Payment Form */}
                {checkoutStep === "payment" && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-lg mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Enviar a:</p>
                      <p className="font-medium">{shippingInfo.name}</p>
                      <p className="text-sm text-muted-foreground">{shippingInfo.address}, {shippingInfo.city}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Número de Tarjeta</label>
                      <Input placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Fecha de Exp.</label>
                        <Input placeholder="MM/AA" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium">CVV</label>
                        <Input placeholder="123" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Nombre en la Tarjeta</label>
                      <Input placeholder="JUAN PEREZ" required />
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg mt-6">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>{formatCOP(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Envío</span>
                        <span>{shippingCost === 0 ? "Gratis" : formatCOP(shippingCost)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary">{formatCOP(orderTotal)}</span>
                      </div>
                    </div>

                    <Button type="submit" className="w-full gap-2" size="lg">
                      <CreditCard size={20} />
                      Pagar {formatCOP(orderTotal)}
                    </Button>
                  </form>
                )}

                {/* Confirmation */}
                {checkoutStep === "confirmation" && (
                  <div className="text-center py-8">
                    {!orderComplete ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                          <CreditCard size={32} className="text-primary" />
                        </div>
                        <p className="text-lg font-medium">Procesando tu pago...</p>
                        <p className="text-muted-foreground">Por favor espera un momento</p>
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                        >
                          <Check size={40} className="text-green-500" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h3>
                        <p className="text-muted-foreground mb-6">
                          Gracias por tu compra, {shippingInfo.name}
                        </p>
                        <div className="p-4 bg-secondary/50 rounded-lg text-left mb-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Package size={20} className="text-primary" />
                            <span className="font-medium">Detalles del envío</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{shippingInfo.address}</p>
                          <p className="text-sm text-muted-foreground">{shippingInfo.city}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Recibirás un email de confirmación en {shippingInfo.email}
                          </p>
                        </div>
                        <Button onClick={resetCheckout} className="w-full">
                          Seguir Comprando
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Footer - Only show for cart */}
              {checkoutStep === "cart" && cart.length > 0 && (
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-xl font-bold">{formatCOP(cartTotal)}</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceder al Pago
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Envío gratis en pedidos mayores a $400.000
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Ecommerce;
