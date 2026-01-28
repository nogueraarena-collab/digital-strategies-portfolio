import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Package, 
  TrendingUp, 
  Users, 
  BarChart3, 
  ArrowLeft,
  Plus,
  Search,
  Bell,
  Settings,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Components
import DashboardView from "@/components/gestion/DashboardView";
import InventoryView from "@/components/gestion/InventoryView";
import SalesView from "@/components/gestion/SalesView";
import ClientsView from "@/components/gestion/ClientsView";
import ReportsView from "@/components/gestion/ReportsView";
import ProductModal from "@/components/gestion/ProductModal";
import ClientModal from "@/components/gestion/ClientModal";
import OrderModal from "@/components/gestion/OrderModal";
import OrderDetailModal from "@/components/gestion/OrderDetailModal";

// Data & Types
import { Product, Client, Order, TabId } from "@/components/gestion/types";
import { initialProducts, initialClients, initialOrders, initialSalesData } from "@/components/gestion/data";

const SistemaGestion = () => {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Data State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [salesData] = useState(initialSalesData);

  // Modal States
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderDetailModalOpen, setOrderDetailModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Product CRUD
  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, "id" | "status">) => {
    const status: Product["status"] = 
      productData.stock === 0 ? "Agotado" : 
      productData.stock < 10 ? "Bajo stock" : "En stock";

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, status } 
          : p
      ));
      toast.success("Producto actualizado correctamente");
    } else {
      const newProduct: Product = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1,
        status,
      };
      setProducts([...products, newProduct]);
      toast.success("Producto creado correctamente");
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
    toast.success("Producto eliminado correctamente");
  };

  // Client CRUD
  const handleAddClient = () => {
    setEditingClient(null);
    setClientModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setClientModalOpen(true);
  };

  const handleSaveClient = (clientData: Omit<Client, "id" | "totalPurchases" | "lastPurchase" | "status">) => {
    if (editingClient) {
      setClients(clients.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...clientData } 
          : c
      ));
      toast.success("Cliente actualizado correctamente");
    } else {
      const newClient: Client = {
        ...clientData,
        id: Math.max(...clients.map(c => c.id)) + 1,
        totalPurchases: 0,
        lastPurchase: new Date().toISOString().split("T")[0],
        status: "Activo",
      };
      setClients([...clients, newClient]);
      toast.success("Cliente creado correctamente");
    }
  };

  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter(c => c.id !== clientId));
    toast.success("Cliente eliminado correctamente");
  };

  // Order CRUD
  const handleNewSale = () => {
    setOrderModalOpen(true);
  };

  const handleSaveOrder = (orderData: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      ...orderData,
      id: `#ORD-${String(orders.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
    };
    setOrders([newOrder, ...orders]);

    // Update product stock
    orderData.products.forEach(item => {
      setProducts(prev => prev.map(p => {
        if (p.id === item.productId) {
          const newStock = Math.max(0, p.stock - item.quantity);
          return {
            ...p,
            stock: newStock,
            status: newStock === 0 ? "Agotado" : newStock < 10 ? "Bajo stock" : "En stock",
          };
        }
        return p;
      }));
    });

    // Update client purchases
    setClients(prev => prev.map(c => {
      if (c.id === orderData.clientId) {
        return {
          ...c,
          totalPurchases: c.totalPurchases + 1,
          lastPurchase: new Date().toISOString().split("T")[0],
        };
      }
      return c;
    }));

    toast.success("Venta registrada correctamente");
  };

  const handleViewOrder = (order: Order) => {
    setViewingOrder(order);
    setOrderDetailModalOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    ));
    toast.success(`Estado actualizado a "${status}"`);
  };

  // Global search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      // Check if query matches any product
      const matchedProduct = products.find(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      if (matchedProduct) {
        setActiveTab("inventario");
        return;
      }
      
      // Check if query matches any client
      const matchedClient = clients.find(c => 
        c.name.toLowerCase().includes(query.toLowerCase())
      );
      if (matchedClient) {
        setActiveTab("clientes");
        return;
      }
    }
  };

  const navItems = [
    { id: "dashboard" as TabId, label: "Dashboard", icon: BarChart3 },
    { id: "inventario" as TabId, label: "Inventario", icon: Package },
    { id: "ventas" as TabId, label: "Ventas", icon: TrendingUp },
    { id: "clientes" as TabId, label: "Clientes", icon: Users },
    { id: "reportes" as TabId, label: "Reportes", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">GestiónPro</h2>
          <p className="text-xs text-muted-foreground">Sistema Empresarial</p>
        </div>
        
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Link to="/#projects">
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft size={16} />
              Volver al Portafolio
            </Button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-secondary rounded-lg"
              >
                <Menu size={20} />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Buscar productos, clientes..." 
                  className="pl-10 w-80 bg-secondary border-0"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-secondary rounded-lg relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-lg">
                <Settings size={20} />
              </button>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold capitalize">{activeTab}</h1>
              <p className="text-muted-foreground">
                {activeTab === "dashboard" && "Bienvenido de vuelta, Administrador"}
                {activeTab === "inventario" && "Gestiona tu inventario de productos"}
                {activeTab === "ventas" && "Historial y gestión de ventas"}
                {activeTab === "clientes" && "Administra tu base de clientes"}
                {activeTab === "reportes" && "Análisis y exportación de datos"}
              </p>
            </div>
            {activeTab === "dashboard" && (
              <Button className="gap-2" onClick={handleAddProduct}>
                <Plus size={18} />
                Nuevo Producto
              </Button>
            )}
          </div>

          {/* Tab Content */}
          {activeTab === "dashboard" && (
            <DashboardView
              products={products}
              orders={orders}
              clients={clients}
              salesData={salesData}
              onViewOrder={handleViewOrder}
            />
          )}

          {activeTab === "inventario" && (
            <InventoryView
              products={products}
              onAdd={handleAddProduct}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}

          {activeTab === "ventas" && (
            <SalesView
              orders={orders}
              onNewSale={handleNewSale}
              onViewOrder={handleViewOrder}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          )}

          {activeTab === "clientes" && (
            <ClientsView
              clients={clients}
              onAdd={handleAddClient}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
            />
          )}

          {activeTab === "reportes" && (
            <ReportsView
              products={products}
              orders={orders}
              clients={clients}
              salesData={salesData}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <ProductModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      <ClientModal
        isOpen={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        onSave={handleSaveClient}
        client={editingClient}
      />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        onSave={handleSaveOrder}
        products={products}
        clients={clients}
      />

      <OrderDetailModal
        isOpen={orderDetailModalOpen}
        onClose={() => setOrderDetailModalOpen(false)}
        order={viewingOrder}
      />
    </div>
  );
};

export default SistemaGestion;
