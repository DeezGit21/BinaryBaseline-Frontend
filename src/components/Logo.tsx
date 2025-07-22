import { FC } from "react";
import { ChartLineUp } from "@/lib/icons";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}

const Logo: FC<LogoProps> = ({ className = "", size = "md", withTagline = false }) => {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2">
        <ChartLineUp className="text-accent" size={size === "lg" ? 32 : size === "md" ? 24 : 20} />
        <span className={`font-bold gradient-text ${sizes[size]}`}>BINARY BASELINE</span>
      </div>
      {withTagline && (
        <span className="text-red-500 text-xs mt-1 tracking-wider">
          STRATEGIZE. OPTIMIZE. AUTOMATE.
        </span>
      )}
    </div>
  );
};

export default Logo;
