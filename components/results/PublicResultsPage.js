import { Navbar } from "@/components/Navbar";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";

export function PublicResultsPage({ auditResult, aiSummary, publicId }) {
  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <Navbar />
      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ResultsDashboard
            auditResult={auditResult}
            aiSummary={aiSummary}
            publicId={publicId}
            isPublicReport
          />
        </div>
      </section>
    </main>
  );
}
