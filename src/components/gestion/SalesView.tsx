import { motion } from "framer-motion";
import { Plus, Eye, DollarSign, TrendingUp, ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order } from "./types";

interface SalesViewProps {
  orders: Order[];
  onNewSale: () => void;
  onViewOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order["status"]) => void;
}

const SalesView = ({ orders, onNewSale, onViewOrder, onUpdateStatus }: SalesViewProps) => {
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const filteredOrders = filterStatus === "Todos" 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const completedSales = orders.filter(o => o.status === "Completado").reduce((sum, o) => sum + o.total, 0);
  const pendingSales = orders.filter(o => o.status === "Pendiente").reduce((sum, o) => sum + o.total, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <DollarSign size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ventas Totales</p>
              <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-500/20">
              <CheckCircle size={24} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completadas</p>
              <p className="text-2xl font-bold">${completedSales.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/20">
              <TrendingUp size={24} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
              <p className="text-2xl font-bold">${pendingSales.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <ShoppingCart size={24} className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pedidos</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Historial de Ventas</CardTitle>
            <div className="flex items-center gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg bg-secondary border border-border"
              >
                <option value="Todos">Todos los estados</option>
                <option value="Completado">Completado</option>
                <option value="En proceso">En proceso</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              <Button onClick={onNewSale} className="gap-2">
                <Plus size={18} />
                Nueva Venta
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Productos</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.clientName}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        {order.products.slice(0, 2).map((p, i) => (
                          <span key={i} className="text-muted-foreground">
                            {p.productName} x{p.quantity}{i < Math.min(order.products.length - 1, 1) ? ", " : ""}
                          </span>
                        ))}
                        {order.products.length > 2 && (
                          <span className="text-primary"> +{order.products.length - 2} más</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-primary">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value as Order["status"])}
                        className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${
                          order.status === "Completado" ? "bg-green-500/20 text-green-500" :
                          order.status === "En proceso" ? "bg-blue-500/20 text-blue-500" :
                          order.status === "Cancelado" ? "bg-red-500/20 text-red-500" :
                          "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon" onClick={() => onViewOrder(order)}>
                        <Eye size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesView;
