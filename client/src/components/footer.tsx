export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              &copy; {currentYear} Kristyl Axlee Alegre. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://www.linkedin.com/in/kristyl-axlee-alegre-9722a8285" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a 
              href="https://github.com/krstylxllgr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a 
              href="mailto:kristylaxleealegre0326@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
