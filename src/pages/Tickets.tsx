import { useState, useRef, useEffect, useCallback } from "react";
import ticketsHero from '../assets/Royal-gala-asset-2.jpeg';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";

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

type SubTier = { price: string; available: string };

type TicketTier = {
  number: string;
  label: string;
  name: string;
  description: string;
  priceRange: string;
  note?: string;
  subTiers?: SubTier[];
};

const ticketTiers: TicketTier[] = [
  {
    number: "/01",
    label: "[ Individual Gala Donation Ticket ]",
    name: "The Wren Gala Individual",
    description: "An unforgettable evening of music, art, and celebration at one of London's most iconic churches.",
    priceRange: "$500 – $5,000",
    note: "Limited to 20 seats for guests aged 18–25",
  },
  {
    number: "/02",
    label: "[ Wren Gala Donation Table ]",
    name: "The Wren Gala Table (10 guests)",
    description: "Host your guests at a private table for ten with premium placement and dedicated service throughout the evening.",
    priceRange: "$5,000 – $50,000",
    subTiers: [
      { price: "$50,000", available: "7 available" },
      { price: "$25,000", available: "6 available" },
      { price: "$15,000", available: "6 available" },
      { price: "$10,000", available: "4 available" },
      { price: "$5,000", available: "4 available (ages 18–25)" },
    ],
  },
];

const faqItems = [
  {
    question: "What is the refund policy?",
    answer: "Tickets are non-refundable but are transferable. If you are unable to attend, you may transfer your ticket to another guest by contacting us at least 48 hours before the event.",
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

const DIETARY_OPTIONS = ["None", "Vegetarian", "Vegan", "Gluten Free", "Halal", "Kosher", "Other"];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  dietary: string;
  specialRequests: string;
};

const CheckoutModal = ({
  ticket,
  onClose,
}: {
  ticket: TicketTier;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    dietary: "None",
    specialRequests: "",
  });

  const inputClass =
    "w-full bg-transparent border-b border-[#F2E5C6]/40 text-[#F2E5C6] font-display text-base py-2 focus:outline-none focus:border-[#F2E5C6] placeholder:text-[#F2E5C6]/30 transition-colors duration-200";
  const labelClass = "block text-[#F2E5C6]/60 text-[11px] tracking-wider uppercase font-light mb-1";

  const step1Valid = form.fullName.trim() && form.email.trim() && form.phone.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-lg"
        style={{ backgroundColor: "#3B010B" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F2E5C6]/50 hover:text-[#F2E5C6] transition-colors duration-200"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-10">
          <OrnamentalDivider color="gold" className="mb-6" />

          {/* Step indicator */}
          <p className="text-[#F2E5C6]/50 text-[11px] tracking-wider uppercase font-light text-center mb-2">
            Step {step} of 3
          </p>
          <div className="flex gap-2 justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="h-[1px] w-12 transition-all duration-300"
                style={{ backgroundColor: s <= step ? "#F2E5C6" : "rgba(242,229,198,0.2)" }}
              />
            ))}
          </div>

          {/* Step 1 – Guest Information */}
          {step === 1 && (
            <div>
              <h2 className="font-display italic text-[#F2E5C6] text-[28px] font-light leading-tight mb-8 text-center">
                Guest Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 000 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => { if (step1Valid) setStep(2); }}
                  disabled={!step1Valid}
                  className="px-8 py-3 font-display text-[14px] uppercase tracking-wider border transition-colors duration-200 disabled:opacity-30"
                  style={{
                    backgroundColor: "#75162D",
                    color: "#F2E5C6",
                    borderColor: "#75162D",
                    borderRadius: "4px",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2 – Dietary & Special Requests */}
          {step === 2 && (
            <div>
              <h2 className="font-display italic text-[#F2E5C6] text-[28px] font-light leading-tight mb-8 text-center">
                Dietary &amp; Special Requests
              </h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Dietary Requirements</label>
                  <select
                    value={form.dietary}
                    onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                    className="w-full bg-[#3B010B] border-b border-[#F2E5C6]/40 text-[#F2E5C6] font-display text-base py-2 focus:outline-none focus:border-[#F2E5C6] transition-colors duration-200 cursor-pointer"
                  >
                    {DIETARY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: "#3B010B" }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Special Requests <span className="normal-case">(optional)</span></label>
                  <textarea
                    rows={4}
                    placeholder="Any additional requirements or requests..."
                    value={form.specialRequests}
                    onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                    className="w-full bg-transparent border border-[#F2E5C6]/20 text-[#F2E5C6] font-display text-base p-3 focus:outline-none focus:border-[#F2E5C6]/60 placeholder:text-[#F2E5C6]/30 transition-colors duration-200 resize-none"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
              </div>
              <div className="mt-10 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 font-display text-[14px] uppercase tracking-wider border transition-colors duration-200"
                  style={{
                    backgroundColor: "transparent",
                    color: "#F2E5C6",
                    borderColor: "rgba(242,229,198,0.3)",
                    borderRadius: "4px",
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 font-display text-[14px] uppercase tracking-wider border transition-colors duration-200"
                  style={{
                    backgroundColor: "#75162D",
                    color: "#F2E5C6",
                    borderColor: "#75162D",
                    borderRadius: "4px",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3 – Payment */}
          {step === 3 && (
            <div>
              <h2 className="font-display italic text-[#F2E5C6] text-[28px] font-light leading-tight mb-8 text-center">
                Payment
              </h2>
              <div
                className="border border-[#F2E5C6]/20 p-6 mb-8"
                style={{ borderRadius: "2px" }}
              >
                <p className="text-[#F2E5C6]/50 text-[11px] tracking-wider uppercase font-light mb-1">
                  Selected Ticket
                </p>
                <p className="font-display italic text-[#F2E5C6] text-[22px] mb-3">
                  {ticket.name}
                </p>
                <div
                  className="border-t border-[#F2E5C6]/10 pt-3 mt-3"
                >
                  <p className="text-[#F2E5C6]/50 text-[11px] tracking-wider uppercase font-light mb-1">
                    Guest
                  </p>
                  <p className="font-display text-[#F2E5C6] text-base">
                    {form.fullName}
                  </p>
                </div>
              </div>
              <a
                href="#"
                className="block w-full text-center py-4 font-display text-[14px] uppercase tracking-wider border transition-colors duration-200"
                style={{
                  backgroundColor: "#75162D",
                  color: "#F2E5C6",
                  borderColor: "#75162D",
                  borderRadius: "4px",
                }}
              >
                Proceed to Payment
              </a>
              <div className="mt-4 flex justify-start">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 font-display text-[14px] uppercase tracking-wider border transition-colors duration-200"
                  style={{
                    backgroundColor: "transparent",
                    color: "#F2E5C6",
                    borderColor: "rgba(242,229,198,0.3)",
                    borderRadius: "4px",
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          <OrnamentalDivider color="gold" className="mt-8" />
        </div>
      </motion.div>
    </div>
  );
};

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

const Tickets = () => {
  const [modalTicket, setModalTicket] = useState<TicketTier | null>(null);
  const [parallaxY, setParallaxY] = useState(0);

  const openModal = (ticket: TicketTier) => setModalTicket(ticket);
  const closeModal = () => setModalTicket(null);

  const handleScroll = useCallback(() => {
    setParallaxY(window.scrollY * 0.5);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const purchaseBtnStyle = {
    backgroundColor: "hsl(39, 76%, 93%)",
    color: "hsl(345, 68%, 27%)",
    borderColor: "hsl(345, 68%, 27%)",
    borderRadius: "4px",
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <AnimatePresence>
        {modalTicket && (
          <CheckoutModal ticket={modalTicket} onClose={closeModal} />
        )}
      </AnimatePresence>

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
          <OrnamentalDivider color="gold" className="mb-12" />
          <h2 className="font-display italic text-champagne font-light text-[52px] text-center mb-16">
            {"{ "}The Tickets{" }"}
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {ticketTiers.map((tier) => (
              <div
                key={tier.number}
                className="border border-gold p-10 flex flex-col"
                style={{ backgroundColor: "#3B010B" }}
              >
                <span className="text-champagne/50 text-[11px] tracking-wider-luxe font-light">
                  {tier.number}
                </span>
                <p className="text-champagne text-[11px] tracking-wider-luxe uppercase font-light mt-2 mb-4">
                  {tier.label}
                </p>
                <h3 className="font-display italic text-champagne text-[32px] leading-tight mb-4">
                  {tier.name}
                </h3>
                <p className="text-champagne/70 text-sm leading-[1.8] mb-4">
                  {tier.description}
                </p>

                <p className="font-display text-champagne text-[40px] leading-tight mb-2">
                  {tier.priceRange}
                </p>

                {tier.note && (
                  <p className="text-champagne/50 text-[12px] font-light mb-6">
                    {tier.note}
                  </p>
                )}

                {!tier.note && <div className="mb-6" />}

                <button
                  onClick={() => openModal(tier)}
                  className="inline-block px-10 py-3 text-[16px] font-bold uppercase tracking-wider-luxe border transition-colors duration-200 mt-auto"
                  style={purchaseBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "hsl(350, 80%, 19%)";
                    e.currentTarget.style.color = "hsl(39, 76%, 93%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "hsl(39, 76%, 93%)";
                    e.currentTarget.style.color = "hsl(345, 68%, 27%)";
                  }}
                >
                  Purchase Tickets
                </button>
              </div>
            ))}
          </div>
          <OrnamentalDivider color="gold" className="mt-16" />
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
            <button
              onClick={() => openModal(ticketTiers[0])}
              className="inline-block px-10 py-3 text-[16px] font-bold uppercase tracking-wider-luxe border transition-colors duration-200"
              style={purchaseBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(350, 80%, 19%)";
                e.currentTarget.style.color = "hsl(39, 76%, 93%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(39, 76%, 93%)";
                e.currentTarget.style.color = "hsl(345, 68%, 27%)";
              }}
            >
              Purchase Tickets
            </button>
            <OrnamentalDivider color="gold" className="mt-12" />
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Tickets;
