import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "@shared/schema";
import portfolioPlaceholder from "@/assets/portfolio-placeholder.svg";

// Import the cafe screenshots
import cafeHome from "@assets/Screenshot 2025-07-22 115326_1753156453100.png";
import cafeMenu from "@assets/Screenshot 2025-07-22 115342_1753156453104.png";
import cafeAbout from "@assets/Screenshot 2025-07-22 115350_1753156453105.png";
import cafeContact from "@assets/Screenshot 2025-07-22 115357_1753156453105.png";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
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

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!project) return null;

  // Get project images with fallback
  const getProjectImages = (project: Project) => {
    if (project.images && project.images.length > 0) {
      return project.images.map(imagePath => {
        if (imagePath.includes('Screenshot 2025-07-22 115326')) return cafeHome;
        if (imagePath.includes('Screenshot 2025-07-22 115342')) return cafeMenu;
        if (imagePath.includes('Screenshot 2025-07-22 115350')) return cafeAbout;
        if (imagePath.includes('Screenshot 2025-07-22 115357')) return cafeContact;
        return portfolioPlaceholder;
      });
    }
    return [project.imageUrl?.startsWith('/src/') ? portfolioPlaceholder : project.imageUrl || portfolioPlaceholder];
  };

  const images = getProjectImages(project);
  const imageLabels = ['Homepage', 'Menu', 'About Us', 'Contact'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Project details and gallery
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg h-80">
              <img 
                src={images[currentImageIndex]}
                alt={`${project.title} - ${imageLabels[currentImageIndex] || `Image ${currentImageIndex + 1}`}`}
                className="w-full h-full object-cover"
              />
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {imageLabels[currentImageIndex] || `${currentImageIndex + 1} of ${images.length}`}
                  </div>
                </>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden ${
                      currentImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About this project</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <Badge variant="outline" className="capitalize">
                {project.category}
              </Badge>
            </div>
            
            <div className="flex gap-3 pt-4">
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}