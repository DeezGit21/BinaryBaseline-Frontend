import * as React from "react";
import { cn } from "@/lib/utils";

interface CardGradientProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardGradient = React.forwardRef<HTMLDivElement, CardGradientProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "relative rounded-lg border border-gray-800 bg-gradient-to-b from-gray-800/50 to-background/95 backdrop-blur-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

CardGradient.displayName = "CardGradient";