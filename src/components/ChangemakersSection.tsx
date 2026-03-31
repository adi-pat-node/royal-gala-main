import ScrollReveal from "./ScrollReveal";

const ChangemakersSection = () => {
  return (
    <section id="changemakers" className="bg-primary py-24 px-6">
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
            <a
              href="#changemakers"
              className="inline-block border border-champagne text-champagne text-[11px] tracking-luxe uppercase px-8 py-3 rounded transition-colors duration-300 hover:bg-champagne hover:text-primary"
            >
              Meet the Cohort
            </a>
          </div>
        </ScrollReveal>

        {/* Right: honoree arch placeholders — staggered */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center items-end gap-[-8px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-[120px] sm:w-[140px]"
                style={{
                  marginTop: i === 1 ? -20 : 0,
                  zIndex: 3 - i,
                  position: "relative",
                }}
              >
                <svg viewBox="0 0 140 200" className="w-full h-auto">
                  <path
                    d="M0 200 L0 80 Q0 0 70 0 Q140 0 140 80 L140 200 Z"
                    fill="hsl(var(--wine))"
                    stroke="hsl(var(--gold))"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ChangemakersSection;
