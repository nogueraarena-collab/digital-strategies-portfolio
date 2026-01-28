import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Services from "@/components/portfolio/Services";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
