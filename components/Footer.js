import { navLinks } from "@/data/landing";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>StackSave. Built as a SaaS internship foundation.</p>
        <div className="flex gap-5">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
