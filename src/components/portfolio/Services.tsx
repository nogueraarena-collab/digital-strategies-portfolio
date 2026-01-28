import { motion } from "framer-motion";
import { Briefcase, Code, Video, TrendingUp, MessageSquare, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Administración Empresarial",
    description: "Gestión estratégica, planificación organizacional y optimización de procesos para impulsar el crecimiento de tu negocio.",
    skills: ["Planificación estratégica", "Gestión de proyectos", "Análisis financiero"],
  },
  {
    icon: Code,
    title: "Desarrollo de Software",
    description: "Creación de aplicaciones web y móviles modernas, escalables y centradas en la experiencia del usuario.",
    skills: ["React & TypeScript", "APIs & Backend", "Bases de datos"],
  },
  {
    icon: Video,
    title: "Edición de Video",
    description: "Producción audiovisual profesional para redes sociales, presentaciones corporativas y contenido digital.",
    skills: ["Edición profesional", "Motion graphics", "Contenido para RRSS"],
  },
  {
    icon: TrendingUp,
    title: "Estrategias Digitales",
    description: "Diseño e implementación de estrategias digitales que conectan con tu audiencia y generan resultados medibles.",
    skills: ["Marketing digital", "SEO & Analytics", "Conversión"],
  },
  {
    icon: MessageSquare,
    title: "Comunicación Corporativa",
    description: "Desarrollo de comunicación clara, amigable y efectiva que fortalece la imagen de tu marca.",
    skills: ["Branding", "Copywriting", "Relaciones públicas"],
  },
  {
    icon: BarChart3,
    title: "Análisis de Datos",
    description: "Transformo datos en insights accionables para tomar decisiones informadas y optimizar resultados.",
    skills: ["Dashboards", "KPIs", "Reportes ejecutivos"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Mis <span className="text-gradient">Servicios</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones integrales que combinan gestión empresarial, tecnología y creatividad 
            para llevar tu proyecto al siguiente nivel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 card-shadow hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-5 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {service.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
