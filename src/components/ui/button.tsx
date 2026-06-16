"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-pop hover:-translate-y-0.5 hover:bg-primary-600",
        secondary:
          "bg-secondary text-white shadow-warm hover:-translate-y-0.5 hover:bg-secondary-600",
        outline:
          "border border-border bg-white text-foreground hover:border-primary/40 hover:text-primary",
        ghost:
          "text-foreground hover:bg-primary-50 hover:text-primary-700",
        soft:
          "bg-primary-50 text-primary-700 hover:bg-primary-100",
        warmSoft:
          "bg-secondary-50 text-secondary-700 hover:bg-secondary-100",
        destructive:
          "bg-danger text-white hover:bg-red-700",
        dark:
          "bg-foreground text-white hover:bg-foreground/90",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
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
