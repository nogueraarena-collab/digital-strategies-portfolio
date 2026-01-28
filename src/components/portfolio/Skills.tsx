import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Gestión & Estrategia",
    skills: [
      { name: "Planificación Estratégica", level: 95 },
      { name: "Gestión de Proyectos", level: 90 },
      { name: "Análisis de Negocios", level: 100 },
      { name: "Liderazgo de Equipos", level: 85 },
    ],
  },
  {
    title: "Desarrollo & Tecnología",
    skills: [
      { name: "React / TypeScript", level: 88 },
      { name: "Python / Node.js", level: 82 },
      { name: "Bases de Datos SQL", level: 100 },
      { name: "APIs & Integraciones", level: 80 },
    ],
  },
  {
    title: "Creatividad & Comunicación",
    skills: [
      { name: "Edición de Video", level: 100 },
      { name: "Marketing Digital", level: 100 },
      { name: "Copywriting", level: 78 },
      { name: "Diseño UX/UI", level: 100 },
    ],
  },
];

const tools = [
  "React", "TypeScript", "Python", "Node.js", "PostgreSQL", "Git",
  "Premiere Pro", "After Effects", "Figma", "Google Analytics",
  "Meta Ads", "Excel Avanzado", "Power BI", "Notion", "Trello"
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Habilidades <span className="text-gradient">Técnicas</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un perfil multidisciplinario que combina conocimientos en gestión, 
            tecnología y creatividad para ofrecer soluciones completas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              className="p-6 rounded-xl bg-gradient-card border border-border card-shadow"
            >
              <h3 className="font-display text-xl font-semibold mb-6 text-primary">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: catIndex * 0.15 + skillIndex * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: "var(--gradient-primary)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="font-display text-2xl font-semibold mb-6">
            Herramientas & Tecnologías
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {tools.map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg bg-secondary/80 border border-border text-sm font-medium hover:border-primary/50 hover:bg-secondary transition-all cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
