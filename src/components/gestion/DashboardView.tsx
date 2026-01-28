import { motion } from "framer-motion";
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, Order, Client, SalesData } from "./types";

interface DashboardViewProps {
  products: Product[];
  orders: Order[];
  clients: Client[];
  salesData: SalesData[];
  onViewOrder: (order: Order) => void;
}

const DashboardView = ({ products, orders, clients, salesData, onViewOrder }: DashboardViewProps) => {
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(o => o.status === "Completado").length;
  const maxSales = Math.max(...salesData.map(d => d.ventas));

  const stats = [
    { title: "Ventas Totales", value: `$${totalSales.toLocaleString()}`, change: "+12.5%", icon: DollarSign, color: "text-green-500" },
    { title: "Productos", value: products.length.toString(), change: `+${products.filter(p => p.stock > 0).length}`, icon: Package, color: "text-blue-500" },
    { title: "Clientes", value: clients.length.toString(), change: `+${clients.filter(c => c.status === "Activo").length}`, icon: Users, color: "text-purple-500" },
    { title: "Pedidos", value: orders.length.toString(), change: `${completedOrders} completados`, icon: ShoppingCart, color: "text-orange-500" },
  ];

  const recentOrders = orders.slice(0, 4);

  return (
    <>
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
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
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
                      className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg min-h-[20px] cursor-pointer hover:from-primary/80 hover:to-primary/40 transition-colors"
                      title={`$${data.ventas.toLocaleString()}`}
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
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary/70 transition-colors"
                  onClick={() => onViewOrder(order)}
                >
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.clientName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === "Completado" ? "bg-green-500/20 text-green-500" :
                      order.status === "En proceso" ? "bg-blue-500/20 text-blue-500" :
                      order.status === "Cancelado" ? "bg-red-500/20 text-red-500" :
                      "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Productos con Bajo Stock</CardTitle>
            <Button variant="outline" size="sm">Ver Inventario</Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.filter(p => p.status !== "En stock").map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.stock} unidades</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.status === "Bajo stock" ? "bg-yellow-500/20 text-yellow-500" :
                    "bg-red-500/20 text-red-500"
                  }`}>
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default DashboardView;
