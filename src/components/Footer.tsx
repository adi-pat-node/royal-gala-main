import logoImg from "@/assets/American_Friends_Logo_Gold_PNG.png";
import triibeLogo from "@/assets/Triibe_logo_white.png";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Changemaker Cohort", href: "/changemakers" },
  { label: "The Story of St James's", href: "/story" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Tickets", href: "/tickets" },
];

const Footer = () => {
  return (
    <footer className="w-full" style={{ backgroundColor: "#3B010B" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column - Logo */}
          <div className="flex items-start justify-center md:justify-start">
            <img
              src={logoImg}
              alt="American Friends of St James's Piccadilly"
              className="w-56 object-contain"
            />
          </div>

          {/* Center Column - Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <span
              className="uppercase font-light mb-4"
              style={{
                color: "#FAF3E0",
                fontSize: "11px",
                letterSpacing: "0.35em",
              }}
            >
              Navigation
            </span>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="transition-colors duration-200"
                style={{
                color: "#FAF3E0",
                fontSize: "14px",
                }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.color = "hsl(42, 60%, 60%)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#FAF3E0")
                }
              >
                {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Column - Get In Touch */}
          <div className="flex flex-col items-center md:items-start">
            <span
              className="uppercase font-light mb-4"
              style={{
                color: "#FAF3E0",
                fontSize: "11px",
                letterSpacing: "0.35em",
              }}
            >
              Get In Touch
            </span>
            <p style={{ color: "#FAF3E0", fontSize: "14px" }} className="mb-1">
              +1 (555) 123-4567
            </p>
            <a
              href="mailto:info@americanfriends.org"
              className="underline mb-6 transition-colors duration-200"
              style={{ color: "#FAF3E0", fontSize: "14px" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "hsl(42, 60%, 60%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#FAF3E0")
              }
            >
              Email Us
            </a>
            <Link
              to="/tickets"
              className="uppercase inline-block transition-all duration-200"
              style={{
                backgroundColor: "#FAF3E0",
                color: "#75162D",
                border: "1px solid #75162D",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                padding: "10px 24px",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#560B18";
                e.currentTarget.style.color = "#FAF3E0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FAF3E0";
                e.currentTarget.style.color = "#75162D";
              }}
            >
              Donation Tickets
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div
          className="mb-4"
          style={{ height: "1px", backgroundColor: "hsl(42, 60%, 60%)" }}
        />
        <p
          className="text-center mb-6"
          style={{ color: "#FAF3E0", fontSize: "14px" }}
        >
          American Friends of St James's Piccadilly is a registered 501(c)(3)
          nonprofit organization.
        </p>
        <div className="flex items-center justify-center gap-3">
        <span style={{ color: "rgba(250, 243, 224, 0.9)", fontSize: "11px" }}>
           Website designed by Tanuja Bodas and Angela Goldberg at
        </span>
       <img
        src={triibeLogo}
        alt="TRIIBE"
        className="h-4 w-auto object-contain opacity-100"
        />
</div>
      </div>
    </footer>
  );
};

export default Footer;
