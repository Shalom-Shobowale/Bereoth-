import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => location.pathname === href;

  // Handle scroll for sticky navbar with buffer to prevent flicker
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.4;

      // Add a small buffer (20px) to avoid rapid toggling near the threshold
      if (scrollY > threshold + 20 && !showSticky) {
        setShowSticky(true);
      } else if (scrollY < threshold - 20 && showSticky) {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSticky]);

  const NavLinks = ({ isMobile = false }) => (
    <ul
      className={`${
        isMobile
          ? "px-2 pt-2 pb-3 space-y-1 bg-accent absolute left-0 top-24 w-full"
          : "hidden md:flex space-x-8"
      }`}
    >
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          onClick={() => isMobile && setIsMenuOpen(false)}
          className={`${
            isMobile
              ? `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-blue-50"
                    : "text-primary hover:text-blue-600 hover:bg-gray-50"
                }`
              : `px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-accent bg-primary"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`
          }`}
        >
          {item.name}
        </Link>
      ))}
    </ul>
  );

  const NavbarContent = ({ sticky }) => (
    <div
      className={`${
        sticky
          ? "fixed top-0 w-full bg-accent/80 backdrop-blur-md shadow-md z-50 transition-all duration-500 animate-fade-slide"
          : "w-full bg-accent z-40 relative"
      }`}
    >
      <nav className="flex justify-between items-center w-[92%] mx-auto h-24">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/Logo2.png"
            alt="bereoth estate development project"
            className="h-40"
          />
        </Link>

        {/* Desktop nav */}
        <NavLinks />

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-blue-600 p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && <NavLinks isMobile />}
    </div>
  );

  // ✅ Render only ONE navbar, not two (prevents blinking)
  return <NavbarContent sticky={showSticky} />;
};

export default Navbar;
