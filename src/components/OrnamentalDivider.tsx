interface OrnamentalDividerProps {
  color?: "gold" | "burgundy";
  className?: string;
}

const OrnamentalDivider = ({ color = "gold", className = "" }: OrnamentalDividerProps) => {
  const lineColor = color === "gold" ? "bg-gold" : "bg-burgundy";
  const diamondColor = color === "gold" ? "border-gold" : "border-burgundy";

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className={`h-[1px] w-16 ${lineColor} opacity-60`} />
      <div className={`w-2 h-2 rotate-45 border ${diamondColor} opacity-60`} />
      <div className={`h-[1px] w-16 ${lineColor} opacity-60`} />
    </div>
  );
};

export default OrnamentalDivider;
