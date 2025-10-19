import React from "react";
import { MapPin, Mail } from "lucide-react";
const Header2 = () => {
  return (
    <header className="border-b text-pretty flex md:flex-row flex-col gap-2 md:gap-10 px-4 md:px-12 py-3 text-gray-600">
      <div className="flex items-center gap-3">
        <p>
          <MapPin />
        </p>
        <p>1/3 Suco Road Beside VIO Office, Idi-Oparun Agege, Lagos State.</p>
      </div>
      <div className="flex items-center gap-3 text-center">
        <p>
          <Mail />
        </p>
        <a href="mailto:info@bereoth.com">info@bereoth.com</a>
      </div>
    </header>
  );
};

export default Header2;
