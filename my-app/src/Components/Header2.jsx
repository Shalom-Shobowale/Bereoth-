import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const Header2 = () => {
  return (
    <div className="bg-white text-sm py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs">
              1/3 Suco Road Beside VIO Office, Idi-Oparun Agege, Lagos State.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="mailto:info@bereoth.com" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs">info@bereoth.com</span>
            </a>
            <a 
              href="tel:+2348134967650" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs">+234 813 496 7650</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;