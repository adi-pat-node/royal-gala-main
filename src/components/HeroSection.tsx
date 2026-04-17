import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";
import OrnamentalDivider from "./OrnamentalDivider";

const fade = (delay: number, duration: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: duration / 1000, delay: delay / 1000, ease: "easeOut" as const },
});

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Ken Burns background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-maroon/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          className="text-champagne text-[11px] tracking-wider-luxe font-light mb-6"
          {...fade(0, 600)}
        >
          AN EVENING OF DISTINCTION
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        >
          <OrnamentalDivider color="gold" className="mb-8" />
        </motion.div>

        <motion.h1
          className="font-display italic text-champagne text-6xl sm:text-8xl md:text-9xl font-light leading-[0.9] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          The Wren Gala – New York '26
        </motion.h1>

        <motion.p
          className="text-[#F2E5C6] text-[10px] tracking-wider-luxe font-light uppercase text-center mb-1"
          {...fade(700, 500)}
        >
          Patron: His Royal Highness The Duke of Edinburgh KG KT GCVO
        </motion.p>
        <motion.p
          className="text-[#F2E5C6] text-[10px] tracking-wider-luxe font-light uppercase text-center mb-8"
          {...fade(750, 500)}
        >
          President: David Snowdon, The Earl of Snowdon
        </motion.p>

        <motion.p
          className="text-champagne text-[16px] tracking-wider-luxe font-light mb-10"
          {...fade(800, 500)}
        >
          SEPTEMBER 24, 2026 &nbsp;·&nbsp; ST BART'S, NEW YORK
        </motion.p>

        <motion.a
          href="#tickets"
          className="inline-block bg-burgundy text-champagne text-[16px] font-bold tracking-luxe px-10 py-4 rounded transition-colors duration-300 hover:bg-maroon"
          {...fade(1000, 400)}
        >
          Get Your Tickets
        </motion.a>

        <motion.div {...fade(1200, 400)}>
          <OrnamentalDivider color="gold" className="mt-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
