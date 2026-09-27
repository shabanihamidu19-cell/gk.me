import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 transition-transform disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:opacity-90",
        secondary:
          "bg-bg-elevated text-fg border border-border hover:bg-surface-hover",
        ghost: "bg-transparent text-muted hover:text-fg hover:bg-surface",
        danger: "bg-danger/15 text-danger hover:bg-danger/25",
      },
      size: {
        default: "min-h-12 px-5 rounded-sm text-[0.95rem]",
        sm: "min-h-9 px-3.5 rounded-sm text-sm",
        icon: "size-10 rounded-full bg-bg-elevated text-muted hover:bg-surface-hover hover:text-fg",
        fab: "size-14 rounded-full bg-accent text-accent-fg shadow-[0_4px_20px_color-mix(in_oklab,var(--color-accent)_40%,transparent)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
