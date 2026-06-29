import OrnamentalDivider from "./OrnamentalDivider";
import ScrollReveal from "./ScrollReveal";

const AboutSection = () => {
  return (
    <section className="bg-champagne py-24 px-6">
      <ScrollReveal>
        <OrnamentalDivider color="gold" className="mb-16" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-body-text font-display text-lg sm:text-xl leading-relaxed" style={{ lineHeight: "2" }}>
            The Wren Gala is an extraordinary evening celebrating the enduring legacy of Sir Christopher Wren's 1684 church of St James's Piccadilly, London, where art, music and the spirit of service have converged for over three centuries. Guests will be transported into a world of candlelit grandeur, exquisite dining, and stirring performances, all in honour of a new generation of changemakers carrying this legacy forward.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <OrnamentalDivider color="gold" className="mt-16" />
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;
