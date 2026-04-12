import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] active:scale-[0.96]",
  {
    variants: {
      variant: {
        default:
          "rounded-[1.5rem] bg-primary text-primary-foreground shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.45)] hover:shadow-[0_14px_40px_-4px_hsl(var(--primary)/0.55)] border border-primary/30 before:absolute before:inset-0 before:rounded-[1.5rem] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-100 before:transition-opacity before:duration-500 hover:before:opacity-60 after:absolute after:inset-0 after:rounded-[1.5rem] after:bg-gradient-to-tr after:from-transparent after:via-white/10 after:to-white/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700",
        destructive:
          "rounded-[1.5rem] bg-destructive text-destructive-foreground shadow-[0_8px_30px_-6px_hsl(var(--destructive)/0.45)] hover:shadow-[0_14px_40px_-4px_hsl(var(--destructive)/0.55)] border border-destructive/30 before:absolute before:inset-0 before:rounded-[1.5rem] before:bg-gradient-to-b before:from-white/20 before:to-transparent",
        outline:
          "rounded-[1.5rem] border-2 border-primary/25 bg-background/60 backdrop-blur-xl text-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.15)] hover:shadow-[0_10px_35px_-4px_hsl(var(--primary)/0.25)] hover:border-primary/50 hover:bg-primary/5 before:absolute before:inset-0 before:rounded-[1.5rem] before:bg-gradient-to-b before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        secondary:
          "rounded-[1.5rem] bg-secondary text-secondary-foreground shadow-[0_6px_24px_-4px_hsl(var(--muted-foreground)/0.15)] hover:shadow-[0_10px_30px_-4px_hsl(var(--muted-foreground)/0.25)] border border-border/50 before:absolute before:inset-0 before:rounded-[1.5rem] before:bg-gradient-to-b before:from-white/30 before:to-transparent",
        ghost:
          "rounded-[1.25rem] hover:bg-accent/60 hover:text-accent-foreground hover:shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.15)] backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7 py-3",
        sm: "h-9 rounded-[1.25rem] px-5 text-xs",
        lg: "h-14 rounded-[1.75rem] px-12 text-base",
        icon: "h-11 w-11 rounded-[1.25rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
