import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, FileText, Search, Filter, Upload, Download,
  FolderOpen, File, Clock, CheckCircle2, XCircle, Eye,
  Edit, Trash2, MoreVertical, Users, Calendar, Tag,
  FileCheck, FileClock, FileX, ChevronRight, Database
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Caso: Constructora Andina S.A.S - Cali
const documentos = [
  {
    id: 1,
    nombre: "Contrato Obra Torre Norte",
    tipo: "Contrato",
    proyecto: "Torre Norte Cali",
    version: "v3.2",
    estado: "aprobado",
    fechaCreacion: "2024-01-15",
    fechaModificacion: "2024-02-20",
    autor: "María González",
    aprobador: "Carlos Mejía",
    tamaño: "2.4 MB",
    etiquetas: ["Legal", "Prioritario", "2024"]
  },
  {
    id: 2,
    nombre: "Planos Estructurales Nivel 1-5",
    tipo: "Plano",
    proyecto: "Torre Norte Cali",
    version: "v2.1",
    estado: "en_revision",
    fechaCreacion: "2024-02-01",
    fechaModificacion: "2024-03-10",
    autor: "Ing. Pedro Ramírez",
    aprobador: "Pendiente",
    tamaño: "15.8 MB",
    etiquetas: ["Ingeniería", "Estructural"]
  },
  {
    id: 3,
    nombre: "Licencia de Construcción",
    tipo: "Licencia",
    proyecto: "Torre Norte Cali",
    version: "v1.0",
    estado: "aprobado",
    fechaCreacion: "2023-11-20",
    fechaModificacion: "2023-11-20",
    autor: "Ana Martínez",
    aprobador: "Curaduría Urbana #2",
    tamaño: "890 KB",
    etiquetas: ["Legal", "Obligatorio"]
  },
  {
    id: 4,
    nombre: "Presupuesto General 2024",
    tipo: "Financiero",
    proyecto: "Administrativo",
    version: "v4.0",
    estado: "aprobado",
    fechaCreacion: "2024-01-05",
    fechaModificacion: "2024-03-15",
    autor: "Luis Hernández",
    aprobador: "Gerencia General",
    tamaño: "1.2 MB",
    etiquetas: ["Financiero", "Confidencial", "2024"]
  },
  {
    id: 5,
    nombre: "Acta de Entrega Parcial Fase 1",
    tipo: "Acta",
    proyecto: "Centro Comercial Palmira",
    version: "v1.0",
    estado: "pendiente",
    fechaCreacion: "2024-03-18",
    fechaModificacion: "2024-03-18",
    autor: "Juan Ospina",
    aprobador: "Pendiente",
    tamaño: "450 KB",
    etiquetas: ["Operativo", "Urgente"]
  },
  {
    id: 6,
    nombre: "Informe Avance Mensual Marzo",
    tipo: "Informe",
    proyecto: "Torre Norte Cali",
    version: "v1.0",
    estado: "rechazado",
    fechaCreacion: "2024-03-30",
    fechaModificacion: "2024-04-02",
    autor: "Sandra López",
    aprobador: "Carlos Mejía",
    tamaño: "3.1 MB",
    etiquetas: ["Operativo", "Mensual"]
  },
];

const estadisticas = [
  { label: "Total Documentos", valor: "1,247", icono: FileText, color: "text-primary" },
  { label: "Pendientes Revisión", valor: "23", icono: FileClock, color: "text-yellow-500" },
  { label: "Aprobados Hoy", valor: "8", icono: FileCheck, color: "text-green-500" },
  { label: "Rechazados", valor: "3", icono: FileX, color: "text-red-500" },
];

const carpetas = [
  { nombre: "Contratos", cantidad: 156, icono: "📄" },
  { nombre: "Planos", cantidad: 423, icono: "📐" },
  { nombre: "Licencias", cantidad: 45, icono: "📋" },
  { nombre: "Informes", cantidad: 289, icono: "📊" },
  { nombre: "Actas", cantidad: 178, icono: "✍️" },
  { nombre: "Financiero", cantidad: 156, icono: "💰" },
];

const historialVersiones = [
  { version: "v3.2", fecha: "2024-02-20", autor: "María González", cambio: "Ajuste cláusula de garantías", estado: "actual" },
  { version: "v3.1", fecha: "2024-02-15", autor: "María González", cambio: "Corrección fechas de entrega", estado: "anterior" },
  { version: "v3.0", fecha: "2024-02-01", autor: "Carlos Mejía", cambio: "Revisión legal completa", estado: "anterior" },
  { version: "v2.0", fecha: "2024-01-20", autor: "María González", cambio: "Inclusión anexos técnicos", estado: "anterior" },
  { version: "v1.0", fecha: "2024-01-15", autor: "María González", cambio: "Versión inicial", estado: "anterior" },
];

const GestionDocumental = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<typeof documentos[0] | null>(null);
  const [showVersions, setShowVersions] = useState(false);

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "aprobado":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/30"><CheckCircle2 size={12} className="mr-1" />Aprobado</Badge>;
      case "en_revision":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30"><Clock size={12} className="mr-1" />En Revisión</Badge>;
      case "pendiente":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30"><Clock size={12} className="mr-1" />Pendiente</Badge>;
      case "rechazado":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/30"><XCircle size={12} className="mr-1" />Rechazado</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  const filteredDocs = documentos.filter(doc =>
    doc.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.proyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <FileText className="text-primary" size={24} />
                  Sistema de Gestión Documental
                </h1>
                <p className="text-sm text-muted-foreground">
                  Caso: Constructora Andina S.A.S - Cali, Colombia
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Upload size={16} className="mr-2" />
                Subir
              </Button>
              <Button size="sm">
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
          <h2 className="font-display text-lg font-semibold mb-2 text-primary">🏗️ Caso de Estudio</h2>
          <p className="text-muted-foreground mb-4">
            <strong>Constructora Andina S.A.S</strong> es una empresa constructora con sede en Cali que maneja 
            más de 5 proyectos simultáneos. Desarrollamos este sistema para centralizar toda su documentación 
            técnica, legal y administrativa, con control de versiones, flujos de aprobación y búsqueda avanzada 
            indexada en MySQL para acceso instantáneo a cualquier documento.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge>React</Badge>
            <Badge variant="secondary">MySQL</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">REST API</Badge>
            <Badge variant="secondary">Full-Text Search</Badge>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {estadisticas.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                      <stat.icono size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.valor}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="documentos" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <FileText size={16} />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="carpetas" className="flex items-center gap-2">
              <FolderOpen size={16} />
              Carpetas
            </TabsTrigger>
            <TabsTrigger value="modelo" className="flex items-center gap-2">
              <Database size={16} />
              Modelo BD
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documentos">
            {/* Barra de búsqueda */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      placeholder="Buscar por nombre, proyecto o tipo..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter size={16} className="mr-2" />
                      Filtros
                    </Button>
                    <Button variant="outline">
                      <Calendar size={16} className="mr-2" />
                      Fecha
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de documentos */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos Recientes</CardTitle>
                <CardDescription>
                  Mostrando {filteredDocs.length} de {documentos.length} documentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all hover:bg-secondary/50 cursor-pointer"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <File className="text-primary" size={20} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{doc.nombre}</h4>
                              <Badge variant="outline" className="text-xs">{doc.version}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {doc.proyecto} • {doc.tipo} • {doc.tamaño}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              {doc.etiquetas.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getEstadoBadge(doc.estado)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setShowVersions(true)}>
                                <Clock size={14} className="mr-2" />
                                Ver versiones
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye size={14} className="mr-2" />
                                Vista previa
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download size={14} className="mr-2" />
                                Descargar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit size={14} className="mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 size={14} className="mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="carpetas">
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {carpetas.map((carpeta, index) => (
                <motion.div
                  key={carpeta.nombre}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:border-primary/30 transition-all cursor-pointer hover:-translate-y-1">
                    <CardContent className="pt-6 text-center">
                      <span className="text-4xl">{carpeta.icono}</span>
                      <h3 className="font-medium mt-3">{carpeta.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{carpeta.cantidad} archivos</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="modelo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="text-primary" size={20} />
                  Modelo de Base de Datos MySQL
                </CardTitle>
                <CardDescription>
                  Estructura relacional con índices optimizados para búsqueda full-text
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { 
                      tabla: "documentos", 
                      campos: ["id INT PK", "nombre VARCHAR(255)", "ruta_archivo TEXT", "tipo_id FK", "proyecto_id FK", "version VARCHAR(10)", "estado ENUM", "fecha_creacion DATETIME", "autor_id FK"],
                      indices: ["FULLTEXT(nombre)", "INDEX(estado)", "INDEX(proyecto_id)"]
                    },
                    { 
                      tabla: "versiones", 
                      campos: ["id INT PK", "documento_id FK", "numero_version VARCHAR(10)", "cambios TEXT", "autor_id FK", "fecha DATETIME", "archivo_respaldo TEXT"],
                      indices: ["INDEX(documento_id)", "INDEX(fecha)"]
                    },
                    { 
                      tabla: "flujos_aprobacion", 
                      campos: ["id INT PK", "documento_id FK", "aprobador_id FK", "estado ENUM", "comentarios TEXT", "fecha_decision DATETIME"],
                      indices: ["INDEX(documento_id)", "INDEX(aprobador_id)"]
                    },
                  ].map((table) => (
                    <div key={table.tabla} className="p-4 rounded-lg bg-secondary border border-border">
                      <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <Database size={14} />
                        {table.tabla}
                      </h4>
                      <div className="space-y-1 mb-3">
                        {table.campos.map((campo) => (
                          <p key={campo} className="font-mono text-xs text-muted-foreground">• {campo}</p>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-primary font-medium mb-1">Índices:</p>
                        {table.indices.map((idx) => (
                          <p key={idx} className="font-mono text-xs text-muted-foreground">• {idx}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-[#1e1e1e] font-mono text-sm overflow-x-auto">
                  <p className="text-gray-400 mb-2">-- Consulta de búsqueda optimizada con FULLTEXT</p>
                  <pre className="text-green-400">{`SELECT 
  d.id, d.nombre, d.version, d.estado,
  p.nombre_proyecto, u.nombre as autor,
  MATCH(d.nombre) AGAINST('contrato obra' IN NATURAL LANGUAGE MODE) as relevancia
FROM documentos d
INNER JOIN proyectos p ON d.proyecto_id = p.id
INNER JOIN usuarios u ON d.autor_id = u.id
WHERE MATCH(d.nombre) AGAINST('contrato obra' IN NATURAL LANGUAGE MODE)
  AND d.estado = 'aprobado'
ORDER BY relevancia DESC
LIMIT 20;`}</pre>
                  <p className="text-cyan-400 mt-3">Resultado: 15 filas | Tiempo: 0.008s (índice FULLTEXT)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal de detalle de documento */}
        <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <File className="text-primary" size={20} />
                {selectedDoc?.nombre}
              </DialogTitle>
              <DialogDescription>
                Detalles del documento y flujo de aprobación
              </DialogDescription>
            </DialogHeader>
            {selectedDoc && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Proyecto</p>
                    <p className="font-medium">{selectedDoc.proyecto}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-medium">{selectedDoc.tipo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Versión</p>
                    <p className="font-medium">{selectedDoc.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    {getEstadoBadge(selectedDoc.estado)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Autor</p>
                    <p className="font-medium flex items-center gap-2">
                      <Users size={14} />
                      {selectedDoc.autor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Aprobador</p>
                    <p className="font-medium">{selectedDoc.aprobador}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Etiquetas</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.etiquetas.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download size={16} className="mr-2" />
                    Descargar
                  </Button>
                  <Button variant="outline" onClick={() => { setSelectedDoc(null); setShowVersions(true); }}>
                    <Clock size={16} className="mr-2" />
                    Historial
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de versiones */}
        <Dialog open={showVersions} onOpenChange={setShowVersions}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Historial de Versiones</DialogTitle>
              <DialogDescription>
                Control de cambios del documento
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {historialVersiones.map((v, index) => (
                <div 
                  key={v.version}
                  className={`p-3 rounded-lg border ${v.estado === 'actual' ? 'border-primary bg-primary/5' : 'border-border'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={v.estado === 'actual' ? 'default' : 'secondary'}>
                        {v.version}
                      </Badge>
                      {v.estado === 'actual' && <Badge variant="outline">Actual</Badge>}
                    </div>
                    <span className="text-sm text-muted-foreground">{v.fecha}</span>
                  </div>
                  <p className="text-sm mt-2">{v.cambio}</p>
                  <p className="text-xs text-muted-foreground mt-1">Por: {v.autor}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default GestionDocumental;