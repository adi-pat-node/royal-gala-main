import { useState } from "react";
import { Link } from "react-router-dom";
import ArchIcon from "@/components/ArchIcon";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import logoImg from "@/assets/American_Friends_Logo_Gold_PNG.png";

const PRESET_AMOUNTS = [250, 500, 1000, 2500];

const inputCss: React.CSSProperties = {
  backgroundColor: "#F2E5C6",
  border: "1px solid #75162D",
  borderRadius: "4px",
  color: "#1a1a1a",
  padding: "12px 14px",
  width: "100%",
  fontSize: "16px",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
  WebkitBoxShadow: "0 0 0 1000px #F2E5C6 inset",
  WebkitTextFillColor: "#1a1a1a",
};

const labelCss: React.CSSProperties = {
  color: "rgba(242,229,198,0.55)",
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontWeight: 300,
  display: "block",
  marginBottom: 8,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EventDonate = () => {
  const [amount, setAmount] = useState("500");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePresetClick = (value: number) => {
    setAmount(String(value));
    setError("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setError("");
  };

  const handleDonate = async () => {
    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      setError("Please select or enter a donation amount");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!email || !EMAIL_PATTERN.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsRedirecting(true);
    try {
      const res = await fetch("/api/create-donation-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parsedAmount, name, email }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Failed to create donation session");
      window.location.href = json.url;
    } catch {
      setError("Something went wrong. Please try again or contact us at rsvp@sjp.org.uk");
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#3B010B" }}>
      <header className="w-full flex items-center justify-center bg-wine" style={{ padding: "clamp(0.75rem, 3vw, 1.25rem) 1rem" }}>
        <Link to="/" className="flex items-center">
          <img
            src={logoImg}
            alt="American Friends of St James's Piccadilly"
            style={{ width: "clamp(100px, 30vw, 140px)", height: "auto", objectFit: "contain" }}
          />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-5" style={{ paddingTop: "clamp(2rem, 6vw, 3.5rem)", paddingBottom: "clamp(2rem, 6vw, 3.5rem)" }}>
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-5">
            <ArchIcon className="text-gold" size={30} />
          </div>

          <OrnamentalDivider color="gold" className="mb-6" />

          <h1
            className="font-display italic text-champagne font-light text-center leading-[1.05] mb-3"
            style={{ fontSize: "clamp(1.9rem, 8vw, 2.75rem)" }}
          >
            Thank You.
          </h1>

          <p
            className="text-champagne/70 font-display text-center mb-8"
            style={{ fontSize: "clamp(0.85rem, 2.4vw, 1rem)", lineHeight: 1.6 }}
          >
            Your generosity helps make the work of St James's Piccadilly possible.
          </p>

          <style>{`.donate-field::placeholder { color: #8a7a6a; }`}</style>

          <label htmlFor="amount" style={labelCss}>
            Choose an Amount (USD)
          </label>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#75162D",
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.3rem, 5vw, 1.6rem)",
                fontWeight: 400,
                pointerEvents: "none",
              }}
            >
              $
            </span>
            <input
              id="amount"
              type="number"
              min="1"
              step="1"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              style={{
                ...inputCss,
                paddingLeft: 30,
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.3rem, 5vw, 1.6rem)",
                fontWeight: 400,
              }}
              className="donate-field"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {PRESET_AMOUNTS.map((value) => {
              const selected = amount === String(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handlePresetClick(value)}
                  style={{
                    backgroundColor: "#560B18",
                    border: selected ? "2px solid #F2E5C6" : "1px solid #75162D",
                    borderRadius: "4px",
                    padding: "10px 4px",
                    cursor: "pointer",
                    fontFamily: "Cormorant Garamond, serif",
                    color: "#F2E5C6",
                    fontSize: "clamp(0.9rem, 3.4vw, 1.1rem)",
                    fontWeight: 300,
                    transition: "border-color 0.2s",
                  }}
                >
                  ${value.toLocaleString()}
                </button>
              );
            })}
          </div>

          <label htmlFor="donorName" style={labelCss}>
            Name
          </label>
          <input
            id="donorName"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            placeholder="Your name"
            style={{ ...inputCss, marginBottom: 20 }}
            className="donate-field"
          />

          <label htmlFor="donorEmail" style={labelCss}>
            Email
          </label>
          <input
            id="donorEmail"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="you@example.com"
            style={{ ...inputCss, marginBottom: 8 }}
            className="donate-field"
          />

          {error && (
            <p style={{ color: "#e07070", fontSize: "12px", marginTop: 8, marginBottom: 0, letterSpacing: "0.02em" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleDonate}
            disabled={isRedirecting}
            style={{
              width: "100%",
              backgroundColor: "#75162D",
              color: "#F2E5C6",
              border: "none",
              borderRadius: "4px",
              padding: "16px",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: isRedirecting ? "default" : "pointer",
              opacity: isRedirecting ? 0.7 : 1,
              marginTop: 24,
              transition: "opacity 0.2s",
            }}
          >
            {isRedirecting ? "Redirecting..." : "Donate Now"}
          </button>

          <OrnamentalDivider color="gold" className="mt-10" />
        </div>
      </main>
    </div>
  );
};

export default EventDonate;
