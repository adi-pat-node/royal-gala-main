import { useState, useRef, useEffect, useCallback } from "react";
import ticketsHero from '../assets/Royal-gala-asset-2.jpeg';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
});

const eventDetails = [
  { label: "Date", value: "SEPTEMBER 24, 2026" },
  { label: "Time", value: "6:00 PM" },
  { label: "Venue", value: "St Bart's\nNew York" },
  { label: "Dress Code", value: "Black Tie" },
];

type TicketCard = {
  number: string;
  tierLabel: string;
  prices: string;
  subtitle: string;
  individualAvail: string;
  tableAvail: string;
};

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
    question: "Where can I park?",
    answer: "The nearest car parks are Q-Park on Brewer Street and the NCP on Arlington Street. Both are a short walk from St James's Piccadilly. The venue is also well served by public transport — Piccadilly Circus station is a two-minute walk away.",
  },
  {
    question: "What is the dress code?",
    answer: "The dress code is Black Tie. Gentlemen are invited to wear dinner jackets and ladies are encouraged to wear evening attire.",
  },
];

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
        <span className="text-burgundy text-[11px] tracking-wider-luxe uppercase font-light mb-3">
          {detail.label}
        </span>
        <span className="font-display italic text-burgundy text-[28px] leading-tight text-center px-6 whitespace-pre-line">
          {detail.value}
        </span>
      </motion.div>
    </div>
  );
};

// ─── Ticket Card ───────────────────────────────────────────────────────────────

const TicketCardItem = ({ card }: { card: TicketCard }) => (
  <div
    className="flex flex-col p-5 border"
    style={{
      backgroundColor: "#3B010B",
      borderColor: "rgba(242,229,198,0.15)",
      borderRadius: "2px",
    }}
  >
    <div className="flex items-start justify-between mb-4 gap-4">
      <span className="font-display text-[#F2E5C6]/40 text-[14px] tracking-widest shrink-0">
        {card.number}
      </span>
      <span className="text-[#F2E5C6]/50 text-[10px] tracking-wider uppercase font-light text-right leading-relaxed">
        {card.tierLabel}
      </span>
    </div>

    <div className="w-8 h-[1px] mb-4" style={{ backgroundColor: "#75162D" }} />

    <div className="mb-2">
      <span className="font-display text-[#F2E5C6] text-[34px] font-light leading-none">
        {card.prices}
      </span>
    </div>

    <p className="text-[#F2E5C6]/60 text-[12px] tracking-wider uppercase font-light mb-5">
      {card.subtitle}
    </p>

    <div className="flex flex-col gap-1 mb-6 flex-1">
      <p className="text-[#F2E5C6]/70 text-[13px] leading-relaxed">
        {card.individualAvail}
      </p>
      <p className="text-[#F2E5C6]/70 text-[13px] leading-relaxed">
        {card.tableAvail}
      </p>
    </div>

    <button
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
              <span className="font-display italic text-burgundy text-[22px]">
                {item.question}
              </span>
              {isOpen ? (
                <Minus size={20} className="text-burgundy shrink-0 ml-4" />
              ) : (
                <Plus size={20} className="text-burgundy shrink-0 ml-4" />
              )}
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <p className="text-[#373737] text-[16px] leading-[1.8] pb-6">
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

  const handleScroll = useCallback(() => {
    setParallaxY(window.scrollY * 0.5);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
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
            className="text-champagne text-[11px] tracking-wider-luxe font-light mb-6"
            {...fade(0)}
          >
            AMERICAN FRIENDS OF ST JAMES'S PICCADILLY
          </motion.p>
          <motion.div {...fade(1)}>
            <OrnamentalDivider color="gold" className="mb-8" />
          </motion.div>
          <motion.h1
            className="font-display italic text-champagne font-light leading-[0.9] mb-6 text-[52px] md:text-[100px]"
            {...fade(2)}
          >
            An Evening of<br />Distinction
          </motion.h1>
          <motion.p
            className="text-champagne text-[11px] tracking-wider-luxe font-light mb-8"
            {...fade(3)}
          >
            SEPTEMBER 24, 2026 &nbsp;·&nbsp; 6:00 PM &nbsp;·&nbsp; ST BART'S, NEW YORK &nbsp;·&nbsp; BLACK TIE
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
          <h2 className="font-display italic text-champagne font-light text-[52px] text-center mb-10">
            {"{ "}The Tickets{" }"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {ticketCards.map((card) => (
              <TicketCardItem key={card.number} card={card} />
            ))}
          </div>
          <OrnamentalDivider color="gold" className="mt-12" />
        </ScrollReveal>
      </section>

      {/* FAQ Section */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mb-12" />
          <h2 className="font-display italic text-burgundy font-light text-[48px] text-center mb-16">
            {"{ "}Frequently Asked Questions{" }"}
          </h2>
          <FaqAccordion />
        </ScrollReveal>
      </section>

      {/* Closing CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: "#3B010B" }}>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <OrnamentalDivider color="gold" className="mb-12" />
            <h2 className="font-display italic text-champagne font-light text-[64px] leading-[1.1] mb-6">
              We Look Forward<br />to Seeing You
            </h2>
            <p className="text-champagne/80 font-display text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Secure your place at an unforgettable evening celebrating legacy, art, and community.
            </p>
            <OrnamentalDivider color="gold" className="mt-12" />
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Tickets;
