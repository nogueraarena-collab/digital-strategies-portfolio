import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-bold text-gradient mb-2">
              MiPortafolio
            </p>
            <p className="text-sm text-muted-foreground">
              Administrador de Empresas & Desarrollador de Software
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:contacto@miportafolio.com"
              className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MiPortafolio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
