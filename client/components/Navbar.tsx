// src/components/Navbar.tsx

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, Calendar, LogIn, Menu, X } from "lucide-react";
import { NotificationCenter } from "@/components/NotificationCenter"; // Pastikan import ini benar

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Tambahkan "Helpdesk" ke navigasi
  const navItems = [
    { path: "/", label: "Beranda" },
    { path: "/layanan", label: "Layanan" },
    { path: "/berita", label: "Berita" },
    { path: "/aduan", label: "Aduan" },
    { path: "/helpdesk", label: "Helpdesk" },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                MPP Kota Bekasi
              </h1>
              <p className="text-xs text-green-600 font-medium">
                Mal Pelayanan Publik
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-green-600 border-b-2 border-green-600 pb-1"
                    : "text-gray-900 hover:text-green-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons with NotificationCenter */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Masuk
              </Button>
            </Link>
            <Link to="/booking">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Calendar className="h-4 w-4 mr-2" />
                Daftar Antrian
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium ${
                    isActive(item.path) ? "text-green-600" : "text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t flex items-center justify-between">
                <div className="flex space-x-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button
                            variant="outline"
                            className="flex-grow justify-start border-green-600 text-green-600"
                        >
                            <LogIn className="h-4 w-4 mr-2" /> Masuk
                        </Button>
                    </Link>
                    <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                        <Button
                            className="flex-grow justify-start bg-green-600 hover:bg-green-700"
                        >
                            <Calendar className="h-4 w-4 mr-2" /> Daftar Antrian
                        </Button>
                    </Link>
                </div>
                <NotificationCenter />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}