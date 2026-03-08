import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "glow-btn font-display font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2";
    const variants = {
      primary: "gradient-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground glow-secondary",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    };
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";
export default GlowButton;
