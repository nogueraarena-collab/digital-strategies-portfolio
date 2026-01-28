import { motion } from "framer-motion";
import { ArrowDown, Briefcase, Code, Video, TrendingUp } from "lucide-react";

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30" 
          style={{ background: "var(--gradient-glow)" }} 
        />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20" 
          style={{ background: "var(--gradient-glow)" }} 
        />
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-32 left-[15%] text-primary/30"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Briefcase size={48} />
      </motion.div>
      <motion.div
        className="absolute top-48 right-[20%] text-primary/25"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Code size={56} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[20%] text-primary/20"
        animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Video size={44} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-[15%] text-primary/25"
        animate={{ y: [0, 12, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <TrendingUp size={50} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Disponible para nuevos proyectos</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Transformo ideas en{" "}
            <span className="text-gradient">soluciones digitales</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Administrador de Empresas & Desarrollador de Software especializado en 
            estrategias digitales, comunicación y soluciones tecnológicas innovadoras.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={scrollToServices}
              className="group px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 bg-primary text-primary-foreground hover:shadow-[var(--shadow-glow)] hover:scale-105"
            >
              Ver mis servicios
            </button>
            <a
              href="#contact"
              className="px-8 py-4 rounded-lg font-semibold text-lg border border-border bg-secondary/30 text-foreground hover:bg-secondary hover:border-primary/50 transition-all duration-300"
            >
              Contáctame
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToServices}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowDown size={28} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
