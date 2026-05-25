import { Resend } from "resend";
import { formatCurrency } from "@/utils/format";

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendLeadConfirmationEmail({ email, auditResult }) {
  const resend = getResendClient();

  if (!resend) {
    return { sent: false, reason: "RESEND_API_KEY is not configured" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "StackSave <onboarding@resend.dev>";
  const highSavings = auditResult?.totalMonthlySavings > 500;

  await resend.emails.send({
    from,
    to: email,
    subject: highSavings
      ? "Your StackSave audit found a high-savings opportunity"
      : "Your StackSave audit report is ready",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111827">
        <h1 style="font-size:24px;margin-bottom:12px">StackSave audit received</h1>
        <p style="line-height:1.6">Thanks for reviewing your AI spend with StackSave.</p>
        <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:20px 0;background:#f9fafb">
          <p style="margin:0;color:#6b7280">Estimated monthly savings</p>
          <p style="font-size:28px;font-weight:700;margin:8px 0 0">${formatCurrency(
            auditResult?.totalMonthlySavings
          )}</p>
          <p style="margin:8px 0 0;color:#6b7280">Annualized impact: ${formatCurrency(
            auditResult?.totalAnnualSavings
          )}</p>
        </div>
        <p style="line-height:1.6">${
          highSavings
            ? "Because your savings opportunity is above $500/month, Credex may reach out with ideas for a deeper optimization review."
            : "We will keep you updated as StackSave adds more optimization workflows."
        }</p>
      </div>
    `,
  });

  return { sent: true };
}
