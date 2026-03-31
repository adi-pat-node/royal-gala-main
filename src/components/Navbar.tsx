import { useState } from "react";
import { Link } from "react-router-dom";
import ArchIcon from "./ArchIcon";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/American_Friends_Logo_Gold_PNG.png";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "THE CHANGEMAKER COHORT", href: "/changemakers" },
  { label: "THE STORY OF ST JAMES'S", href: "/story" },
  { label: "TICKETS", href: "/tickets" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-wine">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logoImg} alt="American Friends of St James's Piccadilly"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-champagne text-[13px] tracking-luxe font-light transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-champagne"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-wine border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-champagne text-[11px] tracking-luxe font-light hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;