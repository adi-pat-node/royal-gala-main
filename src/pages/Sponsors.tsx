import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ScrollReveal from "@/components/ScrollReveal";
import ArchIcon from "@/components/ArchIcon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fade = (i: number) => ({
initial: { opacity: 0, y: 20 },
animate: { opacity: 1, y: 0 },
transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
});

const boardMembers = [
{ role: "Chair", name: "Dr. Taiheng Cheng" },
{ role: "Board Member", name: "Revd. Lucy Winkett" },
{ role: "Board Member", name: "Charles Myers" },
{ role: "Board Member", name: "Steve Mahle" },
{ role: "Board Member", name: "Alicia Fowler" },
];

const committeeMembers = [
{ role: "Chair", name: "Charles Myers", isLeadership: true },
{ role: "Co-Chair", name: "Christina Lyon", isLeadership: true },
{ role: "Committee Member", name: "Sir Philip Bobbitt" },
{ role: "Committee Member", name: "Sir Cameron Macintosh" },
{ role: "Committee Member", name: "Sir Stephen Fry" },
{ role: "Committee Member", name: "Tom Ford" },
{ role: "Committee Member", name: "Adjoa Andoh MBE HonFRSL" },
{ role: "Committee Member", name: "Brian Cox CBE" },
{ role: "Committee Member", name: "Helena Bonham Carter CBE" },
{ role: "Committee Member", name: "Christiane Amanpour CBE" },
{ role: "Committee Member", name: "Kyle Matthys" },
{ role: "Committee Members", name: "Molly & David Borthwick" },
{ role: "Committee Member", name: "Caroline Goodall" },
];

const Sponsors = () => {
return (
<div className="min-h-screen">
<Navbar />

{/* Hero */}
<section
  className="relative overflow-hidden flex items-center justify-center"
  style={{
    minHeight: "100svh",
    paddingTop: "clamp(4rem, 10vw, 8rem)",
    paddingBottom: "clamp(4rem, 10vw, 8rem)",
  }}
>
<motion.div
className="absolute inset-0"
style={{ backgroundColor: "hsl(350, 80%, 19%)" }}
animate={{ scale: [1, 1.05, 1] }}
transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
/>
<div className="absolute inset-0" style={{ backgroundColor: "hsla(350, 80%, 19%, 0.5)" }} />
<div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
<motion.p
  className="text-champagne tracking-wider-luxe font-light mb-6"
  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
  {...fade(0)}
>
THE WREN GALA
</motion.p>
<motion.div {...fade(1)}>
<OrnamentalDivider color="gold" className="mb-8" />
</motion.div>
<motion.h1
  className="font-display italic text-champagne font-light leading-[0.9] mb-6"
  style={{ fontSize: "clamp(3rem, 8vw, 9rem)" }}
  {...fade(2)}
>
Supporters &<br />Leadership
</motion.h1>
<motion.p
  className="text-champagne/80 font-display leading-relaxed mb-8 max-w-lg mx-auto"
  style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
  {...fade(3)}
>
Those who make it possible
</motion.p>
<motion.div {...fade(4)}>
<OrnamentalDivider color="gold" />
</motion.div>
</div>
</section>

{/* Board */}
<section className="py-24 px-6" style={{ backgroundColor: "hsl(350, 80%, 19%)" }}>
<ScrollReveal>
<div className="max-w-5xl mx-auto">
<div className="text-center mb-16">
<p
  className="text-champagne tracking-wider-luxe font-light uppercase mb-4"
  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
>
Governance
</p>
<h2
  className="font-display italic text-champagne font-light leading-[1.1] mb-6"
  style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
>
{`{ The American Friends of St James's Piccadilly Board }`}
</h2>
<OrnamentalDivider color="gold" />
</div>

<div className="flex justify-center mb-6">
<div className="border border-gold/20 px-6 py-8 text-center w-full sm:w-1/2 lg:w-1/3">
  <p
    className="text-champagne/70 tracking-wider-luxe font-light uppercase mb-3"
    style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
  >
    PRESIDENT
  </p>
  <p
    className="font-display italic text-champagne leading-tight"
    style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
  >
    John Studzinski CBE
  </p>
</div>
</div>

{(() => {
const boardCols = 3;
const remainderCount = boardMembers.length % boardCols;
const fullRowMembers = remainderCount > 0 ? boardMembers.slice(0, boardMembers.length - remainderCount) : boardMembers;
const remainderMembers = remainderCount > 0 ? boardMembers.slice(boardMembers.length - remainderCount) : [];

const renderCard = (m: { role: string; name: string }, className: string) => (
<div key={m.name} className={className}>
<p
  className="text-champagne/70 tracking-wider-luxe font-light uppercase mb-3"
  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
>
{m.role}
</p>
<p
  className="font-display italic text-champagne leading-tight"
  style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
>
{m.name}
</p>
</div>
);

return (
<>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{fullRowMembers.map((m) => renderCard(m, "border border-gold/20 px-6 py-8 text-center"))}
</div>
{remainderMembers.length > 0 && (
<div className="flex flex-wrap justify-center gap-6 mt-6">
{remainderMembers.map((m) =>
renderCard(
m,
"border border-gold/20 px-6 py-8 text-center w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
)
)}
</div>
)}
</>
);
})()}
<div className="text-center mt-10">
<a
  href="https://www.sjp.org.uk/ways-to-donate/american-friends/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block tracking-wider-luxe uppercase font-light underline underline-offset-4"
  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", color: "#F2E5C6", textDecorationThickness: "1px" }}
>
  Learn more about the American Friends
</a>
</div>
</div>
</ScrollReveal>
</section>

{/* Committee */}
<section className="bg-champagne grain-texture py-24 px-6">
<ScrollReveal>
<div className="max-w-6xl mx-auto">
<div className="text-center mb-12">
<h2
  className="font-display italic text-burgundy font-light leading-[1.1] mb-6"
  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
>
{`{ The Wren Gala Committee }`}
</h2>
<OrnamentalDivider color="burgundy" className="mb-10" />
<p
  className="text-[#373737] leading-[1.8] max-w-3xl mx-auto"
  style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
>
An extraordinary gathering of artists, advocates, and leaders united in their
commitment to the life and mission of St James's Piccadilly.
</p>
</div>

{/* Single arch container with all committee members */}
<div className="max-w-4xl mx-auto md:min-w-[700px]">
<div
                className="border border-burgundy/30 bg-white/40 px-10 md:px-20 pt-20 md:pt-24 pb-14 md:pb-16"
style={{ borderRadius: "50% 50% 0 0 / 60% 60% 0 0" }}
>
{/* Leadership */}
<div className="flex flex-col items-center gap-6 text-center">
{committeeMembers
.filter((m) => m.isLeadership)
.map((m) => (
<div key={m.name}>
<p
  className="text-burgundy/70 tracking-wider-luxe font-light uppercase mb-2"
  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
>
{m.role}
</p>
<p
  className="font-display italic text-burgundy leading-tight"
  style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
>
{m.name}
</p>
</div>
))}
</div>

{/* Divider */}
<div className="my-10 mx-auto h-px w-32 bg-burgundy/40" />

{/* Members listing */}
<p
  className="text-center text-burgundy/70 tracking-wider-luxe font-light uppercase mb-6"
  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
>
Committee Members
</p>
<div className="flex flex-col items-center gap-2">
{committeeMembers
.filter((m) => !m.isLeadership)
.map((m) => (
<p
key={m.name}
className="font-display italic text-[#373737] leading-[1.4] text-center"
style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
>
{m.name}
</p>
))}
</div>
</div>
</div>
</div>
</ScrollReveal>
</section>

{/* Supporters */}
<section className="bg-champagne grain-texture py-24 px-6">
<ScrollReveal>
<div className="max-w-5xl mx-auto text-center">
<p
  className="text-burgundy tracking-wider-luxe font-light uppercase mb-4"
  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
>
Our Partners
</p>
<h2
  className="font-display italic text-burgundy font-light leading-[1.1] mb-6"
  style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
>
{`{ The Supporters }`}
</h2>
<OrnamentalDivider color="burgundy" className="mb-10" />
<p
  className="text-[#373737] leading-[1.8] max-w-3xl mx-auto mb-16"
  style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
>
The Wren Gala is made possible through the generosity of our corporate
partners, whose support sustains the transformative work of St James's Piccadilly
and those it serves.
</p>

<p
  className="text-[#373737] leading-[1.8] max-w-2xl mx-auto mb-6"
  style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
>
To learn more about corporate sponsorship opportunities and engagement,
please contact our Director of Development.
</p>
<a
href="mailto:development@sjp.org.uk"
className="inline-block bg-burgundy text-champagne hover:bg-[hsl(350,80%,19%)] transition-colors duration-200 px-8 py-3 tracking-wider-luxe font-bold uppercase"
style={{ borderRadius: "4px", fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
>
Contact Brian Willetts — development@sjp.org.uk
</a>
</div>
</ScrollReveal>
</section>

{/* Closing CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: "#3B010B" }}>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <OrnamentalDivider color="gold" className="mb-8" />
            <h2
              className="font-display italic text-champagne font-light leading-[1.05] mb-10"
              style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
            >
              Be Part of the Story
            </h2>
            <Link
              to="/tickets"
              className="inline-block bg-champagne text-burgundy border border-burgundy hover:bg-[hsl(350,80%,19%)] hover:text-champagne transition-colors duration-200 px-10 py-4 tracking-wider-luxe font-bold uppercase mb-10"
              style={{ borderRadius: "4px", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
            >
              Donation Tickets
            </Link>
            <OrnamentalDivider color="gold" />
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsors;
