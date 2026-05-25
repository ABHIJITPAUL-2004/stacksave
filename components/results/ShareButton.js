"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (!navigator?.clipboard) {
      setCopied(true);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-teal-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
    >
      <Link2 size={17} />
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
