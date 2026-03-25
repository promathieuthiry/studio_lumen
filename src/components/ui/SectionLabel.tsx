import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-caps text-text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
