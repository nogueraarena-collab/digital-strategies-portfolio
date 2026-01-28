import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  ShoppingCart,
  ArrowLeft,
  Plus,
  Search,
  Bell,
  Settings,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const inventoryData = [
  { id: 1, name: "Laptop Dell XPS 15", category: "Electrónicos", stock: 45, price: 1299.99, status: "En stock" },
  { id: 2, name: "Monitor LG 27\"", category: "Electrónicos", stock: 23, price: 349.99, status: "En stock" },
  { id: 3, name: "Teclado Mecánico", category: "Accesorios", stock: 8, price: 89.99, status: "Bajo stock" },
  { id: 4, name: "Mouse Inalámbrico", category: "Accesorios", stock: 0, price: 45.99, status: "Agotado" },
  { id: 5, name: "Silla Ergonómica", category: "Mobiliario", stock: 15, price: 299.99, status: "En stock" },
  { id: 6, name: "Escritorio Ajustable", category: "Mobiliario", stock: 12, price: 499.99, status: "En stock" },
];

const salesData = [
  { month: "Ene", ventas: 12500 },
  { month: "Feb", ventas: 15800 },
  { month: "Mar", ventas: 14200 },
  { month: "Abr", ventas: 18500 },
  { month: "May", ventas: 21000 },
  { month: "Jun", ventas: 19800 },
];

const recentOrders = [
  { id: "#ORD-001", cliente: "María García", total: 1549.98, estado: "Completado" },
  { id: "#ORD-002", cliente: "Carlos López", total: 349.99, estado: "En proceso" },
  { id: "#ORD-003", cliente: "Ana Martínez", total: 799.98, estado: "Pendiente" },
  { id: "#ORD-004", cliente: "Juan Rodríguez", total: 2199.97, estado: "Completado" },
];

const SistemaGestion = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: "Ventas Totales", value: "$102,800", change: "+12.5%", icon: DollarSign, color: "text-green-500" },
    { title: "Productos", value: "156", change: "+3", icon: Package, color: "text-blue-500" },
    { title: "Clientes", value: "1,234", change: "+48", icon: Users, color: "text-purple-500" },
    { title: "Pedidos", value: "89", change: "+15%", icon: ShoppingCart, color: "text-orange-500" },
  ];

  const maxSales = Math.max(...salesData.map(d => d.ventas));

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
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "inventario", label: "Inventario", icon: Package },
            { id: "ventas", label: "Ventas", icon: TrendingUp },
            { id: "clientes", label: "Clientes", icon: Users },
            { id: "reportes", label: "Reportes", icon: BarChart3 },
          ].map((item) => (
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

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Bienvenido de vuelta, Administrador</p>
            </div>
            <Button className="gap-2">
              <Plus size={18} />
              Nuevo Producto
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} este mes</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-primary/10 ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Ventas Mensuales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-64 gap-4">
                    {salesData.map((data, index) => (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(data.ventas / maxSales) * 100}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                          className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg min-h-[20px]"
                        />
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Pedidos Recientes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.cliente}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          order.estado === "Completado" ? "bg-green-500/20 text-green-500" :
                          order.estado === "En proceso" ? "bg-blue-500/20 text-blue-500" :
                          "bg-yellow-500/20 text-yellow-500"
                        }`}>
                          {order.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Inventory Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Inventario de Productos</CardTitle>
                <Button variant="outline" size="sm">Ver todo</Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Producto</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Categoría</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stock</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Precio</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryData.map((item) => (
                        <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                          <td className="py-3 px-4">{item.stock} unidades</td>
                          <td className="py-3 px-4">${item.price}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.status === "En stock" ? "bg-green-500/20 text-green-500" :
                              item.status === "Bajo stock" ? "bg-yellow-500/20 text-yellow-500" :
                              "bg-red-500/20 text-red-500"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SistemaGestion;
