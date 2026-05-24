import { SpendAuditForm } from "@/components/audit/SpendAuditForm";
import { Navbar } from "@/components/Navbar";

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <Navbar />
      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
              Spend audit form
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Collect clean AI spend data before analyzing it.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Add each AI tool your team pays for, select the plan, enter the
              monthly spend, and capture seat counts. Everything stays in the
              browser for Day 2.
            </p>
          </div>

          <SpendAuditForm />
        </div>
      </section>
    </main>
  );
}
