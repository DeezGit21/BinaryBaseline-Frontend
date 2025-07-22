import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonGradientVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-accent to-primary text-white hover:shadow-lg hover:shadow-primary/20",
        outline: "border border-accent text-accent hover:bg-accent/10",
        subtle: "bg-accent/10 text-accent hover:bg-accent/20",
        ghost: "text-accent hover:bg-accent/10",
      },
      size: {
        default: "h-10 px-6 py-2 rounded-full",
        sm: "h-9 px-4 py-1.5 rounded-full",
        lg: "h-12 px-8 py-3 rounded-full text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonGradientProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonGradientVariants> {
  asChild?: boolean;
}

const ButtonGradient = React.forwardRef<HTMLButtonElement, ButtonGradientProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonGradientVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonGradient.displayName = "ButtonGradient";

export { ButtonGradient, buttonGradientVariants };
