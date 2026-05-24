import { Navbar } from "@/components/Navbar";
import { ResultsView } from "@/components/results/ResultsView";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <Navbar />
      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ResultsView />
        </div>
      </section>
    </main>
  );
}
