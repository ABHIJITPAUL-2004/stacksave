import {
  BadgeDollarSign,
  ChartNoAxesCombined,
  FileSearch,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "CTA", href: "#cta" },
];

export const howItWorks = [
  {
    step: "01",
    title: "Connect spend sources",
    description:
      "Future versions can bring in invoices, exports, and billing data from AI tools.",
  },
  {
    step: "02",
    title: "Spot waste patterns",
    description:
      "The audit layer can highlight unused seats, duplicate tools, and rising subscriptions.",
  },
  {
    step: "03",
    title: "Share clear actions",
    description:
      "Teams need simple recommendations they can discuss with finance and engineering leads.",
  },
];

export const features = [
  {
    title: "Tool spend overview",
    description:
      "A future dashboard can summarize spend across major AI tools in one place.",
    icon: BadgeDollarSign,
  },
  {
    title: "Usage signal cards",
    description:
      "Reusable cards are ready for utilization, owner, and renewal insights later.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Audit-ready layout",
    description:
      "The landing page structure is built to support real product modules as they arrive.",
    icon: FileSearch,
  },
  {
    title: "Team-level clarity",
    description:
      "The product direction focuses on founders, finance teams, and engineering managers.",
    icon: UsersRound,
  },
  {
    title: "Modern AI positioning",
    description:
      "The visual system borrows from current SaaS patterns without adding heavy UI kits.",
    icon: Sparkles,
  },
  {
    title: "Responsible scope",
    description:
      "No fake auth, database, or backend logic is included before those modules are needed.",
    icon: ShieldCheck,
  },
];
