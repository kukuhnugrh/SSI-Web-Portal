import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 rounded-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 rounded-md",
        outline:
          "border border-border bg-background text-foreground shadow-sm hover:bg-secondary hover:border-accent rounded-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 rounded-md",
        ghost: "hover:bg-secondary hover:text-foreground rounded-md",
        link: "text-accent underline-offset-4 hover:underline",
        premium:
          "bg-accent text-accent-foreground shadow-elegant hover:shadow-hover hover:-translate-y-0.5 rounded-md",
        hero:
          "bg-primary text-primary-foreground border border-primary hover:bg-primary/90 rounded-none uppercase tracking-wider font-semibold",
        elegant:
          "bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none uppercase tracking-wider font-semibold",
        subtle:
          "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-md",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
