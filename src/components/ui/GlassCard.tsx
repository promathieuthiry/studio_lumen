import { clsx } from "clsx";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg shadow-black/20 ring-1 ring-white/5",
        className
      )}
    >
      {children}
    </div>
  );
}
