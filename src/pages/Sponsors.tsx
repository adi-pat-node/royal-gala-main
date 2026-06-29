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
{ role: "Chair", name: "Dr Tai-Heng Cheng" },
{ role: "Board Member", name: "Revd. Lucy Winkett" },
{ role: "Board Member", name: "Charles Myers" },
{ role: "Board Member", name: "Steve Mahle" },
{ role: "Board Member", name: "Sam Beeler" },
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
];

const Sponsors = () => {
return (
<div className="min-h-screen">
<Navbar />

{/* Hero */}
<section className="relative h-screen overflow-hidden flex items-center justify-center">
<motion.div
className="absolute inset-0"
style={{ backgroundColor: "hsl(350, 80%, 19%)" }}
animate={{ scale: [1, 1.05, 1] }}
transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
/>
<div className="absolute inset-0" style={{ backgroundColor: "hsla(350, 80%, 19%, 0.5)" }} />
<div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
<motion.p
className="text-champagne text-[11px] tracking-wider-luxe font-light mb-6"
{...fade(0)}
>
THE WREN GALA
</motion.p>
<motion.div {...fade(1)}>
<OrnamentalDivider color="gold" className="mb-8" />
</motion.div>
<motion.h1
className="font-display italic text-champagne font-light leading-[0.9] mb-6 text-[52px] md:text-[100px]"
{...fade(2)}
>
Supporters &<br />Leadership
</motion.h1>
<motion.p
className="text-champagne/80 font-display text-lg leading-relaxed mb-8 max-w-lg mx-auto"
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
<p className="text-champagne text-[11px] tracking-wider-luxe font-light uppercase mb-4">
Governance
</p>
<h2 className="font-display italic text-champagne font-light text-[44px] md:text-[52px] leading-[1.1] mb-6">
{`{ The American Friends of St James's Piccadilly Board }`}
</h2>
<OrnamentalDivider color="gold" />
<a
href="https://www.sjp.org.uk/ways-to-donate/american-friends/"
target="_blank"
rel="noopener noreferrer"
className="inline-block mt-6 text-[10px] tracking-wider-luxe uppercase font-light text-burgundy underline underline-offset-4"
style={{ textDecorationThickness: "1px" }}
>
Learn more about the American Friends
</a>
</div>

<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{boardMembers.map((m) => (
<div
key={m.name}
className="border border-gold/20 px-6 py-8 text-center"
>
<p className="text-champagne/70 text-[10px] tracking-wider-luxe font-light uppercase mb-3">
{m.role}
</p>
<p className="font-display italic text-champagne text-[28px] leading-tight">
{m.name}
</p>
</div>
))}
</div>
</div>
</ScrollReveal>
</section>

{/* Committee */}
<section className="bg-champagne grain-texture py-24 px-6">
<ScrollReveal>
<div className="max-w-6xl mx-auto">
<div className="text-center mb-12">
<h2 className="font-display italic text-burgundy font-light text-[44px] md:text-[52px] leading-[1.1] mb-6">
{`{ The Wren Gala Committee }`}
</h2>
<OrnamentalDivider color="burgundy" className="mb-10" />
<p className="text-[#373737] text-base md:text-lg leading-[1.8] max-w-3xl mx-auto">
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
<p className="text-burgundy/70 text-[10px] tracking-wider-luxe font-light uppercase mb-2">
{m.role}
</p>
<p className="font-display italic text-burgundy text-[28px] leading-tight">
{m.name}
</p>
</div>
))}
</div>

{/* Divider */}
<div className="my-10 mx-auto h-px w-32 bg-burgundy/40" />

{/* Members listing */}
<p className="text-center text-burgundy/70 text-[10px] tracking-wider-luxe font-light uppercase mb-6">
Committee Members
</p>
<div className="flex flex-col items-center gap-2">
{committeeMembers
.filter((m) => !m.isLeadership)
.map((m) => (
<p
key={m.name}
className="font-display italic text-[#373737] text-[20px] md:text-[22px] leading-[1.4] text-center"
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
<p className="text-burgundy text-[11px] tracking-wider-luxe font-light uppercase mb-4">
Our Partners
</p>
<h2 className="font-display italic text-burgundy font-light text-[44px] md:text-[52px] leading-[1.1] mb-6">
{`{ The Supporters }`}
</h2>
<OrnamentalDivider color="burgundy" className="mb-10" />
<p className="text-[#373737] text-base md:text-lg leading-[1.8] max-w-3xl mx-auto mb-16">
The Wren Gala is made possible through the generosity of our corporate
partners, whose support sustains the transformative work of St James's Piccadilly
and those it serves.
</p>

<p className="text-[#373737] text-base leading-[1.8] max-w-2xl mx-auto mb-6">
To learn more about corporate sponsorship opportunities and engagement,
please contact our Director of Development.
</p>
<a
href="mailto:development@sjp.org.uk"
className="inline-block bg-burgundy text-champagne hover:bg-[hsl(350,80%,19%)] transition-colors duration-200 px-8 py-3 text-[12px] tracking-wider-luxe font-bold uppercase"
style={{ borderRadius: "4px" }}
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
            <h2 className="font-display italic text-champagne font-light text-[44px] md:text-[64px] leading-[1.05] mb-10">
              Be Part of the Story
            </h2>
            <Link
              to="/tickets"
              className="inline-block bg-champagne text-burgundy border border-burgundy hover:bg-[hsl(350,80%,19%)] hover:text-champagne transition-colors duration-200 px-10 py-4 text-[16px] tracking-wider-luxe font-bold uppercase mb-10"
              style={{ borderRadius: "4px" }}
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
