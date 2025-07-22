import { useState, useEffect } from "react";
import { Link } from "wouter";
import Logo from "@/components/Logo";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { Menu, X } from "@/lib/icons";
import { AuthButtons } from "@/components/AuthButtons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-gray-300 hover:text-accent transition">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-accent transition">How It Works</a>
          <Link href="/pricing">
            <span className="text-gray-300 hover:text-accent transition cursor-pointer">Pricing</span>
          </Link>
          <Link href="/strategies-library">
            <span className="text-gray-300 hover:text-accent transition cursor-pointer">Strategies</span>
          </Link>
          <div className="relative group">
            <Link href="/download">
              <span className="text-gray-300 hover:text-accent transition cursor-pointer flex items-center">
                Downloads
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </Link>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <Link href="/download">
                  <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-secondary/50 cursor-pointer">
                    Main Download
                  </span>
                </Link>
                <Link href="/indicator-addons">
                  <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-secondary/50 cursor-pointer flex items-center">
                    Indicator Addons
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-black rounded-full">PRO</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <AuthButtons />
          <Link href="/pricing">
            <ButtonGradient>
              Start Free Trial
            </ButtonGradient>
          </Link>
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
            <a href="#features" className="text-xl font-medium text-gray-200 hover:text-accent transition py-2" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-xl font-medium text-gray-200 hover:text-accent transition py-2" onClick={() => setIsMenuOpen(false)}>How It Works</a>
            <Link href="/pricing">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" onClick={() => setIsMenuOpen(false)}>Pricing</span>
            </Link>
            <Link href="/strategies-library">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" onClick={() => setIsMenuOpen(false)}>Strategies</span>
            </Link>
            <Link href="/how-to">
              <span className="text-xl font-medium text-gray-200 hover:text-accent transition py-2 block cursor-pointer" onClick={() => setIsMenuOpen(false)}>How-To Guides</span>
            </Link>
            <div className="py-2">
              <Link href="/download">
                <span className="text-xl font-medium text-gray-200 hover:text-accent transition block cursor-pointer" onClick={() => setIsMenuOpen(false)}>Downloads</span>
              </Link>
              <Link href="/indicator-addons">
                <span className="text-sm font-medium text-gray-400 hover:text-accent transition py-1 pl-4 mt-1 flex items-center cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                  Indicator Addons
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary text-black rounded-full">PRO</span>
                </span>
              </Link>
            </div>
            
            <div className="pt-4 flex flex-col space-y-4">
              <div className="mx-auto">
                <AuthButtons />
              </div>
              <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
                <ButtonGradient className="w-full">
                  Start Free Trial
                </ButtonGradient>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
