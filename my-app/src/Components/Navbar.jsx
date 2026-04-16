import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Agrivest", href: "/agro-farm" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (href) => location.pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`
          sticky top-0 z-40 transition-all duration-300
          ${isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
            : "bg-white border-b border-gray-100 py-3"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <img
                src="/Logo2.png"
                alt="Bereoth Property"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Link
                to="/contact"
                className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                    ${isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-primary text-white hover:bg-primary/90 px-4 py-3 rounded-lg font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;