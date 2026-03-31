import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const HONOREES = [
  {
    name: "Elena Marchetti",
    title: "Director · The Civic Arts Foundation",
    bio: "A lifelong advocate for access to the arts, Elena has spent two decades building programmes that bring music, theatre, and visual art into underserved communities across London.",
    quote: "Art is not a luxury — it is a necessity for the human spirit.",
  },
  {
    name: "James Okonkwo",
    title: "Founder · Voices of Tomorrow",
    bio: "James created a mentorship network connecting young activists with seasoned community leaders, empowering a new generation to drive meaningful social change.",
    quote: "The future belongs to those who believe in the power of community.",
  },
  {
    name: "Sophia Chen-Ramirez",
    title: "Architect · Studio Seren",
    bio: "Sophia's practice reimagines public spaces as gathering places for all, designing award-winning community centres, gardens, and places of worship that honour both heritage and hope.",
    quote: "Every building is a conversation between the past and the possible.",
  },
];

const fade = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
});

const Changemakers = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="h-screen bg-maroon flex items-center justify-center" style={{ backgroundColor: "hsl(350, 80%, 19%)" }}>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            className="text-champagne text-[11px] tracking-wider-luxe font-light mb-6"
            {...fade(0)}
          >
            ROYAL GALA 2026
          </motion.p>

          <motion.div {...fade(1)}>
            <OrnamentalDivider color="gold" className="mb-8" />
          </motion.div>

          <motion.h1
            className="font-display italic text-champagne font-light leading-[0.9] mb-6 text-[56px] sm:text-[80px] md:text-[100px]"
            {...fade(2)}
          >
            The Changemaker<br />Cohort
          </motion.h1>

          <motion.p
            className="text-champagne/80 font-display text-lg leading-relaxed mb-8 max-w-lg mx-auto"
            {...fade(3)}
          >
            Honouring visionaries who carry forward the spirit of service, creativity, and community.
          </motion.p>

          <motion.div {...fade(4)}>
            <OrnamentalDivider color="gold" />
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-background py-24 px-6 relative" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')" }}>
        <OrnamentalDivider color="gold" className="mb-16" />
        <ScrollReveal>
          <p className="max-w-[580px] mx-auto text-center text-foreground text-lg font-medium leading-[1.8] font-display">
            Each year, the Royal Gala honours a cohort of extraordinary individuals
            who embody the spirit of St James's Piccadilly. These are artists,
            activists, and community builders whose work carries forward three
            centuries of service, creativity, and human connection.
          </p>
        </ScrollReveal>
        <OrnamentalDivider color="gold" className="mt-16" />
      </section>

      {/* Honoree Grid Section */}
      <section
        className="bg-background py-24 px-6"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {HONOREES.map((honoree, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="border border-primary p-7 transition-all duration-300 hover:border-gold hover:bg-primary/[0.03] group flex flex-col h-full">
                {/* Arch-shaped image placeholder */}
                <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 300 400"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <clipPath id={`arch-clip-${i}`}>
                        <path d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z" />
                      </clipPath>
                    </defs>
                    <path
                      d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z"
                      fill="hsl(var(--wine))"
                      stroke="hsl(var(--gold))"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                {/* Name */}
                <h3 className="font-display italic text-primary text-[26px] mt-4 leading-tight">
                  {honoree.name}
                </h3>

                {/* Title & Organization */}
                <p className="text-foreground text-[11px] tracking-luxe uppercase mt-2">
                  {honoree.title}
                </p>

                {/* Bio */}
                <p className="text-foreground font-display text-base leading-[1.7] mt-3">
                  {honoree.bio}
                </p>

                {/* Pull Quote */}
                <blockquote className="font-display italic text-primary text-[20px] leading-snug border-l border-primary pl-4 mt-4">
                  "{honoree.quote}"
                </blockquote>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="bg-primary py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <OrnamentalDivider color="gold" className="mb-12" />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="font-display italic text-champagne text-[36px] sm:text-[52px] font-light leading-[1.1] mb-6">
              Join Us in Celebrating These Remarkable Changemakers
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-champagne/80 font-display text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Secure your place at the Royal Gala and be part of an unforgettable evening.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.45}>
            <a
              href="#tickets"
              className="inline-block bg-background text-primary border border-primary font-display text-[16px] font-bold tracking-luxe uppercase px-10 py-4 rounded-sm transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              style={{ borderRadius: "2px" }}
            >
              Purchase Tickets
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.6}>
            <OrnamentalDivider color="gold" className="mt-12" />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Changemakers;
