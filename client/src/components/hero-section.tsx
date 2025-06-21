import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Hi, I'm <br />
              <span className="gradient-text">Kristyl Axlee Alegre</span>
            </h1>
            <p className="hero-subtitle">
              Web Developer crafting exceptional digital experiences
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I'm a web developer currently working at a tech-focused organization, where I lead the development and maintenance of the company's official website. I specialize in building clean, responsive, and scalable web applications using React, Bootstrap, Tailwind CSS, Express.js, Python and Prisma.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="btn-gradient"
                onClick={() => scrollToSection("#portfolio")}
              >
                <i className="fas fa-briefcase mr-2"></i>
                View My Work
              </Button>
              <Button 
                variant="outline"
                className="btn-outline-gradient"
                onClick={() => scrollToSection("#contact")}
              >
                <i className="fas fa-envelope mr-2"></i>
                Get In Touch
              </Button>
            </div>
          </div>

          <div className="text-center fade-in">
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className="fas fa-user text-white text-8xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
