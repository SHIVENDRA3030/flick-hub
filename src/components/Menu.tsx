
import React from "react";
import { Link } from "react-router-dom";
import { Home, Film, Info, FileText, PlaySquare } from "lucide-react";

const NavMenu: React.FC = () => {
  return (
    <nav className="p-4 neo-blur backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
          Darkstark
        </Link>

        <div className="flex gap-4">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link to="/netflix" className="flex items-center gap-1 hover:text-primary transition-colors">
            <PlaySquare className="w-4 h-4" />
            <span className="hidden md:inline">Netflix</span>
          </Link>
          <Link to="/about" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Info className="w-4 h-4" />
            <span className="hidden md:inline">About</span>
          </Link>
          <Link to="/terms" className="flex items-center gap-1 hover:text-primary transition-colors">
            <FileText className="w-4 h-4" />
            <span className="hidden md:inline">Terms</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
