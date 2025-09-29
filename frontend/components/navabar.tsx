"use client";
import Link from "next/link";
import { Home, TrendingUp, BarChart3, PieChart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/stocks", label: "Stocks", icon: TrendingUp },
    { href: "/summary", label: "Summary", icon: BarChart3 },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 -z-10"></div>
      
      <nav className="w-full relative">
        {/* Glassmorphism backdrop */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl"></div>
        
        {/* Main navigation container */}
        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 text-white cursor-pointer group z-20"
          >
            <div className="p-1.5 sm:p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300 shadow-lg">
              <PieChart className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MF Dashboard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1 lg:gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-xl
                    transition-all duration-300 group font-medium
                    ${isActive
                      ? 'bg-white/20 text-white border border-white/30 shadow-xl backdrop-blur-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                    }
                  `}
                >
                  {/* Active state gradient overlay */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-xl"></div>
                  )}
                  
                  <Icon className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                    isActive ? 'text-white' : 'group-hover:text-white group-hover:scale-110'
                  }`} />
                  
                  <span className={`relative z-10 transition-all duration-300 text-sm lg:text-base ${
                    isActive ? 'text-white' : 'group-hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm"></div>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative z-20 p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`
          md:hidden absolute top-full left-0 right-0 z-10 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }
        `}>
          <div className="mx-4 mt-2 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      relative flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-300 group font-medium
                      ${isActive
                        ? 'bg-white/20 text-white border border-white/30 shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                      }
                    `}
                  >
                    {/* Active state indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                    )}
                    
                    <Icon className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                      isActive ? 'text-white' : 'group-hover:text-white group-hover:scale-110'
                    }`} />
                    
                    <span className={`relative z-10 transition-all duration-300 ${
                      isActive ? 'text-white' : 'group-hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-white/5 to-white/10"></div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Mobile menu backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-5"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;