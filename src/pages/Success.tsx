import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrnamentalDivider from "@/components/OrnamentalDivider";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
});

const Success = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section
        className="relative flex items-center justify-center px-6"
        style={{ minHeight: "100svh", backgroundColor: "#3B010B" }}
      >
        <div className="relative z-10 text-center max-w-2xl mx-auto py-32">
          <motion.div {...fade(0)} className="flex justify-center mb-8">
            <svg
              viewBox="0 0 200 280"
              className="w-full max-w-[160px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 280 L10 120 Q10 10 100 10 Q190 10 190 120 L190 280 L10 280"
                stroke="hsl(42, 60%, 60%)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </motion.div>

          <motion.div {...fade(1)}>
            <OrnamentalDivider color="gold" className="mb-8" />
          </motion.div>

          <motion.h1
            className="font-display italic text-champagne font-light leading-[0.95] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
            {...fade(2)}
          >
            Thank You
          </motion.h1>

          <motion.p
            className="text-champagne/80 font-display leading-relaxed mb-10"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.25rem)" }}
            {...fade(3)}
          >
            Your reservation is confirmed. A receipt and confirmation details have been sent to
            your email. We are honored to have you join us for an evening celebrating legacy,
            art, and community.
          </motion.p>

          <motion.div {...fade(4)}>
            <OrnamentalDivider color="gold" className="mb-10" />
          </motion.div>

          <motion.div {...fade(5)}>
            <Link
              to="/"
              className="inline-block py-3 px-10 font-display text-[13px] uppercase tracking-wider transition-opacity duration-200 hover:opacity-90"
              style={{
                backgroundColor: "#75162D",
                color: "#F2E5C6",
                borderRadius: "4px",
              }}
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Success;
