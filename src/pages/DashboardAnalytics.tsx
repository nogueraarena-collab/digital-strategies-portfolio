import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Database, TrendingUp, TrendingDown, Users, 
  ShoppingCart, DollarSign, Package, BarChart3, PieChart,
  Calendar, Filter, Download, RefreshCw, Play, Code
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart as RechartsPie, Pie, Cell, AreaChart, Area } from "recharts";

// Datos simulados - Caso: Distribuidora de Productos Alimenticios en Bogotá
const ventasMensuales = [
  { mes: "Ene", ventas: 45000000, meta: 40000000 },
  { mes: "Feb", ventas: 52000000, meta: 45000000 },
  { mes: "Mar", ventas: 48000000, meta: 50000000 },
  { mes: "Abr", ventas: 61000000, meta: 55000000 },
  { mes: "May", ventas: 55000000, meta: 55000000 },
  { mes: "Jun", ventas: 67000000, meta: 60000000 },
];

const ventasPorCategoria = [
  { name: "Lácteos", value: 35, color: "hsl(var(--primary))" },
  { name: "Bebidas", value: 25, color: "hsl(var(--accent))" },
  { name: "Snacks", value: 20, color: "#10b981" },
  { name: "Granos", value: 15, color: "#f59e0b" },
  { name: "Otros", value: 5, color: "#6366f1" },
];

const tendenciaClientes = [
  { semana: "Sem 1", nuevos: 45, recurrentes: 120 },
  { semana: "Sem 2", nuevos: 52, recurrentes: 135 },
  { semana: "Sem 3", nuevos: 38, recurrentes: 142 },
  { semana: "Sem 4", nuevos: 61, recurrentes: 158 },
];

const topProductos = [
  { producto: "Leche Entera 1L", unidades: 2450, ingresos: 7350000 },
  { producto: "Gaseosa 2.5L", unidades: 1890, ingresos: 5670000 },
  { producto: "Arroz Premium 5kg", unidades: 1245, ingresos: 4980000 },
  { producto: "Yogurt Natural 1L", unidades: 1180, ingresos: 4720000 },
  { producto: "Aceite Vegetal 3L", unidades: 980, ingresos: 3920000 },
];

const consultasSQL = [
  {
    titulo: "Ventas por categoría - Últimos 30 días",
    query: `SELECT 
  c.nombre_categoria,
  COUNT(v.id_venta) as total_ventas,
  SUM(v.total) as ingresos_totales,
  ROUND(AVG(v.total), 2) as ticket_promedio
FROM ventas v
INNER JOIN productos p ON v.id_producto = p.id
INNER JOIN categorias c ON p.id_categoria = c.id
WHERE v.fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY c.nombre_categoria
ORDER BY ingresos_totales DESC;`,
    resultado: "5 filas | Tiempo: 0.023s"
  },
  {
    titulo: "Top 10 clientes por volumen de compra",
    query: `SELECT 
  cl.nombre_cliente,
  cl.ciudad,
  COUNT(v.id_venta) as num_compras,
  SUM(v.total) as total_gastado,
  MAX(v.fecha) as ultima_compra
FROM clientes cl
LEFT JOIN ventas v ON cl.id = v.id_cliente
WHERE v.fecha >= '2024-01-01'
GROUP BY cl.id, cl.nombre_cliente, cl.ciudad
HAVING total_gastado > 1000000
ORDER BY total_gastado DESC
LIMIT 10;`,
    resultado: "10 filas | Tiempo: 0.045s"
  },
  {
    titulo: "Inventario crítico - Stock bajo",
    query: `SELECT 
  p.codigo_producto,
  p.nombre_producto,
  p.stock_actual,
  p.stock_minimo,
  p.precio_unitario,
  (p.stock_minimo - p.stock_actual) as unidades_faltantes
FROM productos p
WHERE p.stock_actual < p.stock_minimo
  AND p.activo = 1
ORDER BY unidades_faltantes DESC;`,
    resultado: "8 filas | Tiempo: 0.012s"
  }
];

const formatCOP = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const DashboardAnalytics = () => {
  const [activeQuery, setActiveQuery] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeQuery = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/#projects" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <ArrowLeft size={20} />
              </a>
              <div>
                <h1 className="font-display text-xl font-bold flex items-center gap-2">
                  <Database className="text-primary" size={24} />
                  Dashboard de Análisis de Datos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Caso: Distribuidora de Alimentos "El Buen Sabor" - Bogotá, Colombia
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden md:flex">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                Datos en tiempo real
              </Badge>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Descripción del caso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-xl bg-gradient-card border border-border"
        >
          <h2 className="font-display text-lg font-semibold mb-2 text-primary">📊 Caso de Estudio</h2>
          <p className="text-muted-foreground">
            <strong>Distribuidora "El Buen Sabor"</strong> es una empresa mediana ubicada en Bogotá que distribuye 
            productos alimenticios a más de 200 tiendas en Cundinamarca. Este dashboard fue desarrollado para 
            centralizar sus datos de ventas, inventario y clientes, permitiendo tomar decisiones basadas en datos 
            y optimizar su operación logística.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge>MySQL 8.0</Badge>
            <Badge variant="secondary">Power BI</Badge>
            <Badge variant="secondary">Python ETL</Badge>
            <Badge variant="secondary">React</Badge>
          </div>
        </motion.div>

        {/* KPIs principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { 
              titulo: "Ventas del Mes", 
              valor: formatCOP(67000000), 
              cambio: "+12%", 
              positivo: true,
              icon: DollarSign,
              descripcion: "vs. mes anterior"
            },
            { 
              titulo: "Clientes Activos", 
              valor: "186", 
              cambio: "+8", 
              positivo: true,
              icon: Users,
              descripcion: "nuevos este mes"
            },
            { 
              titulo: "Pedidos Procesados", 
              valor: "1,247", 
              cambio: "+5.2%", 
              positivo: true,
              icon: ShoppingCart,
              descripcion: "vs. mes anterior"
            },
            { 
              titulo: "Productos Activos", 
              valor: "342", 
              cambio: "-8", 
              positivo: false,
              icon: Package,
              descripcion: "bajo stock mínimo"
            },
          ].map((kpi, index) => (
            <motion.div
              key={kpi.titulo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{kpi.titulo}</p>
                      <p className="text-2xl font-bold mt-1">{kpi.valor}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {kpi.positivo ? (
                          <TrendingUp className="text-green-500" size={14} />
                        ) : (
                          <TrendingDown className="text-red-500" size={14} />
                        )}
                        <span className={`text-xs ${kpi.positivo ? 'text-green-500' : 'text-red-500'}`}>
                          {kpi.cambio}
                        </span>
                        <span className="text-xs text-muted-foreground">{kpi.descripcion}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10">
                      <kpi.icon className="text-primary" size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="graficos" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="graficos" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Visualizaciones
            </TabsTrigger>
            <TabsTrigger value="sql" className="flex items-center gap-2">
              <Code size={16} />
              Consultas SQL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="graficos" className="space-y-6">
            {/* Gráficos */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Ventas mensuales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="text-primary" size={20} />
                    Ventas vs Meta Mensual
                  </CardTitle>
                  <CardDescription>Comparativa de ventas reales contra metas establecidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ ventas: { color: "hsl(var(--primary))" }, meta: { color: "hsl(var(--muted-foreground))" } }} className="h-[250px]">
                    <BarChart data={ventasMensuales}>
                      <XAxis dataKey="mes" />
                      <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="ventas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Ventas" />
                      <Bar dataKey="meta" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="Meta" opacity={0.5} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Ventas por categoría */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="text-primary" size={20} />
                    Distribución por Categoría
                  </CardTitle>
                  <CardDescription>Porcentaje de ventas por tipo de producto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-8">
                    <ChartContainer config={{}} className="h-[200px] w-[200px]">
                      <RechartsPie>
                        <Pie
                          data={ventasPorCategoria}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {ventasPorCategoria.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </RechartsPie>
                    </ChartContainer>
                    <div className="space-y-2">
                      {ventasPorCategoria.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: cat.color }} />
                          <span className="text-muted-foreground">{cat.name}</span>
                          <span className="font-medium">{cat.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tendencia de clientes */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-primary" size={20} />
                    Tendencia de Clientes - Junio 2024
                  </CardTitle>
                  <CardDescription>Comparativa entre clientes nuevos y recurrentes por semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ nuevos: { color: "hsl(var(--primary))" }, recurrentes: { color: "hsl(var(--accent))" } }} className="h-[200px]">
                    <AreaChart data={tendenciaClientes}>
                      <XAxis dataKey="semana" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="recurrentes" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" fillOpacity={0.3} name="Recurrentes" />
                      <Area type="monotone" dataKey="nuevos" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" fillOpacity={0.3} name="Nuevos" />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top productos */}
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Productos más Vendidos</CardTitle>
                <CardDescription>Ranking basado en unidades vendidas este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProductos.map((prod, index) => (
                    <div key={prod.producto} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{prod.producto}</p>
                        <p className="text-sm text-muted-foreground">{prod.unidades.toLocaleString()} unidades</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{formatCOP(prod.ingresos)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sql" className="space-y-6">
            {/* Consultas SQL */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="text-primary" size={20} />
                  Consultas SQL Implementadas
                </CardTitle>
                <CardDescription>
                  Ejemplos de queries optimizadas desarrolladas para este proyecto en MySQL 8.0
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-2 mb-6">
                  {consultasSQL.map((consulta, index) => (
                    <Button
                      key={index}
                      variant={activeQuery === index ? "default" : "outline"}
                      className="justify-start text-left h-auto py-3"
                      onClick={() => setActiveQuery(index)}
                    >
                      <span className="truncate">{consulta.titulo}</span>
                    </Button>
                  ))}
                </div>

                <div className="rounded-lg bg-[#1e1e1e] p-4 font-mono text-sm overflow-x-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400">-- {consultasSQL[activeQuery].titulo}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-primary"
                      onClick={executeQuery}
                      disabled={isExecuting}
                    >
                      {isExecuting ? (
                        <RefreshCw size={14} className="mr-2 animate-spin" />
                      ) : (
                        <Play size={14} className="mr-2" />
                      )}
                      {isExecuting ? "Ejecutando..." : "Ejecutar"}
                    </Button>
                  </div>
                  <pre className="text-green-400 whitespace-pre-wrap">
                    {consultasSQL[activeQuery].query}
                  </pre>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-gray-400">Resultado: </span>
                    <span className="text-cyan-400">{consultasSQL[activeQuery].resultado}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modelo de datos */}
            <Card>
              <CardHeader>
                <CardTitle>Modelo de Base de Datos</CardTitle>
                <CardDescription>Estructura relacional implementada en MySQL</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { tabla: "clientes", campos: ["id", "nombre", "ciudad", "telefono", "email", "fecha_registro"] },
                    { tabla: "productos", campos: ["id", "codigo", "nombre", "precio", "stock", "id_categoria"] },
                    { tabla: "ventas", campos: ["id", "fecha", "id_cliente", "id_producto", "cantidad", "total"] },
                    { tabla: "categorias", campos: ["id", "nombre", "descripcion", "activo"] },
                  ].map((table) => (
                    <div key={table.tabla} className="p-4 rounded-lg bg-secondary border border-border">
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Database size={14} />
                        {table.tabla}
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {table.campos.map((campo) => (
                          <li key={campo} className="font-mono text-xs">• {campo}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardAnalytics;