import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import allyPhoto from '../assets/ally-zlatar.jfif';
import fatemehPhoto from '../assets/Fatemeh.jpg';
import stefanPhoto from '../assets/Weil_Stefan.jpg';
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type HonoreeLink = { label: string; href: string };

type Honoree = {
  name: string;
  title: string;
  bio: string;
  links: HonoreeLink[];
};

const HONOREES: Honoree[] = [
  {
    name: "Ally Zlatar",
    title: "Visual Artist & Researcher",
    bio: "Ally Zlatar is a visual artist and researcher whose work explores the relationship between the body and cultural narrative. Through her global initiative, The Starving Artist, Ally uses photography and painting to transform personal vulnerability into public advocacy. Her work at the Changemaker Lens exhibition challenges simplified perceptions of illness and identity, demanding a more courageous and honest engagement with the human experience.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/dr-ally-zlatar-81597b120/" },
      { label: "Website", href: "https://starvingartist.cargo.site/" },
    ],
  },
  {
    name: "Fatemeh Rangrazjeddi",
    title: "Artist & Painter",
    bio: "London-based artist Fatemeh Rangrazjeddi explores the complexities of belonging and the search for home within the diaspora. By moving between personal reflection and shared experience, her paintings offer a vital perspective on how identity is formed across borders. In the Changemaker Lens exhibition, Fatemeh's work serves as a quiet but powerful act of reclamation, using symbolic imagery to navigate the emotional landscapes of memory and cultural transition.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/fatemeh-rangrazjeddi/" },
    ],
  },
  {
    name: "Stéfan Weil",
    title: "Artist & Photographer",
    bio: "Stéfan Weil is an artist and photographer working at the intersection of fashion and fine art to redefine contemporary representation. His project, To Be King, is a profound visual intervention, placing Black subjects at the center of traditions that have historically excluded them. By reimagining cultural symbols through bold imagery, Stéfan challenges the viewer to confront visibility and power, making him a central voice in the dialogue on modern identity.",
    links: [
      { label: "Website", href: "https://www.stefanweil.art/" },
    ],
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
            THE WREN GALA
          </motion.p>

          <motion.p
            className="text-champagne/70 font-display text-base leading-relaxed mb-6 max-w-lg mx-auto"
            {...fade(1)}
          >
            An evening to recognise and stand behind the next generation of Changemakers
          </motion.p>

          <motion.div {...fade(2)}>
            <OrnamentalDivider color="gold" className="mb-8" />
          </motion.div>

          <motion.h1
            className="font-display italic text-champagne font-light leading-[0.9] mb-6 text-[56px] sm:text-[80px] md:text-[100px]"
            {...fade(3)}
          >
            The Changemaker<br />Cohort
          </motion.h1>

          <motion.p
            className="text-champagne/80 font-display text-lg leading-relaxed mb-8 max-w-lg mx-auto"
            {...fade(4)}
          >
            Honouring young adults who are learning to lead with care, creativity and judgement in the systems they are already helping to shape
          </motion.p>

          <motion.div {...fade(5)}>
            <OrnamentalDivider color="gold" />
          </motion.div>
        </div>
      </section>

      {/* Body Sections */}
      <section className="bg-background py-24 px-6 relative" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')" }}>
        <OrnamentalDivider color="gold" className="mb-16" />

        <div className="max-w-[680px] mx-auto space-y-16">
          <ScrollReveal>
            <div>
              <h2 className="font-display italic text-primary text-[28px] sm:text-[36px] font-light leading-tight mb-4">
                A Name That Carries Responsibility
              </h2>
              <p className="text-foreground font-display text-lg leading-[1.8]">
                Named after Quobna Ottobah Cugoano, the abolitionist writer baptised at St James's who spoke plainly about injustice and responsibility, the programme is grounded in a simple but demanding idea: leadership is not about being heard, but about being answerable. A Cugoano Changemaker is not always the loudest voice in the room. They are the ones who remain accountable when the room goes silent.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="font-display italic text-primary text-[28px] sm:text-[36px] font-light leading-tight mb-4">
                A Programme Rooted in Practice
              </h2>
              <p className="text-foreground font-display text-lg leading-[1.8]">
                Over 18 months, 15 young adults learn to work with the world as it is, not as they wish it to be. Through reflection, clear, accountable communication and funded project work, they learn how systems operate, how to make decisions where trade-offs are real, and how to act with care for the people affected by those decisions.
              </p>
              <p className="text-foreground font-display text-lg leading-[1.8] mt-4">
                Changemakers work through a structured cycle of real-world application, mentor challenge and peer reflection, where ideas are tested in practice and reasoning is made visible and open to challenge. It is a programme grounded in practice, judgement and responsibility, where learning is shaped through real decisions and their consequences, not always comfortable ones.
              </p>
              <p className="text-foreground font-display text-lg leading-[1.8] mt-4">
                The programme helps people sit with difficult questions, think carefully about the consequences of their actions, and act with greater clarity and responsibility in the world around them.
              </p>
              <p className="text-foreground font-display text-lg leading-[1.8] mt-4">
                This work does not sit in isolation. It is held across the Changemaker Programme through a continuous cycle of reflection, expression and action. Changemakers learn to see systems more clearly, make sense of complexity, and navigate responsibility with greater care and confidence. They develop the ability to hold difficult questions, work within real limits, and find ways forward that are both thoughtful and practical.
              </p>
              <p className="text-foreground font-display text-lg leading-[1.8] mt-8">
                This takes shape through three connected elements:
              </p>
              <p className="text-foreground font-display text-lg leading-[1.8] mt-4">
                <strong>Circles</strong>, where changemakers examine real situations, challenge their assumptions and deepen their understanding of what matters and what is possible;
              </p>
              <p className="text-foreground font-display text-lg leading-[1.8] mt-4">
                <strong>Lens</strong>, a disciplined practice of turning reflection into expression, helping them communicate their thinking with clarity, care and integrity;
              </p>
              <p className="text-foreground font-display text-lg leading-[1.8] mt-4">
                and the <strong>Continuum</strong>, where changemakers carry ideas into action, working within real constraints and building the confidence to make decisions and follow them through.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="font-display italic text-primary text-[28px] sm:text-[36px] font-light leading-tight mb-4">
                Changemaker Lens
              </h2>
              <p className="text-foreground font-display text-lg leading-[1.8]">
                The Changemaker Programme brings together reflection, expression and action. The Changemaker Lens is one part of that wider system, where ideas are developed, tested and, at times, shared.
              </p>
              <p className="text-foreground font-display text-lg leading-[1.8] mt-4">
                We are pleased to be bringing the Changemaker Lens exhibition to St Barts, on Park Avenue, New York. As part of the wider programme, it brings together original work developed through a shared creative process rooted in reflection, expression and responsibility. The artwork we invite you to witness reveals the inner lives of a generation who are trying to make sense of a rapidly changing world. The evening is an opportunity to encounter their work, hear the thinking behind it, and spend time with ideas that invite attention, reflection and conversation.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <p className="text-foreground font-display text-lg leading-[1.8] mb-4">
                For more information on our Changemaker Programme, please contact:
              </p>
              <ul className="space-y-2 font-display text-lg">
                <li>
                  <a
                    href="mailto:director.changemakers@sjp.org.uk"
                    className="text-primary underline underline-offset-4 hover:text-primary/70 transition-colors duration-200"
                  >
                    Sam Davis
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:depdirector.changemakers@sjp.org.uk"
                    className="text-primary underline underline-offset-4 hover:text-primary/70 transition-colors duration-200"
                  >
                    Marwah El-Murad
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

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
                  <img
                    src={[allyPhoto, fatemehPhoto, stefanPhoto][i]}
                    alt={honoree.name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      clipPath: `url(#arch-clip-${i})`,
                    }}
                  />
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 300 400"
                    preserveAspectRatio="none"
                    style={{ pointerEvents: "none" }}
                  >
                    <defs>
                      <clipPath id={`arch-clip-${i}`} clipPathUnits="objectBoundingBox">
                        <path d="M0 1 L0 0.4 Q0 0 0.5 0 Q1 0 1 0.4 L1 1 Z" />
                      </clipPath>
                    </defs>
                    <path
                      d="M0 400 L0 160 Q0 0 150 0 Q300 0 300 160 L300 400 Z"
                      fill="none"
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

                {/* Links */}
                <div className="flex items-center gap-3 mt-4">
                  {honoree.links.map((link, j) => (
                    <span key={link.href} className="flex items-center gap-3">
                      {j > 0 && (
                        <span className="text-[#75162D] text-[10px]">·</span>
                      )}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-widest uppercase font-light transition-opacity duration-200 hover:opacity-60"
                        style={{
                          color: "#75162D",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          textDecorationThickness: "1px",
                        }}
                      >
                        {link.label}
                      </a>
                    </span>
                  ))}
                </div>
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
              Join Us in Celebrating these Remarkable Changemakers
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-champagne/80 font-display text-lg leading-relaxed mb-10">
              Secure your place at the Wren Gala and be part of an unforgettable evening
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.45}>
            <Link
              to="/tickets"
              className="inline-block bg-background text-primary border border-primary font-display text-[16px] font-bold tracking-luxe uppercase px-10 py-4 rounded-sm transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              style={{ borderRadius: "4px" }}
            >
              Donation Tickets
            </Link>
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
