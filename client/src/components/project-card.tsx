import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";
import portfolioPlaceholder from "@/assets/portfolio-placeholder.svg";

interface ProjectCardProps {
  project: Project;
}

const getProjectIcon = (category: string) => {
  switch (category) {
    case "web":
      return "fas fa-laptop-code";
    case "mobile":
      return "fas fa-mobile-alt";
    case "api":
      return "fas fa-server";
    default:
      return "fas fa-code";
  }
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="project-card fade-in">
      <div className="project-image">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl.startsWith('/src/') ? portfolioPlaceholder : project.imageUrl} 
            alt={project.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
            <i className={getProjectIcon(project.category)}></i>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h5 className="text-xl font-semibold mb-3">{project.title}</h5>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <Badge key={index} variant="secondary" className="tech-badge">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1" />
                Code
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
