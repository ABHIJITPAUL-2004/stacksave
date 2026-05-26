import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-teal-300 text-slate-950 shadow-lg shadow-teal-950/30 hover:bg-teal-200",
  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-5 text-sm sm:text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  className,
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
      {icon}
    </a>
  );
}
