import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "inverse" | "outline";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-text-dark hover:bg-background hover:text-white",
  inverse:
    "bg-background text-white hover:bg-white hover:text-text-dark",
  outline:
    "bg-transparent text-white border border-white hover:bg-white hover:text-text-dark",
};

export function Button({
  children,
  variant = "primary",
  href,
  className,
  showArrow = true,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-pill font-medium text-[1.125em] min-w-[200px] max-w-[322px] transition-colors duration-300",
    "px-[calc(1.333em+2px)] py-[calc(.667em+2px)]",
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        <span>{children}</span>
        {showArrow && <ArrowRight className="ml-[17px] w-5 h-5" />}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      <span>{children}</span>
      {showArrow && <ArrowRight className="ml-[17px] w-5 h-5" />}
    </button>
  );
}
