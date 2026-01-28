import { motion } from "framer-motion";
import { ExternalLink, Github, Briefcase, Code, Video } from "lucide-react";

const projects = [
  {
    title: "Sistema de Gestión Empresarial",
    category: "Administración & Software",
    description: "Plataforma integral para gestión de inventarios, ventas y reportes financieros con dashboards interactivos.",
    tags: ["React", "Node.js", "PostgreSQL", "Analytics"],
    icon: Briefcase,
    image: "bg-gradient-to-br from-primary/20 to-accent/10",
  },
  {
    title: "E-commerce & Marketing Digital",
    category: "Estrategia Digital",
    description: "Tienda online con estrategia de conversión optimizada, aumentando ventas un 150% en 6 meses.",
    tags: ["Shopify", "Meta Ads", "SEO", "Email Marketing"],
    icon: Code,
    image: "bg-gradient-to-br from-accent/20 to-primary/10",
  },
  {
    title: "Campaña Audiovisual Corporativa",
    category: "Video & Comunicación",
    description: "Producción de contenido audiovisual para redes sociales con más de 500K visualizaciones.",
    tags: ["Premiere Pro", "After Effects", "Redes Sociales"],
    icon: Video,
    image: "bg-gradient-to-br from-primary/15 to-accent/20",
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
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
                    <ExternalLink size={20} />
                  </button>
                  <button className="p-3 rounded-full bg-secondary border border-border hover:border-primary/50 hover:scale-110 transition-all">
                    <Github size={20} />
                  </button>
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
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
