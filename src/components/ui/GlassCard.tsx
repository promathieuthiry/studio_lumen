import { cn } from "@/lib/utils";

type CardVariant = "light" | "dark";

export function Card({
  children,
  className,
  variant = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
}) {
  return (
    <div
      className={cn(
        "rounded-lg",
        variant === "dark" &&
          "bg-background border border-border-lighter",
        variant === "light" &&
          "bg-background-light",
        className
      )}
    >
      {children}
    </div>
  );
}

export function FeaturedCard({
  children,
  className,
  variant = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
}) {
  return (
    <div
      className={cn(
        "rounded-[25px]",
        variant === "dark" &&
          "bg-background border border-border-lighter",
        variant === "light" &&
          "bg-background-light",
        className
      )}
    >
      {children}
    </div>
  );
}
