import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
});

const ArchPlaceholder = ({ className = "" }: { className?: string }) => (
  <div
    className={`rounded-t-full border border-gold overflow-hidden ${className}`}
    style={{ backgroundColor: "hsl(350, 80%, 19%)" }}
  >
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-champagne/30 font-display italic text-sm">Image</span>
    </div>
  </div>
);

const Story = () => {
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
            ST JAMES'S PICCADILLY
          </motion.p>
          <motion.div {...fade(1)}>
            <OrnamentalDivider color="gold" className="mb-8" />
          </motion.div>
          <motion.h1
            className="font-display italic text-champagne font-light leading-[0.9] mb-6 text-[52px] md:text-[100px]"
            {...fade(2)}
          >
            The Story of<br />St James's Piccadilly
          </motion.h1>
          <motion.p
            className="text-champagne/80 font-display text-lg leading-relaxed mb-8 max-w-lg mx-auto"
            {...fade(3)}
          >
            Three centuries of art, music, and service in the heart of London.
          </motion.p>
          <motion.div {...fade(4)}>
            <OrnamentalDivider color="gold" />
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display italic text-burgundy font-light text-[48px] leading-[1.1] mb-8">
                Founded in 1684
              </h2>
              <p className="text-[#373737] text-base leading-[1.8] mb-6">
                St James's Piccadilly was designed by Sir Christopher Wren and consecrated in 1684.
                It stands as one of the finest examples of English Baroque architecture, a masterwork
                conceived by the same visionary who rebuilt London after the Great Fire.
              </p>
              <p className="text-[#373737] text-base leading-[1.8]">
                Wren himself declared it the ideal design for an Anglican parish church — a space
                where every congregant could both see and hear the service, bathed in the gentle
                light that streams through its tall, elegant windows.
              </p>
            </div>
            <ArchPlaceholder className="w-full h-[500px] md:h-[600px]" />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mt-20" />
        </ScrollReveal>
      </section>

      {/* Editorial Section 1 — Light, text left */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display italic text-burgundy font-light text-[40px] leading-[1.1] mb-8">
                A Sanctuary of Art &amp; Music
              </h2>
              <p className="text-[#373737] text-base leading-[1.8] mb-6">
                For over three hundred years, St James's has been a living gallery and concert hall.
                Its walls have echoed with the music of Handel, who premiered works here, and its
                altarpiece by Grinling Gibbons remains one of London's most treasured carvings.
              </p>
              <p className="text-[#373737] text-base leading-[1.8]">
                Today the tradition continues with a world-renowned lunchtime concert series and a
                commitment to the arts that makes St James's one of the most culturally vibrant
                churches in the country.
              </p>
            </div>
            <ArchPlaceholder className="w-full h-[500px] md:h-[600px]" />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mt-20" />
        </ScrollReveal>
      </section>

      {/* Editorial Section 2 — Dark, image left */}
      <section className="py-24 px-6" style={{ backgroundColor: "hsl(350, 80%, 19%)" }}>
        <ScrollReveal>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <ArchPlaceholder className="w-full h-[500px] md:h-[600px]" />
            <div>
              <h2 className="font-display italic text-champagne font-light text-[40px] leading-[1.1] mb-8">
                A Tradition of Service
              </h2>
              <p className="text-champagne/80 text-base leading-[1.8] mb-6">
                St James's has always opened its doors to the community. From its historic role as
                a place of radical welcome to its modern-day outreach programmes, the church
                embodies a deep commitment to social justice and compassion.
              </p>
              <p className="text-champagne/80 text-base leading-[1.8]">
                Its pioneering work with refugees, the homeless, and those on the margins of society
                has earned it a reputation as one of London's most socially engaged parishes — a
                beacon of hope in the heart of the West End.
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mt-20" />
        </ScrollReveal>
      </section>

      {/* Editorial Section 3 — Light, text left */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display italic text-burgundy font-light text-[40px] leading-[1.1] mb-8">
                The Next Chapter
              </h2>
              <p className="text-[#373737] text-base leading-[1.8] mb-6">
                As St James's enters its fourth century, it continues to evolve — honouring its
                Wren-designed beauty while embracing new voices and new visions for what a church
                can be in the modern world.
              </p>
              <p className="text-[#373737] text-base leading-[1.8]">
                The Royal Gala celebrates this living legacy by bringing together changemakers,
                artists, and supporters who share in the belief that sacred spaces can be engines
                of positive change.
              </p>
            </div>
            <ArchPlaceholder className="w-full h-[500px] md:h-[600px]" />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mt-20" />
        </ScrollReveal>
      </section>

      {/* Pull Quote */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <OrnamentalDivider color="gold" className="mb-12" />
            <blockquote className="font-display italic text-burgundy font-light text-[36px] leading-[1.3] mb-8">
              "A place where the sacred and the civic have always met."
            </blockquote>
            <p className="text-[#373737] text-[11px] tracking-wider-luxe uppercase">
              Rev Lucy Winkett, Rector of St James's Piccadilly
            </p>
            <OrnamentalDivider color="gold" className="mt-12" />
          </div>
        </ScrollReveal>
      </section>

      {/* Closing CTA */}
      <section className="bg-burgundy py-24 px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <OrnamentalDivider color="gold" className="mb-12" />
            <h2 className="font-display italic text-champagne font-light text-[52px] leading-[1.1] mb-6">
              Be Part of the Story
            </h2>
            <p className="text-champagne/80 font-display text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Join us at the Royal Gala and help carry this legacy forward.
            </p>
            <a
              href="#"
              className="inline-block px-10 py-3 text-[16px] font-bold uppercase tracking-wider-luxe border transition-colors duration-200"
              style={{
                backgroundColor: "hsl(39, 76%, 93%)",
                color: "hsl(345, 68%, 27%)",
                borderColor: "hsl(345, 68%, 27%)",
                borderRadius: "4px",
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
            <OrnamentalDivider color="gold" className="mt-12" />
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Story;
