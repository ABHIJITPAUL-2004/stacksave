"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

export function ShareButton({ url }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = url || window.location.href;

    if (navigator?.share) {
      try {
        await navigator.share({
          title: "StackSave AI spend audit",
          text: "View this AI spend audit report from StackSave.",
          url: shareUrl,
        });
        return;
      } catch {
        // Fall back to copy when native sharing is cancelled or unavailable.
      }
    }

    if (!navigator?.clipboard) {
      setCopied(true);
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
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
