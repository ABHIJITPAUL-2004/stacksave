import { notFound } from "next/navigation";
import { PublicResultsPage } from "@/components/results/PublicResultsPage";
import { getAuditById } from "@/lib/db/audits";
import { formatCurrency } from "@/utils/format";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const audit = await getAuditById(id);

    if (!audit) {
      return {
        title: "StackSave audit not found",
      };
    }

    const monthlySavings = formatCurrency(
      audit.auditResult.totalMonthlySavings
    );
    const title = `Save ${monthlySavings}/month on AI tools with StackSave`;
    const description =
      "A public-safe AI spend audit report with deterministic savings recommendations.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "StackSave audit report",
    };
  }
}

export default async function SharedResultsPage({ params }) {
  const { id } = await params;
  let audit;

  try {
    audit = await getAuditById(id);
  } catch {
    audit = null;
  }

  if (!audit) {
    notFound();
  }

  return (
    <PublicResultsPage
      auditResult={audit.auditResult}
      aiSummary={audit.aiSummary}
      publicId={audit.id}
    />
  );
}
