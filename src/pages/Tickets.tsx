import { useState } from "react";
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
  { label: "Date", value: "October 2026" },
  { label: "Time", value: "7:00 PM" },
  { label: "Venue", value: "St James's\nPiccadilly\nLondon" },
  { label: "Dress Code", value: "Black Tie" },
];

const ticketTiers = [
  {
    number: "/01",
    bracket: "Individual Ticket",
    name: "Royal Gala Individual",
    description: "An unforgettable evening of music, art, and celebration at one of London's most iconic churches.",
    price: "£250",
  },
  {
    number: "/02",
    bracket: "Table",
    name: "Royal Gala Table",
    description: "Host your guests at a private table for ten with premium placement and dedicated service throughout the evening.",
    price: "£2,200",
  },
];

const faqItems = [
  {
    question: "What is the refund policy?",
    answer: "Tickets are non-refundable but are transferable. If you are unable to attend, you may transfer your ticket to another guest by contacting us at least 48 hours before the event.",
  },
  {
    question: "Is the venue accessible?",
    answer: "St James's Piccadilly is wheelchair accessible with step-free access to the nave. Please contact us in advance if you have specific accessibility requirements and we will do our best to accommodate you.",
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

const PurchaseButton = () => (
  <a
    href="#"
    className="inline-block px-10 py-3 text-[16px] font-bold uppercase tracking-wider-luxe border transition-colors duration-200"
    style={{
      backgroundColor: "hsl(39, 76%, 93%)",
      color: "hsl(345, 68%, 27%)",
      borderColor: "hsl(345, 68%, 27%)",
    }}
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
  </a>
);

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
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: "hsl(350, 80%, 19%)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "hsla(350, 80%, 19%, 0.5)" }}
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
            OCTOBER 17, 2026 &nbsp;·&nbsp; 7:00 PM &nbsp;·&nbsp; ST JAMES'S PICCADILLY, LONDON &nbsp;·&nbsp; BLACK TIE
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
            {eventDetails.map((detail) => (
              <div key={detail.label} className="relative flex flex-col items-center">
                <svg
                  viewBox="0 0 200 280"
                  className="w-full max-w-[180px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 280V100C1 45.3 45.3 1 100 1C154.7 1 199 45.3 199 100V280"
                    stroke="hsl(345, 68%, 27%)"
                    strokeWidth="1"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                  <span className="text-burgundy text-[11px] tracking-wider-luxe uppercase font-light mb-3">
                    {detail.label}
                  </span>
                  <span className="font-display italic text-burgundy text-[28px] leading-tight text-center px-6 whitespace-pre-line">
                    {detail.value}
                  </span>
                </div>
              </div>
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
                className="border border-gold p-10"
                style={{ backgroundColor: "#3B010B" }}
              >
                <span className="text-champagne/50 text-[11px] tracking-wider-luxe font-light">
                  {tier.number}
                </span>
                <p className="text-champagne text-[11px] tracking-wider-luxe uppercase font-light mt-2 mb-4">
                  {"[ "}{tier.bracket}{" ]"}
                </p>
                <h3 className="font-display italic text-champagne text-[32px] leading-tight mb-4">
                  {tier.name}
                </h3>
                <p className="text-champagne/70 text-sm leading-[1.8] mb-8">
                  {tier.description}
                </p>
                <p className="font-display text-champagne text-[48px] mb-8">
                  {tier.price}
                </p>
                <PurchaseButton />
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
            <PurchaseButton />
            <OrnamentalDivider color="gold" className="mt-12" />
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Tickets;
