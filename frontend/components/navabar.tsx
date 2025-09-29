"use client";

import Link from "next/link";
import { Home, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/stocks", label: "Stocks", icon: TrendingUp },
    { href: "/summary", label: "Summary", icon: BarChart3 },
  ];

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 -z-10"></div>
      <nav className="w-full relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10"></div>
        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              <PieChart className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MF Dashboard
            </span>
          </Link>

          {/* Links */}
          <div className="flex gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                    transition-all duration-300 group
                    ${isActive 
                      ? 'bg-white/20 text-white border border-white/30 shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"></div>
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`font-medium relative z-10 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                    {link.label}
                  </span>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/5 to-white/10"></div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </nav>
    </div>
  );
};

export default Navbar;
