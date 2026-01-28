import { motion } from "framer-motion";
import { Download, FileText, TrendingUp, DollarSign, Package, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, Order, Client, SalesData } from "./types";

interface ReportsViewProps {
  products: Product[];
  orders: Order[];
  clients: Client[];
  salesData: SalesData[];
}

const ReportsView = ({ products, orders, clients, salesData }: ReportsViewProps) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = totalRevenue / orders.length || 0;
  const topProducts = products.sort((a, b) => b.stock - a.stock).slice(0, 5);
  const topClients = clients.sort((a, b) => b.totalPurchases - a.totalPurchases).slice(0, 5);

  const generateCSV = (type: string) => {
    let csvContent = "";
    let filename = "";

    if (type === "products") {
      csvContent = "ID,Nombre,Categoría,Stock,Precio,Estado\n";
      products.forEach(p => {
        csvContent += `${p.id},${p.name},${p.category},${p.stock},${p.price},${p.status}\n`;
      });
      filename = "inventario.csv";
    } else if (type === "orders") {
      csvContent = "ID,Cliente,Total,Estado,Fecha\n";
      orders.forEach(o => {
        csvContent += `${o.id},${o.clientName},${o.total},${o.status},${o.date}\n`;
      });
      filename = "ventas.csv";
    } else if (type === "clients") {
      csvContent = "ID,Nombre,Email,Teléfono,Compras,Estado\n";
      clients.forEach(c => {
        csvContent += `${c.id},${c.name},${c.email},${c.phone},${c.totalPurchases},${c.status}\n`;
      });
      filename = "clientes.csv";
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign size={20} className="text-blue-500" />
              <span className="text-sm text-muted-foreground">Ingresos Totales</span>
            </div>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-gradient-to-br from-green-500/10 to-green-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={20} className="text-green-500" />
              <span className="text-sm text-muted-foreground">Ticket Promedio</span>
            </div>
            <p className="text-3xl font-bold">${avgOrderValue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-gradient-to-br from-purple-500/10 to-purple-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Package size={20} className="text-purple-500" />
              <span className="text-sm text-muted-foreground">Productos Activos</span>
            </div>
            <p className="text-3xl font-bold">{products.filter(p => p.stock > 0).length}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-gradient-to-br from-orange-500/10 to-orange-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-orange-500" />
              <span className="text-sm text-muted-foreground">Clientes Activos</span>
            </div>
            <p className="text-3xl font-bold">{clients.filter(c => c.status === "Activo").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Export Reports */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Exportar Reportes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => generateCSV("products")}
            >
              <Download size={24} className="text-primary" />
              <span className="font-semibold">Reporte de Inventario</span>
              <span className="text-xs text-muted-foreground">Exportar todos los productos</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => generateCSV("orders")}
            >
              <Download size={24} className="text-primary" />
              <span className="font-semibold">Reporte de Ventas</span>
              <span className="text-xs text-muted-foreground">Exportar todas las ventas</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => generateCSV("clients")}
            >
              <Download size={24} className="text-primary" />
              <span className="font-semibold">Reporte de Clientes</span>
              <span className="text-xs text-muted-foreground">Exportar todos los clientes</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Top Productos por Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{product.stock} unidades</p>
                    <p className="text-xs text-muted-foreground">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Top Clientes por Compras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClients.map((client, index) => (
                <div key={client.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{client.totalPurchases} compras</p>
                    <p className="text-xs text-muted-foreground">{client.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Tendencia de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-48 gap-4 p-4">
            {salesData.map((data, index) => {
              const maxSales = Math.max(...salesData.map(d => d.ventas));
              const height = (data.ventas / maxSales) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground">${(data.ventas / 1000).toFixed(1)}k</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg min-h-[20px]"
                  />
                  <span className="text-sm font-medium">{data.month}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportsView;
