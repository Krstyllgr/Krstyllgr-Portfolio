import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar-custom ${isScrolled ? "shadow-lg" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="gradient-text text-2xl font-bold">
            KAA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-full bg-muted hover:bg-muted/80 transition-all duration-300 group"
              title="Toggle theme"
            >
              <div className="relative w-6 h-6">
                <Sun className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  theme === "light" 
                    ? "rotate-0 scale-100 opacity-100" 
                    : "rotate-90 scale-0 opacity-0"
                }`} />
                <Moon className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  theme === "dark" 
                    ? "rotate-0 scale-100 opacity-100" 
                    : "-rotate-90 scale-0 opacity-0"
                }`} />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-full bg-muted hover:bg-muted/80 transition-all duration-300 group"
              title="Toggle theme"
            >
              <div className="relative w-6 h-6">
                <Sun className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  theme === "light" 
                    ? "rotate-0 scale-100 opacity-100" 
                    : "rotate-90 scale-0 opacity-0"
                }`} />
                <Moon className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  theme === "dark" 
                    ? "rotate-0 scale-100 opacity-100" 
                    : "-rotate-90 scale-0 opacity-0"
                }`} />
              </div>
            </button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
