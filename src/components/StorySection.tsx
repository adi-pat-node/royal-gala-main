import OrnamentalDivider from "./OrnamentalDivider";
import ArchIcon from "./ArchIcon";
import ScrollReveal from "./ScrollReveal";

const StorySection = () => {
  return (
    <section id="story" className="bg-background py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-burgundy text-[10px] tracking-wider-luxe font-light mb-4">OUR STORY</p>
          <h2 className="font-display italic text-primary text-[36px] sm:text-[52px] font-light leading-[1.1] mb-8">
            The Story of <br />St James's Piccadilly
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-foreground font-display text-base sm:text-lg leading-[1.9] mb-6">
            Designed by Sir Christopher Wren and consecrated in 1684, St James's Church
            Piccadilly has served as a beacon of art, music, and compassion in the heart
            of London for over three centuries.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <OrnamentalDivider color="burgundy" className="my-8" />
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <p className="text-foreground font-display text-base sm:text-lg leading-[1.9] mb-8">
            From William Blake's baptism to performances by the Academy of St Martin in
            the Fields, its walls have witnessed moments that shaped culture and community
            alike. The American Friends exist to preserve and extend this remarkable legacy.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <ArchIcon className="text-gold mx-auto mb-6" size={28} />
          <a
            href="#story"
            className="inline-block border-2 border-primary text-primary text-[16px] font-bold tracking-luxe uppercase px-8 py-3 rounded-sm transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Read the Full Story
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StorySection;
