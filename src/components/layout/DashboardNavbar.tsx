import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "@/lib/icons";

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-background backdrop-blur-md shadow-md"}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/dashboard">
            <span className={`${location === "/dashboard" ? "text-primary" : "text-gray-300"} hover:text-accent transition cursor-pointer`}>
              Dashboard
            </span>
          </Link>
          <Link href="/strategies-library">
            <span className={`${location === "/strategies-library" ? "text-primary" : "text-gray-300"} hover:text-accent transition cursor-pointer`}>
              Strategies Library
            </span>
          </Link>
          <Link href="/documentation">
            <span className={`${location === "/documentation" ? "text-primary" : "text-gray-300"} hover:text-accent transition cursor-pointer`}>
              Documentation
            </span>
          </Link>
          <Link href="/support">
            <span className={`${location === "/support" ? "text-primary" : "text-gray-300"} hover:text-accent transition cursor-pointer`}>
              Support
            </span>
          </Link>
          <Link href="/feedback">
            <span className={`${location === "/feedback" ? "text-primary" : "text-gray-300"} hover:text-accent transition cursor-pointer`}>
              Feedback
            </span>
          </Link>
          <Link href="/community">
            <span className={`${location === "/community" ? "text-primary" : "text-gray-300"} hover:text-accent transition cursor-pointer`}>
              Community
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">Admin</Link>
          </Button>
        </div>
        
        <button 
          className="md:hidden text-gray-300 p-2"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40 flex flex-col">
          <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            <Link href="/dashboard">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" 
                onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </span>
            </Link>
            <Link href="/strategies-library">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" 
                onClick={() => setIsMenuOpen(false)}>
                Strategies Library
              </span>
            </Link>
            <Link href="/how-to">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" 
                onClick={() => setIsMenuOpen(false)}>
                How-To Guides
              </span>
            </Link>
            <Link href="/documentation">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" 
                onClick={() => setIsMenuOpen(false)}>
                Documentation
              </span>
            </Link>
            <Link href="/support">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" 
                onClick={() => setIsMenuOpen(false)}>
                Support
              </span>
            </Link>
            <Link href="/admin">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" 
                onClick={() => setIsMenuOpen(false)}>
                Admin
              </span>
            </Link>
            <Link href="/feedback">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" 
                onClick={() => setIsMenuOpen(false)}>
                Feedback
              </span>
            </Link>
            <Link href="/community">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" 
                onClick={() => setIsMenuOpen(false)}>
                Community
              </span>
            </Link>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardNavbar;