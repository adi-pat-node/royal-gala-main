import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.png";
import OrnamentalDivider from "./OrnamentalDivider";

const fade = (delay: number, duration: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: duration / 1000, delay: delay / 1000, ease: "easeOut" as const },
});

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center"
      style={{
        minHeight: "100svh",
        height: "auto",
        padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 5vw, 4rem) clamp(3rem, 6vw, 6rem)",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
      }}
    >
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
      <div
        className="relative z-10 text-center"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(0.5rem, 1.5vw, 1.5rem)",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "left", width: "100%" }}
        >
          <OrnamentalDivider color="gold" />
        </motion.div>

        <motion.div
          className="font-display italic text-champagne font-light leading-relaxed text-center"
          style={{ fontSize: "clamp(0.7rem, 1.8vw, 1.1rem)" }}
          {...fade(400, 600)}
        >
          <span className="block">His Royal Highness</span>
          <span className="block">The Duke of Edinburgh KG KT GCVO</span>
          <span className="block">&amp;</span>
          <span className="block">the Reverend</span>
          <span className="block">Lucy Winkett</span>
          <span className="block">Invite you to join</span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.55, ease: "easeOut" }}
          style={{ transformOrigin: "center", width: "100%" }}
        >
          <OrnamentalDivider color="gold" />
        </motion.div>

        <motion.p
          className="text-champagne font-light uppercase"
          style={{ fontSize: "clamp(0.6rem, 1vw, 0.8rem)", letterSpacing: "0.3em", opacity: 1 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          AN EVENING OF DISTINCTION
        </motion.p>

        <motion.h1
          className="font-display italic text-champagne font-light leading-[0.9]"
          style={{ letterSpacing: "normal", wordSpacing: "normal", fontKerning: "normal" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
        >
          <span
            className="block"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", letterSpacing: "normal", wordSpacing: "normal", whiteSpace: "nowrap" }}
          >
            The Wren Gala
          </span>
          <span
            className="block"
            style={{ fontSize: "clamp(2rem, 6vw, 6rem)", letterSpacing: "normal", wordSpacing: "normal" }}
          >
            New York 2026
          </span>
        </motion.h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <motion.p
            className="text-[#F2E5C6] tracking-wider-luxe font-light uppercase text-center"
            style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.75rem)" }}
            {...fade(900, 500)}
          >
            Patron: His Royal Highness The Duke of Edinburgh KG KT GCVO
          </motion.p>
          <motion.p
            className="text-[#F2E5C6] tracking-wider-luxe font-light uppercase text-center"
            style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.75rem)" }}
            {...fade(950, 500)}
          >
            President: David Snowdon, The Earl of Snowdon
          </motion.p>
        </div>

        <motion.p
          className="text-champagne tracking-wider-luxe font-bold"
          style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)" }}
          {...fade(1000, 500)}
        >
          SEPTEMBER 29, 2026 &nbsp;·&nbsp; 6:00 PM &nbsp;·&nbsp; ST BART'S, NEW YORK
        </motion.p>

        <motion.div
          style={{ marginTop: "clamp(1rem, 3vw, 2rem)", marginBottom: "clamp(2rem, 4vw, 4rem)" }}
          {...fade(1200, 400)}
        >
          <Link
            to="/tickets"
            className="inline-block bg-burgundy text-champagne font-bold tracking-luxe rounded transition-colors duration-300 hover:bg-maroon"
            style={{
              padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.5rem, 4vw, 3rem)",
              fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
            }}
          >
            Get Your Tickets
          </Link>
        </motion.div>

        <motion.div style={{ width: "100%" }} {...fade(1400, 400)}>
          <OrnamentalDivider color="gold" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
