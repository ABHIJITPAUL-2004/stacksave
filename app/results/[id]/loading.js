import { Navbar } from "@/components/Navbar";

export default function SharedResultsLoading() {
  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <Navbar />
      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.05]" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-32 animate-pulse rounded-xl bg-white/[0.04]" />
            <div className="h-32 animate-pulse rounded-xl bg-white/[0.04]" />
            <div className="h-32 animate-pulse rounded-xl bg-white/[0.04]" />
          </div>
        </div>
      </section>
    </main>
  );
}
