import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import allyPhoto from "../assets/ally-zlatar.jfif";

const ChangemakersSection = () => {
  return (
    <Link to="/changemakers" className="block">
    <section id="changemakers" className="bg-primary py-24 px-6 cursor-pointer">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left text */}
        <ScrollReveal>
          <div className="max-w-md">
            <h2 className="font-display italic text-champagne text-[42px] sm:text-[56px] font-light leading-[1.05] mb-6">
              The <br />Changemakers
            </h2>
            <p className="text-champagne/80 font-display text-lg leading-relaxed mb-8">
              Honouring visionaries who carry forward the spirit of service, creativity,
              and community that has defined St James's Piccadilly for over three hundred years.
            </p>
            <Link
              to="/changemakers"
              className="inline-block border border-champagne text-champagne text-[11px] tracking-luxe uppercase px-8 py-3 rounded transition-colors duration-300 hover:bg-champagne hover:text-primary"
            >
              Meet the Cohort
            </Link>
          </div>
        </ScrollReveal>

        {/* Right: honoree arch entries — staggered */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center items-end gap-4">
            {[
              { name: "Ally Zlatar", title: "Visual Artist & Researcher" },
              { name: "Fatemeh Rangrazjeddi", title: "Artist & Painter" },
              { name: "Stéfan Weil", title: "Artist & Photographer" },
            ].map((honoree, i) => (
              <div
                key={i}
                className="flex flex-col items-center w-[110px] sm:w-[130px]"
                style={{
                  marginTop: i === 1 ? -20 : 0,
                  zIndex: 3 - i,
                  position: "relative",
                }}
              >
                <svg viewBox="0 0 140 200" className="w-full h-auto">
                  <defs>
                    <clipPath id={`teaser-arch-clip-${i}`}>
                      <path d="M0 200 L0 80 Q0 0 70 0 Q140 0 140 80 L140 200 Z" />
                    </clipPath>
                  </defs>
                  {i === 0 ? (
                    <>
                      <image
                        href={allyPhoto}
                        x="0" y="0" width="140" height="200"
                        preserveAspectRatio="xMidYMin slice"
                        clipPath={`url(#teaser-arch-clip-${i})`}
                      />
                      <path
                        d="M0 200 L0 80 Q0 0 70 0 Q140 0 140 80 L140 200 Z"
                        fill="none"
                        stroke="hsl(var(--gold))"
                        strokeWidth="1"
                      />
                    </>
                  ) : (
                    <path
                      d="M0 200 L0 80 Q0 0 70 0 Q140 0 140 80 L140 200 Z"
                      fill="hsl(var(--wine))"
                      stroke="hsl(var(--gold))"
                      strokeWidth="1"
                    />
                  )}
                </svg>
                <p className="font-display italic text-champagne text-center text-[13px] sm:text-[15px] leading-tight mt-2">
                  {honoree.name}
                </p>
                <p className="text-champagne/50 text-[8px] sm:text-[9px] tracking-widest uppercase font-light text-center mt-1">
                  {honoree.title}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
    </Link>
  );
};

export default ChangemakersSection;
