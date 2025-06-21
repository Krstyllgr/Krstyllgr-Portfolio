import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  console.log("Portfolio data:", { projects, isLoading, error });

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [projects, activeFilter]);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile" },
    { id: "api", name: "APIs" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">My Portfolio</h1>
            <p className="text-xl text-muted-foreground fade-in leading-relaxed">
              A comprehensive showcase of my projects, skills, and experience in web development.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
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
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="loading mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-folder-open text-6xl text-muted-foreground/50 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-muted-foreground">
                {activeFilter === "all" 
                  ? "No projects available at the moment." 
                  : `No projects found in the "${categories.find(c => c.id === activeFilter)?.name}" category.`
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="fade-in" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && filteredProjects.length > 0 && (
            <div className="text-center mt-12 fade-in">
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                {activeFilter !== "all" && ` in ${categories.find(c => c.id === activeFilter)?.name}`}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
