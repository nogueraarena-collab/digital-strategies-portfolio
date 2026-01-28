import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Rocket, CheckCircle2, Clock, AlertCircle,
  Cloud, Users, FileSpreadsheet, Smartphone, BarChart3,
  Settings, Target, TrendingUp, Calendar, Lightbulb,
  ArrowRight, Building2, Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Caso: Panadería La Espiga Dorada - Medellín
const fasesProyecto = [
  {
    id: 1,
    nombre: "Diagnóstico Digital",
    duracion: "2 semanas",
    estado: "completado",
    descripcion: "Evaluación del estado tecnológico actual y mapeo de procesos manuales",
    entregables: ["Informe de diagnóstico", "Mapa de procesos AS-IS", "Análisis de brechas digitales"],
    resultados: "Se identificaron 12 procesos críticos operando de forma manual con pérdida estimada de 15 horas/semana"
  },
  {
    id: 2,
    nombre: "Diseño de Solución",
    duracion: "2 semanas",
    estado: "completado",
    descripcion: "Arquitectura de la solución digital y selección de herramientas",
    entregables: ["Arquitectura TO-BE", "Roadmap de implementación", "Presupuesto detallado"],
    resultados: "Plan de transformación en 3 fases con inversión optimizada y ROI proyectado de 8 meses"
  },
  {
    id: 3,
    nombre: "Migración a la Nube",
    duracion: "3 semanas",
    estado: "completado",
    descripcion: "Implementación de infraestructura cloud y migración de datos",
    entregables: ["Ambiente cloud configurado", "Datos migrados", "Backups automatizados"],
    resultados: "100% de datos migrados a Google Workspace con reducción de costos de TI del 40%"
  },
  {
    id: 4,
    nombre: "Automatización de Procesos",
    duracion: "4 semanas",
    estado: "completado",
    descripcion: "Digitalización de flujos de trabajo y eliminación de tareas manuales",
    entregables: ["Sistema de pedidos digital", "Inventario automatizado", "Reportes automáticos"],
    resultados: "Reducción del 60% en tiempo de procesamiento de pedidos"
  },
  {
    id: 5,
    nombre: "Capacitación y Adopción",
    duracion: "2 semanas",
    estado: "completado",
    descripcion: "Entrenamiento del equipo y acompañamiento en la adopción",
    entregables: ["Manuales de usuario", "Videos tutoriales", "Soporte post-implementación"],
    resultados: "100% del personal capacitado con tasa de adopción del 95%"
  },
];

const metricas = [
  { 
    antes: "15 horas/semana", 
    despues: "4 horas/semana", 
    metrica: "Tiempo en tareas administrativas",
    mejora: "-73%",
    icono: Clock
  },
  { 
    antes: "$2.8M COP/mes", 
    despues: "$1.2M COP/mes", 
    metrica: "Costos operativos TI",
    mejora: "-57%",
    icono: TrendingUp
  },
  { 
    antes: "24-48 horas", 
    despues: "2-4 horas", 
    metrica: "Tiempo de respuesta a pedidos",
    mejora: "-92%",
    icono: Zap
  },
  { 
    antes: "Manual/Excel", 
    despues: "Tiempo real", 
    metrica: "Visibilidad del inventario",
    mejora: "100%",
    icono: BarChart3
  },
];

const herramientas = [
  { nombre: "Google Workspace", uso: "Colaboración y almacenamiento", icono: Cloud },
  { nombre: "Sistema POS", uso: "Punto de venta y facturación", icono: Smartphone },
  { nombre: "Google Sheets + Apps Script", uso: "Automatización de reportes", icono: FileSpreadsheet },
  { nombre: "WhatsApp Business API", uso: "Gestión de pedidos", icono: Users },
];

const TransformacionDigital = () => {
  const [faseActiva, setFaseActiva] = useState(0);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "completado": return "text-green-500";
      case "en_progreso": return "text-yellow-500";
      default: return "text-muted-foreground";
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "completado": return <CheckCircle2 className="text-green-500" size={20} />;
      case "en_progreso": return <Clock className="text-yellow-500" size={20} />;
      default: return <AlertCircle className="text-muted-foreground" size={20} />;
    }
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
                  <Rocket className="text-primary" size={24} />
                  Transformación Digital PyME
                </h1>
                <p className="text-sm text-muted-foreground">
                  Caso: Panadería "La Espiga Dorada" - Medellín, Colombia
                </p>
              </div>
            </div>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
              <CheckCircle2 size={14} className="mr-1" />
              Proyecto Completado
            </Badge>
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
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Building2 className="text-primary" size={32} />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold mb-2 text-primary">🏪 Caso de Estudio</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Panadería "La Espiga Dorada"</strong> es una PyME familiar con 25 años de tradición en Medellín, 
                con 3 puntos de venta y 18 empleados. Enfrentaban desafíos de gestión manual, pérdida de información 
                y dificultad para escalar su operación. Este proyecto de transformación digital les permitió modernizar 
                sus procesos sin perder su esencia artesanal.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Consultoría</Badge>
                <Badge variant="secondary">Migración Cloud</Badge>
                <Badge variant="secondary">Automatización</Badge>
                <Badge variant="secondary">Capacitación</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Métricas de impacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="text-primary" />
            Resultados del Proyecto
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricas.map((m, index) => (
              <Card key={index} className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <m.icono className="text-primary" size={20} />
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                      {m.mejora}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{m.metrica}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm line-through text-muted-foreground">{m.antes}</span>
                    <ArrowRight size={14} className="text-primary" />
                    <span className="font-bold text-primary">{m.despues}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <Tabs defaultValue="fases" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="fases" className="flex items-center gap-2">
              <Calendar size={16} />
              Fases
            </TabsTrigger>
            <TabsTrigger value="herramientas" className="flex items-center gap-2">
              <Settings size={16} />
              Herramientas
            </TabsTrigger>
            <TabsTrigger value="aprendizajes" className="flex items-center gap-2">
              <Lightbulb size={16} />
              Lecciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fases">
            {/* Timeline de fases */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Lista de fases */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Fases del Proyecto</CardTitle>
                  <CardDescription>Duración total: 13 semanas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {fasesProyecto.map((fase, index) => (
                    <button
                      key={fase.id}
                      onClick={() => setFaseActiva(index)}
                      className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                        faseActiva === index 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'hover:bg-secondary border border-transparent'
                      }`}
                    >
                      {getEstadoIcon(fase.estado)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{fase.nombre}</p>
                        <p className="text-xs text-muted-foreground">{fase.duracion}</p>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Detalle de fase */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getEstadoIcon(fasesProyecto[faseActiva].estado)}
                        Fase {fasesProyecto[faseActiva].id}: {fasesProyecto[faseActiva].nombre}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Duración: {fasesProyecto[faseActiva].duracion}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Descripción</h4>
                    <p className="text-muted-foreground">{fasesProyecto[faseActiva].descripcion}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Entregables</h4>
                    <ul className="space-y-2">
                      {fasesProyecto[faseActiva].entregables.map((entregable, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="text-green-500" size={16} />
                          {entregable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <h4 className="font-medium mb-1 text-green-500 flex items-center gap-2">
                      <TrendingUp size={16} />
                      Resultado Obtenido
                    </h4>
                    <p className="text-sm text-muted-foreground">{fasesProyecto[faseActiva].resultados}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Progreso del proyecto</p>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">5 de 5 fases completadas</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="herramientas">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stack Tecnológico Implementado</CardTitle>
                  <CardDescription>Herramientas seleccionadas por su facilidad de uso y costo accesible</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {herramientas.map((h, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <h.icono className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{h.nombre}</p>
                        <p className="text-sm text-muted-foreground">{h.uso}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Arquitectura de Solución</CardTitle>
                  <CardDescription>Ecosistema digital integrado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative p-6 rounded-lg bg-secondary border border-border">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 rounded-lg bg-background border border-primary/30">
                        <Cloud className="mx-auto mb-2 text-primary" size={24} />
                        <p className="text-xs font-medium">Cloud Storage</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background border border-primary/30">
                        <Smartphone className="mx-auto mb-2 text-primary" size={24} />
                        <p className="text-xs font-medium">Sistema POS</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background border border-primary/30">
                        <Users className="mx-auto mb-2 text-primary" size={24} />
                        <p className="text-xs font-medium">WhatsApp API</p>
                      </div>
                    </div>
                    <div className="flex justify-center my-4">
                      <div className="w-px h-8 bg-primary/30" />
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                      <BarChart3 className="mx-auto mb-2 text-primary" size={24} />
                      <p className="text-xs font-medium">Dashboard de Control</p>
                      <p className="text-xs text-muted-foreground">Reportes automatizados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="aprendizajes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="text-primary" />
                  Lecciones Aprendidas
                </CardTitle>
                <CardDescription>Insights clave para futuros proyectos de transformación digital en PyMEs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      titulo: "Empezar pequeño, escalar rápido",
                      descripcion: "Implementar cambios incrementales permite al equipo adaptarse sin resistencia al cambio. Priorizamos quick wins para generar confianza."
                    },
                    {
                      titulo: "La capacitación es clave",
                      descripcion: "El 80% del éxito depende de la adopción del equipo. Invertimos tiempo extra en capacitación personalizada según el rol."
                    },
                    {
                      titulo: "Documentar todo",
                      descripcion: "Los manuales y videos tutoriales creados permitieron que el conocimiento se mantuviera en la empresa, no solo en los consultores."
                    },
                    {
                      titulo: "Medir para mejorar",
                      descripcion: "Establecer KPIs claros desde el inicio permitió demostrar el ROI y justificar la inversión ante la gerencia."
                    },
                  ].map((leccion, index) => (
                    <div key={index} className="p-4 rounded-lg bg-secondary border border-border">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center">
                          {index + 1}
                        </span>
                        {leccion.titulo}
                      </h4>
                      <p className="text-sm text-muted-foreground">{leccion.descripcion}</p>
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

export default TransformacionDigital;