interface ArchIconProps {
  className?: string;
  size?: number;
}

const ArchIcon = ({ className = "", size = 24 }: ArchIconProps) => (
  <svg
    width={size}
    height={size * 1.4}
    viewBox="0 0 24 34"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 34 L0 14 Q0 0 12 0 Q24 0 24 14 L24 34"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

export default ArchIcon;
