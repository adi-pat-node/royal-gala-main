import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/American_Friends_Logo_Gold_PNG.png";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "THE CHANGEMAKER COHORT", href: "/changemakers" },
  { label: "THE STORY OF ST JAMES'S", href: "/story" },
  { label: "SPONSORS", href: "/sponsors" },
  { label: "TICKETS", href: "/tickets" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-wine" style={{ overflow: "visible" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo medallion */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div
            style={{
              width: 150,
              height: 150,
              minWidth: 150,
              borderRadius: "50%",
              backgroundColor: "#3B010B",
              border: "2px solid #C9A96E",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 6,
            }}
          >
            <img
              src={logoImg}
              alt="American Friends of St James's Piccadilly"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-[13px] tracking-luxe font-light transition-colors duration-300"
              style={{
                color: isActive(link.href) ? "hsl(42, 60%, 60%)" : "#FAF3E0",
                borderBottom: isActive(link.href) ? "1px solid hsl(42, 60%, 60%)" : "1px solid transparent",
                paddingBottom: "2px",
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.href))
                  e.currentTarget.style.color = "hsl(42, 60%, 60%)";
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.href))
                  e.currentTarget.style.color = "#FAF3E0";
              }}
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
              className="text-[11px] tracking-luxe font-light transition-colors"
              style={{
                color: isActive(link.href) ? "hsl(42, 60%, 60%)" : "#FAF3E0",
              }}
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