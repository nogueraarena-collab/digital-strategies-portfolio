import { motion } from "framer-motion";
import { ExternalLink, Briefcase, Code, Video, Play, MousePointerClick, BarChart3, TrendingUp, FileText } from "lucide-react";

const projects = [
  {
    title: "Sistema de Gestión Empresarial",
    category: "Administración & Software",
    description: "Plataforma integral para gestión de inventarios, ventas y reportes financieros con dashboards interactivos.",
    tags: ["React", "Node.js", "PostgreSQL", "Analytics"],
    icon: Briefcase,
    image: "bg-gradient-to-br from-primary/20 to-accent/10",
    link: "/sistema-gestion",
    isInternal: true,
  },
  {
    title: "E-commerce & Marketing Digital",
    category: "Estrategia Digital",
    description: "Tienda online con estrategia de conversión optimizada, aumentando ventas un 150% en 6 meses.",
    tags: ["Shopify", "Meta Ads", "SEO", "Email Marketing"],
    icon: Code,
    image: "bg-gradient-to-br from-accent/20 to-primary/10",
    link: "/ecommerce",
    isInternal: true,
  },
  {
    title: "Dashboard de Análisis de Datos",
    category: "Análisis de Datos & MySQL",
    description: "Sistema de Business Intelligence con visualización de KPIs en tiempo real, consultas SQL optimizadas y reportes automatizados para toma de decisiones estratégicas.",
    tags: ["MySQL", "Power BI", "Python", "ETL"],
    icon: BarChart3,
    image: "bg-gradient-to-br from-emerald-500/20 to-primary/10",
    link: "#contact",
    isInternal: true,
  },
  {
    title: "Transformación Digital PyME",
    category: "Consultoría & Gestión",
    description: "Proyecto de digitalización integral para pequeñas empresas: automatización de procesos, migración a la nube y capacitación del equipo.",
    tags: ["Gestión de Proyectos", "Cloud", "Procesos", "Capacitación"],
    icon: TrendingUp,
    image: "bg-gradient-to-br from-violet-500/20 to-accent/15",
    link: "#contact",
    isInternal: true,
  },
  {
    title: "Sistema de Gestión Documental",
    category: "Backend & Bases de Datos",
    description: "Aplicación web para gestión documental con control de versiones, flujos de aprobación y búsqueda avanzada con indexación MySQL.",
    tags: ["React", "MySQL", "REST API", "Node.js"],
    icon: FileText,
    image: "bg-gradient-to-br from-amber-500/20 to-primary/10",
    link: "#contact",
    isInternal: true,
  },
  {
    title: "Campaña Audiovisual Corporativa",
    category: "Video & Comunicación",
    description: "Producción profesional de contenido audiovisual para comunicación corporativa y redes sociales.",
    tags: ["Premiere Pro", "After Effects", "Redes Sociales"],
    icon: Video,
    image: "bg-gradient-to-br from-primary/15 to-accent/20",
    link: "https://drive.google.com/file/d/1vymCO2rbdXaSrOMVorllVm4G0pCDfzD-/view?usp=drive_link",
    isInternal: false,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Proyectos <span className="text-gradient">Destacados</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una muestra de mi trabajo combinando gestión, desarrollo y creatividad 
            para entregar soluciones de alto impacto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group rounded-xl overflow-hidden border border-border bg-card card-shadow hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
            >
              {/* Project Image/Preview */}
              <div className={`relative h-48 ${project.image} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <project.icon className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                
                {/* Clickable indicator badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg"
                >
                  <MousePointerClick size={12} />
                  <span>Haz clic para ver</span>
                </motion.div>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.isInternal ? (
                    <a 
                      href={project.link}
                      className="p-4 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      <span className="font-medium">Ver proyecto</span>
                    </a>
                  ) : (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform flex items-center gap-2"
                    >
                      <Play size={20} />
                      <span className="font-medium">Ver video</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-display text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Action button */}
                {project.isInternal ? (
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <ExternalLink size={14} />
                    Explorar proyecto
                  </a>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Play size={14} />
                    Reproducir video
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            ¿Quieres ver más proyectos o conocer los detalles?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border hover:border-primary/50 hover:bg-secondary/80 transition-all font-medium"
          >
            Conversemos
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
