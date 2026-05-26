import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/landing";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05060a]/80 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        <Link href="/" aria-label="StackSave home" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg border border-teal-300/30 bg-teal-300/10 text-teal-200">
            <BarChart3 size={18} aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            StackSave
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <Button href="/audit" size="sm">
          Start audit
        </Button>
      </nav>
    </header>
  );
}
