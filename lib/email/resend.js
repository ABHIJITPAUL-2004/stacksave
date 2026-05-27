import { Resend } from "resend";
import { formatCurrency } from "@/utils/format";

const DEFAULT_RESEND_FROM_EMAIL = "StackSave <onboarding@resend.dev>";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function getResendFromEmail() {
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (from) {
    return from;
  }

  return process.env.NODE_ENV === "production"
    ? null
    : DEFAULT_RESEND_FROM_EMAIL;
}

function logResendFailure(message, error, context = {}) {
  console.error(message, {
    ...context,
    error: error instanceof Error ? error.message : String(error),
  });
}

async function sendResendEmail({ to, subject, html, text, replyTo }) {
  const resend = getResendClient();
  const from = getResendFromEmail();

  if (!resend) {
    return { sent: false, reason: "RESEND_API_KEY is not configured" };
  }

  if (!from) {
    return { sent: false, reason: "RESEND_FROM_EMAIL is not configured" };
  }

  try {
    const response = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    });

    return {
      sent: true,
      id: response?.data?.id || null,
    };
  } catch (error) {
    logResendFailure("[resend] Email send failed", error, {
      to,
      subject,
      from,
    });

    return {
      sent: false,
      reason: "Failed to send email via Resend",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function sendLeadConfirmationEmail({ email, auditResult }) {
  const highSavings = auditResult?.totalMonthlySavings > 500;
  const subject = highSavings
    ? "Your StackSave audit found a high-savings opportunity"
    : "Your StackSave audit report is ready";
  const monthlySavings = formatCurrency(auditResult?.totalMonthlySavings);
  const annualSavings = formatCurrency(auditResult?.totalAnnualSavings);
  const bodyText = [
    "StackSave audit received",
    "",
    "Thanks for reviewing your AI spend with StackSave.",
    "",
    `Estimated monthly savings: ${monthlySavings}`,
    `Annualized impact: ${annualSavings}`,
    "",
    highSavings
      ? "Because your savings opportunity is above $500/month, the team may reach out with ideas for a deeper optimization review."
      : "We will keep you updated as StackSave adds more optimization workflows.",
  ].join("\n");

  return sendResendEmail({
    to: email,
    subject,
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
            ? "Because your savings opportunity is above $500/month, the team may reach out with ideas for a deeper optimization review."
            : "We will keep you updated as StackSave adds more optimization workflows."
        }</p>
      </div>
    `,
    text: bodyText,
  });
}

export async function sendResendTestEmail({ email, message }) {
  const bodyText = [
    "StackSave email verification",
    "",
    message || "This is a test email from the StackSave Resend integration.",
  ].join("\n");

  return sendResendEmail({
    to: email,
    subject: "StackSave Resend test email",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111827">
        <h1 style="font-size:24px;margin-bottom:12px">StackSave email verification</h1>
        <p style="line-height:1.6">${message || "This is a test email from the StackSave Resend integration."}</p>
      </div>
    `,
    text: bodyText,
  });
}
