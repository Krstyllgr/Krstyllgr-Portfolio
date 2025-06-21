import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter(project => project.category === activeFilter);
  }, [projects, activeFilter]);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile" },
    { id: "api", name: "APIs" },
  ];

  if (isLoading) {
    return (
      <section id="portfolio" className="section-padding bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="loading mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-in">Featured Projects</h2>
          <p className="text-xl text-muted-foreground fade-in leading-relaxed">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </div>
        
        {/* Project Filters */}
        <div className="text-center mb-12 fade-in">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`filter-btn ${activeFilter === category.id ? "active" : ""}`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="text-center fade-in">
          <Link href="/portfolio">
            <Button className="btn-gradient text-lg px-8 py-3">
              <i className="fas fa-eye mr-2"></i>
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
