import Navbar from "@/components/Navbar";
import nextChapterPhoto from '../assets/Royal-gala-asset-1.jpeg';
import sanctuaryPhoto from '../assets/Royal-gala-asset-3.jpeg';
import foundedPhoto from '../assets/Royal-gala-asset-4.jpeg';
import traditionPhoto from '../assets/Royal-gala-asset-5.jpg';
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
                In 1662, King Charles II granted a charter to develop part of the estate of St James's Palace. Designed by Sir Christopher Wren and consecrated in 1684, St James's is now a Grade I listed building of exceptional significance. It serves as the church of the Royal Academy of Arts and the theatres of the West End -- a haven that has stood at the heart of London and its community for centuries. Wren himself declared it the finest church his design had yet produced: a space where every congregation could hear and see the service, bathed in the gentle light that streams through its tall, elegant windows.
              </p>
            </div>
            <div className="relative w-full h-[500px] md:h-[600px]">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="founded-arch-clip">
                    <path d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z" />
                  </clipPath>
                </defs>
                <image
                  href={foundedPhoto}
                  x="0" y="0" width="300" height="400"
                  preserveAspectRatio="xMidYMin slice"
                  clipPath="url(#founded-arch-clip)"
                />
                <path
                  d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z"
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="1"
                />
              </svg>
            </div>
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
              <p className="text-[#373737] text-base leading-[1.8]">
                For over three hundred years, St James's has been a living gallery and concert hall. Its walls have welcomed artists, writers and musicians of the highest calibre, and its doors have never been closed to those seeking inspiration, sanctuary or community. Today, the ambitious restoration under a world-renowned, landscape architect restores not just a building but St James's role as one of London's most celebrated settings.
              </p>
            </div>
            <div className="relative w-full h-[500px] md:h-[600px]">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="sanctuary-arch-clip">
                    <path d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z" />
                  </clipPath>
                </defs>
                <image
                  href={sanctuaryPhoto}
                  x="0" y="0" width="300" height="400"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#sanctuary-arch-clip)"
                />
                <path
                  d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z"
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="1"
                />
              </svg>
            </div>
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
            <div className="relative w-full h-[500px] md:h-[600px]">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="tradition-arch-clip">
                    <path d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z" />
                  </clipPath>
                </defs>
                <image
                  href={traditionPhoto}
                  x="0" y="0" width="300" height="400"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#tradition-arch-clip)"
                />
                <path
                  d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z"
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-display italic text-champagne font-light text-[40px] leading-[1.1] mb-8">
                A Tradition of Service
              </h2>
              <p className="text-champagne/80 text-base leading-[1.8]">
                St James's has always opened its doors to the community. From its historic work as a place of radical welcome to its sustaining outreach programmes, the church embodies a deep commitment to social justice and compassion. St James's is widely recognised as one of London's most socially engaged parishes -- a beacon of hope in the heart of the West End.
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
              <p className="text-[#373737] text-base leading-[1.8]">
                As St James's enters its fourth century, it continues to offer a luminous, serene space to reflect, create, and explore new ideas for a new chapter in its life. The American Friends exist to bring changemakers across continents, all supporters who share a belief in the power of creativity to inspire positive change.
              </p>
            </div>
            <div className="relative w-full h-[500px] md:h-[600px]">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="next-chapter-arch-clip">
                    <path d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z" />
                  </clipPath>
                </defs>
                <image
                  href={nextChapterPhoto}
                  x="0" y="0" width="300" height="400"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#next-chapter-arch-clip)"
                />
                <path
                  d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z"
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="1"
                />
              </svg>
            </div>
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
              The Revd Lucy Winkett, Rector of St James's Piccadilly
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
              Join us at the Royal Gala and help carry that legacy forward.
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
