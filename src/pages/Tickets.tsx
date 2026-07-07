import { useState, useRef, useEffect, useCallback } from "react";
import ticketsHero from '../assets/Royal-gala-asset-2.jpeg';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
});

const eventDetails = [
  { label: "Date", value: "SEPTEMBER 29, 2026" },
  { label: "Time", value: "6:00 PM" },
  { label: "Venue", value: "St Bart's\nNew York" },
  { label: "Dress Code", value: "Black Tie /\nEvening Dress /\nNational Dress" },
];

type TicketCard = {
  number: string;
  tierLabel: string;
  prices: string;
  subtitle: string;
  individualAvail: string;
  tableAvail: string;
  note?: string;
};

// Availability counts below are static placeholders now that Airtable-based live inventory
// tracking has been removed. Update these manually until a replacement tracking method is chosen.
const ticketCards: TicketCard[] = [
  {
    number: "/01",
    tierLabel: "[ TIER 1 ]",
    prices: "$5,000 / $50,000",
    subtitle: "Individual / Table of 10",
    individualAvail: "80 tickets remaining",
    tableAvail: "8 tables remaining",
  },
  {
    number: "/02",
    tierLabel: "[ TIER 2 ]",
    prices: "$2,500 / $25,000",
    subtitle: "Individual / Table of 10",
    individualAvail: "80 tickets remaining",
    tableAvail: "8 tables remaining",
  },
  {
    number: "/03",
    tierLabel: "[ TIER 3 ]",
    prices: "$1,500 / $15,000",
    subtitle: "Individual / Table of 10",
    individualAvail: "50 tickets remaining",
    tableAvail: "5 tables remaining",
  },
  {
    number: "/04",
    tierLabel: "[ TIER 4 ]",
    prices: "$500 / $5,000",
    subtitle: "Individual / Table of 10",
    individualAvail: "20 tickets remaining",
    tableAvail: "2 tables remaining",
    note: "Young Supporters under 30 (Photo ID verification on the evening is kindly requested)",
  },
];

const faqItems = [
  {
    question: "What is the refund policy?",
    answer: "Donation tickets are non-refundable but are transferable. If you are unable to attend, you may transfer your ticket to another guest by contacting us at least two weeks before the event.",
  },
  {
    question: "Is the venue accessible?",
    answer: "St Bart's is wheelchair accessible with step-free access to the nave. Please contact us in advance if you have specific accessibility requirements and we will do our best to accommodate you.",
  },
  {
    question: "Transport Information",
    answer: "A dedicated gala lane will be available at the main entrance of St Bartholomew's Church for guest drop-off and collection by car or taxi.",
  },
  {
    question: "What is the dress code?",
    answer: "The dress code is Black Tie / Evening Dress / National Dress. Gentlemen are invited to wear dinner jackets and ladies are encouraged to wear evening attire. National Dress and Decorations may be worn.",
  },
];

// ─── Donation helpers ──────────────────────────────────────────────────────────

const inputCss: React.CSSProperties = {
  backgroundColor: "#F2E5C6",
  border: "1px solid #75162D",
  borderRadius: "4px",
  color: "#1a1a1a",
  padding: "12px 14px",
  width: "100%",
  fontSize: "14px",
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
  marginBottom: 6,
};

const DonationModal = ({ onClose }: { onClose: () => void }) => {
  const [amount, setAmount] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) {
      setError("Please enter a valid donation amount");
      return;
    }
    setError("");
    setIsRedirecting(true);
    try {
      const res = await fetch("/api/create-donation-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parsed }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Failed to create donation session");
      window.location.href = json.url;
    } catch {
      setError("Something went wrong. Please try again or contact us at rsvp@sjp.org.uk");
      setIsRedirecting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-md"
        style={{ backgroundColor: "#560B18", borderRadius: "2px" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            color: "rgba(242,229,198,0.45)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            lineHeight: 0,
          }}
        >
          <X size={18} />
        </button>

        <style>{`.donation-field::placeholder { color: #8a7a6a; }`}</style>
        <div className="px-6 sm:px-8 pt-10 pb-8">
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              color: "#F2E5C6",
              fontSize: "clamp(2rem, 5vw, 5rem)",
              fontWeight: 300,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Make a Donation
          </h2>

          <div style={{ height: 1, backgroundColor: "#75162D", marginBottom: 24 }} />

          <label htmlFor="donationAmount" style={labelCss}>
            Donation Amount (USD)
          </label>
          <input
            id="donationAmount"
            type="number"
            min="1"
            step="1"
            inputMode="decimal"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setError(""); }}
            placeholder="e.g. 250"
            style={{ ...inputCss, marginBottom: 8 }}
            className="donation-field"
            autoFocus
          />

          {error && (
            <p style={{ color: "#e07070", fontSize: "12px", marginBottom: 16, letterSpacing: "0.02em" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleContinue}
            disabled={isRedirecting}
            style={{
              width: "100%",
              backgroundColor: "#75162D",
              color: "#F2E5C6",
              border: "none",
              borderRadius: "4px",
              padding: "14px",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: isRedirecting ? "default" : "pointer",
              opacity: isRedirecting ? 0.7 : 1,
              marginTop: error ? 0 : 8,
              transition: "opacity 0.2s",
            }}
          >
            {isRedirecting ? "Redirecting..." : "Continue to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Booking Type Modal ────────────────────────────────────────────────────────

const BookingOptionCard = ({
  label,
  price,
  availability,
  selected,
  onSelect,
}: {
  label: string;
  price: string;
  availability: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const borderStyle = selected
    ? "2px solid #F2E5C6"
    : hovered
    ? "1px solid rgba(117,22,45,0.75)"
    : "1px solid #75162D";

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#3B010B",
        border: borderStyle,
        borderRadius: "2px",
        padding: "20px 16px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : selected
          ? "0 0 14px rgba(242,229,198,0.1)"
          : "none",
      }}
    >
      {selected && (
        <span style={{ position: "absolute", top: 10, right: 10, color: "#F2E5C6", lineHeight: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="2.5,8.5 6.5,12.5 13.5,4.5" stroke="#F2E5C6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <p style={{ color: "rgba(242,229,198,0.5)", fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 300, marginBottom: 10 }}>
        {label}
      </p>
      <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#F2E5C6", fontSize: "clamp(1.5rem, 3vw, 2.8rem)", fontWeight: 300, lineHeight: 1, marginBottom: 10 }}>
        {price}
      </p>
      <p style={{ color: "rgba(242,229,198,0.55)", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)", lineHeight: 1.5 }}>
        {availability}
      </p>
    </button>
  );
};

const BookingTypeModal = ({
  card,
  onClose,
  onContinue,
}: {
  card: TicketCard;
  onClose: () => void;
  onContinue: (type: "individual" | "table") => Promise<void>;
}) => {
  const [selected, setSelected] = useState<"individual" | "table" | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");
  const [individualPrice, tablePrice] = card.prices.split(" / ");

  const handleContinue = async () => {
    if (!selected || isRedirecting) return;
    setError("");
    setIsRedirecting(true);
    try {
      await onContinue(selected);
    } catch {
      setError("Something went wrong. Please try again or contact us at rsvp@sjp.org.uk");
      setIsRedirecting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-md"
        style={{ backgroundColor: "#560B18", borderRadius: "2px" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            color: "rgba(242,229,198,0.45)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            lineHeight: 0,
          }}
        >
          <X size={18} />
        </button>

        <div className="px-6 sm:px-8 pt-10 pb-8">
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              color: "#F2E5C6",
              fontSize: "clamp(2rem, 5vw, 5rem)",
              fontWeight: 300,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Select Your Booking Type
          </h2>

          <div style={{ height: 1, backgroundColor: "#75162D", marginBottom: 24 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <BookingOptionCard
              label="Individual Ticket"
              price={individualPrice}
              availability={card.individualAvail}
              selected={selected === "individual"}
              onSelect={() => setSelected("individual")}
            />
            <BookingOptionCard
              label="Table of 10"
              price={tablePrice}
              availability={card.tableAvail}
              selected={selected === "table"}
              onSelect={() => setSelected("table")}
            />
          </div>

          {error && (
            <p style={{ color: "#e07070", fontSize: "12px", marginBottom: 12, letterSpacing: "0.02em" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleContinue}
            disabled={!selected || isRedirecting}
            style={{
              width: "100%",
              backgroundColor: selected ? "#75162D" : "rgba(117,22,45,0.3)",
              color: selected ? "#F2E5C6" : "rgba(242,229,198,0.35)",
              border: "none",
              borderRadius: "4px",
              padding: "14px",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: selected && !isRedirecting ? "pointer" : "default",
              opacity: isRedirecting ? 0.7 : 1,
              transition: "background-color 0.2s, color 0.2s, opacity 0.2s",
            }}
          >
            {isRedirecting ? "Redirecting..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Ticket Arch Card ──────────────────────────────────────────────────────────

const TicketArchCard = ({ detail, delay }: { detail: { label: string; value: string }; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 200 280"
        className="w-full max-w-[180px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M10 280 L10 120 Q10 10 100 10 Q190 10 190 120 L190 280 L10 280"
          stroke="hsl(345, 68%, 27%)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          initial={{ strokeDashoffset: 1 }}
          animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pt-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: delay + 2.0 }}
      >
        <span
          className="text-burgundy tracking-wider-luxe uppercase font-light mb-3"
          style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
        >
          {detail.label}
        </span>
        <span
          className="font-display italic text-burgundy leading-tight text-center px-6 whitespace-pre-line"
          style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)" }}
        >
          {detail.value}
        </span>
      </motion.div>
    </div>
  );
};

// ─── Ticket Card ───────────────────────────────────────────────────────────────

const TicketCardItem = ({ card, onReserve }: { card: TicketCard; onReserve: () => void }) => (
  <div
    className="flex flex-col p-5 border"
    style={{
      backgroundColor: "#3B010B",
      borderColor: "rgba(242,229,198,0.15)",
      borderRadius: "2px",
    }}
  >
    <div className="flex items-start justify-between mb-4 gap-4">
      <span
        className="font-display text-[#F2E5C6]/40 tracking-widest shrink-0"
        style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
      >
        {card.number}
      </span>
      <span
        className="text-[#F2E5C6]/50 tracking-wider uppercase font-light text-right leading-relaxed"
        style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
      >
        {card.tierLabel}
      </span>
    </div>

    <div className="w-8 h-[1px] mb-4" style={{ backgroundColor: "#75162D" }} />

    <div className="mb-2">
      <span
        className="font-display text-[#F2E5C6] font-light leading-none"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
      >
        {card.prices}
      </span>
    </div>

    <p
      className="text-[#F2E5C6]/60 tracking-wider uppercase font-light mb-3"
      style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
    >
      {card.subtitle}
    </p>

    {card.note && (
      <p
        className="font-display italic text-[#F2E5C6]/70 leading-relaxed mb-3"
        style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
      >
        {card.note}
      </p>
    )}

    <div className="flex-1" />

    <button
      onClick={onReserve}
      className="w-full py-3 font-display text-[13px] uppercase tracking-wider transition-opacity duration-200 hover:opacity-90"
      style={{
        backgroundColor: "#75162D",
        color: "#F2E5C6",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Reserve Your Place
    </button>
  </div>
);

// ─── FAQ ───────────────────────────────────────────────────────────────────────

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b" style={{ borderColor: "hsl(345, 68%, 27%)" }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-6 text-left"
            >
              <span
                className="font-display italic text-burgundy"
                style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
              >
                {item.question}
              </span>
              {isOpen ? (
                <Minus size={16} className="text-burgundy shrink-0 ml-4" />
              ) : (
                <Plus size={16} className="text-burgundy shrink-0 ml-4" />
              )}
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <p
                className="text-[#373737] leading-[1.8] pb-6"
                style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────

const Tickets = () => {
  const [parallaxY, setParallaxY] = useState(0);
  const [activeCard, setActiveCard] = useState<TicketCard | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);

  const handleScroll = useCallback(() => {
    setParallaxY(window.scrollY * 0.5);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = activeCard || showDonationModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeCard, showDonationModal]);

  const handleContinue = async (type: "individual" | "table") => {
    if (!activeCard) return;
    const tier = String(parseInt(activeCard.number.slice(1), 10));
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier, bookingType: type }),
    });
    const json = await res.json();
    if (!res.ok || !json.url) throw new Error(json.error || "Failed to create checkout session");
    window.location.href = json.url;
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          minHeight: "100svh",
          paddingTop: "clamp(4rem, 10vw, 8rem)",
          paddingBottom: "clamp(4rem, 10vw, 8rem)",
        }}
      >
        <div
          className="absolute inset-0 w-full"
          style={{
            backgroundImage: `url(${ticketsHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxY}px)`,
            willChange: "transform",
            top: "-20%",
            height: "140%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(59, 1, 11, 0.55)" }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            className="text-champagne tracking-wider-luxe font-light mb-6"
            style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
            {...fade(0)}
          >
            AMERICAN FRIENDS OF ST JAMES'S PICCADILLY
          </motion.p>
          <motion.div {...fade(1)}>
            <OrnamentalDivider color="gold" className="mb-8" />
          </motion.div>
          <motion.h1
            className="font-display italic text-champagne font-light leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 9rem)" }}
            {...fade(2)}
          >
            An Evening of<br />Distinction
          </motion.h1>
          <motion.p
            className="text-champagne font-light mb-8 text-center"
            style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.2em" }}
            {...fade(3)}
          >
            SEPTEMBER 29, 2026 &nbsp;·&nbsp; 6:00 PM &nbsp;·&nbsp; ST BART'S, NEW YORK, 325 PARK AVE, NEW YORK, NY 10022
            <span style={{ display: "block", marginTop: "0.75rem" }}>BLACK TIE / EVENING DRESS / NATIONAL DRESS</span>
          </motion.p>
          <motion.div {...fade(4)}>
            <OrnamentalDivider color="gold" />
          </motion.div>
        </div>
      </section>

      {/* Event Details Strip */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {eventDetails.map((detail, i) => (
              <TicketArchCard key={detail.label} detail={detail} delay={i * 0.15} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Ticket Tiers Section */}
      <section className="py-24 px-6" style={{ backgroundColor: "hsl(350, 80%, 19%)" }}>
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mb-10" />
          <h2
            className="font-display italic text-champagne font-light text-center mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
          >
            {"{ "}The Tickets{" }"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
            {ticketCards.map((card) => (
              <TicketCardItem key={card.number} card={card} onReserve={() => setActiveCard(card)} />
            ))}
          </div>
          <div className="max-w-[900px] mx-auto mt-4">
            <div
              className="flex flex-col p-5 border"
              style={{
                backgroundColor: "#3B010B",
                borderColor: "rgba(242,229,198,0.15)",
                borderRadius: "2px",
              }}
            >
              <div className="flex items-start justify-between mb-4 gap-4">
                <span
                  className="text-[#F2E5C6]/50 tracking-wider uppercase font-light"
                  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
                >
                  [ CANNOT ATTEND ]
                </span>
              </div>
              <div className="w-8 h-[1px] mb-4" style={{ backgroundColor: "#75162D" }} />
              <div className="mb-2">
                <span
                  className="font-display text-[#F2E5C6] font-light leading-none"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
                >
                  Make a Donation
                </span>
              </div>
              <p
                className="font-display italic text-[#F2E5C6]/70 leading-relaxed mb-4 mt-2"
                style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
              >
                Unable to join us on the evening but would like to support the work of St James's Piccadilly and the Changemaker Programme?
              </p>
              <div className="flex-1" />
              <button
                onClick={() => setShowDonationModal(true)}
                className="w-full py-3 font-display text-[13px] uppercase tracking-wider transition-opacity duration-200 hover:opacity-90"
                style={{
                  backgroundColor: "#75162D",
                  color: "#F2E5C6",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Make a Donation
              </button>
            </div>
          </div>
          <OrnamentalDivider color="gold" className="mt-12" />
        </ScrollReveal>
      </section>

      {/* FAQ Section */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mb-12" />
          <h2
            className="font-display italic text-burgundy font-light text-center mb-16"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Frequently Asked Questions
          </h2>
          <FaqAccordion />
        </ScrollReveal>
      </section>

      {/* Closing CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: "#3B010B" }}>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <OrnamentalDivider color="gold" className="mb-12" />
            <h2
              className="font-display italic text-champagne font-light leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
            >
              We Look Forward<br />to Seeing You
            </h2>
            <p
              className="text-champagne/80 font-display leading-relaxed mb-10"
              style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
            >
              Secure your place at an unforgettable evening celebrating legacy, art, and community
            </p>
            <OrnamentalDivider color="gold" className="mt-12" />
          </div>
        </ScrollReveal>
      </section>

      <Footer />

      {activeCard && (
        <BookingTypeModal
          card={activeCard}
          onClose={() => setActiveCard(null)}
          onContinue={handleContinue}
        />
      )}

      {showDonationModal && (
        <DonationModal onClose={() => setShowDonationModal(false)} />
      )}
    </div>
  );
};

export default Tickets;
