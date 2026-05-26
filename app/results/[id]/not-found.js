import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";

export default function SharedResultsNotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-[#05060a] text-white">
      <Navbar />
      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
            Report unavailable
          </p>
          <h1 className="mt-4 text-3xl font-semibold">
            This audit report could not be found.
          </h1>
          <p className="mt-4 leading-7 text-slate-400">
            The link may be invalid, expired, or connected to a Supabase record
            that is no longer available.
          </p>
          <div className="mt-6">
            <Button href="/audit">Create a new audit</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
