import { useRef, useEffect, useState } from "react";
import { Users, Music, Utensils } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  { icon: Users, label: "DISTINGUISHED GUESTS", value: "300", description: "" },
  { icon: Music, label: "THE WREN DINNER", value: "", description: "A champagne reception with canapés followed by a three-course dinner with fine wines, and post dinner cocktails" },
  { icon: Utensils, label: "COURSE DINNER", value: "Five Courses", description: "" },
];

const OUTER_ARCH = "M8 295 L8 100 Q8 45 55 20 L100 3 L145 20 Q192 45 192 100 L192 295";
const INNER_ARCHES = [
  "M14 295 L14 103 Q14 50 58 27 L100 11 L142 27 Q186 50 186 103 L186 295",
  "M20 295 L20 106 Q20 55 61 34 L100 19 L139 34 Q180 55 180 106 L180 295",
].join(" ");
const BASE_LINE = "M8 295 L192 295";

const OUTER_LENGTH = 700;
const INNER_LENGTH = 1200;
const BASE_LENGTH = 184;

const ARCH_DURATION = 1.8;
const BASE_DURATION = 0.4;

const ArchCard = ({
  icon: Icon,
  label,
  value,
  description,
  delay,
  inView,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  description: string;
  delay: number;
  inView: boolean;
}) => (
  <div className="relative flex items-center justify-center px-8 py-14">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        d={OUTER_ARCH}
        stroke="hsl(345, 68%, 27%)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={OUTER_LENGTH}
        initial={{ strokeDashoffset: OUTER_LENGTH }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: OUTER_LENGTH }}
        transition={{ duration: ARCH_DURATION, ease: "easeInOut", delay }}
      />
      <motion.path
        d={INNER_ARCHES}
        stroke="hsl(345, 68%, 27%)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={INNER_LENGTH}
        initial={{ strokeDashoffset: INNER_LENGTH }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: INNER_LENGTH }}
        transition={{ duration: ARCH_DURATION, ease: "easeInOut", delay }}
      />
      <motion.path
        d={BASE_LINE}
        stroke="hsl(345, 68%, 27%)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={BASE_LENGTH}
        initial={{ strokeDashoffset: BASE_LENGTH }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: BASE_LENGTH }}
        transition={{ duration: BASE_DURATION, ease: "easeInOut", delay: delay + ARCH_DURATION }}
      />
    </svg>
    <motion.div
      className="relative z-10 text-center flex flex-col items-center gap-4"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: delay + 2.0 }}
    >
      <Icon className="text-burgundy" size={22} strokeWidth={1.2} />
      <span className="text-burgundy text-[10px] tracking-wider-luxe font-light">{label}</span>
      {value && <span className="font-display italic text-burgundy text-3xl">{value}</span>}
      {description && <span className="text-burgundy font-display text-sm leading-relaxed text-center px-2">{description}</span>}
    </motion.div>
  </div>
);

const HighlightsStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-champagne py-16 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {highlights.map(({ icon, label, value, description }, i) => (
          <ArchCard
            key={label}
            icon={icon}
            label={label}
            value={value}
            description={description}
            delay={i * 0.15}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
};

export default HighlightsStrip;
